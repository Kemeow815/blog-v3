import { createError, defineEventHandler } from 'h3'

const UMAMI_CONFIG = {
	serverUrl: 'https://unami-kemiao.kemiaosw.top',
	username: process.env.UMAMI_USERNAME,
	password: process.env.UMAMI_PASSWORD,
	websiteId: '1a8feaa6-0c4d-444e-8693-02e5a547181a',
}

let cachedToken: string | null = null
let tokenExpiry: number | null = null

/* ---------- 类型定义 ---------- */
interface UmamiAuthResponse {
	token: string
	user: {
		id: string
		username: string
		role: string
		createdAt: string
		isAdmin: boolean
	}
}

interface UmamiStatsData {
	pageviews: { value: number, prev: number }
	visitors: { value: number, prev: number }
	visits: { value: number, prev: number }
	bounces: { value: number, prev: number }
	totaltime: { value: number, prev: number }
}

interface TimeRangeDefinition {
	startAt: number
	endAt: number
}

/* ---------- 工具函数 ---------- */
async function getUmamiToken(): Promise<string> {
	if (cachedToken && tokenExpiry && Date.now() < tokenExpiry)
		return cachedToken

	const res = await fetch(`${UMAMI_CONFIG.serverUrl}/api/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
		body: JSON.stringify({
			username: UMAMI_CONFIG.username,
			password: UMAMI_CONFIG.password,
		}),
	})

	if (!res.ok)
		throw new Error(`认证失败: ${res.status} ${res.statusText}`)

	const data: UmamiAuthResponse = await res.json()
	cachedToken = data.token
	tokenExpiry = Date.now() + 60 * 60 * 1000
	return data.token
}

async function verifyToken(token: string): Promise<boolean> {
	try {
		const res = await fetch(`${UMAMI_CONFIG.serverUrl}/api/auth/verify`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
		})
		return res.ok
	}
	catch {
		return false
	}
}

async function fetchStatsForDefinedRange(
	token: string,
	rangeDef: TimeRangeDefinition,
): Promise<UmamiStatsData> {
	const res = await fetch(
		`${UMAMI_CONFIG.serverUrl}/api/websites/${UMAMI_CONFIG.websiteId}/stats?startAt=${rangeDef.startAt}&endAt=${rangeDef.endAt}`,
		{ headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } },
	)

	if (!res.ok)
		throw new Error(`获取统计数据失败: ${res.status} ${res.statusText}`)
	return await res.json()
}

/* ---------- 主入口 ---------- */
export default defineEventHandler(async (event) => {
	// 预渲染阶段：直接返回空数据，不请求远端
	if (import.meta.prerender) {
		return {
			success: true,
			data: {
				pageviews: { value: 0, prev: 0 },
				visitors: { value: 0, prev: 0 },
				visits: { value: 0, prev: 0 },
				bounces: { value: 0, prev: 0 },
				totaltime: { value: 0, prev: 0 },
			},
		}
	}

	// 运行阶段：走远端
	try {
		const token = await getUmamiToken()
		if (!(await verifyToken(token))) {
			cachedToken = null
			tokenExpiry = null
			throw createError({ statusCode: 401, statusMessage: '无效的认证令牌' })
		}

		const totalStats = await fetchStatsForDefinedRange(token, {
			startAt: 0,
			endAt: Date.now(),
		})

		return { success: true, data: totalStats }
	}
	catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message || '获取 Umami 统计数据失败',
		})
	}
})

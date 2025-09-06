import { ref } from 'vue'

interface UmamiStatsData {
	pageviews: { value: number, prev: number }
	visitors: { value: number, prev: number }
	visits: { value: number, prev: number }
	bounces: { value: number, prev: number }
	totaltime: { value: number, prev: number }
}

export function useUmamiStats() {
	// 初始全 0，避免骨架屏闪烁（可选）
	const stats = ref<UmamiStatsData>({
		pageviews: { value: 0, prev: 0 },
		visitors: { value: 0, prev: 0 },
		visits: { value: 0, prev: 0 },
		bounces: { value: 0, prev: 0 },
		totaltime: { value: 0, prev: 0 },
	})

	const loading = ref<boolean>(true)
	const error = ref<string | null>(null)

	const fetchTotalStats = async () => {
		loading.value = true
		error.value = null

		try {
			const res = await fetch('/api/umami')
			if (!res.ok) {
				const errData = await res.json()
				throw new Error(errData.statusMessage || `HTTP error! status: ${res.status}`)
			}
			const result = await res.json()
			stats.value = result.data as UmamiStatsData
		}
		catch (err: any) {
			error.value = err.message || '获取统计数据失败'
			console.error('获取 Umami 统计数据失败:', err)
		}
		finally {
			loading.value = false
		}
	}

	return { stats, loading, error, fetchTotalStats }
}

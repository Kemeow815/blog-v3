export interface MomentItem {
	id: string
	author?: {
		name: string
		avatar: string
		badges?: string[]
	}
	content: string
	images?: string[]
	location?: string
	createdAt: string
}

const moments: MomentItem[] = [
	{
		id: '1',
		content: '测试',
		location: '南京市',
		createdAt: '2025-09-11 12:30',
	},
]

// 按创建时间降序排序（最新的在前）
const sortedMoments = moments.sort((a, b) => {
	return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
})

export default sortedMoments

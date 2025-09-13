export function useFeaturedArticles(limit = 5, minRecommend = 1) {
	return useAsyncData(`featured-articles-${limit}-${minRecommend}`, () => queryCollection('content')
		.where('stem', 'LIKE', 'posts/%')
		.where('recommend', '>=', minRecommend)
		.select('categories', 'date', 'description', 'image', 'path', 'readingTime', 'recommend', 'title', 'type', 'updated')
		.all()
		.then((articles) => {
			const sorted = articles.sort((a, b) => {
				const recommendDiff = (b.recommend || 0) - (a.recommend || 0)
				if (recommendDiff !== 0)
					return recommendDiff
				return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
			})
			return sorted.slice(0, limit)
		}), { default: () => [] as ArticleProps[] })
}

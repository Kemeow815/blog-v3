<script setup lang="ts">
const FeaturedArticlesCarousel = defineAsyncComponent(() => import('./FeaturedArticlesCarousel.vue'))
</script>

<template>
<Suspense>
	<FeaturedArticlesCarousel />
	<template #fallback>
		加载中...
	</template>
</Suspense>
</template>

<script setup lang="ts">
import type { Article } from '~/types'

/* ---------- 1. 获取数据 ---------- */
const { data: list } = await useFeaturedArticles(5, 1)
const raw = computed<Article[]>(() =>
	(Array.isArray(list) ? list : list.value) || [],
)

/* ---------- 2. 状态变量 ---------- */
const articles = ref<Article[]>([])
const offset = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const ITEM_HEIGHT = 100 // 每项高度，需与样式一致
let timer: ReturnType<typeof setInterval> | null = null

/* ---------- 3. 滚动逻辑 ---------- */
function scroll() {
	offset.value += 1

	if (containerRef.value) {
		const totalHeight = containerRef.value.scrollHeight
		const visibleHeight = containerRef.value.clientHeight

		// 快到底部时追加数据
		if (offset.value >= totalHeight - visibleHeight - ITEM_HEIGHT) {
			articles.value.push(...raw.value)
		}
	}
}

function start() {
	stop()
	timer = setInterval(scroll, 40) // 每40ms滚动1px
}
function stop() {
	if (timer) {
		clearInterval(timer)
		timer = null
	}
}

/* ---------- 4. 初始化 ---------- */
onMounted(() => {
	nextTick(() => {
		if (process.client) {
			articles.value = [...raw.value, ...raw.value, ...raw.value]
			offset.value = raw.value.length * ITEM_HEIGHT // 初始居中
			start()
		}
	})
})
onUnmounted(stop)
</script>

<template>
<ClientOnly>
	<div class="z-slide-header">
		<span class="title text-creative">精选文章</span>
		<div class="at-slide-hover">
			<Icon name="ph:mouse-simple-bold" />
			瀑布流滚动展示
		</div>
	</div>
	<section
		ref="containerRef"
		class="wrap"
		@mouseenter="stop"
		@mouseleave="start"
	>
		<!-- 原始滚动内容保持不变 -->
		<div
			class="track"
			:style="{
				transform: `translateY(-${offset}px)`,
				transition: 'transform 40ms linear',
			}"
		>
			<article v-for="(a, i) in articles" :key="a.id ?? i" class="card">
				<NuxtLink :to="a.path" class="link">
					<h3 class="tit">
						{{ a.title }}
					</h3>
					<p class="desc" :title="a.description">
						{{ a.description }}
					</p>
				</NuxtLink>
			</article>
		</div>
	</section>

	<!-- SSR 占位 -->
	<template #fallback>
		<section class="wrap" />
	</template>
</ClientOnly>
</template>

<style scoped>
.wrap {
  width: 100%;
  height: 100px; /* 与 ITEM_HEIGHT 保持一致 */
  overflow: hidden;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.track {
  display: flex;
  flex-direction: column;
}

.card {
  flex: 0 0 auto;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  box-sizing: border-box;
}

.link {
  width: 100%;
  text-decoration: none;
  color: #111;
}

.tit {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px;
}

.desc {
  font-size: 12px;
  color: #666;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.z-slide-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 3rem;
    margin-bottom: 0.5rem;
    padding: 0 0.5rem;
    color: var(--c-text-3);
    font-size: 1rem;

    >.title {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1;
    }

    >.at-slide-hover {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.9rem;
        opacity: 0.6;
    }
}

</style>

<!-- FloatingButtons.vue -->
<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'

/* ---------- 状态 ---------- */
const { y: scrollY } = useScroll(window)
const hasComments = ref(false)
const showBackToTop = computed(() => scrollY.value > 300)

/* ---------- 工具 ---------- */
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToComments() {
	const el = document.querySelector('.z-comment') // 只锚定外层容器
	if (!el)
		return

	/* 1. Twikoo 没初始化完 → 等它 */
	if (!window.twikoo || !document.querySelector('.tk-comments-container')) {
		document.addEventListener('twikoo.init', () => doScroll(el), { once: true })
		return
	}
	/* 2. 已初始化 → 立即滚 */
	doScroll(el)
}

function doScroll(el: Element) {
	requestAnimationFrame(() => {
		const top = window.scrollY + el.getBoundingClientRect().top - 80 // 留顶栏余地
		window.scrollTo({ top, behavior: 'smooth' })
	})
}

function checkComments() {
	hasComments.value = !!document.querySelector('.z-comment,#twikoo')
}

/* ---------- 生命周期 ---------- */
let ob: MutationObserver
onMounted(() => {
	checkComments()
	ob = new MutationObserver(checkComments)
	ob.observe(document.body, { childList: true, subtree: true })
	// 多时段兜底，防止 Twikoo 懒加载
	;[500, 1000, 2000, 3000, 5000].forEach(t => setTimeout(checkComments, t))
})
onUnmounted(() => ob?.disconnect())
</script>

<template>
<div
	class="floating-buttons"
	:class="{ open: showBackToTop || hasComments }"
>
	<div class="inner">
		<button
			v-if="showBackToTop"
			class="floating-btn back-to-top"
			aria-label="Back to top"
			@click="scrollToTop"
		>
			<Icon name="ph:arrow-fat-lines-up" />
		</button>

		<button
			v-if="hasComments"
			class="floating-btn scroll-to-comments"
			aria-label="Scroll to comments"
			@click="scrollToComments"
		>
			<Icon name="ph:chat-circle-dots-duotone" />
		</button>
	</div>
</div>
</template>

<style scoped lang="scss">
/* 窄屏时把容器整体往上提 2rem，可自行改数值 */
// @media (max-width: 768px) {
// 	.floating-buttons {
// 		bottom: 4rem;   /* 原来是 6rem */
// 	}
// }

/* ---------- 容器 ---------- */
.floating-buttons {
	display: grid;
	grid-template-rows: 0fr;
	position: fixed;
	right: max(1rem, 2vw);
	bottom: 4.5rem;
	transition: grid-template-rows 0.3s ease;
	pointer-events: none;
	z-index: 90;
}

.floating-buttons.open {
	grid-template-rows: 1fr;
	pointer-events: auto;
}

.inner {
	overflow: hidden;
	border: 1px solid var(--c-border-light, #E5E5E5);
	border-radius: 0.5rem;
	box-shadow: 0 4px 12px #0002;
	background: var(--c-bg-soft, #FFFC);
	backdrop-filter: blur(8px);
}

/* ---------- 按钮 ---------- */
.floating-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	padding: 0;
	border: none;
	background: transparent;
	color: var(--c-text, #333);
	transition: background-color 0.25s, color 0.25s;
	cursor: pointer;
}

.floating-btn:hover {
	background: var(--c-primary, #0076FF);
	color: #FFF;
}

.floating-btn svg {
	width: 24px;
	height: 24px;
}
</style>

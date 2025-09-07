<script setup lang="ts">
import feeds from '../feeds'

const appConfig = useAppConfig()
// 从feeds中随机选择4个友链
const randomFeeds = ref<any[]>([])
const hitokoto = ref('')
const showHitokoto = ref(false)

// 初始化随机友链
function initializeRandomFeeds() {
	// 收集所有友链条目
	const allFeeds = feeds.flatMap((group: any) =>
		group.entries.map((entry: any) => ({
			text: entry.author,
			url: entry.link,
			icon: 'ph:link-bold', // 使用统一的图标
		})),
	)

	// Fisher-Yates 洗牌算法随机打乱数组
	const shuffled = [...allFeeds].sort(() => 0.5 - Math.random())

	// 返回前4个
	randomFeeds.value = shuffled.slice(0, 4)
}

// 获取一言
async function fetchHitokoto() {
	try {
		const response = await fetch('https://yiyan.050815.xyz/?encode=text')
		hitokoto.value = await response.text()
		showHitokoto.value = true
	}
	catch (error) {
		console.error('获取一言失败:', error)
		hitokoto.value = '暂无法获取一言...'
		showHitokoto.value = true
	}
}

// 页面加载时初始化
initializeRandomFeeds()
fetchHitokoto()

// 刷新随机友链
function refreshFeeds() {
	initializeRandomFeeds()
}
</script>

<template>
<footer class="z-footer">
	<nav class="footer-nav">
		<div v-for="(group, groupIndex) in appConfig.footer.nav" :key="groupIndex" class="footer-nav-group">
			<h3 v-if="group.title">
				{{ group.title }}
			</h3>
			<menu>
				<li v-for="(item, itemIndex) in group.items" :key="itemIndex">
					<ZRawLink :to="item.url">
						<Icon :name="item.icon" />
						<span class="nav-text">{{ item.text }}</span>
					</ZRawLink>
				</li>
			</menu>
		</div>

		<!-- 随机友链展示 -->
		<div class="footer-nav-group">
			<h3>
				友链
				<button aria-label="刷新" class="refresh-button" title="刷新友链" @click="refreshFeeds">
					<Icon name="ph:arrow-clockwise-bold" />
				</button>
			</h3>
			<menu>
				<li v-for="(feed, index) in randomFeeds" :key="index">
					<ZRawLink :to="feed.url" external>
						<Icon :name="feed.icon" />
						<span class="nav-text">{{ feed.text }}</span>
					</ZRawLink>
				</li>
				<li>
					<ZRawLink to="/link" external>
						<span class="nav-text">更多...</span>
					</ZRawLink>
				</li>
			</menu>
		</div>
	</nav>
	<!-- <p v-html="appConfig.footer.copyright" /> -->
	<div class="github-badge">
		<span class="badge-subject">雾备</span>
		<a style="color: #FFF;" href="https://icp.wudu.ltd/id.php?keyword=20250530" rel="external" target="_blank">
			<span class="badge-value bg-cai">20250530号</span>
		</a>
	</div>
	<a href="https://icp.redcha.cn/beian/ICP-2025090150.html" target="_blank"><img style="width: 20px;height: 20px;" src="https://icp.redcha.cn/static/picture/icplogoi.png">茶ICP备2025090150号</a>
	<p v-html="appConfig.footer.copyright" />
	<p class="hitokoto" :class="{ 'hitokoto-fade-in': showHitokoto }">
		{{ hitokoto }}
	</p>
</footer>
</template>

<style lang="scss" scoped>
.z-footer {
	margin: 3rem 1rem;
	font-size: 0.9em;
	color: var(--c-text-2);

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 5vw clamp(2rem, 5%, 5vw);
		padding-block: 3rem;

		h3 {
			display: flex;
			align-items: center;
			gap: 0.5em;
			margin: 0.5em;
			font: inherit;
		}

		a {
			display: flex;
			align-items: center;
			gap: 0.3em;
			width: fit-content;
			padding: 0.3em 0.5em;
			border-radius: 0.5em;
			font-size: 0.9em;
			transition: background-color 0.2s, color 0.1s;

			&:hover {
				background-color: var(--c-bg-soft);
				color: var(--c-text);
			}
		}
	}

	.refresh-button {
		padding: 0.2em;
		border: none;
		border-radius: 0.3em;
		background: none;
		color: var(--c-text-2);
		transition: background-color 0.2s, color 0.1s;
		cursor: pointer;

		&:hover {
			background-color: var(--c-bg-soft);
			color: var(--c-text);
		}
	}

	p {
		margin: 0.5em;
	}

	.hitokoto-fade-in {
		animation: fade-in 0.5s ease-in-out;
	}

	.hitokoto {
		color: var(--c-text-3);
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
}
</style>

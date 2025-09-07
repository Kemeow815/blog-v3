<script setup lang="ts">
interface Comment {
	content: string
	author: string
	date: string
	avatar: string
	isAdmin: boolean
	url: string
	id: string
}

// Twikoo API 返回数据接口
interface TwikooResponse {
	data: Array<{
		nick: string
		comment: string
		created: number
		avatar: string
		mailMd5: string
		url: string
		id: string
	}>
}

// API 配置常量
const API_URL = 'https://kemiao-twikoo.050815.xyz'
const ADMIN_EMAIL_MD5 = 'b624bd863eaf16b3eef5efc9ce6086e7'

// 状态管理
const commentsState = useState('latestComments', () => ({
	comments: [] as Comment[],
	loading: true,
	error: false,
	lastFetchTime: 0,
}))

const comments = computed(() => commentsState.value.comments)
const loading = computed(() => commentsState.value.loading)
const error = computed(() => commentsState.value.error)

function formatTimeAgo(timestamp: number): string {
	const units = [
		{ max: 60, text: '刚刚' },
		{ max: 3600, div: 60, unit: '分钟前' },
		{ max: 86400, div: 3600, unit: '小时前' },
		{ max: 604800, div: 86400, unit: '天前' },
	]

	const diff = Math.floor((Date.now() - timestamp) / 1000)
	const match = units.find(unit => diff < unit.max)
	if (match) {
		return match.div !== undefined
			? `${Math.floor(diff / match.div)}${match.unit}`
			: match.text
	}

	return `${new Intl.DateTimeFormat('zh-CN', {
		month: 'numeric',
		day: 'numeric',
	}).format(timestamp)}日`
}

function formatContent(content: string): string {
	if (!content) {
		return ''
	}

	const replacements = {
		'<pre><code>[\\s\\S]*?</code></pre>': '[代码块]',
		'<code>([^<]{4,})</code>': '[代码]',
		'<code>([^<]{1,3})</code>': '$1',
		'<img(?![^>]*class="tk-owo-emotion")[^>]*>': '[图片]',
		'<a[^>]*?>[\\s\\S]*?</a>': '[链接]',
		'<(?!img[^>]*class="tk-owo-emotion")[^>]+>': '',
	}

	return Object.entries(replacements).reduce(
		(text, [pattern, replacement]) =>
			text.replace(new RegExp(pattern, 'g'), replacement),
		content,
	).trim()
}

async function fetchComments() {
	// 如果距离上次获取时间小于10分钟，则使用缓存
	const now = Date.now()
	if (now - commentsState.value.lastFetchTime < 10 * 60 * 1000) {
		return
	}

	try {
		commentsState.value.loading = true
		commentsState.value.error = false

		const response = await $fetch<TwikooResponse>(API_URL, {
			method: 'POST',
			body: {
				event: 'GET_RECENT_COMMENTS',
				includeReply: true,
				pageSize: 10,
			},
			timeout: 5000,
		})

		if (!response?.data) {
			throw new Error('No data')
		}

		commentsState.value.comments = response.data
			.filter(item => item.url !== '/')
			.slice(0, 5)
			.map(item => ({
				content: formatContent(item.comment),
				author: item.nick,
				date: formatTimeAgo(item.created),
				avatar: item.avatar,
				isAdmin: item.mailMd5 === ADMIN_EMAIL_MD5,
				url: item.url,
				id: item.id,
			}))
		commentsState.value.lastFetchTime = now
	}
	catch {
		commentsState.value.error = true
	}
	finally {
		commentsState.value.loading = false
	}
}

onMounted(() => {
	fetchComments()
	// 每10分钟自动刷新一次
	const timer = setInterval(fetchComments, 10 * 60 * 1000)
	onUnmounted(() => clearInterval(timer))
})
</script>

<template>
<h3 class="widget-title">
	最新评论
</h3>
<div class="widget-card comments-container">
	<Transition name="fade" mode="out-in">
		<div v-if="loading" class="loading">
			<div class="loading-spinner" />
			<p>加载中...</p>
		</div>
		<div v-else-if="error" class="error">
			<Icon name="line-md:alert" class="error-icon" />
			<span>评论加载失败</span>
		</div>
		<ul v-else class="comments-list">
			<li
				v-for="comment in comments"
				:key="comment.id"
				class="comment-item"
				@click="navigateTo(`${comment.url}#${comment.id}`)"
			>
				<div class="comment-meta">
					<div class="author-info">
						<img :src="comment.avatar" :alt="comment.author" class="avatar">
						<span class="author">{{ comment.author }}</span>
						<Icon v-if="comment.isAdmin" name="ph:seal-check-fill" class="admin-badge" />
					</div>
					<time class="date">{{ comment.date }}</time>
				</div>
				<p class="comment-content" title="点击查看完整评论" v-html="comment.content" />
			</li>
		</ul>
	</Transition>
</div>
</template>

<style lang="scss" scoped>
.comments-container {
    min-height: 343px;
    position: relative;
}

%center-flex {
    display: flex;
    align-items: center;
}

.loading, .error {
    @extend %center-flex;
    position: absolute;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    color: var(--c-text-2);
    text-align: center;

    .loading-spinner {
        margin: 0 auto 0.5rem;
        width: 40px;
        height: 40px;
        border: 3px solid var(--c-bg-3);
        border-top: 3px solid var(--c-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .error-icon {
        font-size: 3rem;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error {
    @extend %center-flex;
    position: absolute;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    color: var(--c-text-2);
}

.comment-item {
    border-bottom: 1px solid var(--c-border);
    cursor: pointer;

    &:last-child { border-bottom: none; }
}

.comment-content {
    padding: 6px 10px;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: var(--c-bg-1);
    border-radius: 4px;
    color: var(--c-text-2);
    transition: color 0.2s;

    &:hover {
        color: var(--c-text-1);
    }

    :deep(img.tk-owo-emotion) {
        margin: 0 5px;
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
    }
}

.comment-meta {
    @extend %center-flex;
    justify-content: space-between;
    font-size: 0.8em;
    color: var(--c-text-2);
}

.author-info {
    @extend %center-flex;
    gap: 6px;
}

.avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    object-fit: cover;
}

.author {
    font-weight: 500;
    color: var(--c-text-1);
}

.admin-badge {
    color: var(--c-primary);
    font-size: 1.1em;
}

.date { color: var(--c-text-3); }

.fade-enter-active,
.fade-leave-active { transition: 0.3s ease; }

.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>

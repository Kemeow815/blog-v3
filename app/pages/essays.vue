<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 全局配置
const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

// 设置侧边栏组件
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-log'])

// SEO 配置
useSeoMeta({
	title: '瞬间',
	ogType: 'profile',
	description: `${appConfig.title}的碎碎念页面，记录生活点滴，一些想法和生活。`,
})

// API 配置常量
const API_CONFIG = {
	MEMO_API: 'https://moment.051531.xyz/api/memo/list',
	PAGE_SIZE: 30,
}

// 加载外部脚本
onMounted(() => {
	const loadScript = (src: string) => {
		return new Promise((resolve, reject) => {
			if (document.querySelector(`script[src="${src}"]`))
				return resolve(null)

			const script = document.createElement('script')
			script.src = src
			script.async = true
			script.onload = resolve
			script.onerror = reject
			document.head.appendChild(script)
		})
	}

	loadScript('https://jsd.myxz.top/npm/aplayer/dist/APlayer.min.js')
		.catch(err => console.error('脚本加载失败:', err))
	loadScript('https://jsd.myxz.top/npm/meting@2/dist/Meting.min.js')
		.catch(err => console.error('脚本加载失败:', err))
})

interface TalkItem {
	music: any
	content: {
		text: string
		images: string[]
		music?: {
			type: 'song' | 'playlist'
			id: string
			server: string
			api: string
		}
		video?: {
			type: 'bilibili' | 'youtube' | 'online'
			url: string
			id?: string
		}
		doubanMovie?: {
			url: string
			title: string
			image: string
			director: string
			rating: string
			runtime: string
		}
		doubanBook?: {
			url: string
			title: string
			image: string
			author: string
			pubDate: string
			rating: string
		}
		externalLink?: {
			url: string
			title: string
			favicon: string
		}
	}
	user: {
		username: string
		nickname: string
		avatarUrl: string
	}
	date: string
	location: string
	tags: string[]
}

// 状态管理
const talksState = useState('essayTalks', () => ({
	talks: [] as TalkItem[],
	loading: true,
	error: false,
	lastFetchTime: 0,
}))

// 计算属性
const talks = computed(() => talksState.value.talks)
const loading = computed(() => talksState.value.loading)
const error = computed(() => talksState.value.error)

function formatTime(time: string) {
	const d = new Date(time)
	const ls = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()]
	const r = ls.map(a => (a.toString().length === 1 ? `0${a}` : a))
	return `${r[0]}-${r[1]}-${r[2]} ${r[3]}:${r[4]}`
}

function formatContent(item: any) {
	let content = item.content
	const imgs = item.imgs ? item.imgs.split(',') : []
	const ext = JSON.parse(item.ext || '{}')

	content = content
		.replace(/\[(.*?)\]\((.*?)\)/g, `<a class="talk_content_link" target="_blank" rel="nofollow" href="$2">@$1</a>`)
		.replace(/- \[ \]/g, '⚪')
		.replace(/- \[x\]/g, '⚫')
		.replace(/\n/g, '<br>')

	content = `<div class="talk_content_text">${content}</div>`

	return {
		text: content,
		images: imgs.map((img: string) => img.startsWith('http') ? img : `https:${img}`),
		music: ext.music?.type === 'tencent'
			? {
					type: ext.music.type,
					server: ext.music.server,
					id: ext.music.id,
					api: ext.music.api,
				}
			: null,
		video: ext.video?.type === 'bilibili'
			? {
					type: 'bilibili',
					url: ext.video.value,
					id: ext.video.value.match(/BV\w+/)?.[0],
				}
			: ext.video?.type === 'youtube'
				? {
						type: 'youtube',
						url: ext.video.value,
						id: ext.video.value.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1],
					}
				: ext.video?.type === 'online'
					? {
							type: 'online',
							url: ext.video.value,
						}
					: null,
		doubanMovie: ext.doubanMovie?.id
			? {
					url: ext.doubanMovie.url,
					title: ext.doubanMovie.title,
					image: ext.doubanMovie.image,
					director: ext.doubanMovie.director,
					rating: ext.doubanMovie.rating,
					runtime: ext.doubanMovie.runtime,
				}
			: null,
		doubanBook: ext.doubanBook?.id
			? {
					url: ext.doubanBook.url,
					title: ext.doubanBook.title,
					image: ext.doubanBook.image,
					author: ext.doubanBook.author,
					pubDate: ext.doubanBook.pubDate,
					rating: ext.doubanBook.rating,
				}
			: null,
		externalLink: item.externalUrl
			? {
					url: item.externalUrl,
					title: item.externalTitle,
					favicon: item.externalFavicon,
				}
			: null,
	}
}

async function fetchTalks() {
	// 如果距离上次获取时间小于30分钟，则使用缓存
	const now = Date.now()
	if (now - talksState.value.lastFetchTime < 30 * 60 * 1000) {
		return
	}

	try {
		talksState.value.loading = true
		talksState.value.error = false

		const response = await fetch(API_CONFIG.MEMO_API, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ size: API_CONFIG.PAGE_SIZE }),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()

		if (data.code === 0 && data.data?.list) {
			const formattedTalks = data.data.list.map((item: any) => ({
				content: formatContent(item),
				user: {
					username: item.user.username,
					nickname: item.user.nickname,
					avatarUrl: item.user.avatarUrl,
				},
				date: formatTime(item.createdAt),
				location: item.location || '',
				tags: item.tags
					? (typeof item.tags === 'string'
							? item.tags.split(',').filter((tag: string) => tag.trim())
							: item.tags)
					: ['无标签'],
			}))

			talksState.value.talks = formattedTalks
			talksState.value.lastFetchTime = now
		}
	}
	catch (err) {
		console.error('Error fetching talks:', err)
		talksState.value.error = true
	}
	finally {
		talksState.value.loading = false
	}
}

onMounted(fetchTalks)

function goComment(content: string) {
	const textContent = content.replace(/<[^>]+>/g, '')
	const textarea = document.querySelector('.atk-textarea-wrap .atk-textarea') as HTMLTextAreaElement
	if (textarea) {
		textarea.value = `> ${textContent}\n\n`
		textarea.focus()
		textarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}
}

// 跳转谷歌地图
function searchLocation(location: string) {
	if (!location) {
		return
	}
	// 使用谷歌地图搜索服务
	const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`
	window.open(searchUrl, '_blank')
}
</script>

<template>
<PageBanner
	title="瞬间"
	subtitle="记录生活点滴，一些想法"
	image="https://lib.bsgun.cn/Hexo-static/img/essay-bg.avif"
>
	<template #extra>
		<div class="essay-stats">
			<div class="powered-by">
				Powered by moments
			</div>
			<a class="essay-more" href="https://moment.051531.xyz" target="_blank" rel="noopener noreferrer">
				<Icon name="icon-park-twotone:more-app" class="icon" />
				查看更多
			</a>
		</div>
	</template>
</PageBanner>
<div class="page-essay">
	<div class="talk-container">
		<Transition name="fade" mode="out-in">
			<div v-if="loading" class="loading-container">
				<div class="loading-spinner" />
				<p>加载中...</p>
			</div>
			<div v-else-if="error" class="error-container">
				<Icon name="line-md:alert" class="error-icon" />
				<p>加载失败，请刷新页面重试</p>
			</div>
			<div v-else class="talks-list">
				<div
					v-for="(item, index) in talks"
					:key="index"
					class="talk-item"
					:style="{ '--delay': `${index * 0.1}s` }"
				>
					<div class="talk-meta">
						<img
							class="avatar"
							:src="item.user.avatarUrl"
							:alt="item.user.nickname"
						>
						<div class="info">
							<div class="talk-nick">
								{{ item.user.nickname }}
								<Icon name="material-symbols:verified" class="verified" />
							</div>
							<div class="talk-date">
								{{ item.date }}
							</div>
						</div>
					</div>
					<div class="talk-content">
						<div class="talk_content_text" v-html="item.content.text" />

						<div v-if="item.content.music">
							<link src="https://jsd.myxz.top/npm/aplayer/dist/APlayer.min.css" rel="stylesheet">
							<meting-js
								v-if="item.music.type === 'tencent'"
								:id="item.content.music.id"
								:server="item.content.music.server"
								:api="item.content.music.api"
							/>
						</div>

						<div v-if="item.content.images.length" class="zone_imgbox">
							<figure
								v-for="(img, imgIndex) in item.content.images"
								:key="imgIndex"
								class="img-item"
							>
								<Pic
									:src="img"
									zoom
									class="talk-img"
									loading="lazy"
									:fetchpriority="imgIndex === 0 ? 'high' : 'low'"
								/>
							</figure>
						</div>

						<div v-if="item.content.video" class="video-container">
							<iframe
								v-if="item.content.video.type === 'bilibili'"
								:src="`//player.bilibili.com/player.html?bvid=${item.content.video.id}&autoplay=0`"
								scrolling="no"
								frameborder="no"
								allowfullscreen="true"
							/>
							<iframe
								v-else-if="item.content.video.type === 'youtube'"
								:src="`https://www.youtube.com/embed/${item.content.video.id}`"
								frameborder="0"
								allowfullscreen
							/>
							<video
								v-else-if="item.content.video.type === 'online'"
								:src="item.content.video.url"
								controls
								class="online-video"
							/>
						</div>

						<a
							v-if="item.content.doubanMovie"
							class="douban-card gradient-card"
							:href="item.content.doubanMovie.url"
							target="_blank"
						>
							<div
								class="douban-card-bgimg"
								:style="{ backgroundImage: `url('${item.content.doubanMovie.image}')` }"
							/>
							<div class="douban-card-left">
								<div
									class="douban-card-img"
									:style="{ backgroundImage: `url('${item.content.doubanMovie.image}')` }"
								/>
							</div>
							<div class="douban-card-right">
								<div class="douban-card-item">
									<span>电影名: </span>
									<strong>{{ item.content.doubanMovie.title }}</strong>
								</div>
								<div class="douban-card-item">
									<span>导演: </span>
									{{ item.content.doubanMovie.director }}
								</div>
								<div class="douban-card-item">
									<span>评分: </span>
									{{ item.content.doubanMovie.rating }}
								</div>
								<div class="douban-card-item">
									<span>时长: </span>
									{{ item.content.doubanMovie.runtime }}
								</div>
							</div>
						</a>

						<a
							v-if="item.content.doubanBook"
							class="douban-card gradient-card"
							:href="item.content.doubanBook.url"
							target="_blank"
						>
							<div
								class="douban-card-bgimg"
								:style="{ backgroundImage: `url('${item.content.doubanBook.image}')` }"
							/>
							<div class="douban-card-left">
								<div
									class="douban-card-img"
									:style="{ backgroundImage: `url('${item.content.doubanBook.image}')` }"
								/>
							</div>
							<div class="douban-card-right">
								<div class="douban-card-item">
									<span>书名: </span>
									<strong>{{ item.content.doubanBook.title }}</strong>
								</div>
								<div class="douban-card-item">
									<span>作者: </span>
									{{ item.content.doubanBook.author }}
								</div>
								<div class="douban-card-item">
									<span>出版年份: </span>
									{{ item.content.doubanBook.pubDate }}
								</div>
								<div class="douban-card-item">
									<span>评分: </span>
									{{ item.content.doubanBook.rating }}
								</div>
							</div>
						</a>

						<div v-if="item.content.externalLink" class="external-link gradient-card">
							<a :href="item.content.externalLink.url" target="_blank" rel="nofollow">
								<div class="link-left">
									<img :src="item.content.externalLink.favicon" :alt="item.content.externalLink.title">
								</div>
								<div class="link-right">
									<div class="link-title">
										{{ item.content.externalLink.title }}
									</div>
									<Icon name="material-symbols:chevron-right" class="icon" />
								</div>
							</a>
						</div>
					</div>
					<div class="talk-bottom">
						<div class="talk-tags">
							<span class="tag">
								🏷️{{ Array.isArray(item.tags) ? item.tags.join(', ') : item.tags }}
							</span>
							<span
								v-if="item.location"
								v-tip="`搜索: ${item.location}`"
								class="location"
								@click="searchLocation(item.location)"
							>
								<Icon name="ph:map-pin-bold" class="location-icon" />
								{{ item.location }}
							</span>
						</div>
						<button v-tip="`评论`" class="comment-btn" @click="goComment(item.content.text) ">
							<Icon name="ph:chats-bold" class="icon" />
						</button>
					</div>
				</div>
				<!-- 底部提示 -->
				<div class="talks-footer">
					<p>仅显示最近 30 条记录</p>
				</div>
			</div>
		</Transition>
	</div>
</div>
<PostComment key="/essay" />
</template>

<style lang="scss" scoped>
// stats 区域
.essay-stats {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 0.1rem;
	opacity: 0.7;
	font-family: var(--font-monospace);
	text-shadow: 0 4px 5px rgb(0 0 0 / 50%);
	color: #EEE;

	.powered-by {
		font-size: 0.7rem;
	}

	.essay-more {
		display: flex;
		align-items: center;
		gap: 4px;
		opacity: 0.8;
		font-size: 0.8rem;
		transition: all 0.2s;

		&:hover {
			opacity: 1;
			color: #FFF;
		}
	}
}

.page-essay {
	margin: 1rem;
	animation: float-in 0.2s backwards;

	.talk-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 0 0 1px var(--c-bg-soft);
		animation: float-in 0.3s backwards;
		animation-delay: var(--delay);
	}

	.talk-meta {
		display: flex;
		align-items: center;
		gap: 10px;

		.avatar {
			width: 3em;
			border-radius: 2em;
			box-shadow: 2px 4px 1rem var(--ld-shadow);
		}

		.info {
			.talk-nick {
				display: flex;
				align-items: center;
				gap: 5px;

				.verified {
					font-size: 16px;
					color: var(--c-primary);
				}
			}

			.talk-date {
				font-family: var(--font-monospace);
				font-size: 0.8rem;
				color: var(--c-text-3);
			}
		}
	}
}

.talk-content {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	line-height: 1.6;
	color: var(--c-text-2);

	:deep(.talk-content-link) {
		margin: 0 -0.1em;
		padding: 0 0.1em;

		.talk-date {
			font-family: var(--font-monospace);
			font-size: 0.8rem;
			color: var(--c-text-3);
		}
	}
}

.talk-content {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	line-height: 1.6;
	color: var(--c-text-2);

	:deep(.talk-content-link) {
		margin: 0 -0.1em;
		padding: 0 0.1em;
		background: linear-gradient(var(--c-primary-soft), var(--c-primary-soft)) no-repeat center bottom / 100% 0.1em;
		text-decoration: none;
		color: var(--c-primary);
		transition: all 0.2s;

		&:hover {
			border-radius: 0.3em;
			background-size: 100% 100%;
		}
	}

	:deep(.zone-imgbox) {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;

		.img-item {
			position: relative;
			overflow: hidden;
			padding-bottom: 100%;
			border-radius: 8px;

			img {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				transition: transform 0.3s;
				cursor: zoom-in;
				object-fit: cover;

				&:hover {
					transform: scale(1.05);
				}
			}
		}
	}

	.video-container {
		position: relative;
		overflow: hidden;
		width: 100%;
		padding-bottom: 56.25%;
		border-radius: 8px;

		iframe,
		video {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
		}

		.online-video {
			object-fit: cover;
		}
	}

	.douban-card {
		display: flex;
		overflow: hidden;
		text-decoration: none;

		.video-container {
			position: relative;
			overflow: hidden;
			width: 100%;
			padding-bottom: 56.25%;
			border-radius: 8px;

			iframe,
			video {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
			}

			.online-video {
				object-fit: cover;
			}
		}

		.douban-card {
			display: flex;
			position: relative;
			overflow: hidden;
			height: 100px;
			box-shadow: 0 0 0 1px var(--c-bg-soft);
			background-color: var(--c-bg-2);
			text-decoration: none;

			.douban-card-bgimg {
				position: absolute;
				opacity: 0.3;
				inset: 0;
				background-position: center;
				background-size: cover;
				filter: blur(15px);
			}

			.douban-card-left {
				flex: 0 0 80px;
				position: relative;
				padding: 10px;

				.douban-card-img {
					width: 100%;
					height: 100%;
					border-radius: 8px;
					background-position: center;
					background-size: cover;
				}
			}

			.douban-card-right {
				flex: 1;
				position: relative;
				padding: 10px;

				.douban-card-item {
					font-size: 0.8rem;
					color: var(--c-text);
				}
			}
		}

		.external-link {
			overflow: hidden;
			box-shadow: 0 0 0 1px var(--c-bg-soft);
			background-color: var(--c-bg-2);
			transition: all 0.2s;

			a {
				display: flex;
				align-items: center;
				gap: 12px;
				height: 60px;
				padding: 8px;
				text-decoration: none;

				.link-left {
					flex-shrink: 0;
					overflow: hidden;
					width: 44px;
					height: 44px;

					img {
						width: 100%;
						height: 100%;
						border-radius: 8px;
						transition: transform 0.3s;
						object-fit: contain;
					}
				}

				.link-right {
					display: flex;
					flex: 1;
					align-items: center;
					gap: 6px;

					.link-title {
						display: -webkit-box;
						overflow: hidden;
						font-size: 0.95rem;
						-webkit-line-clamp: 1;
						color: var(--c-text-2);
						-webkit-box-orient: vertical;
						transition: all 0.2s;
					}

					.icon {
						color: var(--c-text-3);
						transition: transform 0.2s ease;
					}
				}

				&:hover {
					.link-left img {
						transform: scale(1.05);
					}

					.icon {
						transform: translateX(4px) scale(1.6);
					}
				}
			}
		}
	}

	.talk-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--c-text-3);

		.talk-tags {
			display: flex;
			gap: 4px;
			font-size: 0.7rem;

			.tag,
			.location {
				display: flex;
				padding: 2px 4px;
				border-radius: 4px;
				background-color: var(--c-bg-2);
				transition: all 0.2s;
				cursor: pointer;

				&:hover {
					opacity: 0.8;
				}
			}

			.location {
				color: var(--c-primary);
			}
		}
	}

	.loading-container,
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		height: 500px;
		color: var(--c-text-2);

		.loading-spinner {
			width: 40px;
			height: 40px;
			border: 3px solid var(--c-bg-3);
			border-top: 3px solid var(--c-primary);
			border-radius: 50%;
			animation: spin 1s linear infinite;
		}

		.error-icon {
			font-size: 4rem;
			color: var(--c-danger);
		}
	}

	.talks-footer {
		padding: 2rem 0;
		font-size: 0.9rem;
		text-align: center;
		color: var(--c-text-3);
	}
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>

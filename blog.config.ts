import type { NitroConfig } from 'nitropack'
import type { FeedEntry } from './app/types/feed'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

const basicConfig = {
	title: '喵洛阁',
	subtitle: '克喵的小栈',
	// 长 description 利好于 SEO
	description: '愿你看清一切真相后，依旧热爱你的家人和朋友。',
	keywords: '博客, 个人网站, 克喵',
	author: {
		name: '克喵爱吃卤面',
		avatar: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
		email: 'me@mail.kemeow.top',
		homepage: 'https://home.kemeow.top/',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
	language: 'zh-CN',
	timeEstablished: '2025-02-11',
	timezone: 'Asia/Shanghai',
	url: 'https://blog-v3.kemeow.top/',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,
	announcement: {
		enabled: true,
		message: '欢迎来到我的博客鸭！',
	},

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'ph:folder-dotted-bold' },
			经验分享: { icon: 'ph:mouse-bold', color: '#3af' },
			技术分享: { icon: 'ph:code-bold', color: '#77f' },
			// 生活: { icon: 'ph:shooting-star-bold', color: '#3ba' },
			// 博客魔改: { icon: 'ph:code-bold', color: '#77f' },
			资源分享: { icon: 'ph:cloud-bold', color: '#77f' },
			// 未分类: { icon: 'ph:folder-dotted-bold' },
		},
		defaultCategoryIcon: 'ph:folder-bold',
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: false,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	// data: {
	// 	api_endpoint: 'https://api-blog.helong.online',
	// },

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// 自己部署的 Umami 统计服务
		{ 'src': 'https://unami-kemiao.kemiaosw.top/String', 'data-website-id': '1a8feaa6-0c4d-444e-8693-02e5a547181a', 'defer': true },
		// 自己网站的 Cloudflare Insights 统计服务
		{ 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "8ed3d622df28470082073926f8c105d1"}', 'defer': true },
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js', defer: true },
		// 今日诗词 SDK
		{ src: 'https://sdk.jinrishici.com/v2/browser/jinrishici.js', defer: true },
	],

	/** 自己部署的 Twikoo 服务 */
	twikoo: {
		envId: 'https://kemiao-twikoo.050815.xyz/',
		preload: 'https://kemiao-twikoo.050815.xyz/',
	},

}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: '摸鱼处',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

// https://nitro.build/config#routerules
// 使用 EdgeOne 部署时，需要同步更新 edgeone.json
// @keep-sorted
export const routeRules = <NitroConfig['routeRules']>{
	// ...redirectRouteRules,
	'/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
	'/api/umami': { prerender: true, headers: { 'Content-Type': 'application/json' } },
	'/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
	'/favicon.ico': { redirect: { to: blogConfig.favicon } },
	'/kemiao.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
}

export default blogConfig

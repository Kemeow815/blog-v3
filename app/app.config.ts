import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

// 图标查询：https://yesicon.app/ph
// 图标插件：https://marketplace.visualstudio.com/items?itemName=antfu.iconify

// @keep-sorted
export default defineAppConfig({
	// 将 blog.config 中的配置项复制到 appConfig，方便调用
	...blogConfig,

	component: {
		alert: {
			/** 默认使用卡片风格还是扁平风格 */
			defaultStyle: 'card' as 'card' | 'flat',
		},

		codeblock: {
			/** 代码块触发折叠的行数 */
			triggerRows: 32,
			/** 代码块折叠后的行数 */
			collapsedRows: 16,
		},

		/** 文章开头摘要 */
		excerpt: {
			animation: true,
			caret: '_',
		},

		stats: {
			/** 归档页面每年标题对应的年龄 */
			birthYear: 2005,
			/** blog-stats widget 的预置文本 */
			wordCount: '约10万',
		},
	},

	// @keep-sorted
	footer: {
		/** 页脚版权信息，支持 <br> 换行等 HTML 标签 */
		copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
		/** 侧边栏底部图标导航 */
		iconNav: [
			{ icon: 'ph:house-bold', text: '个人主页', url: blogConfig.author.homepage },
			{ icon: 'mdi:telegram', text: '克喵分享', url: 'https://t.me/kemiaofx_me' },
			{ icon: 'ph:github-logo-bold', text: 'GitHub: 克喵Kemeow815', url: 'https://github.com/Kemeow815' },
			{ icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
			{ icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
		] satisfies NavItem[],
		/** 页脚站点地图 */
		nav: [
			{
				title: '探索',
				items: [
					{ icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
					{ icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/' },
				],
			},
			{
				title: '社交',
				items: [
					{ icon: 'ph:github-logo-bold', text: '克喵Kemeow815', url: 'https://github.com/Kemeow815' },
					// { icon: 'ri:qq-line', text: '群: 169994096', url: 'https://jq.qq.com/?_wv=1027&k=lQfNSeEd' },
					{ icon: 'ph:envelope-simple-bold', text: blogConfig.author.email, url: `mailto:${blogConfig.author.email}` },
				],
			},
			{
				title: '信息',
				items: [
					{ icon: 'simple-icons:nuxtdotjs', text: '主题: Clarity', url: 'https://github.com/L33Z22L11/blog-v3' },
					{ icon: 'ph:certificate-bold', text: '萌备20250530号', url: 'https://icp.gov.moe/?keyword=20250530' },
					{ icon: 'ph:certificate-bold', text: '雾ICP备20250530号', url: 'https://icp.wudu.ltd/id.php?keyword=20250530' },
					{ icon: 'ph:certificate-bold', text: '茶ICP备2025090150号', url: 'https://icp.redcha.cn/beian/ICP-2025090150.html' },
				],
			},
		] satisfies Nav,
	},

	/** 左侧栏顶部 Logo */
	header: {
		logo: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
		/** 展示标题文本，否则展示纯 Logo */
		showTitle: true,
		subtitle: blogConfig.subtitle,
		emojiTail: ['📔', '📓', '📖', '📚️', '📑'],
	},

	/** 左侧栏导航 */
	nav: [
		{
			title: '',
			items: [
				{ icon: 'ph:files-bold', text: '丹青妙笔', url: '/' },
				{ icon: 'ph:archive-bold', text: '经卷藏珍', url: '/archive' },
				{ icon: 'tabler:tags', text: '标签归类', url: '/tags' },
				{ icon: 'ph:link-bold', text: '竹林旧友', url: '/link' },
				// { icon: 'ph:fish-bold', text: '塘文集锦', url: '/fcircle' },
				{ icon: 'ph:fish-bold', text: '塘文集锦', url: '/fc' },
				{ icon: 'ph:chats-bold', text: '​纸笺寄语', url: '/comments' },
				{ icon: 'ph:lightning-bold', text: '闲言碎语', url: '/essays' },
				{ icon: 'mingcute:moment-line', text: '微言大义', url: '/moments' },
				{ icon: 'ph:star-of-david-bold', text: '优良精装', url: '/devices' },
				{ icon: 'mingcute:bilibili-line', text: '番剧推荐', url: '/anime' },
				{ icon: 'iconoir:movie', text: '影视剧场', url: '/yingshi' },
				{ icon: 'mdi-light:book', text: '我的书房', url: '/book' },
				{ icon: 'hugeicons:game', text: '游戏推荐', url: '/game' },
				{ icon: 'ph:apple-podcasts-logo-bold', text: '关于自己', url: '/about' },
			],
		},
	] satisfies Nav,

	pagination: {
		perPage: 10,
		/** 默认排序方式，需要是 this.article.order 中的键名 */
		sortOrder: 'date' as const,
		/** 允许（普通/预览/归档）文章列表正序，开启后排序方式左侧图标可切换顺序 */
		allowAscending: false,
	},

	themes: {
		light: {
			icon: 'ph:sun-bold',
			tip: '浅色模式',
		},
		system: {
			icon: 'ph:monitor-bold',
			tip: '跟随系统',
		},
		dark: {
			icon: 'ph:moon-bold',
			tip: '深色模式',
		},
	},
})

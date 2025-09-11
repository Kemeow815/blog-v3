export type DeviceBrand = 'Apple' | 'Huawei' | 'Xiaomi' | 'Windows' | 'IQOO' |(string & {})

export interface DeviceItem {
	brand: DeviceBrand
	name: string
	series?: string
	desc?: string
	image: string
	url?: string
}

export default {
	brands: ['Apple', 'Huawei', 'Xiaomi', 'IQOO', 'Windows'] as DeviceBrand[],
	items: [
		{
			brand: 'IQOO',
			name: 'iQOO 11 16GB+256GB 赛道版',
			series: '黑色 / 16GB+512GB',
			desc: '性能出色，不出问题，体验良好。',
			image: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/52/10007952_1669636249426_750x750.png.webp',
			url: 'https://shop.vivo.com.cn/product/10007952',
		},
		{
			brand: 'IQOO',
			name: 'iQOO TWS 2',
			series: '真无线降噪耳机 / 幻影黄',
			desc: '55dB旗舰降噪 | Hi-Fi级音质 | 44ms全链路游戏低延迟。',
			image: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/26/10009426_1709192548304_750x750.png.webp',
			url: 'https://shop.vivo.com.cn/product/10009426?skuId=131163',
		},
		// {
		// 	brand: 'Apple',
		// 	name: 'iPhone 15',
		// 	series: '蓝色 / 128G',
		// 	desc: '性能更强，屏幕更亮，影像升级，接口更新。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250115_231030.png',
		// 	url: 'https://www.apple.com.cn/iphone-15/specs/',
		// },
		// {
		// 	brand: 'Apple',
		// 	name: 'AirPods(第三代)',
		// 	series: '标准版',
		// 	desc: '相比上一代，耳柄更短，支持空间音频、自适应均衡，续航增强。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250115_231200.png',
		// 	url: 'https://support.apple.com/zh-cn/111863/',
		// },
		// {
		// 	brand: 'Apple',
		// 	name: 'AirPods(第四代)',
		// 	series: '支持主动降噪',
		// 	desc: '相比上一代，增加了主动降噪功能，音质提升，耳机体积缩小，续航增强。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250115_231248.png',
		// 	url: 'https://www.apple.com.cn/cn-edu/shop/buy-airpods/airpods-4/MXP93CH/A',
		// },
		// {
		// 	brand: 'Huawei',
		// 	name: 'HUAWEI MateBook 14 2023',
		// 	series: '深空灰 / i5 16G 1TB',
		// 	desc: '搭载高性能处理器，2.1K 高刷屏，机身轻薄便携，续航持久，多设备协同功能强大，高效实用。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250115_230332.webp',
		// 	url: 'https://consumer.huawei.com/cn/laptops/matebook-14-2023/specs/',
		// },
		// {
		// 	brand: 'Huawei',
		// 	name: 'HUAWEI 无线鼠标(第二代)',
		// 	series: '星空灰',
		// 	desc: '抗干扰能力提升 4 倍，支持玻璃桌面, DPI 高。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250115_230428.webp',
		// 	url: 'https://consumer.huawei.com/cn/accessories/wireless-mouse-2nd-generation/specs/',
		// },
		// {
		// 	brand: 'Huawei',
		// 	name: 'HUAWEI Sound X4',
		// 	series: '韵律黑',
		// 	desc: '音质提升，低音增强，高音纯钛振膜，支持智慧声场，互联更便捷，灯效更炫。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250115_230502.webp',
		// 	url: 'https://consumer.huawei.com/cn/speakers/sound-x4/',
		// },
		// {
		// 	brand: 'Xiaomi',
		// 	name: '小米手环9 Pro',
		// 	series: '黑色',
		// 	desc: 'AMOLED 大屏，全天候心率/血氧监测， 防水，支持丰富运动模式，续航持久。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250828_214223.png',
		// 	url: 'https://www.mi.com/prod/xiaomi-shouhuan-9-pro/',
		// },
		// {
		// 	brand: 'Xiaomi',
		// 	name: '小米手环9 Pro',
		// 	series: '粉金',
		// 	desc: 'AMOLED 大屏，全天候心率/血氧监测， 防水，支持丰富运动模式，续航持久。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250828_214345.png',
		// 	url: 'https://www.mi.com/prod/xiaomi-shouhuan-9-pro/',
		// },
		// {
		// 	brand: 'Sony',
		// 	name: 'Sony APS-C 画幅微单数码相机',
		// 	series: 'Alpha 6400L',
		// 	desc: '小巧机身，轻便便携，画质出色，操作简单，功能丰富。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250830_213756.png',
		// 	url: 'https://www.sonystyle.com.cn/search.html?q=A6400',
		// },
		// {
		// 	brand: 'Tamron',
		// 	name: '17-70mm F/2.8 Di Ⅲ-A eVC RXD',
		// 	series: '索尼APS-C专用E口',
		// 	desc: '恒定F2.8大光圈，覆盖常用焦段，防抖给力。',
		// 	image: 'https://cdn.atao.cyou/Web/web_250909_211712.png',
		// 	url: 'https://www.tamron.com.cn/cameralens/products/b070/index.shtml',
		// },
	],
}

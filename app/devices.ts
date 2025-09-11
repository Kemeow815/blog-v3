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
	],
}

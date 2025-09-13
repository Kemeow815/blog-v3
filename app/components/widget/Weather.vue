<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// 和风天气 实时数据 接口格式
interface NowApi {
	code: string
	updateTime: string
	fxLink: string
	now: {
		temp: string // 温度 ℃
		feelsLike: string // 体感
		icon: string // 图标代码
		text: string // 天气描述
		wind360: string // 风向 360°
		windDir: string // 风向
		windScale: string // 风力等级
		humidity: string // 相对湿度 %
		precip: string // 降水量 mm
		pressure: string // 气压 hPa
		vis: string // 能见度 km
	}
}

const weatherData = ref<NowApi | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

let refreshInterval: number | null = null

async function fetchWeather() {
	try {
		loading.value = true
		error.value = null
		// ① 使用官方域名 ②  location=苏州 ③ 只取实时 now 接口
		const res = await fetch(
			'https://devapi.qweather.com/v7/weather/now?key=0b8368e57bb44bfc862236f763f58357&location=101190101',
		)
		if (!res.ok)
			throw new Error('获取天气数据失败')
		weatherData.value = await res.json()
	}
	catch (e) {
		error.value = e instanceof Error ? e.message : '获取天气数据失败'
	}
	finally {
		loading.value = false
	}
}

onMounted(() => {
	fetchWeather()
	refreshInterval = window.setInterval(fetchWeather, 60 * 60 * 1000)
})

onUnmounted(() => {
	if (refreshInterval !== null) {
		clearInterval(refreshInterval)
		refreshInterval = null
	}
})
</script>

<template>
<ZWidget>
	<template #title>
		<span class="title">天气速览</span>
		<Icon name="ph:cloud-sun-bold" />
	</template>

	<!-- 加载中 -->
	<p v-if="loading" class="weather-tip">
		正在获取天气…
	</p>

	<!-- 错误 -->
	<p v-else-if="error" class="weather-tip error">
		{{ error }}
	</p>

	<!-- 内容 -->
	<div v-else-if="weatherData && weatherData.code === '200'" class="weather-body">
		<div class="weather-main">
			<span class="temp">{{ weatherData.now.temp }}°</span>
			<span class="text">{{ weatherData.now.text }}</span>
		</div>

		<div class="weather-details">
			<div>体感 {{ weatherData.now.feelsLike }}°</div>
			<div>{{ weatherData.now.windDir }} {{ weatherData.now.windScale }}级</div>
			<div>湿度 {{ weatherData.now.humidity }}%</div>
		</div>
	</div>

	<!-- 暂无数据 -->
	<p v-else class="weather-tip">
		暂无天气信息
	</p>
</ZWidget>
</template>

<style lang="scss" scoped>
:deep(.widget-body) {
  padding: 0.8rem 1rem;
  font-size: 0.95em;
  color: var(--c-text);
}

.title {
  flex-grow: 1;
}

.weather-tip {
  text-align: center;
  padding: 1em 0;
  color: var(--c-text-2);
  &.error {
    color: var(--c-danger);
  }
}

.weather-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.weather-main {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  .temp {
    font-size: 1.8em;
    font-weight: 600;
    color: var(--c-primary);
  }
  .text {
    font-size: 1em;
    opacity: 0.9;
  }
}

.weather-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  font-size: 0.88em;
  opacity: 0.8;
  > div {
    flex: 1 1 auto;
  }
}
</style>

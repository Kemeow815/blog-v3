<script setup lang="ts">
import { computed, ref } from 'vue'

// 工作时间计算
const isWorkingHours = computed(() => {
	const now = new Date()
	const day = now.getDay() // 0是周日，1-5是周一到周五
	const hour = now.getHours()
	const minute = now.getMinutes()
	const currentTime = hour + minute / 60

	// 周六周日始终休息
	if (day === 0 || day === 6)
		return false

	// 工作日8:45-17:15工作
	return currentTime >= 8.75 && currentTime < 17.25
})

// 翻转状态
const isFlipped = ref(false)
const isAnimating = ref(false)

function flipCard() {
	if (isAnimating.value)
		return
	isAnimating.value = true
	isFlipped.value = !isFlipped.value
	setTimeout(() => isAnimating.value = false, 600)

	if (isFlipped.value) {
		setTimeout(() => {
			if (isFlipped.value) {
				isFlipped.value = false
				isAnimating.value = true
				setTimeout(() => isAnimating.value = false, 600)
			}
		}, 3000)
	}
}

// 资源定义
const frontImage = 'https://cdn.atao.cyou/Web/shangban.png'
const frontImageMirror = 'https://cdn.atao.cyou/Web/shangban-mirror.png' // 镜像版本
const backImage = 'https://cdn.atao.cyou/Web/xiaban.png'
const backImageMirror = 'https://cdn.atao.cyou/Web/xiaban-mirror.png' // 镜像版本

// 状态计算
const currentImage = computed(() => {
	if (isFlipped.value) {
		// 翻转后显示镜像版本的另一状态图片
		return isWorkingHours.value ? backImageMirror : frontImageMirror
	}
	else {
		// 默认显示正常图片
		return isWorkingHours.value ? frontImage : backImage
	}
})
</script>

<template>
<div class="card-container" @click="flipCard">
	<div class="card" :class="{ flipped: isFlipped, animating: isAnimating }">
		<div class="card-face">
			<div class="content">
				<div class="texture-overlay" />
				<img :src="currentImage" alt="Work Status">
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
.card-container {
  margin-top: 10px;
  width: 243px;
  height: 298px;
  perspective: 1000px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--card-bg, rgba(0,0,0,0.7));
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

@media (prefers-color-scheme: dark) {
  .content {
    --card-bg: rgba(40, 40, 40, 0.9);
  }
}

.texture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='15' y='10' width='20' height='30' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5' transform='rotate(10,25,25)'/%3E%3Crect x='60' y='25' width='25' height='25' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3Crect x='10' y='60' width='40' height='15' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.2'/%3E%3Crect x='65' y='65' width='20' height='20' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5' transform='rotate(-15,75,75)'/%3E%3Crect x='30' y='40' width='35' height='25' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 1;
  border-radius: 12px;
}

.content img {
  max-width: 130%;
  max-height: 90%;
  margin-bottom: 15px;
  z-index: 2;
}

.card.flipped .card-back img {
  transform: scaleX(-1);
}
</style>

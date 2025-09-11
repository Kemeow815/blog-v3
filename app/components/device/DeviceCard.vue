<script setup lang="ts">
interface DeviceItem {
	brand: 'Apple' | 'Huawei' | 'Mi' | 'IQOO' | 'Windows'
	name: string
	series?: string
	desc?: string
	image: string
	url?: string
	scale?: number
}

const props = defineProps<{ item: DeviceItem }>()
</script>

<template>
<ZRawLink v-if="props.item.url" class="device-card clickable" :to="props.item.url">
	<div class="cover-box">
		<NuxtImg class="cover" :src="props.item.image" :alt="props.item.name" loading="lazy" :width="240" :quality="90" densities="x1 x1.5 x2 x3" sizes="120px" :modifiers="{ fit: 'contain', background: 'transparent' }" :style="{ '--img-scale': String(props.item.scale ?? 1) }" />
	</div>
	<div class="meta">
		<h4 class="name">{{ props.item.name }}</h4>
		<div class="series" v-if="props.item.series">{{ props.item.series }}</div>
		<p class="desc" v-if="props.item.desc">{{ props.item.desc }}</p>
	</div>
</ZRawLink>
<div v-else class="device-card">
	<div class="cover-box">
		<NuxtImg class="cover" :src="props.item.image" :alt="props.item.name" loading="lazy" :width="240" :quality="90" densities="x1 x1.5 x2 x3" sizes="120px" :modifiers="{ fit: 'contain', background: 'transparent' }" :style="{ '--img-scale': String(props.item.scale ?? 1) }" />
	</div>
	<div class="meta">
		<h4 class="name">{{ props.item.name }}</h4>
		<div class="series" v-if="props.item.series">{{ props.item.series }}</div>
		<p class="desc" v-if="props.item.desc">{{ props.item.desc }}</p>
	</div>
</div>
</template>

<style lang="scss" scoped>
.device-card {
	/* 字体抗锯齿优化 */
	-webkit-font-smoothing: subpixel-antialiased;
	-moz-osx-font-smoothing: auto;
	text-rendering: geometricPrecision;
	
	padding: 1.25rem;
	border-radius: 1rem;
	background: transparent;
	border: 2px solid rgba(0, 0, 0, 0.12);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	min-height: 220px;
	width: 100%;
	max-width: none;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-4px) scale(1.02);
		border-color: var(--c-primary);
		box-shadow: 
			0 8px 24px rgba(0, 0, 0, 0.08),
			0 2px 6px rgba(0, 0, 0, 0.02);
	}

	.cover-box {
		width: 100%;
		height: 140px;
		border-radius: 0.375rem;
		overflow: hidden;
		background: #f8f9fa;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.cover {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: 0.125rem;
		background-color: transparent;
		image-rendering: crisp-edges;
		transition: all 0.3s ease;
	}

	&.clickable {
		cursor: pointer;
	}

	.meta {
		width: 100%;
		text-align: center;
		
		.name {
			margin: 0 0 0.5rem 0;
			font-weight: 600;
			font-size: 1rem;
			line-height: 1.3;
			color: var(--c-text-1);
			letter-spacing: -0.01em;
		}

		.series {
			font-size: 0.875rem;
			color: var(--c-text-2);
			font-weight: 500;
			opacity: 0.8;
			margin-bottom: 0.5rem;
		}

		.desc {
			font-size: 0.8125rem;
			color: var(--c-text-3);
			line-height: 1.4;
			opacity: 0.7;
		}
	}
}

@media (max-width: 640px) {
	.device-card {
		padding: 1rem;
		min-height: 200px;

		.cover-box {
			height: 120px;
		}

		.meta {
			.name {
				font-size: 0.9375rem;
			}
			
			.series {
				font-size: 0.8125rem;
			}
			
			.desc {
				font-size: 0.75rem;
			}
		}
	}
}
</style>


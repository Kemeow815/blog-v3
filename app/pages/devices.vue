<script setup lang="ts">
import devices from '~/devices'

type Brand = 'Apple' | 'HUAWEI' | 'Mi' | 'IQOO' | 'Windows' | (string & {})

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'announcement-card', 'work-status'])
const brands = computed<Brand[]>(() => (devices as any).brands || [])
const route = useRoute()
const brand = ref<Brand | undefined>((route.query.brand as Brand) || brands.value[0])

watch(brand, (val) => {
	const q = { ...route.query, brand: val }
	navigateTo({ path: route.path, query: q }, { replace: true })
})

const allDevices = computed(() => (devices as any).items || [])
const list = computed(() => allDevices.value.filter((d: any) => d.brand === brand.value))
</script>

<template>
<div class="devices-page">
	<div class="tabs">
		<button
			v-for="b in brands"
			:key="b"
			class="tab" :class="[{ active: b === brand }]"
			@click="brand = b as any"
		>
			{{ b }}
		</button>
	</div>

	<div class="grid">
		<DeviceCard v-for="item in list" :key="item.name" :item="item" />
	</div>
</div>
</template>

<style lang="scss" scoped>
.devices-page {
	min-height: 90vh;

	.tabs {
		display: inline-flex;
		gap: 0.5rem;
		margin: 0.5rem 0 1rem;

		.tab {
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			background: var(--ld-bg-card);
			border: 1px solid var(--c-border);
			box-shadow: 0 2px 10px var(--ld-shadow);
			transition: all 0.2s;
			font-weight: 600;

			&:hover {
				transform: translateY(-1px);
				box-shadow: 0 6px 16px var(--ld-shadow);
			}

			&.active {
				background: var(--c-primary);
				border-color: transparent;
				color: white;
				box-shadow: 0 8px 20px var(--ld-shadow);
			}

			&:focus-visible {
				outline: 2px solid color-mix(in oklab, var(--c-primary) 60%, white);
				outline-offset: 2px;
			}
		}
	}

	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));

		@media (max-width: $breakpoint-mobile) {
			grid-template-columns: 1fr;
		}
	}
}
</style>

<script setup lang="ts">
defineAsyncComponent(() => import('./Weather.vue'))
</script>

<template>
<Suspense>
	<template #default>
		<Weather />
	</template>
	<template #fallback>
		<div class="widget-placeholder">
			<div class="placeholder-content">
				<div class="placeholder-icon">
					🌤️
				</div>
				<div class="placeholder-text">
					天气信息加载中...
				</div>
			</div>
		</div>
	</template>
</Suspense>
</template>

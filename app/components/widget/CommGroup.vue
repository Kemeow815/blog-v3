<template>
<ZWidget
	card
	dim
	title="TG频道"
	bg-img="https://imgtg.kemeow.top/file/AgACAgUAAyEGAAScqokCAANXaLvnQDKtJdqkCfz1LD-_oBR7JooAAorIMRsdkeBVkr7FgFviGNABAAMCAAN4AAM2BA.webp"
	bg-right
>
	<div class="title">
		克喵的资源分享频道
	</div>

	<Tip copy icon="oui:empty" :tip-options="{ placement: 'left' }">
		<Icon name="mdi:telegram" size="1.5em" />kemiaofx_me
	</Tip>
</ZWidget>
</template>

<style lang="scss" scoped>
.title {
	background-clip: text;
	background-image: linear-gradient(60deg, var(--c-accent) -30%, var(--c-primary), var(--c-text-1));
	background-position: 100% 0;
	background-size: 200%;
	font-size: 1.8em;
	font-weight: 800;
	letter-spacing: 0.05em;
	color: transparent;
	transition: background-position 0.2s;

	.widget:hover & {
		background-position: 0 0;
	}
}

.tip {
	font-size: 0.9em;
	line-height: 2;
}

:deep(.bg-img).bg-img.bg-img {
	opacity: 0.5;
}
</style>

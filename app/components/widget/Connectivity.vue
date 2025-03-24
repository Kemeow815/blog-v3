<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
    <h3 class="widget-title">
        可访问性
    </h3>
    <div
        class="widget-card seasonal"
        :style="{
            '--seasonal-bg': `url(${appConfig.seasonal.widgetBackground})`,
            '--seasonal-emoji': appConfig.seasonal.emoji,
        }"
    >
        <!-- TODO: 优化技术架构展示 -->
        <p>博客来源于纸鹿的blog-v3，托管于 Vercel；博客由 Nuxt Content 驱动，使用sm.ms图床。</p>
        <p>
            致力于分享资源和生活~<br>
            每一段旅行都有终点，希望能在这里遇见你~<br>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.seasonal {
    position: relative;
    overflow: hidden;
    z-index: 0;

    &::before {
        content: "";
        position: absolute;
        opacity: 0.2;
        inset: 0;
        background: center / cover;
        background-image: var(--seasonal-bg, "https://wsrv.nl/?url=i0.hdslb.com/bfs/archive/abf1bb4412360550a18e5f2e71b1227e7d949735.png@320w");
        z-index: -1;
    }
}

.seasonal-emoji::before, .seasonal-emoji::after {
    // 文明用语😋
    content: var(--seasonal-emoji, "\1F595");
}
</style>

<script setup lang="ts">
const appConfig = useAppConfig()
const timeEstablished = appConfig.timeEstablished

const blogLog = [
    { date: '2025-02-12', content: '第二篇文章' },
    { date: '2025-02-11', content: '第一篇文章' },
    { date: '2025-02-11', content: '使用blog-v3作为我的博客' },
    { date: timeEstablished, content: '发布第一篇文章' },
]
</script>

<template>
    <h3 class="widget-title">
        更新日志
    </h3>
    <!-- TODO: 优化时间线样式 -->
    <div class="widget-card">
        <ul>
            <li v-for="(item, index) in blogLog" :key="index">
                <small>{{ item.date }}</small><br>
                {{ item.content }}
            </li>
        </ul>
    </div>
</template>

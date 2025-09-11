<!-- moments.vue -->
<script setup lang="ts">
import type { MomentItem } from '~/moments'
import moments from '~/moments'

const defaultAuthor = {
  name: 'ATao',
  avatar: 'https://cdn.atao.cyou/Web/Avatar.png',
  badges: ['摸鱼达人']
}

// 1. 不用 computed，用普通变量
const sortedMoments = [...moments]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map(m => ({ ...m, author: m.author || defaultAuthor }))

// 2. 分页也写成普通变量
const currentPage = ref(1)
const pageSize = 5
const paginatedMoments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedMoments.slice(start, start + pageSize)
})
const totalPages = Math.ceil(sortedMoments.length / pageSize)

// 3. 时间格式化
const formatTime = (d: string) =>
  new Date(d).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  }).replace(/\//g, '-').replace(',', '')

// 4. 图片预览先砍掉（后续再加）
</script>

<template>
  <div class="moments-page">
    <div class="container">
      <div class="moments-grid">
        <!-- 5. 只保留最简结构，key 用 id，不用 index -->
        <article v-for="m in paginatedMoments" :key="m.id" class="moment-card">
          <p>{{ m.content }}</p>
          <time>{{ formatTime(m.createdAt) }}</time>
        </article>
      </div>

      <!-- 6. 分页按钮 -->
      <div v-if="totalPages > 1" class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 7. 只留最简样式，后续再补 */
.moments-page { padding: 2rem 0 }
.container { max-width: 700px; margin: 0 auto; padding: 0 1rem }
.moment-card { background: #fff; border-radius: 8px; padding: 1rem; margin-bottom: 1rem }
.pagination { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem }
</style>

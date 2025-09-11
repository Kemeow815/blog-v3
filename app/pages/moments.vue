<!-- moments.vue -->
<script setup lang="ts">
import type { MomentItem } from '~/moments'
import moments from '~/moments'
import PhotoPreviewModal from '~/components/PhotoPreviewModal.vue'

const defaultAuthor = {
  name: 'ATao',
  avatar: 'https://cdn.atao.cyou/Web/Avatar.png',
  badges: ['摸鱼达人']
}

/* 1. 数据 */
const sortedMoments = [...moments]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map(m => ({ ...m, author: m.author || defaultAuthor }))

/* 2. 分页 */
const currentPage = ref(1)
const pageSize = 5
const paginatedMoments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedMoments.slice(start, start + pageSize)
})
const totalPages = Math.ceil(sortedMoments.length / pageSize)

/* 3. 时间格式化 */
const formatTime = (d: string) =>
  new Date(d).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  }).replace(/\//g, '-').replace(',', '')

/* 4. 预览状态 + 核心函数 */
const showPreview = ref(false)
const currentPhoto = ref('')
const currentPhotoIndex = ref(0)
const currentMomentImages = ref<string[]>([])

const openPhotoPreview = (photo: string, images: string[], index: number) => {
  currentPhoto.value = photo
  currentPhotoIndex.value = index
  currentMomentImages.value = images
  showPreview.value = true
}

const closePhotoPreview = () => {
  showPreview.value = false
}

const nextPhoto = () => {
  if (currentMomentImages.value.length > 1) {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % currentMomentImages.value.length
    currentPhoto.value = currentMomentImages.value[currentPhotoIndex.value]
  }
}

const prevPhoto = () => {
  if (currentMomentImages.value.length > 1) {
    currentPhotoIndex.value = (currentPhotoIndex.value - 1 + currentMomentImages.value.length) % currentMomentImages.value.length
    currentPhoto.value = currentMomentImages.value[currentPhotoIndex.value]
  }
}
</script>

<template>
  <div class="moments-page">
    <div class="container">
      <div class="moments-grid">
        <article v-for="m in paginatedMoments" :key="m.id" class="moment-card">
          <!-- 作者信息 -->
          <div class="moment-header">
            <img :src="m.author.avatar" :alt="m.author.name" width="44" height="44" class="author-avatar">
            <div class="author-info">
              <div class="author-main">
                <h3 class="author-name">{{ m.author.name }}</h3>
                <div v-if="m.author.badges?.length" class="badges-container">
                  <span v-for="b in m.author.badges" :key="b" class="badge">{{ b }}</span>
                </div>
              </div>
              <div class="meta-info">
                <time class="moment-time">{{ formatTime(m.createdAt) }}</time>
                <span v-if="m.location" class="location-separator">·</span>
                <span v-if="m.location" class="location">{{ m.location }}</span>
              </div>
            </div>
          </div>

          <!-- 内容 -->
          <div class="moment-content">
            <p class="moment-text">{{ m.content }}</p>

            <!-- 图片 -->
            <div v-if="m.images?.length" class="moment-images" :class="{ 'single-image': m.images.length === 1, 'grid-images': m.images.length > 1 }">
              <img
                v-for="img in m.images"
                :key="img"
                :src="img"
                class="moment-image"
                :class="{ 'grid-item': m.images.length > 1 }"
                alt="即刻图片"
                @click="openPhotoPreview(img, m.images, m.images.indexOf(img))"
              >
            </div>
          </div>
        </article>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--" class="pagination-btn">上一页</button>
        <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++" class="pagination-btn">下一页</button>
      </div>
    </div>
  </div>

  <!-- 预览模态框（独立组件） -->
  <PhotoPreviewModal
    :show="showPreview"
    :photo="currentPhoto"
    :index="currentPhotoIndex"
    :total="currentMomentImages.length"
    @close="closePhotoPreview"
    @next="nextPhoto"
    @prev="prevPhoto"
  />
</template>

<style scoped>
/* ------- 基础 ------- */
.moments-page { min-height: 100vh; padding: 2rem 0 }
.container { max-width: 700px; margin: 0 auto; padding: 0 1rem }
.moments-grid { display: flex; flex-direction: column; gap: 1.5rem }
.moment-card { background: #fff; border-radius: 12px; padding: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,.05) }
.moment-header { display: flex; align-items: flex-start; gap: .75rem; margin-bottom: 1rem }
.author-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover }
.author-info { flex: 1 }
.author-main { display: flex; align-items: center; gap: .5rem; margin-bottom: .25rem }
.author-name { margin: 0; font-size: 1.1rem; font-weight: 600 }
.badges-container { display: flex; gap: .375rem }
.badge { font-size: .6875rem; padding: .125rem .375rem; border: 1px solid #d4af37; color: #d4af37; border-radius: 4px }
.meta-info { display: flex; align-items: center; gap: .25rem; font-size: .875rem; color: #86868b }
.moment-text { margin: 0 0 .5rem; font-size: 1rem; line-height: 1.5 }
.moment-images { margin-top: .75rem }
.single-image .moment-image { width: 100%; border-radius: 12px; max-height: 400px; object-fit: cover; cursor: zoom-in }
.grid-images { display: grid; grid-template-columns: repeat(2,1fr); gap: .5rem }
.grid-item { width: 100%; height: 100%; border-radius: 8px; object-fit: cover; aspect-ratio: 1; cursor: zoom-in }
.pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem }
.pagination-btn { padding: .5rem 1rem; border: 1px solid #007aff; background: transparent; color: #007aff; border-radius: 8px; font-weight: 500; cursor: pointer }
.pagination-btn:disabled { opacity: .5; cursor: not-allowed }
.page-info { color: #86868b; font-size: .875rem }
</style>

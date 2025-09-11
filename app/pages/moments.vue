<!-- moments.vue -->
<script setup lang="ts">
import type { MomentItem } from '~/moments'
import moments from '~/moments'

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

/* 5. 键盘事件 */
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!showPreview.value) return
    if (e.key === 'Escape') closePhotoPreview()
    else if (e.key === 'ArrowRight') nextPhoto()
    else if (e.key === 'ArrowLeft') prevPhoto()
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
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

  <!-- 6. 预览模态框 -->
  <div v-if="showPreview" class="photo-preview-modal" @click="closePhotoPreview">
    <div class="preview-content" @click.stop>
      <button class="close-btn" @click="closePhotoPreview">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="preview-image-container">
        <button v-if="currentMomentImages.length > 1" class="nav-btn prev-btn" @click="prevPhoto">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <img :src="currentPhoto" class="preview-image" alt="预览图片">

        <button v-if="currentMomentImages.length > 1" class="nav-btn next-btn" @click="nextPhoto">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div v-if="currentMomentImages.length > 1" class="photo-counter">
        {{ currentPhotoIndex + 1 }} / {{ currentMomentImages.length }}
      </div>
    </div>
  </div>
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

/* ------- 预览模态框 ------- */
.photo-preview-modal { position: fixed; inset: 0; background: rgba(0,0,0,.9); display: flex; align-items: center; justify-content: center; z-index: 1000 }
.preview-content { position: relative; max-width: 90vw; max-height: 90vh; background: var(--ld-bg-card, #fff); border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,.3) }
.close-btn { position: absolute; top: .75rem; right: .75rem; background: rgba(255,255,255,.12); border: none; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; backdrop-filter: blur(20px); transition: all .2s ease }
.close-btn:hover { background: rgba(255,255,255,.2); transform: scale(1.1) }
.preview-image-container { max-width: 80vw; max-height: 70vh; display: flex; align-items: center; justify-content: center }
.preview-image { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain }
.nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,.12); border: none; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; backdrop-filter: blur(20px); opacity: .8; transition: all .2s ease }
.nav-btn:hover { background: rgba(255,255,255,.2); opacity: 1; transform: translateY(-50%) scale(1.1) }
.prev-btn { left: 20px }
.next-btn { right: 20px }
.photo-counter { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,.95); padding: .75rem 2rem; border-radius: 2rem; color: #000; font-size: 1.2rem; font-weight: 700; box-shadow: 0 4px 20px rgba(0,0,0,.4); border: 2px solid rgba(255,255,255,.8) }

/* 移动端 */
@media (max-width: 768px) {
  .close-btn { top: .5rem; right: .5rem; width: 2.5rem; height: 2.5rem }
  .nav-btn { width: 50px; height: 50px }
  .prev-btn { left: 10px }
  .next-btn { right: 10px }
  .photo-counter { font-size: 1rem; padding: .5rem 1rem }
}
</style>

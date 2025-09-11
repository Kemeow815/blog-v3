<!-- PhotoPreviewModal.vue -->
<script setup lang="ts">
defineProps<{
  show: boolean
  photo: string
  index: number
  total: number
}>()

const emit = defineEmits<{
  close: []
  next: []
  prev: []
}>()

/* 键盘 */
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
    else if (e.key === 'ArrowRight') emit('next')
    else if (e.key === 'ArrowLeft') emit('prev')
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <div v-if="show" class="photo-preview-modal" @click="emit('close')">
    <div class="preview-content" @click.stop>
      <button class="close-btn" @click="emit('close')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="preview-image-container">
        <button v-if="total > 1" class="nav-btn prev-btn" @click="emit('prev')">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <img :src="photo" class="preview-image" alt="预览图片">

        <button v-if="total > 1" class="nav-btn next-btn" @click="emit('next')">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div v-if="total > 1" class="photo-counter">{{ index + 1 }} / {{ total }}</div>
    </div>
  </div>
</template>

<style scoped>
.photo-preview-modal { position: fixed; inset: 0; background: rgba(0,0,0,.9); display: flex; align-items: center; justify-content: center; z-index: 1000 }
.preview-content { position: relative; max-width: 90vw; max-height: 90vh; background: var(--ld-bg-card,#fff); border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,.3) }
.close-btn { position: absolute; top: .75rem; right: .75rem; background: rgba(255,255,255,.12); border: none; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; backdrop-filter: blur(20px); transition: all .2s ease }
.close-btn:hover { background: rgba(255,255,255,.2); transform: scale(1.1) }
.preview-image-container { max-width: 80vw; max-height: 70vh; display: flex; align-items: center; justify-content: center }
.preview-image { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain }
.nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,.12); border: none; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; backdrop-filter: blur(20px); opacity: .8; transition: all .2s ease }
.nav-btn:hover { background: rgba(255,255,255,.2); opacity: 1; transform: translateY(-50%) scale(1.1) }
.prev-btn { left: 20px } .next-btn { right: 20px }
.photo-counter { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,.95); padding: .75rem 2rem; border-radius: 2rem; color: #000; font-size: 1.2rem; font-weight: 700; box-shadow: 0 4px 20px rgba(0,0,0,.4); border: 2px solid rgba(255,255,255,.8) }

@media (max-width: 768px) {
  .close-btn { top: .5rem; right: .5rem; width: 2.5rem; height: 2.5rem }
  .nav-btn { width: 50px; height: 50px }
  .prev-btn { left: 10px } .next-btn { right: 10px }
  .photo-counter { font-size: 1rem; padding: .5rem 1rem }
}
</style>

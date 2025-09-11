<script lang="ts">
import type { MomentItem } from '~/moments'
import moments from '~/moments'

interface Data {
	defaultAuthor: {
		name: string
		avatar: string
		badges: string[]
	}
	currentPage: number
	pageSize: number
	showPreview: boolean
	currentPhoto: string
	currentPhotoIndex: number
	currentMomentImages: string[]
	keydownHandler: ((e: KeyboardEvent) => void) | null
}

export default {
	name: 'MomentsPage',

	data(): Data {
		return {
			defaultAuthor: {
				name: 'ATao',
				avatar: 'https://cdn.atao.cyou/Web/Avatar.png',
				badges: ['摸鱼达人'],
			},
			currentPage: 1,
			pageSize: 5,
			showPreview: false,
			currentPhoto: '',
			currentPhotoIndex: 0,
			currentMomentImages: [],
			keydownHandler: null,
		}
	},

	computed: {
		sortedMoments(): MomentItem[] {
			return [...moments]
				.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
				.map(m => ({ ...m, author: m.author || this.defaultAuthor }))
		},

		paginatedMoments(): MomentItem[] {
			const start = (this.currentPage - 1) * this.pageSize
			return this.sortedMoments.slice(start, start + this.pageSize)
		},

		totalPages(): number {
			return Math.ceil(this.sortedMoments.length / this.pageSize)
		},
	},

	mounted() {
		this.keydownHandler = (e: KeyboardEvent) => {
			if (!this.showPreview)
				return
			if (e.key === 'Escape') {
				this.closePhotoPreview()
			}
			else if (e.key === 'ArrowRight') {
				this.nextPhoto()
			}
			else if (e.key === 'ArrowLeft') {
				this.prevPhoto()
			}
		}
		window.addEventListener('keydown', this.keydownHandler)
	},

	beforeUnmount() {
		if (this.keydownHandler) {
			window.removeEventListener('keydown', this.keydownHandler)
			this.keydownHandler = null
		}
	},

	methods: {
		formatTime(dateString: string): string {
			const date = new Date(dateString)
			return date
				.toLocaleString('zh-CN', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
					timeZone: 'Asia/Shanghai',
				})
				.replace(/\//g, '-')
				.replace(',', '')
		},

		openPhotoPreview(photo: string, images: string[], index: number) {
			this.currentPhoto = photo
			this.currentPhotoIndex = index
			this.currentMomentImages = images
			this.showPreview = true
		},

		closePhotoPreview() {
			this.showPreview = false
		},

		nextPhoto() {
			if (this.currentMomentImages.length > 1) {
				this.currentPhotoIndex
					= (this.currentPhotoIndex + 1) % this.currentMomentImages.length
				this.currentPhoto = this.currentMomentImages[this.currentPhotoIndex]
			}
		},

		prevPhoto() {
			if (this.currentMomentImages.length > 1) {
				this.currentPhotoIndex
					= (this.currentPhotoIndex - 1 + this.currentMomentImages.length)
						% this.currentMomentImages.length
				this.currentPhoto = this.currentMomentImages[this.currentPhotoIndex]
			}
		},
	},
}
</script>

<template>
<div class="moments-page">
	<div class="container">
		<div class="moments-grid">
			<article
				v-for="moment in paginatedMoments"
				:key="moment.id"
				class="moment-card"
			>
				<!-- 头部信息 -->
				<div class="moment-header">
					<NuxtImg
						:src="moment.author.avatar"
						:alt="moment.author.name"
						width="44"
						height="44"
						class="author-avatar"
					/>
					<div class="author-info">
						<div class="author-main">
							<h3 class="author-name">
								{{ moment.author.name }}
							</h3>
							<!-- 徽章区域 - Apple风格 -->
							<div v-if="moment.author.badges?.length" class="badges-container">
								<span
									v-for="badge in moment.author.badges"
									:key="badge"
									class="badge"
								>
									{{ badge }}
								</span>
							</div>
						</div>
						<div class="meta-info">
							<time class="moment-time">{{ formatTime(moment.createdAt) }}</time>
							<span v-if="moment.location" class="location-separator">·</span>
							<span v-if="moment.location" class="location"> {{ moment.location }}</span>
						</div>
					</div>
				</div>

				<!-- 内容区域 -->
				<div class="moment-content">
					<p class="moment-text">
						{{ moment.content }}
					</p>

					<!-- 图片展示 -->
					<div
						v-if="moment.images && moment.images.length > 0"
						class="moment-images"
						:class="{
							'single-image': moment.images.length === 1,
							'grid-images': moment.images.length > 1,
						}"
					>
						<NuxtImg
							v-for="(image, index) in moment.images"
							:key="index"
							:src="image"
							:alt="`图片 ${index + 1}`"
							class="moment-image"
							:class="{ 'grid-item': moment.images.length > 1 }"
							@click="openPhotoPreview(image, moment.images, index)"
						/>
					</div>
				</div>
			</article>
		</div>

		<!-- 分页控件 -->
		<div v-if="totalPages > 1" class="pagination">
			<button
				:disabled="currentPage === 1"
				class="pagination-btn"
				@click="currentPage--"
			>
				上一页
			</button>
			<span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
			<button
				:disabled="currentPage === totalPages"
				class="pagination-btn"
				@click="currentPage++"
			>
				下一页
			</button>
		</div>
	</div>
</div>

<!-- 图片预览模态框 -->
<div v-if="showPreview" class="photo-preview-modal" @click="closePhotoPreview">
	<div class="preview-content" @click.stop>
		<button class="close-btn" @click="closePhotoPreview">
			<Icon name="ph:x-bold" />
		</button>

		<div class="preview-image-container">
			<button v-if="currentMomentImages && currentMomentImages.length > 1" class="nav-btn prev-btn" @click="prevPhoto">
				<Icon name="ph:caret-left-bold" size="32" />
			</button>

			<NuxtImg
				:src="currentPhoto"
				:alt="`即刻图片 ${currentPhotoIndex + 1}`"
				class="preview-image"
			/>

			<button v-if="currentMomentImages && currentMomentImages.length > 1" class="nav-btn next-btn" @click="nextPhoto">
				<Icon name="ph:caret-right-bold" size="32" />
			</button>
		</div>

		<div v-if="currentMomentImages && currentMomentImages.length > 1" class="photo-counter">
			{{ currentPhotoIndex + 1 }} / {{ currentMomentImages.length }}
		</div>
	</div>
</div>
</template>

<style scoped>
.moments-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.moments-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.moment-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 1rem;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.moment-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.1);
}

.moment-header {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.author-info {
  flex: 1;
  min-width: 0;
}

.author-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.badges-container {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.badge {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
  background: transparent;
  color: #d4af37;
  border: 1px solid #d4af37;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.25px;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.moment-time {
  font-size: 0.875rem;
  color: #86868b;
}

.location-separator {
  color: #86868b;
}

.location {
  font-size: 0.875rem;
  color: #86868b;
}

.moment-content {
  margin-top: 0.5rem;
}

.moment-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #1d1d1f;
  margin: 0 0 0.5rem 0;
  word-wrap: break-word;
}

.moment-images {
  margin-top: 0.75rem;
}

.single-image .moment-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  max-height: 400px;
}

.grid-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.grid-item {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  aspect-ratio: 1;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #007aff;
  background: transparent;
  color: #007aff;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #007aff;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #86868b;
  font-size: 0.875rem;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .container {
    padding: 0 0.75rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .moment-card {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
  }

  .author-name {
    font-size: 1rem;
  }

  .moment-text {
    font-size: 0.9375rem;
  }

  .grid-images {
    grid-template-columns: 1fr;
  }
}

/* 图片预览模态框样式 */
.photo-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);

  .preview-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: var(--ld-bg-card);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    .close-btn {
      position: absolute;
      top: -50px;
      right: 0;
      background: rgba(255, 255, 255, 0.12);
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      backdrop-filter: blur(20px);
      transition: all 0.2s ease;
      z-index: 10;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
    }

    .preview-image-container {
      max-width: 80vw;
      max-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-image {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
      }
    }

    /* 左右导航按钮 */
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.12);
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      backdrop-filter: blur(20px);
      transition: all 0.2s ease;
      opacity: 0.8;
      z-index: 10;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        opacity: 1;
        transform: translateY(-50%) scale(1.1);
      }

      &.prev-btn {
        left: 20px;
      }

      &.next-btn {
        right: 20px;
      }
    }

    /* 页码指示器 */
    .photo-counter {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      padding: 0.75rem 2rem;
      border-radius: 2rem;
      color: #000;
      font-size: 1.2rem;
      font-weight: 700;
      z-index: 10;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      border: 2px solid rgba(255, 255, 255, 0.8);
    }
  }
}

/* 响应式设计 - 移动端预览 */
@media (max-width: 768px) {
  .photo-preview-modal {
    .preview-content {
      .close-btn {
        top: 0.5rem;
        right: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
      }

      .nav-btn {
        width: 50px;
        height: 50px;

        &.prev-btn {
          left: 10px;
        }

        &.next-btn {
          right: 10px;
        }
      }

      .photo-counter {
        font-size: 1rem;
        padding: 0.5rem 1rem;
      }
    }
  }
}
</style>

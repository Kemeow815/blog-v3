<script setup lang="ts">
const appConfig = useAppConfig()
const message = appConfig.announcement?.enabled ? appConfig.announcement.message : ''
</script>

<template>
<ZWidget v-if="message" card title="公告">
	<div class="announcement-content">
		<!-- 动态喇叭图标 -->
		<div class="speaker-icon">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 4L7 9H4C2.89543 9 2 9.89543 2 11V13C2 14.1046 2.89543 15 4 15H7L12 20V4Z" />
				<path d="M16.5 8.5C17.3284 8.5 18 9.17157 18 10C18 10.8284 17.3284 11.5 16.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				<path d="M19 6C20.6569 6 22 7.34315 22 9C22 10.6569 20.6569 12 19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</div>

		<!-- 公告文字内容 -->
		<div class="announcement-text">
			{{ message }}
		</div>
	</div>
</ZWidget>
</template>

<style lang="scss" scoped>
.announcement-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.speaker-icon {
  color: var(--c-primary);
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
}

.announcement-text {
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: var(--c-text);
  font-size: 0.95rem;
  line-height: 1.4;
  transition: all 0.3s ease;
  cursor: default;
}

.announcement-text:hover {
  color: var(--c-primary);
  transform: translateY(-1px);
  text-shadow: 0 2px 4px rgba(var(--c-primary-rgb), 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .announcement-content {
    gap: 0.5rem;
  }

  .speaker-icon svg {
    width: 18px;
    height: 18px;
  }

  .announcement-text {
    font-size: 0.875rem;
  }
}
</style>

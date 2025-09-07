<script lang="ts" setup>
import { equipment } from '~/equipment'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-log'])
</script>

<template>
<div id="icat-equipment">
	<div v-for="i in equipment" :key="i.class_name" style="margin-top: 1rem;margin-right: 1rem;margin-left: 1rem;">
		<h2 :id="i.class_name">
			{{ i.class_name }}
		</h2>
		<div class="equipment-desc">
			{{ i.class_desc }}
		</div>
		<div v-for="item in i.List" :key="item.name" class="equipment">
			<div class="icat-equipment-box" style="width: calc(35% - 12px);">
				<img :src="item.image">
				<div class="icat-equipment-content">
					<div class="icat-equipment-name">
						{{ item.name }}
					</div>
					<div class="icat-equipment-custom">
						{{ item.custom }}
					</div>
					<div class="icat-equipment-opinion">
						{{ item.opinion }}
					</div>
					<div class="icat-equipment-box-more">
						<a :herf="item.details_flink" title="跳转到{{ item.name }}的产品详情">
							{{ i.infoname }}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped lang="scss">
/* 装备页面美化（icat） */

/* 由苏晓河进行编写以及调整 */

/* 时间：2025年2月5日 */

#icat-equipment > h2 {
	margin: 20px 7px 0;
}

#icat-equipment .equipment-desc {
	margin: 0 7px;
	color: var(--icat-secondtext);
}

#icat-equipment {
	padding-bottom: 12px;
}

#icat-equipment .equipment {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding: 10px 0 0;
}

/* 初始化 */

#icat-equipment .equipment > .icat-equipment-box {
	overflow: hidden;
	width: calc(100% / 4 - 12px);
	border: 1px solid var(--icat-secondbg);
	border-radius: 12px;
	background: var(--icat-card-bg);
}

#icat-equipment .equipment .icat-equipment-box img {
	height: 200px;
	min-width: 100%;
	max-width: 100%;
	transition: all 0.4s ease-in-out;
	animation: fadeIn 1s;
	cursor: pointer;
	object-fit: cover;
}

#icat-equipment .equipment .icat-equipment-box img:hover {
	transform: scale(1.03);
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content {
	padding: 16px;
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-name {
	overflow: hidden;
	margin-bottom: 8px;
	font-size: 18px;
	font-weight: bold;
	line-height: 1;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: var(--icat-fontcolor);
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-custom {
	overflow: hidden;
	margin-bottom: 12px;
	font-size: 12px;
	line-height: 1;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: var(--icat-secondtext);
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-opinion {
	display: -webkit-box;
	overflow: hidden;
	height: 60px;
	margin-bottom: 16px;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	line-height: 20px;
	color: var(--icat-secondtext);
	-webkit-box-orient: vertical;
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-box-more {
	display: flex;
	justify-content: space-between;
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-box-more a {
	padding: 4px 12px;
	border-radius: 6px;
	background: var(--icat-gray-op);
	font-size: 12px;
	letter-spacing: 1px;
	color: var(--icat-fontcolor);
}

#icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-box-more a:hover {
	box-shadow: 0 8px 16px -4px var(--icat-black-op);
	background: var(--icat-blue);
	color: var(--icat-white);
}

/* 好物页基础样式 */
@media screen and (max-width: 900px) {
	#icat-equipment .equipment {
		gap: 10px;
	}

	#icat-equipment .equipment > .icat-equipment-box {
		width: calc(100% / 3 - 7px);
	}
}

@media screen and (max-width: 768px) {
	#icat-equipment .equipment {
		gap: 8px;
	}

	#icat-equipment .equipment > .icat-equipment-box {
		width: 100%;
	}

	#icat-equipment .equipment .icat-equipment-box img {
		height: 220px;
	}
}

/* 响应式 */

/* 我的好物样式 */
</style>

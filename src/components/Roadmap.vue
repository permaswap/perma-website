<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// import roadmapBack from '../images/roadmap-back.png'
import timeline1 from '../images/timeline1.png'
import timeline1Grey from '../images/timeline1Grey.png'
import timeline2 from '../images/timeline2.png'
import timeline2Grey from '../images/timeline2Grey.png'
import timeline3 from '../images/timeline3.png'
import timeline3Grey from '../images/timeline3Grey.png'
import timeline4 from '../images/timeline4.png'
import timeline4Grey from '../images/timeline4Grey.png'
import timeline5 from '../images/timeline5.png'
import timeline5Grey from '../images/timeline5Grey.png'

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  scrollTop: number
}>()

const { t } = useI18n()

const roadmaps = [
  {
    title: '2022 Q3',
    icon: timeline1Grey,
    activeIcon: timeline1,
    items: [
      'roadmap_1_1',
      'roadmap_1_2',
      'roadmap_1_3'
    ]
  },
  {
    title: '2022 Q4',
    icon: timeline2Grey,
    activeIcon: timeline2,
    items: [
      'roadmap_2_1',
      'roadmap_2_2'
    ]
  },
  {
    title: '2023 Q1',
    icon: timeline3Grey,
    activeIcon: timeline3,
    items: [
      'roadmap_3_1',
      'roadmap_3_2',
      'roadmap_3_3'
    ]
  },
  {
    title: '2023 Q4',
    icon: timeline4Grey,
    activeIcon: timeline4,
    items: [
      'roadmap_4_1'
    ]
  },
  {
    title: '2024',
    icon: timeline5Grey,
    activeIcon: timeline5,
    items: [
      'roadmap_5_1'
    ]
  }
]

const activeIndex = ref(-1)
watch(props, () => {
  const eleContainer = document.getElementById('roadmap-container')
  const offTop = (eleContainer as any).getBoundingClientRect().top + window.scrollY
  // 滚动到 2/3 屏幕开始点亮
  const active = Math.floor((props.scrollTop + window.innerHeight / 3 * 2 - offTop) / 205)
  activeIndex.value = active
})

</script>

<template>
  <div>
    <div
      class="px-6 mx-auto xl:w-1024px 2xl:w-1342px mt-16"
    >
      <div style="color: #70B16E;margin-bottom:38px;" class="text-36px font-bold">
        {{ t('roadmap') }}
      </div>
      <div id="roadmap-container" style="max-width:500px;margin:0 auto;color: rgba(255, 255, 255, 0.2);">
        <div
          v-for="(roadmap, index) in roadmaps"
          :key="index"
          class="flex flex-row items-start justify-start"
          style="height: 205px;">
          <div
            class="w-12 h-12 sm:w-16 sm:h-16 flex flex-row items-center justify-center relative rounded-full mr-6 sm:mr-24"
            style="transition:background .6s;"
            :style="`background:${activeIndex >= index ? '#fff' : 'rgba(255, 255, 255, 0.1)'};`"
          >
            <img :src="activeIndex >= index ? roadmap.activeIcon : roadmap.icon">
            <div
              v-if="index !== roadmaps.length - 1"
              class="absolute roadmap-bar"
              style="width:1px;height:126px;left:50%;background: #3F3F3F;">
              <div
                style="width:1px;background:#fff;transition:height .6s;"
                :style="`height:${activeIndex >= index ? 126 : 0}px;`" />
            </div>
          </div>
          <div>
            <div
              class="font-bold text-2xl sm:text-3xl mb-4"
              style="font-weight: 700;transition:color .6s;"
              :style="`color:${activeIndex >= index ? '#fff' : ''}`"
            >
              {{ roadmap.title }}
            </div>
            <ul
              class="w-64 sm:w-80"
              style="font-weight: 300;font-size: 15px;transition:color .6s;"
              :style="`color:${activeIndex >= index ? '#D7D7D7' : ''}`"
            >
              <li v-for="(item, index2) in roadmap.items" :key="index2" class="mb-2">
                {{ t(item) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roadmap-bar {
  top: 62px;
}
@media (min-width: 640px) {
  .roadmap-bar {
    top: 70px;
  }
}
</style>

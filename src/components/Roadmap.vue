<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
interface RoadmapsArr {
  title: string
  icon: string
  activeIcon: string
  items: string[]
}
const props = defineProps<{
  scrollTop: number
}>()
const { t } = useI18n()
const roadmaps:RoadmapsArr[] = [
  {
    title: '2022 Q3',
    icon: 'timeline1Grey.png',
    activeIcon: 'timeline1.png',
    items: [
      'roadmap_1_1',
      'roadmap_1_2',
      'roadmap_1_3'
    ]
  },
  {
    title: '2022 Q4',
    icon: 'timeline2Grey.png',
    activeIcon: 'timeline2.png',
    items: [
      'roadmap_2_1',
      'roadmap_2_2'
    ]
  },
  {
    title: '2023 Q1',
    icon: 'timeline3Grey.png',
    activeIcon: 'timeline3.png',
    items: [
      'roadmap_3_1',
      'roadmap_3_2',
      'roadmap_3_3'
    ]
  },
  {
    title: '2023 Q4',
    icon: 'timeline4Grey.png',
    activeIcon: 'timeline4.png',
    items: [
      'roadmap_4_1'
    ]
  },
  {
    title: '2024',
    icon: 'timeline5Grey.png',
    activeIcon: 'timeline5.png',
    items: [
      'roadmap_5_1'
    ]
  }
]
const activeIndex = ref(-1)
watch(props, () => {
  const eleContainer = document.getElementById('roadmap-container')
  if (eleContainer && eleContainer.getBoundingClientRect) {
    const offTop = (eleContainer as any).getBoundingClientRect().top + window.scrollY
    // 滚动到 2/3 屏幕开始点亮
    const active = Math.floor((props.scrollTop + window.innerHeight / 3 * 2 - offTop) / 205)
    activeIndex.value = active
  }
})
</script>

<template>
  <div>
    <div
      class="px-6 mx-auto xl:w-1024px 2xl:w-1200px"
    >
      <div class="text-36px text-permaGreen10 font-space-gtotesk-bold sm:mb-20 mb-10">
        {{ t('roadmap') }}
      </div>
      <div id="roadmap-container" style="max-width:500px;margin:0 auto;color: rgba(255, 255, 255, 0.2);">
        <div
          v-for="(roadmap, index) in roadmaps"
          :key="index"
          class="flex flex-row items-start justify-start"
          style="height: 205px;">
          <div
            class="w-12 h-12 sm:w-12 sm:h-12 flex flex-row items-center justify-center relative rounded-full mr-6 sm:mr-24"
            style="transition:background .6s;"
            :style="`background:${activeIndex >= index ? '#fff' : 'rgba(255, 255, 255, 0.1)'};min-height:48px;min-width:48px`"
          >
            <img :src="require(`@/images/${activeIndex >= index ? roadmap.activeIcon : roadmap.icon}`)">
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
              class="text-2xl sm:text-32px mb-6 font-space-gtotesk-bold"
              style="transition:color .6s;"
              :style="`color:${activeIndex >= index ? '#fff' : ''}`"
            >
              {{ roadmap.title }}
            </div>
            <ul
              class="w-64 sm:w-80 font-space-gtotesk-light text-base"
              style="transition:color .6s;"
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
    top: 64px;
  }
}
</style>

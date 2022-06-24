<script lang="ts" setup>
import { onMounted, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import lottie from 'lottie-web'
defineProps<{
  windowWidth: number
}>()

const { t } = useI18n()

const features = [
  {
    title: 'advantage_1_title',
    desc: 'advantage_1_desc'
  },
  {
    title: 'advantage_2_title',
    desc: 'advantage_2_desc'
  },
  {
    title: 'advantage_3_title',
    desc: 'advantage_3_desc'
  },
  {
    title: 'advantage_4_title',
    desc: 'advantage_4_desc'
  },
  {
    title: 'advantage_5_title',
    desc: 'advantage_5_desc'
  }
]
onMounted(() => {
  features.forEach((feature, index) => {
    lottie.loadAnimation({
      container: document.getElementById(`feature-anima-${index}`) as any, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: `anima/section${index + 1}Loop2.json` // the path to the animation json
    })
  })
})
</script>

<template>
  <div
    class="feature-container"
    :style="`background-image:url(${windowWidth > 640 ? require('../images/feature-back.png') : require('../images/feature-back-small.png')});background-position:0 0;background-repeat:no-repeat;`"
  >
    <div
      class="px-6 pt-16 mx-auto xl:w-1024px 2xl:w-1342px"
    >
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="md:flex items-center justify-between"
        :class="index % 2 ? 'flex-row-reverse' : 'flex-row'">
        <div class="feature-content text-white lg:w-1/2">
          <div class="font-semibold text-24px mb-4 md:text-36px lg:text-48px lg:font-bold lg:mb-6">
            {{ t(feature.title) }}
          </div>
          <div class="font-light text-sm lg:text-21px leading-relaxed" style="color:#DDDDDD;">
            {{ t(feature.desc) }}
          </div>
        </div>
        <div :id="`feature-anima-${index}`" class="feature-anima" />
      </div>
    </div>
  </div>
</template>

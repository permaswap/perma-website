<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import permaGif from '../images/perma.gif'
import haloBigBg from '../images/halo-ring-big-2.png'
import haloSmallBg from '../images/halo-ring-small-3.png'
import meltball from '../images/meltball.gif'

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  windowWidth: number
}>()

const { t } = useI18n()

const haloBg = computed(() => {
  return props.windowWidth > 768 ? haloBigBg : haloSmallBg
})

const containerH = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 945 : props.windowWidth / 375 * 413
})
const contentTop = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 300 : props.windowWidth / 375 * 150
})

const gifWidth = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 359 : props.windowWidth / 375 * 177
})
const gifHeight = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 361 : props.windowWidth / 375 * 179
})
const gifTop = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 160 : props.windowWidth / 375 * 90
})

const ball1Top = computed(() => {
  return props.windowWidth / 1720 * 231.48
})
const ball1Right = computed(() => {
  return props.windowWidth / 1720 * 400
})

const ball2Top = computed(() => {
  return props.windowWidth / 1720 * 387
})
const ball2Left = computed(() => {
  return props.windowWidth / 1720 * 373
})

</script>

<template>
  <div class="relative" :style="`height:${containerH}px;background-image:url(${haloBg});background-size:100% 100%;`">
    <img class="absolute" :style="`width:${gifWidth}px;height:${gifHeight}px;left:50%;transform:translateX(-50%);top:${gifTop}px;`" :src="permaGif">
    <div class="w-full absolute" :style="`left:0;top:${contentTop}px;`">
      <div class="text-center font-bold text-white text-48px md:text-88px 2xl:text-122px">
        Permaswap
      </div>
      <div class="text-center -mt-1 md:-mt-3 md:-mt-5 text-base md:text-lg 2xl:text-21px" :style="`color:#CACACA;`">
        <div class="mx-auto w-72 md:w-auto">
          {{ t('slogan') }}
        </div>
      </div>
      <div
        class="text-center cursor-not-allowed font-bold mt-4 md:mt-16 text-15px md:text-base py-3 mx-auto w-32 md:w-36"
        style="color:#5D806E;background: linear-gradient(268.01deg, rgba(41, 41, 41, 0.8) -9.16%, rgba(51, 51, 51, 0.8) 109.32%);"
      >
        {{ t('coming_soon') }}
      </div>
    </div>
    <img
      :src="meltball"
      class="hidden xl:block absolute"
      style="width:170.52px;height:172.25px;opacity: 0.9;"
      :style="`top:${ball1Top}px;right:${ball1Right}px;`">
    <img
      :src="meltball"
      class="hidden xl:block absolute"
      style="width:131.48px;height:132.81px;opacity: 0.8;transform: rotate(56.13deg);"
      :style="`top:${ball2Top}px;left:${ball2Left}px;`">
  </div>
</template>

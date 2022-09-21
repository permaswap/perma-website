<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { isProd } from '@/constants'
const props = defineProps<{
  windowWidth: number
}>()
const { t } = useI18n()
const contentTop = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 300 : props.windowWidth / 375 * 150
})
const containerH = computed(() => {
  return props.windowWidth > 768 ? props.windowWidth / 1720 * 945 : props.windowWidth / 375 * 413
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
  <div class="relative" :style="`height:${containerH}px;`">
    <img src="../images/halo-ring-big.png" class="md:block hidden w-full">
    <img src="../images/halo-ring-small.png" class="w-full md:hidden block" alt="">
    <img class="absolute" :style="`width:${gifWidth}px;height:${gifHeight}px;left:50%;transform:translateX(-50%);top:${gifTop}px;`" src="@/images/perma.gif">
    <div class="w-full absolute" :style="`left:0;top:${contentTop}px;`">
      <div class="text-center text-white text-48px md:text-88px font-space-gtotesk-bold 2xl:text-120px">
        Permaswap
      </div>
      <div class="text-center text-base mt-4 md:text-18px 2xl:text-xl text-permaGray2">
        <div class="mx-auto w-72 md:w-auto font-space-gtotesk-light">
          {{ t('slogan') }}
        </div>
      </div>
      <div class="flex justify-center md:mt-16 mt-4">
        <a
          :href="`https://app${isProd ? '' : '-dev'}.permaswap.network/#/pool`"
          target="_blank"
          class=" border-permaBorderGreen border hover:border-permaGreen9 hover:text-permaGreen9 active:border-permaGreen10 active:text-permaGreen10  rounded-lg  py-2  px-4 md:ml-6 ml-4 text-white text-opacity-80  cursor-pointer  transition-colors">
          {{ t('download_lp') }}
        </a>
        <a
          :href="`https://app${isProd ? '' : '-dev'}.permaswap.network`"
          target="_blank"
          class="bg-permaGreen10  active:bg-permaGreen11 bg-opacity-80 rounded-lg text-black py-2  px-4 md:ml-6 ml-4  cursor-pointer hover:bg-permaGreen9 transition-colors">
          {{ t('launch') }}
        </a>
      </div>
    </div>
    <img
      src="@/images/meltball.gif"
      class="hidden xl:block absolute opacity-90"
      style="width:170.52px;height:172.25px;"
      :style="`top:${ball1Top}px;right:${ball1Right}px;`">
    <img
      src="@/images/meltball.gif"
      class="hidden xl:block absolute opacity-80"
      style="width:131.48px;height:132.81px;transform: rotate(56.13deg);"
      :style="`top:${ball2Top}px;left:${ball2Left}px;`">
  </div>
</template>

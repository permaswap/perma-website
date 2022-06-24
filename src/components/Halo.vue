<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps<{
  windowWidth: number
}>()
const { t } = useI18n()
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
  <div class="relative">
    <img src="../images/halo-ring-big-2.png" class="md:block hidden">
    <img src="../images/halo-ring-small-3.png" class="w-full md:hidden block" alt="">
    <img class="absolute" :style="`width:${gifWidth}px;height:${gifHeight}px;left:50%;transform:translateX(-50%);top:${gifTop}px;`" src="@/images/perma.gif">
    <div class="w-full absolute" :style="`left:0;top:${contentTop}px;`">
      <div class="text-center font-bold text-white text-48px md:text-88px 2xl:text-122px">
        Permaswap
      </div>
      <div class="text-center -mt-1 md:-mt-5 text-base md:text-lg 2xl:text-21px text-everGray2">
        <div class="mx-auto w-72 md:w-auto">
          {{ t('slogan') }}
        </div>
      </div>
      <div
        class="text-center text-everGray1 cursor-not-allowed font-bold mt-4 md:mt-16 text-15px bg-permaGreenBg md:text-base py-3 mx-auto w-32 md:w-36"
      >
        {{ t('coming_soon') }}
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

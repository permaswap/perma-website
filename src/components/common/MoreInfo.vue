<template>
  <div
    class="relative"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave">
    <div :class="infoClass" class="cursor-pointer">
      {{ info }}
    </div>
    <transition name="fade">
      <div
        v-show="hoverd"
        class="absolute bottom-32 left-36 z-40  w-80"
      >
        <div class="relative mb-5 p-2 text-white break-all bg-permaBlack4 text-14px" style="border-radius: 6px;">
          <slot />
        </div>
        <div class="divArrowRadius absolute left-3.5" />
      </div>
    </transition>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineProps } from 'vue'
interface Props {
  info: string
  infoClass: string
}
defineProps<Props>()
const hoverd = ref(false)
let timer = null as any
const handleMouseOver = () => {
  hoverd.value = true
  timer && clearTimeout(timer)
}
const handleMouseLeave = () => {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    hoverd.value = false
  }, 150)
}
</script>

<style scoped>
.divArrowRadius {
  border: 7px solid rgba(20, 24, 20, 0.85);
  border-left: 7px solid transparent;
  border-top: 7px solid transparent;
  border-bottom-right-radius: 5px;
  width: 0;
  transform: rotateZ(45deg);
  bottom: 13px;
}
</style>

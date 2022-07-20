<template>
  <transition name="fade">
    <ModalMask v-show="visible" />
  </transition>
  <transition name="move">
    <div v-show="visible" class="fixed z-40 h-screen w-full top-0 left-0">
      <slot />
    </div>
  </transition>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import ModalMask from './ModalMask.vue'
interface Props {
  visible: boolean
}
defineProps<Props>()
</script>

<style>
</style>

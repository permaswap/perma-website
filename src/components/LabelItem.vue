<template>
  <div class="flex flex-row items-center justify-between">
    <h2 class="md:text-36px text-xl font-space-gtotesk-medium">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
interface Props {
  title: string
}
defineProps<Props>()

</script>

<style>
</style>

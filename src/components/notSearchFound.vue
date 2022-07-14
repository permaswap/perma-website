<template>
  <div class="h-528px w-full flex justify-center items-center">
    {{ title }}
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

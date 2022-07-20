<template>
  <div class="fixed w-full h-screen bg-black bg-opacity-60 right top-0" @click="emits('click')" />
</template>

<script setup lang='ts'>
import { defineEmits } from 'vue'
interface Eimts {
  (e:'click'): void
}

const emits = defineEmits<Eimts>()
</script>

<style>
</style>

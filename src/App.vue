<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
const scrollTop = ref(0)

const windowWidth = ref(document.documentElement.offsetWidth)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollTop.value = document.documentElement.scrollTop
  })
  window.addEventListener('resize', () => {
    windowWidth.value = document.documentElement.offsetWidth
  })
})
</script>

<template>
  <div class="bg-black text-white">
    <Navbar :scroll-top="scrollTop" :window-width="windowWidth" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useStore } from './store'
const scrollTop = ref(0)
const store = useStore()
const windowWidth = ref(document.documentElement.offsetWidth)
store.dispatch('updateHotNftsInfoAsync')
store.dispatch('updateArNftsInfoAsync')
store.dispatch('updateArBatchInfoAsync')
store.dispatch('updateEthBatchInfoAsync')
store.dispatch('updateEthNftsInfoAsync')

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
  <div class="bg-black text-white font-space-grotesk-regular">
    <Navbar :scroll-top="scrollTop" :window-width="windowWidth" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

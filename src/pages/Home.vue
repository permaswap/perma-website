<script setup lang="ts">

import { onMounted, ref } from 'vue'
import Halo from '../components/Halo.vue'
import Features from '../components/Features.vue'
import Milestones from '../components/Milestones.vue'
import Roadmap from '../components/Roadmap.vue'
import Footer from '../components/Footer.vue'

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
  <Halo :window-width="windowWidth" />
  <Features :window-width="windowWidth" />
  <Milestones :scroll-top="scrollTop" />
  <Roadmap :scroll-top="scrollTop" />
  <Footer :window-width="windowWidth" />
</template>

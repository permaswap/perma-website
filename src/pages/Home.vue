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
  console.log(1)
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
  <div class="bg-no-repeat roadmap-Bg">
    <Roadmap :scroll-top="scrollTop" />
    <Footer :window-width="windowWidth" />
  </div>
</template>
<style>
.roadmap-Bg{
  background-image: url('../images/roadmap-back.png');
  background-position: right;
}
</style>

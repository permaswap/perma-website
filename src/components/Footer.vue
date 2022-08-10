<script lang="ts" setup>
import { defineProps } from 'vue'
interface FooterSrcArr {
  href: string
  src: string
}
defineProps<{
  windowWidth: number
}>()
const footerImgSrc:FooterSrcArr[] = [
  {
    href: 'https://everpay.io',
    src: 'everpay.png'
  },
  {
    href: 'https://github.com/permaswap/perma-website',
    src: 'github.png'
  },
  {
    href: 'https://twitter.com/permaswap',
    src: 'twitter.png'
  },
  {
    href: 'https://discord.gg/WM5MQZGVPF',
    src: 'discord.png'
  },
  {
    href: 'https://t.me/FinanceEver',
    src: 'telegram.png'
  }
]
</script>

<template>
  <div
    class="flex flex-col items-center md:flex-row justify-between mx-auto xl:w-1200px md:mt-52 mt-20 pb-12  px-4 xl:px-0"
  >
    <div class="flex flex-col items-center mb-8 md:block md:mb-0">
      <img src="@/images/logo4.png" class="h-8 mb-3 z-10">
      <div class="text-xs font-space-gtotesk-light z-10" style="color:#8C8C8C">
        ©2022 everFinance. All rights reserved
      </div>
    </div>
    <div class="flex flex-row items-center justify-center md:justify-end">
      <a
        v-for="(item, index) in footerImgSrc"
        :key="index"
        :href="item.href"
        target="_blank"
        :class="index !== footerImgSrc.length-1 ? 'mr-8' : ''"
        class="block w-6 h-6 opacity-50 transition-opacity duration-300 hover:opacity-100">
        <img :src="require(`@/images/${item.src}`)" class="block w-6 h-6">
      </a>
    </div>
  </div>
</template>

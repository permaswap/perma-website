<script lang="ts" setup>
import { defineProps } from 'vue'
// import footerBack from '../images/footer-back.png'
import logo from '../images/logo4.png'
import telegramImg from '../images/telegram.png'
import discordImg from '../images/discord.png'
import twitterImg from '../images/twitter.png'

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  windowWidth: number
}>()

</script>

<template>
  <div
    class="md:flex flex-row items-center justify-between mx-auto xl:w-1024px 2xl:w-1342px pb-16 sm:py-16 px-6"
  >
    <div class="flex flex-col items-center mb-8 md:block md:mb-0">
      <img :src="logo" class="h-8 mb-3">
      <div class="text-xs font-light" style="color:#8C8C8C">
        ©2022 everFinance. All rights reserved
      </div>
    </div>
    <div class="flex flex-row items-center justify-center md:justify-end">
      <a href="https://twitter.com/FinanceEver" target="_blank" class="block w-6 h-6 mr-8 opacity-50 transition-opacity duration-300 hover:opacity-100">
        <img :src="twitterImg" class="block w-6 h-6">
      </a>
      <a href="https://discord.gg/WM5MQZGVPF" target="_blank" class="block w-6 h-6 mr-8 opacity-50 transition-opacity duration-300 hover:opacity-100">
        <img :src="discordImg" class="block w-6 h-6">
      </a>
      <a href="https://t.me/FinanceEver" target="_blank" class="block w-6 h-6 opacity-50 transition-opacity duration-300 hover:opacity-100">
        <img :src="telegramImg" class="block w-6 h-6">
      </a>
    </div>
  </div>
</template>

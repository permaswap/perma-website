<template>
  <div
    class="flex items-center flex-col"
    style="background: linear-gradient(359.8deg, rgba(3, 33, 13, 0.65) 0.16%, rgba(0, 0, 0, 0) 99.81%);">
    <div class="flex items-center flex-col">
      <h1 class="font-bold md:text-48px text-2xl px-11 text-center">
        {{ t('nft.discover_nft') }}
      </h1>
      <p class="md:text-xl text-12px font-light mt-6 text-center text-permaWhite px-4" style="max-width:800px;">
        {{ t('nft.discover_nft_desc') }}
      </p>
    </div>
    <div class="md:mt-20 mt-10 flex md:mb-32 mb-10 justify-between px-6 sm:px-0 sm:w-auto w-full">
      <div class="bg-permaGreen5 md:py-2.5 py-2 px-6 rounded-lg text-black sm:mr-28 cursor-pointer">
        {{ t('nft.discover_now') }}
      </div>
      <div
        class="border border-solid border-permaBorderGreen md:py-2.5 py-2 px-6 rounded-lg cursor-pointer text-permaWhite2 flex">
        <img src="@/images/arrow-right-green.svg" alt="" class="mr-2">
        <span>{{ t('nft.auction') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>

<style>
</style>

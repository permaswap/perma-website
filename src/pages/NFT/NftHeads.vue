<template>
  <div
    class="flex items-center flex-col"
    style="background: linear-gradient(359.8deg, rgba(3, 33, 13, 0.65) 0.16%, rgba(0, 0, 0, 0) 99.81%);">
    <div class="flex items-center flex-col px-9">
      <h1 class="font-bold md:text-48px text-2xl text-center font-space-gtotesk-bold">
        {{ t('nft.discover_nft') }}
      </h1>
      <p
        class="md:text-xl text-12px font-light mt-6 text-center text-permaWhite  font-space-gtotesk-light"
        style="max-width:800px;">
        {{ t('nft.discover_nft_desc') }}
      </p>
    </div>
    <div
      class="md:mt-20 mt-10 flex md:mb-32 mb-10 justify-between sm:px-0 px-10 sm:w-auto w-full md:text-base text-14px">
      <Active
        class-name="bg-permaGreen11"
        default-class-name="bg-permaGreen10"
        class=" md:py-2.5 py-2 md:px-6 px-4 rounded-lg text-black sm:mr-28 cursor-pointer hover:bg-permaGreen9 transition-all"
        @click="goHTMLPosition('ethnfts')">
        {{ t('nft.discover_now') }}
      </Active>
      <a href="https://app.everpay.io/nft-auction" target="_blank">
        <Active
          class-name="border-permaGreen11 text-permaGreen11"
          default-class-name="border-permaBorderGreen text-permaWhite2"
          class="border border-solid  md:py-2.5 py-2 md:px-6 px-4 rounded-lg cursor-pointer  hover:border-permaGreen9 hover:text-permaGreen9 flex transition-all">
          <div class="flex">
            <img src="@/images/arrow-right-green.svg" alt="" class="mr-2">
            <span>{{ t('nft.auction') }}</span>
          </div>
        </Active>
      </a>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { goHTMLPosition } from '@/lib/util'
import Active from '@/components/Active.vue'
const { t } = useI18n()
</script>

<style>
</style>

<template>
  <div
    class="flex items-center flex-col nftHaeadsBanner">
    <div class="flex items-center flex-col px-9">
      <h1 class="font-bold md:text-48px text-2xl text-center font-space-gtotesk-bold">
        {{ t('nft.discover_nft') }}
      </h1>
      <p
        class="md:text-xl text-12px font-light mt-6 text-center text-permaWhite font-space-gtotesk-light">
        {{ t('nft.discover_nft_desc') }}
      </p>
    </div>
    <div
      class="md:mt-20 mt-10 flex md:mb-32 mb-10 justify-between sm:px-0 px-10 sm:w-auto w-full md:text-base text-14px">
      <ButtonActiveVue
        type="nftBatchActive"
        :class="locale === 'zh' ? 'md:px-9 px-7' : 'md:px-6 px-4'"
        class="bg-permaGreen10 md:py-2.5 py-2 rounded-lg text-black sm:mr-28 cursor-pointer hover:bg-permaGreen9 transition-colors"
        @click="goHTMLPosition('ethnfts')">
        {{ t('nft.discover_now') }}
      </ButtonActiveVue>
      <ButtonActiveVue type="onAuctionActive" class="border border-solid border-permaBorderGreen text-permaWhite2 md:py-2.5 py-2 md:px-6 px-4 rounded-lg cursor-pointer  hover:border-permaGreen9 hover:text-permaGreen9 flex transition-all" @click="goHTMLPosition('ethnfts')">
        <a href="https://app.everpay.io/nft-auction" target="_blank">
          <div class="flex">
            <div class="onAuctionSvg w-6 h-6 mr-2" />
            <div class="activeSvg w-6 h-6 mr-2" />
            <span>{{ t('nft.auction') }}</span>
          </div>
        </a>
      </ButtonActiveVue>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { goHTMLPosition } from '@/lib/util'
import ButtonActiveVue from '@/components/ButtonActive.vue'
const { t, locale } = useI18n()
</script>

<style>
.onAuctionSvg{
  background-image: url('../../images/arrow-right-green.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.activeSvg{
  background-image: url('../../images/arrow-right-green-active.svg');
  background-repeat: no-repeat;
  background-position: center;
  display: none;
}
.onAuctionActive:hover .onAuctionSvg {
  background-image: url('../../images/arrow-right-green-hover.svg');
}
.nftHaeadsBanner{
  background-image: url('../../images/small_banner.png');
  background-size: 100% 378px;
  background-repeat: no-repeat;
  background-position: top center;
}
@media (min-width:400px) {
  .nftHaeadsBanner{
    background-image: url('../../images/banner.png');
    background-size: 1920px 568px;
    background-position: top center;
  }
}
</style>

<template>
  <div class="md:pt-3 md:pb-4 pb-10px md:px-3 pt-2 px-2 rounded-2xl bg-permaBlack md:w-282px w-164px">
    <div class="md:pb-4 pb-10px border-b md:border-b-2 border-permaWhite5 border-dashed">
      <a :href="permaLink" target="_blank">
        <div class="rounded-lg overflow-hidden md:w-258px md:h-258px w-148px h-148px" :style="`background-image: url(${imageUrl});background-position:bottom;background-size:cover`" />
      </a>
      <div class="md:mt-4 mt-10px md:px-1 px-0.5">
        <div class="text-14px md:text-base truncate ">
          {{ name }}
        </div>
        <div class="md:mt-0.5 text-12px md:text-14px text-permaWhite3 truncate">
          {{ collectionName }}
        </div>
      </div>
    </div>
    <NftCardInfo
      :symbol="symbol"
      :amount="amount"
      :address="owner"
      :perma-link="permaLink"
      :owner-link="ownerLink" />
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import NftCardInfo from './NftCardInfo.vue'
interface Props {
  imageUrl: string
  owner: string
  name: string
  collectionName: string
  permaLink: string
  ownerLink: string
  amount: string
  symbol: string
}
defineProps<Props>()
</script>

<style>
</style>

<template>
  <div class="md:pt-3 md:pb-4 pb-10px md:px-3 pt-2 px-2 rounded-2xl bg-permaBlack md:w-282px w-164px">
    <div class="md:pb-4 pb-10px">
      <div class="cursor-pointer" @click="openLink(permaLink)">
        <div class="rounded-lg overflow-hidden md:w-258px md:h-258px w-148px h-148px flex items-end justify-center bg-permaBlack6">
          <div v-if="imageUrl" class="h-full relative">
            <img
              decoding="async"
              :src="imageUrl"
              :class="collectionName.includes('Winston-EVER') ? 'scale-125 translate-y-4' : ''"
              class="h-full w-full transform"
              style="object-fit:cover">
            <div v-if="dataUrl.length > 0" class="absolute bottom-0 left-0 w-full">
              <audio
                class="w-full audio"
                muted
                controls
                :src="dataUrl" />
            </div>
          </div>
          <img v-else src="@/images/occupancy.png" class="w-3/4 h-3/4">
        </div>
      </div>
      <div class="md:mt-4 mt-10px md:px-1 px-0.5 nftCardMInHeight">
        <div class="text-14px md:text-base truncate font-medium">
          {{ name }}
        </div>
        <div class="md:mt-0.5 text-12px md:text-14px text-permaWhite3 truncate font-normal">
          {{ collectionName }}
        </div>
      </div>
    </div>
    <Dashed class="h-px" />
    <NftCardInfo
      :symbol="symbol"
      :amount="amount"
      :address="owner"
      :perma-link="permaLink"
      :owner-link="ownerLink" />
  </div>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults } from 'vue'
import NftCardInfo from './NftCardInfo.vue'
import Dashed from './common/Dashed.vue'
import { openLink } from '@/lib/util'
interface Props {
  imageUrl: string
  owner: string
  name: string
  collectionName: string
  permaLink: string
  ownerLink: string
  amount: string
  symbol: string
  dataUrl: string
}
withDefaults(defineProps<Props>(), {
  imageUrl: require('../images/occupancy.png'),
  owner: '',
  name: '',
  collectionName: '',
  permaLink: '',
  ownerLink: '',
  amount: '',
  symbol: '',
  dataUrl: ''
})
</script>

<style>
.nftCardMInHeight{
  min-height: 42px
}
@media (min-width:768px) {
.nftCardMInHeight {
  min-height: 48px
}
}
audio {
  width: 100%;
}
audio::-webkit-media-controls-enclosure {
  max-width: none;
  border-radius: 0% !important;
  background-color: rgba(255, 255, 255, 0.65) !important;
}
audio::-webkit-media-controls-panel {
  background-color: rgba(255, 255, 255, 0.65) !important;
}
audio::-webkit-media-controls-current-time-display,
audio::-webkit-media-controls-time-remaining-display {
  color: #1e140d
}
</style>

<template>
  <ButtonActive :type="type" class="md:py-1.5 py-1 md:px-4 px-2 border border-solid rounded-md text-14px cursor-pointer transition-colors">
    {{ t('nft.view_more') }}
  </ButtonActive>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import ButtonActive from './ButtonActive.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
interface Props {
  type: 'nftBatchActive' | 'viewMoreActive'| 'onAuctionActive'
}
defineProps<Props>()
</script>

<style>
</style>

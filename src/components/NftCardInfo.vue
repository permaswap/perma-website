<template>
  <div class="md:mt-5 mt-10px">
    <div class="flex justify-between text-permaWhite3 text-12px">
      <span>{{ t('nft.price') }}</span>
      <span>{{ t('nft.owned_by') }}</span>
    </div>
    <div class="flex mt-0.5 justify-between md:text-base text-14px">
      <div class="flex items-center">
        <img :src="require(`@/images/${symbol}.png`)" class="mr-1 w-5 h-5">
        <span>{{ amount }}</span>
      </div>
      <div>
        {{ formatAddress }}
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
interface Props {
  symbol: string
  amount: string
  address: string
}
const props = defineProps<Props>()
const { t } = useI18n()
const formatAddress = computed(() => {
  return props.address.slice(0, 4) + '...' + props.address.slice(-2)
})
</script>

<style>
</style>

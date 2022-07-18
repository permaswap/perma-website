<template>
  <div class="flex justify-between md:mt-12 mt-6">
    <div v-for="(item,index) in ItemsArr" :key="index" class="text-center">
      <div class="md:text-2xl text-xl" :class="index === ItemsArr.length - 1 ? 'text-permaWhite3 flex mr-1 items-center justify-center' : 'cursor-pointer'">
        <TokenLogo v-if="index === ItemsArr.length - 1 && floorPrice" symbol="eth" class="w-6 h-6" />
        <span>{{ item.value }}</span>
      </div>
      <div class="text-permaWhite text-12px mt-1">
        {{ t(item.title) }}
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TokenLogo from '@/components/TokenLogo.vue'
interface Props {
  items: number
  owners: number
  floorPrice: number
}
const { t } = useI18n()
const props = defineProps<Props>()
const ItemsArr = computed(() => {
  return [
    {
      title: 'nft.items',
      value: props.items
    },
    {
      title: 'nft.owners',
      value: props.owners
    },
    {
      title: 'nft.floor_price',
      value: props.floorPrice ? props.floorPrice : '--'
    }
  ]
})
</script>

<style>
</style>

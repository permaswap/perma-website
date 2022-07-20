<template>
  <div class="flex flex-row">
    <div
      v-for="item in itemsTab"
      :key="item.id"
      class="cursor-pointer text-center md:text-xl text-base relative md:mr-8 mr-6 flex-col flex justify-between"
      :class="`${ item.id === tab ? 'text-permaGreen10 ' : 'text-permaWhite hover:text-white' } `"
      @click="switchTab(item.id)">
      <span>{{ t(item.value) }}</span>
      <div class="w-full rounded-lg bg-permaGreen10 md:mt-9px mt-1" :class="item.id === tab ? '' : 'hidden'" style="height:3px" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
interface Props {
  tab:number
}
defineProps<Props>()
interface Emits {
  (e:'switch', tabId:number):void
}
const emits = defineEmits<Emits>()
const { t } = useI18n()
const switchTab = (tabId:number) => {
  emits('switch', tabId)
}
const itemsTab = [
  {
    id: 1,
    value: 'nft.tab_items'
  },
  {
    id: 2,
    value: 'nft.tab_explore'
  }
]
</script>

<style>
</style>

<template>
  <div class="flex justify-between mt-11">
    <div v-for="(item,index) in ItemsArr" :key="index" class="text-center">
      <div class="text-2xl" :class="index === ItemsArr.length - 1 ? 'text-permaWhite3': 'cursor-pointer'">
        {{ item.value }}
      </div>
      <div class="text-permaWhite text-12px">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, computed } from 'vue'
interface Props {
  items: number
  owners: number
  floorPrice: number
}
const props = defineProps<Props>()
const ItemsArr = computed(() => {
  return [
    {
      title: 'items',
      value: props.items
    },
    {
      title: 'owners',
      value: props.owners
    },
    {
      title: 'floor price',
      value: props.floorPrice ? props.floorPrice : '--'
    }
  ]
})
</script>

<style>
</style>

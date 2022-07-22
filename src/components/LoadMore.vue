<template>
  <div class="relative md:mt-7 mt-4 flex justify-between items-center xl:w-1200px mx-auto px-4 xl:px-0">
    <div class="bg-permaWhite5 flex-1" style="height:1px" />
    <div v-if="noMore" class="px-10 opacity-50 md:text-14px text-12px">
      <span>{{ t('no_more') }}</span>
    </div>
    <div v-else class="flex px-10 items-center hover:opacity-100 opacity-50 cursor-pointer " @click="loadMore">
      <div class="md:text-14px text-12px">
        {{ t('load_more') }}
      </div>
      <div>
        <img v-show="loading" :src="require(`@/images/loading-white.svg`)" class="md:w-6  md:h-6 w-5 h-5 md:ml-2 ml-1 animate-spin">
        <img v-show="!loading" :src="require(`@/images/arrow-load-more.png`)" class="md:w-6  md:h-6 w-5 h-5 md:ml-2 ml-1">
      </div>
    </div>
    <div class="bg-permaWhite5 flex-1" style="height:1px" />
  </div>
</template>

<script setup lang='ts'>
import { defineEmits, defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
interface Emits {
  (e: 'loadMore'): void
}
interface Props {
  noMore: boolean
}
const { t } = useI18n()
defineProps<Props>()
const loading = ref(false)
const emits = defineEmits<Emits>()
const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    emits('loadMore')
    loading.value = false
  }, 300)
}
</script>

<style>
</style>

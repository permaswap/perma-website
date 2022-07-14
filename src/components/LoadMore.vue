<template>
  <div class="border border-b border-solid border-permaWhite5 relative md:mt-7 mt-4">
    <div class="absolute -top-3 transform w-full flex justify-center md:text-14px text-12px">
      <div v-if="noMore" class="px-10 opacity-50 bg-black">
        <span>{{ t('no_more') }}</span>
      </div>
      <div v-else class="flex px-10 bg-black hover:opacity-100 opacity-50 cursor-pointer" @click="loadMore">
        <span>{{ t('load_more') }}</span><img :src="require(`@/images/${loading ? 'loading-white.svg' : 'arrow-load-more.png'}`)" class="md:w-6  md:h-6 w-5 h-5 md:mr-2 mr-1" :class="loading ? 'animate-spin' : ''">
      </div>
    </div>
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

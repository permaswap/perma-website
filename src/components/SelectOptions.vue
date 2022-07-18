<template>
  <div
    class="flex flex-row items-center relative px-4 bg-permaGreen8 cursor-pointer border border-solid transition-colors"
    :class="`${visible ? 'border-permaGreen11 opacity-100' : 'border-permaBorderGreen opacity-80 hover:border-permaGreen9 hover:opacity-100'} ${borderRadius ? borderRadius : ''}`">
    <div class="flex items-center w-full justify-between">
      <slot /><img
        src="@/images/down.png"
        :class="visible ? 'rotate-180' : 'rotate-0'"
        class="w-5 h-5 ml-1 transform transition-all">
    </div>
    <transition name="fade">
      <div v-if="visible" class="absolute top-12 left-0 bg-black w-full overflow-hidden py-2 z-20" :class="borderRadius ? borderRadius : ''">
        <div
          v-for="(localeItem, index) in optionsList"
          :key="index"
          :class="`${currentOptions === localeItem.value ? 'bg-permaBlack5' : ''} ${index === optionsList.length ? '' : 'mb-2'}`"
          class="py-2 pl-4 w-full hover:bg-permaBlack5 hover:bg-opacity-70 transition-colors"
          @click="emits('switchOptions', localeItem)">
          {{ t(localeItem.label) }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
interface Options{
  label: string
  value: string
}
interface Props {
  currentOptions: string
  visible: boolean
  optionsList: Options[]
  borderRadius: string
}
interface Emits {
  (e:'switchOptions', options:Options):void
}
defineProps<Props>()
const { t } = useI18n()
const emits = defineEmits<Emits>()
</script>

<style>
</style>

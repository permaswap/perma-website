<template>
  <div class="md:w-280px w-full">
    <div
      class="flex justify-start items-center rounded-lg h-10 border  overflow-hidden w-full transition-colors"
      :class="modelValue || isFocus ? 'border-permaGreen11' : isHover ? 'border-permaGreen9' : 'border-permaBorderGreen'"
      @mousemove="isHover = true"
      @mouseout="isHover = false">
      <div class="relative w-full h-full">
        <input
          :value="modelValue"
          type="text"
          :placeholder="t('search')"
          class="focus:outline-none w-full h-full rounded-l-lg pl-3 pr-6 py-2 text-14px bg-permaGreen8 text-white"
          @keyup.enter="emits('search')"
          @input="handleInput"
          @focus="isFocus = true"
          @blur="isFocus = false">
        <div v-if="modelValue" class="absolute top-0 right-1 flex items-center h-full cursor-pointer" @click="emits('close')">
          <img src="@/images/close.svg" class="w-6 h-6" alt="">
        </div>
      </div>
      <div class="h-full flex items-center justify-center p-2 cursor-pointer transition-colors" :class="modelValue || isFocus ? 'bg-permaGreen11' : isHover ? 'bg-permaGreen9' : 'bg-permaBlack5'" @click="emits('search')">
        <img v-show="modelValue || isFocus || isHover" src="@/images/search-black.svg">
        <img v-show="!(modelValue || isFocus || isHover)" src="@/images/search-default.svg" class="h-6 w-6">
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineEmits, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
interface Emits {
  (e: 'search',): void
  (e: 'close'):void
  (e: 'update:modelValue', text:string):void
}
interface Props {
  modelValue:string
}
defineProps<Props>()
const emits = defineEmits<Emits>()
const { t } = useI18n()
const isFocus = ref(false)
const isHover = ref(false)
const handleInput = (e:any) => {
  emits('update:modelValue', e.target.value)
}

</script>

<style lang="scss" scoped>
input{
 &::-webkit-input-placeholder{
   color: rgba(255, 255, 255, 0.25);;
 }
}
</style>

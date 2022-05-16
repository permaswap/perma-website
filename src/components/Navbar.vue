<script lang="ts" setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { savedI18nStorageKey } from '@/constants'
import logo1 from '../images/logo1.png'
import logo3 from '../images/logo3.png'
import logo4 from '../images/logo4.png'

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  scrollTop: number
}>()

const { t, locale } = useI18n({ useScope: 'global' })

const changeLocale = (lang: string) => {
  window.localStorage.setItem(savedI18nStorageKey, lang)
  locale.value = lang
}

</script>

<template>
  <div
    class="px-4 lg:px-8 xl:px-14 w-full fixed flex flex-row items-center justify-between z-10"
    style="transition:padding .3s;"
    :class="scrollTop === 0 ? 'pt-3 lg:pt-16' : 'pt-3'"
  >
    <!-- PC 端 -->
    <img v-if="+scrollTop === 0" :src="logo3" class="hidden md:block h-6">
    <img v-else :src="logo4" class="hidden md:block h-8">
    <!-- 移动端 -->
    <img
      :src="logo1"
      class="h-5 block md:hidden"
    >
    <!-- PC 端中间 logo -->
    <img
      :src="logo1"
      class="h-8 absolute left-1/2 -translate-x-1/2"
      :class="scrollTop === 0 ? 'hidden lg:block' : 'hidden'"
    >
    <div class="flex flex-row items-center justify-end">
      <div class="flex flex-row items-center mr-4 md:mr-14 text-sm md:text-15px text-permaGrey">
        <span class="cursor-pointer" :class="locale === 'zh' ? 'text-white' : ''" @click="changeLocale('zh')">中文</span>
        <span class="h-3.5 w-px block mx-2 bg-permaGrey" />
        <span class="cursor-pointer" :class="locale === 'en' ? 'text-white' : ''" @click="changeLocale('en')">En</span>
      </div>
      <a
        href="#"
        class="text-white bg-black text-sm font-normal px-5 py-2.5 lg:text-base lg:font-medium lg:px-7 lg:py-3 hover:bg-permaGreen transition-all duration-300"
        style="border: 1px solid #84C085;">
        {{ t('white_paper') }}
      </a>
    </div>
  </div>
</template>

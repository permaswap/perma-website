<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { savedI18nStorageKey } from '@/constants'
import { checkParentsHas } from '@/lib/util'
defineProps<{
  scrollTop: number,
}>()
const isMenubarTarget = checkParentsHas('menu-bar')
const isLangWrapperTarget = checkParentsHas('lang-wrapper')
const { t, locale } = useI18n({ useScope: 'global' })
const mobileMenu = ref(false)
const changeLocale = (lang: string) => {
  window.localStorage.setItem(savedI18nStorageKey, lang)
  locale.value = lang
}
onMounted(() => {
  window.addEventListener('resize', () => {
    mobileMenu.value = false
  })
  document.addEventListener('click', (e) => {
    if (!isMenubarTarget(e.target as any)) {
      mobileMenu.value = false
    }
    if (!isLangWrapperTarget(e.target as any)) {
      languagesVisible.value = false
    }
  })
})
const navbarList = [
  {
    title: 'white_paper',
    to: locale.value === 'zh' ? 'https://mirror.xyz/permaswap.eth/kdg0iXx1jB-vXYEc_WEAeTNX_sGjv8BXksHxcFdoKjo' : 'https://mirror.xyz/permaswap.eth/ustZcDgavlm4xmYI26thEAj8W2cXlZpRkG5Jqz0iS14',
    open: true
  },
  {
    title: 'nft.certified_nft',
    to: '/nft',
    open: false
  }
]
const languagesVisible = ref(false)
const localeList = [
  {
    value: 'zh',
    label: '中文'
  },
  {
    value: 'en',
    label: 'En'
  }
]

</script>

<template>
  <div
    class="md:px-8 xl:px-14 w-full fixed mt-0 flex flex-row items-center justify-between z-10 px-4"
    style="transition:margin .4s;height: 80px;"
    :class="scrollTop === 0 ? 'md:mt-6 bg-black' : 'mt-0 navbar'"
  >
    <!-- PC 端 -->
    <router-link to="/">
      <img src="../images/logo4.png" class=" h-8">
    </router-link>
    <!-- PC 端中间 logo -->
    <!-- <img
      :src="logo1"
      class="h-8 absolute left-1/2 -translate-x-1/2"
      :class="scrollTop === 0 ? 'hidden lg:block' : 'hidden'"
    > -->
    <div class="md:block hidden">
      <div class="flex items-center">
        <div
          v-for="(item,index) in navbarList"
          :key="index"
          :class="index === navbarList.length - 1 ? 'mr-0' : 'lg:mr-16 mr-10'"
          class="flex flex-row items-center text-base">
          <router-link v-if="!item.open" :to="item.to" class="text-permaGreen5 hover:text-permaHoverGreen">
            {{ t(item.title) }}
          </router-link>
          <a
            v-else
            :href="item.to"
            class="text-permaWhite hover:text-permaWhite2"
            target="_blank">{{ t(item.title) }}</a>
        </div>
        <div class="flex flex-row items-center lang-wrapper text-14px lg:ml-16 ml-10 md:text-base relative text-permaGrey py-1 px-4 rounded cursor-pointer border-permaBorderGreen border border-solid" @click="languagesVisible = !languagesVisible">
          <span class="flex items-center"><span>{{ locale === 'zh' ? '中文' : 'En' }}</span><img src="@/images/down.png" :class="languagesVisible ? 'rotate-180' : 'rotate-0'" class="w-6 h-6 ml-1 transform transition-all"></span>
          <transition name="fade">
            <div v-if="languagesVisible" class="absolute top-9 left-0 bg-black w-full rounded-md">
              <div
                v-for="(localeItem,index) in localeList"
                :key="index"
                class="py-2 pl-3 w-full hover:bg-permaGreen3"
                @click="changeLocale(localeItem.value)">
                {{ localeItem.label }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div
      class="menu-bar flex flex-row items-center justify-center cursor-pointer md:hidden py-1 px-4 border border-solid border-permaBorderGreen rounded-md text-permaWhite"
      @click="mobileMenu = !mobileMenu"
    >
      Menu
    </div>
    <div
      v-if="mobileMenu"
      class="absolute text-sm"
      style="top:62px;height:1000px;width:100%;padding:16px;left:0;"
    >
      <div
        v-for="(item,index) in navbarList"
        :key="index"
        class="px-4 py-3 rounded"
        style="background: rgba(18, 18, 18, 0.98)">
        <router-link
          v-if="!item.open"
          :to="item.to"
          style="border-radius: 2px;"
          class="flex bg-permaGreen4 flex-row items-center justify-center py-3">
          {{ t(item.title) }}
        </router-link>
        <a
          v-else
          :href="item.to"
          class="flex flex-row items-center justify-center bg-permaGreen4 py-3"
          target="_blank">{{ t(item.title) }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(120px);
}
</style>

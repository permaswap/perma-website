<script lang="ts" setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { savedI18nStorageKey } from '@/constants'
import { checkParentsHas } from '@/lib/util'
import SelectOptions from './SelectOptions.vue'
import ModalWrapper from '@/components/common/ModalWrapper.vue'
import { Options } from '@/lib/types'
defineProps<{
  scrollTop: number,
}>()
const isMenubarTarget = checkParentsHas('menu-bar')
const isLangWrapperTarget = checkParentsHas('lang-wrapper')
const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const mobileMenu = ref(false)
const changeLocale = (lang: Options) => {
  window.localStorage.setItem(savedI18nStorageKey, lang.value)
  locale.value = lang.value
  meunLanguagesVisible.value = false
}
onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) {
      mobileMenu.value = false
      meunLanguagesVisible.value = false
    }
    languagesVisible.value = false
  })
  window.addEventListener('scroll', () => {
    if (window.innerWidth >= 640) {
      languagesVisible.value = false
    }
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
// const drakMode = () => {
//   const clsList = document.documentElement.classList
//   console.log(clsList)
//   if (!clsList.contains('dark')) {
//     document.documentElement.classList.add('dark')
//   }
// }
// const lightMode = () => {
//   console.log(document.documentElement.classList)
//   document.documentElement.classList.remove('dark')
// }
const routeName = computed(() => {
  return route.name as string
})
const navbarList = [
  {
    title: 'white_paper',
    to: locale.value === 'zh' ? 'https://mirror.xyz/permaswap.eth/kdg0iXx1jB-vXYEc_WEAeTNX_sGjv8BXksHxcFdoKjo' : 'https://mirror.xyz/permaswap.eth/ustZcDgavlm4xmYI26thEAj8W2cXlZpRkG5Jqz0iS14',
    routeNames: [],
    open: true
  },
  {
    title: 'nft.certified_nft',
    to: '/nft',
    routeNames: ['nft'],
    open: false
  }
]
const languagesVisible = ref(false)
const localeList = [
  {
    value: 'zh',
    label: 'languages_zh'
  },
  {
    value: 'en',
    label: 'languages_en'
  }
]
const meunLanguagesVisible = ref(false)
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
          <div
            v-if="!item.open"
            :class="item.routeNames.includes(routeName) ? 'text-permaGreen10 font-medium' : 'text-permaWhite hover:text-permaWhite2'">
            <router-link :to="item.to">
              {{ t(item.title) }}
            </router-link>
          </div>
          <a
            v-else
            target="_blank"
            class="hover:text-permaWhite2 text-permaWhite"
            :href="item.to">
            {{ t(item.title) }}
          </a>
        </div>
        <SelectOptions
          class="lang-wrapper lg:ml-16 ml-10 text-base py-1"
          :current-options="locale"
          :visible="languagesVisible"
          :options-list="localeList"
          border-radius="rounded-md"
          @click="languagesVisible = !languagesVisible"
          @switch-options="changeLocale">
          <span>{{ locale === 'zh' ? '简体中文' : 'English' }}</span>
        </SelectOptions>
      </div>
    </div>
    <div
      class="menu-bar flex flex-row items-center justify-center cursor-pointer md:hidden py-1 px-4 border border-solid rounded-md transition-all"
      :class="mobileMenu || meunLanguagesVisible ? 'border-permaGreen10 text-white' : 'border-permaBorderGreen text-permaWhite'"
      @click="mobileMenu = !mobileMenu"
    >
      Menu
    </div>
    <ModalWrapper :visible="mobileMenu">
      <div>
        <div
          class="fixed right-0 text-base w-4/6"
        >
          <div class="bg-permaBlack h-screen pt-8">
            <div
              v-for="(item,index) in navbarList"
              :key="index"
              class="mb-1 pl-8">
              <router-link
                v-if="!item.open"
                :to="item.to"
                :class="item.routeNames.includes(routeName) ? 'text-permaGreen10' : ''"
                class="transition-colors py-2 flex">
                {{ t(item.title) }}
              </router-link>
              <a
                v-else
                :href="item.to"
                :class="item.routeNames.includes(routeName) ? 'text-permaGreen10' : ''"
                class="transition-colors py-2 flex"
                target="_blank">{{ t(item.title) }}</a>
            </div>
            <div class="border-t mt-6 border-permaWhite5" />
            <div class="pl-8 mt-6">
              <div class="py-2 flex justify-between cursor-pointer" @click.stop="meunLanguagesVisible = !meunLanguagesVisible">
                <span>{{ locale === 'zh' ? '简体中文' : 'English' }}</span><img
                  src="@/images/down.png"
                  :class="meunLanguagesVisible ? 'rotate-180' : 'rotate-0'"
                  class="w-6 h-6  ml-1 mr-4 transform transition-all">
              </div>
              <div class="overflow-hidden transition-all duration-300" :style="`height:${meunLanguagesVisible ? '100px' : '0px'}`">
                <div
                  v-for="item in localeList"
                  :key="item.value"
                  class="py-2 mb-2 text-permaWhite cursor-pointer"
                  @click="changeLocale(item)">
                  {{ t(item.label) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  </div>
</template>

<style scoped>
.navbar {
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(120px);
}
</style>

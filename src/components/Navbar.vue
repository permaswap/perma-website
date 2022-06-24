<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { savedI18nStorageKey } from '@/constants'
import { checkParentsHas } from '@/lib/util'

defineProps<{
  scrollTop: number,
}>()

const isMenubarTarget = checkParentsHas('menu-bar')

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
  })
})

</script>

<template>
  <div
    class="navbar px-4 lg:px-8 xl:px-14 w-full fixed flex flex-row items-center justify-between z-10"
    style="transition:padding .3s;"
    :class="scrollTop === 0 ? 'py-3 lg:py-16' : 'py-3'"
  >
    <!-- PC 端 -->
    <router-link to="/">
      <img v-if="+scrollTop === 0" src="../images/logo3.png" class="hidden md:block h-6">
      <img v-else src="../images/logo4.png" class="hidden md:block h-8">
      <!-- 移动端 -->
      <img
        src="../images/logo1.png"
        class="h-5 block md:hidden"
      >
    </router-link>
    <!-- PC 端中间 logo -->
    <!-- <img
      :src="logo1"
      class="h-8 absolute left-1/2 -translate-x-1/2"
      :class="scrollTop === 0 ? 'hidden lg:block' : 'hidden'"
    > -->
    <div class="hidden md:flex flex-1 flex-row items-center justify-end mr-8">
      <router-link to="/nft">
        {{ t('nft.certified_nft') }}
      </router-link>
    </div>
    <div class="flex flex-row items-center justify-end">
      <div class="flex flex-row items-center mr-4 md:mr-14 text-sm md:text-15px text-permaGrey">
        <span class="cursor-pointer" :class="locale === 'zh' ? 'text-white' : ''" @click="changeLocale('zh')">中文</span>
        <span class="h-3.5 w-px block mx-2 bg-permaGrey" />
        <span class="cursor-pointer" :class="locale === 'en' ? 'text-white' : ''" @click="changeLocale('en')">En</span>
      </div>
      <a
        :href="locale === 'zh' ?
          'https://mirror.xyz/permaswap.eth/kdg0iXx1jB-vXYEc_WEAeTNX_sGjv8BXksHxcFdoKjo' :
          'https://mirror.xyz/permaswap.eth/ustZcDgavlm4xmYI26thEAj8W2cXlZpRkG5Jqz0iS14'"
        target="_blank"
        class="text-white bg-black text-sm font-normal px-5 py-2.5 lg:text-base lg:font-medium lg:px-7 lg:py-3 hover:bg-permaGreen transition-all duration-300"
        style="border: 1px solid #84C085;">
        {{ t('white_paper') }}
      </a>
      <div
        class="menu-bar flex flex-row items-center justify-center cursor-pointer md:hidden"
        style="width:42px;height:42px;box-sizing:border-box;background: linear-gradient(277.4deg, #3E583A 3.98%, rgba(128, 158, 123, 0.36) 98.4%);border: 1px solid #84C085;border-left:none;"
        @click="mobileMenu = !mobileMenu"
      >
        <img class="" src="../images/menu.png">
      </div>
    </div>
    <div
      v-if="mobileMenu"
      class="absolute text-sm"
      style="top:62px;height:1000px;width:100%;padding:16px;left:0;"
    >
      <div style="background: rgba(18, 18, 18, 0.98);border-radius: 4px;padding: 16px;">
        <router-link to="/nft" style="background: #0D2A14;border-radius: 2px;" class="flex flex-row items-center justify-center py-3">
          {{ t('nft.certified_nft') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background: rgba(18, 18, 18, 0.65);
}
@media (min-width: 1024px) {
  .navbar {
    background: none;
  }
}
</style>

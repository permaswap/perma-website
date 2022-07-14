<template>
  <Active class="md:py-1.5 py-1 md:px-4 px-2 border border-solid rounded-md text-14px cursor-pointer" :class-name="className" :default-class-name="defaultClassName">
    {{ t('nft.view_more') }}
  </Active>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults } from 'vue'
import Active from './Active.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
interface Props {
  className: string
  defaultClassName: string
}

withDefaults(defineProps<Props>(), {
  className: '',
  defaultClassName: ''
})

</script>

<style>
</style>

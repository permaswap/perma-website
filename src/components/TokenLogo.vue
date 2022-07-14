<template>
  <img :src="require(`@/images/token/${logonName}`)" alt="">
</template>

<script setup lang='ts'>
import { computed, defineProps } from 'vue'
const tokenListHasLogo = [
  'wbtc',
  'vrt',
  'usdt',
  'usdc',
  'uni',
  'sos',
  'eth',
  'dai',
  'ar',
  'ardrive',
  'xyz',
  'glmr',
  'dodo',
  'mask',
  'bank',
  'cfx',
  'zlk',
  't4ever',
  'fox',
  'bnb'
]
interface Props {
  symbol: string
}
const props = defineProps<Props>()
const logonName = computed(() => {
  if (props.symbol && tokenListHasLogo.some(name => name === props.symbol.toLowerCase())) {
    return `${props.symbol.toLowerCase()}.png`
  } else {
    return 'default.svg'
  }
})
</script>

<style>
</style>

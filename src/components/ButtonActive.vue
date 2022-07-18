<template>
  <button :class="type">
    <slot />
  </button>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
interface Props {
  type: 'nftBatchActive' | 'viewMoreActive'| 'onAuctionActive'
}
defineProps<Props>()

</script>

<style lang="scss">
.nftHeadsActive:active{
  background-color: #5AAD67;
}
.viewMoreActive:active{
  border-color: #5AAD67;
  color: #5AAD67;
}
.onAuctionActive:active{
  border-color: #5AAD67;
  color: #5AAD67;
  .onAuctionSvg{
    background-image: url('../images/arrow-right-green-active.svg') !important;
  }
}

</style>

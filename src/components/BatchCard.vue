<template>
  <div class="w-279px">
    <div class="w-152px h-152px bg-permaWhite4 p-1.5 rounded-xl">
      <div class="rounded-xl overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/esFloHANgGEXjKz9ff2mLNVG6LKEjkcEjnhe1_fOQr7Yob0BjwW1kfNXEzbFlfq2sFcfBRJRPuljNvAYcly8Qshjuu-aY1LzH4h0KDs"
          alt="">
      </div>
    </div>
    <div class="mt-6 text-18px truncate">
      Wonderland and the WonderldWonderland and the Wonderld
    </div>
    <div class="text-14px mt-3 text-permaWhite text-info">
      BitKeep and everPay's new collection is ready to go! Someone bornin a tiger hhhh year...Someone bornin a tiger
      hhhh hhh..
    </div>
    <BatchInfoItems :items="9" :owners="9" :floor-price="0" />
    <ViewMoreVue class="mt-8 inline-block" />
  </div>
</template>

<script setup lang='ts'>
import BatchInfoItems from './BatchInfoItems.vue'
import ViewMoreVue from './ViewMore.vue'
</script>

<style scoped>
.text-info {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

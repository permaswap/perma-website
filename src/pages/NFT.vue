<script lang="ts" setup>
import { getNfts } from '@/lib/api'
import { computed, onMounted, Ref, ref } from 'vue'
import iconDropdown from '../images/icon-dropdown.png'
import iconDropdown2 from '../images/icon-dropdown2.png'

// eslint-disable-next-line no-unused-vars
const windowWidth = ref(document.documentElement.offsetWidth)
const sortbarVisible = ref(false)
const showMoreSaleItems = ref(false)
const sortIndex = ref(2)
const nfts: Ref<any[]> = ref([])
const saleNfts = computed(() => {
  return nfts.value.filter((nft) => {
    return nft.price !== ''
  }).sort((nft1, nft2) => {
    if (sortIndex.value === 2) {
      return 0
    } else if (sortIndex.value === 0) {
      return +nft1.price - +nft2.price
    } else {
      return +nft2.price - +nft1.price
    }
  })
})
const saleNftLines = computed(() => {
  const result: any[] = []
  let lines: any[] = []
  const splitItem = windowWidth.value > 1200 ? 3 : 2
  saleNfts.value.forEach((element, index) => {
    lines.push(element)
    if (lines.length === splitItem) {
      result.push(lines)
      lines = []
    }
    if (index === saleNfts.value.length - 1 && lines.length) {
      result.push(lines)
    }
  })
  return result
})

onMounted(async () => {
  window.addEventListener('resize', () => {
    windowWidth.value = document.documentElement.offsetWidth
  })
  nfts.value = await getNfts()
})

</script>

<template>
  <div style="box-sizing:border-box;" class="px-4 xl:w-1200px mx-auto pt-40 lg:pt-60">
    <div class="pb-12 lg:pb-40">
      <h1 class="pb-2 font-bold text-28px lg:text-55px">
        Certified NFT
      </h1>
      <p class="text-base lg:text-24px font-light" style="color: rgba(255, 255, 255, 0.65);">
        Holders of everPay NFT can participate in permaswap pioneer mining.
      </p>
    </div>

    <div class="onsale-area">
      <div class="flex flex-row items-center justify-between">
        <h2 class="text-18px lg:text-24px">
          NFT on sale
        </h2>
        <div class="text-sm lg:text-18px text-nftGreen cursor-pointer flex flex-row items-center relative" @click="sortbarVisible = !sortbarVisible">
          <span v-if="sortIndex === 0">Price: Low to High</span>
          <span v-else-if="sortIndex === 1">Price: High to Low</span>
          <span v-else-if="sortIndex === 2">Sort by</span>
          <img :src="iconDropdown" class="transition delay-300 transform" :class="`${sortbarVisible ? 'rotate-180' : 'rotate-0'}`">
          <ul
            v-if="sortbarVisible"
            class="dropdown-area absolute text-white w-200px right-0 top-10 text-right bg-black opacity-90"
            style="color:rgba(255, 255, 255, 0.85);">
            <li class="py-4 px-6" @click="sortIndex = 0">
              Price: Low to High
            </li>
            <li class="py-4 px-6" @click="sortIndex = 1">
              Price: High to Low
            </li>
            <li class="py-4 px-6" @click="sortIndex = 2">
              Reset
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div
          v-for="(lines, linesIndex) in (showMoreSaleItems ? saleNftLines : saleNftLines.slice(0, 2))"
          :key="linesIndex"
          class="flex flex-row items-center justify-between mt-6 md:mt-12">
          <a
            v-for="(item, itemIndex) in lines"
            :key="itemIndex"
            class="block sale-item"
            target="_blank"
            :href="item.permaLink"
          >
            <div class="sale-item-img-wrap mb-2 md:mb-6 flex flex-row items-center justify-center">
              <img class="sale-item-img" :src="item.imageUrl">
            </div>
            <div class="flex flex-row items-center justify-between text-sm md:text-20px">
              <span
                class="w-20 md:w-40 "
                style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;color: rgba(255, 255, 255, 0.85);">
                {{ item.name }}
              </span>
              <span>{{ item.price }} {{ item.priceSymbol }}</span>
            </div>
          </a>
        </div>
      </div>
      <div v-if="saleNftLines.length > 2" class="flex flex-row items-center justify-center md:justify-end mt-8 md:mt-16">
        <span
          class="text-sm md:text-20px cursor-pointer"
          style="color:rgba(132, 192, 133, 0.65)"
          @click="showMoreSaleItems = !showMoreSaleItems">{{ showMoreSaleItems ? 'Collect' : 'View More' }}</span>
        <img
          :src="iconDropdown2"
          class="transition delay-300 transform  cursor-pointer"
          :class="`${showMoreSaleItems ? 'rotate-180' : 'rotate-0'}`"
          @click="showMoreSaleItems=!showMoreSaleItems">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-area li {
  &:hover {
    background: rgba(132, 192, 133, 0.1);
  }
}
.sale-item {
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-sizing: border-box;
  width: 164px;
  padding: 8px;
}
.sale-item-img-wrap {
  width:148px;
  height:148px;
}
.sale-item-img {
  max-height:148px;
  max-width: 148px;
  display: block;
}
@media (min-width: 768px) {
  .sale-item {
    border: 3px solid rgba(255, 255, 255, 0.25);
    box-sizing: border-box;
    width: 354px;
    padding: 24px;
  }
  .sale-item-img-wrap {
    width:300px;
    height:300px;
  }
  .sale-item-img {
    max-height:300px;
    max-width: 300px;
    display: block;
  }
}
</style>

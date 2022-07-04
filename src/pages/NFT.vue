<script lang="ts" setup>
import { getNfts } from '@/lib/api'
import { computed, onMounted, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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

const nftCollections = computed(() => {
  const result: string[] = []
  nfts.value.forEach((nft) => {
    if (!result.includes(nft.collectionName)) {
      result.push(nft.collectionName)
    }
  })
  return result
})

const batchNftStack = computed(() => {
  const stack = {} as any
  nfts.value.forEach((nft) => {
    if (stack[nft.collectionName] == null) {
      stack[nft.collectionName] = []
    }
    stack[nft.collectionName].push(nft)
  })
  return stack
})

const activeName = ref('')
const handleActive = (name: string) => {
  if (activeName.value === name) {
    activeName.value = ''
  } else {
    activeName.value = name
  }
}

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
      <h1 class="pb-2 font-bold text-32px lg:text-5xl">
        {{ t('nft.certified_nft') }}
      </h1>
      <p class="text-base lg:text-2xl font-light" style="color: rgba(255, 255, 255, 0.65);">
        {{ t('nft.certified_nft_desc') }}
      </p>
    </div>

    <div class="onsale-area">
      <div class="flex flex-row items-center justify-between">
        <h2 class="text-18px lg:text-2xl">
          {{ t('nft.nft_on_sale') }}
        </h2>
        <div class="text-sm lg:text-18px text-nftGreen cursor-pointer flex flex-row items-center relative" @click="sortbarVisible = !sortbarVisible">
          <span v-if="sortIndex === 0">{{ t('nft.price_low_to_high') }}</span>
          <span v-else-if="sortIndex === 1">{{ t('nft.price_high_to_low') }}</span>
          <span v-else-if="sortIndex === 2">{{ t('nft.sort_by') }}</span>
          <img src="@/images/icon-dropdown.png" class="transition delay-300 transform" :class="`${sortbarVisible ? 'rotate-180' : 'rotate-0'}`">
          <ul
            v-if="sortbarVisible"
            class="dropdown-area absolute text-white w-200px right-0 top-10 text-right bg-black opacity-90"
            style="color:rgba(255, 255, 255, 0.85);">
            <li class="py-4 px-6" @click="sortIndex = 0">
              {{ t('nft.price_low_to_high') }}
            </li>
            <li class="py-4 px-6" @click="sortIndex = 1">
              {{ t('nft.price_high_to_low') }}
            </li>
            <li class="py-4 px-6" @click="sortIndex = 2">
              {{ t('nft.reset') }}
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
            <div class="flex flex-row items-center justify-between text-sm md:text-xl">
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
          class="text-sm md:text-xl cursor-pointer"
          style="color:rgba(132, 192, 133, 0.65)"
          @click="showMoreSaleItems = !showMoreSaleItems">{{ showMoreSaleItems ? t('nft.collect') : t('nft.view_more') }}</span>
        <img
          src="@/images/icon-dropdown2.png"
          class="transition delay-300 transform  cursor-pointer"
          :class="`${showMoreSaleItems ? 'rotate-180' : 'rotate-0'}`"
          @click="showMoreSaleItems=!showMoreSaleItems">
      </div>
    </div>

    <div class="ethereum-nft-area pt-8 md:pt-24">
      <h3 class="text-lg md:text-2xl">
        Ethereum NFTs
      </h3>
      <div>
        <div
          v-for="(name, nameIndex) in nftCollections"
          :key="nameIndex"
          class="mt-4 collection-item"
        >
          <div class="flex flex-row items-center justify-between cursor-pointer p-2 md:py-12 md:px-16" @click="handleActive(name)">
            <div class="flex flex-row items-center justify-start">
              <div class="flex flex-row items-center justify-center collection-img-wrap mr-2 md:mr-8">
                <img :src="batchNftStack[name][0].imageUrl" class="collection-img">
              </div>
              <div class="collection-main">
                <p class="collection-main-name">
                  {{ name }}
                </p>
                <p class="collection-main-desc">
                  {{ t('nft.click_to_see_more') }}
                </p>
              </div>
            </div>
            <img src="@/images/icon-dropdown3.png" class="transition delay-300 transform" :class="`${activeName === name ? 'rotate-180' : 'rotate-0'}`">
          </div>
          <div class="p-2 md:pb-12 md:px-16" :class="activeName === name ? 'block' : 'hidden'">
            <table style="width:100%">
              <thead>
                <tr style="background: rgba(40, 66, 34, 0.2);border-radius: 4px;color: rgba(255, 255, 255, 0.85);">
                  <th class="py-1 pl-2 text-left" style="width:30%">
                    {{ t('nft.nft_name') }}
                  </th>
                  <th class="text-left" style="width:30%;">
                    {{ t('nft.state') }}
                  </th>
                  <th class="pr-2 text-right" style="width:40%;">
                    {{ t('nft.holder') }}
                  </th>
                </tr>
              </thead>
              <tbody style="color: rgba(255, 255, 255, 0.65);">
                <tr
                  v-for="(nft, nftIndex) in batchNftStack[name]"
                  :key="nftIndex"
                >
                  <td class="py-3 pl-2 text-left">
                    <a :href="nft.permaLink" target="_blank">{{ nft.name }}</a>
                  </td>
                  <td class="text-left" style="width:30%;">
                    <a :href="nft.permaLink" target="_blank">{{ nft.price ? t('nft.state_on_sale') : (nft.offer ? t('nft.state_under_bid') : t('nft.state_bidding')) }}</a>
                  </td>
                  <td class="pr-2 text-right" style="">
                    <a :href="`https://opensea.io/${nft.owner}`" target="_blank">{{ nft.owner.slice(0, 4) }}...{{ nft.owner.slice(-4) }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="arweave-nft-area py-8 md:py-24">
      <h3 class="text-lg md:text-2xl">
        Arweave NFTs
      </h3>
      <div
        class="text-center cursor-not-allowed font-bold mt-4 md:mt-8 text-sm md:text-base py-3 w-32 md:w-36"
        style="color:#5D806E;background: linear-gradient(268.01deg, rgba(41, 41, 41, 0.8) -9.16%, rgba(51, 51, 51, 0.8) 109.32%);"
      >
        {{ t('coming_soon') }}
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
.collection-item {
  background: #171717;
  border-radius: 4px;
}
.collection-img-wrap {
  width: 82px;
  height: 82px;
}
.collection-img {
  max-width: 82px;
  max-height: 82px;
}
.collection-main {
  width: 220px;
}
.collection-main-desc {
  margin-top: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
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
  .collection-item {
    border-radius: 8px;
  }
  .collection-img-wrap {
    width: 148px;
    height: 148px;
  }
  .collection-img {
    max-width: 148px;
    max-height: 148px;
  }
  .collection-main {
    width: auto;
  }
  .collection-main-name {
    font-size: 24px;
  }
  .collection-main-desc {
    margin-top: 16px;
    font-size: 18px;
  }
}
</style>

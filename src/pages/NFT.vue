<script lang="ts" setup>
import { onMounted, ref, computed, onActivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { goHTMLPosition } from '@/lib/util'
import NftCard from '@/components/NftCard.vue'
import LabelItem from '@/components/LabelItem.vue'
import NftHeads from './NFT/NftHeads.vue'
import ViewMore from '@/components/ViewMore.vue'
import Footer from '../components/Footer.vue'
import NftModel from './NFT/NftModel.vue'
const { t } = useI18n()
const store = useStore()
const ethNetworkErr = ref(false)
const arNetworkErr = ref(false)
const windowWidth = ref(document.documentElement.offsetWidth)
const allEthNfts = computed(() => store.state.ethNfts)
const allArNfts = computed(() => store.state.arNfts)
const hotNftsList = computed(() => store.state.hotNfts)
const ethBatchsNfts = computed(() => store.state.ethBatchNfts)
const arBatchsNfts = computed(() => store.state.arBatchNfts)

onActivated(() => {
  sessionStorage.removeItem('scrollTop')
})
onMounted(async () => {
  await store.dispatch('updateHotNftsInfoAsync')
  if (!allEthNfts.value.length || !ethBatchsNfts.value.length) {
    try {
      await store.dispatch('updateEthBatchInfoAsync')
      await store.dispatch('updateEthNftsInfoAsync')
    } catch {
      ethNetworkErr.value = true
    }
  }
  if (!allArNfts.value.length || !arBatchsNfts.value.length) {
    try {
      await store.dispatch('updateArNftsInfoAsync')
      await store.dispatch('updateArBatchInfoAsync')
    } catch {
      arNetworkErr.value = true
    }
  }
  document.documentElement.scrollTop = 0
  window.addEventListener('resize', () => {
    windowWidth.value = document.documentElement.offsetWidth
  })
})
const ethSortOptions = [
  {
    value: 'listing',
    label: 'recently_listed'
  },
  {
    value: 'descending',
    label: 'price_high_low'
  },
  {
    value: 'ascending',
    label: 'price_low_high'
  }
]
const ethFilterOptions = [
  {
    value: 'all',
    label: 'all_status'
  },
  {
    value: 'buy',
    label: 'buy_now'
  },
  {
    value: 'auction',
    label: 'on_auction'
  }
]
const arSortOptions = [
  {
    value: 'listing',
    label: 'recently_listed'
  }
]
</script>

<template>
  <div class="relative">
    <img src="@/images/ar-nft-bg.png" class="ar-nfts-img absolute bottom-0 right-0" alt="">
    <NftHeads class="md:pt-52 pt-32" />
    <div class="hot-nfts relative" style="min-height: 500px;">
      <img src="@/images/hot-nft-bg.png" class="hot-nfts-img absolute" alt="">
      <div class="xl:w-1200px px-4 xl:px-0 mx-auto md:mt-20 mt-14">
        <LabelItem :label="t('nft.hot_nfts')">
          <ViewMore
            class="hover:border-permaGreen9 hover:text-permaGreen9 border-permaBorderGreen text-permaWhite2"
            type="viewMoreActive"
            @click="goHTMLPosition('ethnfts')">
            {{ t('nft.view_more') }}
          </ViewMore>
        </LabelItem>
        <div class="md:mt-10  mt-4 flex flex-wrap justify-between grid-nft">
          <NftCard
            v-for="(nftItem, index) in (windowWidth > 650 ? hotNftsList : hotNftsList.slice(0, 4))"
            :key="index"
            class="sm:mb-6 mb-4 transform transition-all"
            :class="nftItem.imageUrl ? 'hover:-translate-y-2 hover:bg-permaBlack6' : ''"
            :image-url="nftItem.imageUrl"
            :owner="nftItem.owner"
            :collection-name="nftItem.collectionName"
            :name="nftItem.name"
            :data-url="nftItem.dataUrl"
            :amount="nftItem.price"
            :symbol="nftItem.priceSymbol"
            :perma-link="nftItem.permaLink"
            :owner-link="nftItem.ownerLink" />
        </div>
      </div>
    </div>
    <NftModel
      id="ethnfts"
      :check-parents="['sortEthSelect','filterEthSelect']"
      label="Ethereum NFTs"
      :sort-options-arr="ethSortOptions"
      :filter-options-arr="ethFilterOptions"
      :collection-batchs="ethBatchsNfts"
      :net-work-err="ethNetworkErr"
      :all-nfts-list="allEthNfts" />
    <NftModel
      id="arnfts"
      :check-parents="['sortArSelect','filterArSelect']"
      label="Arweave NFTs"
      :sort-options-arr="arSortOptions"
      :filter-options-arr="[]"
      :collection-batchs="arBatchsNfts"
      :net-work-err="arNetworkErr"
      :all-nfts-list="allArNfts" />
    <div>
      <Footer :window-width="windowWidth" />
    </div>
  </div>
</template>

<style lang="scss">
.grid-nft {
  display: grid;
  grid-template-columns: repeat(auto-fill, 164px);
}

.hot-nfts-img {
  display: none;
}

.ar-nfts-img {
  width: 375px;
  height: 400px;
}

@media (min-width:768px) {
  .grid-nft {
    display: grid;
    grid-template-columns: repeat(auto-fill, 282px);
  }

  .hot-nfts-img {
    display: block;
    width: 33%;
    bottom: -260px;
  }

  .ar-nfts-img {
    width: 575.07px;
    height: 620.35px;
  }
}

.ethereum-nft-area {
  background: linear-gradient(180deg, rgba(24, 59, 33, 0) 0%, rgba(24, 59, 33, 0.15) 16.67%, rgba(24, 59, 33, 0.25) 49.09%, rgba(24, 59, 33, 0.15) 76.78%, rgba(24, 59, 33, 0) 100%);
}

.batch-box:hover {
  .line {
    visibility: hidden;
  }
}
</style>

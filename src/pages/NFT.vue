<script lang="ts" setup>
import { getHotNfts, getNftCollections, getSearchNFTs, getNfts } from '@/lib/api'
import { onMounted, ref, watch, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Collection, NftInfo, Options } from '@/lib/types'
import { goToNfts, checkParentsHas, formatNFTList } from '@/lib/util'
import NftCard from '@/components/NftCard.vue'
import LabelItem from '@/components/LabelItem.vue'
import NftHeads from './NFT/NftHeads.vue'
import BatchCard from '../components/BatchCard.vue'
import Active from '@/components/Active.vue'
import LoadMore from '@/components/LoadMore.vue'
import Tabs from '@/components/Tabs.vue'
import SeachInput from '@/components/SearchInput.vue'
import SelectOptions from '@/components/SelectOptions.vue'
import Footer from '../components/Footer.vue'
import notSearchFound from '@/components/notSearchFound.vue'
const { t } = useI18n()
const windowWidth = ref(document.documentElement.offsetWidth)
const hotNfts = ref<NftInfo[]>([])
const collectionBatchs = ref<Collection[]>([])
const isSortSelectTarget = checkParentsHas('sortSelect')
const isFilterSelectTarget = checkParentsHas('filterSelect')
const allNfts = ref<NftInfo[]>([])
const SortFilterNFts = ref<NftInfo[]>([])
const collectionNft = ref<Collection[]>([])
const sliceNfts = ref<NftInfo[]>([])
const batchNftLength = ref(0)
const exploreNftLength = ref(0)
const searchText = ref('')
const searchLoading = ref(false)
const networkError = ref(false)
const noResults = computed(() => !sliceNfts.value.length)
const nftBoxWidth = ref(0)
const tabOptions = ref(1)
const sortOptionsVisible = ref(false)
const filterOptionsVisible = ref(false)
const hoverIndex = ref(0)
const getNftsInit = async () => {
  try {
    networkError.value = false
    searchLoading.value = true
    const hotNftArr = await getHotNfts()
    hotNfts.value = hotNftArr.sort((a, b) => {
      return +b.price - +a.price
    })
    collectionBatchs.value = await getNftCollections()
    allNfts.value = await getNfts()
    SortFilterNFts.value = formatNFTList(allNfts.value, filterOptions.value.value, sortOptions.value.value)
    loadMoreBatchNft()
    loadMoreNft()
    setTimeout(() => {
      searchLoading.value = false
    }, 300)
  } catch (error) {
    networkError.value = true
  }
}
getNftsInit()

const searchNfts = async (text: string) => {
  try {
    networkError.value = false
    exploreNftLength.value = 20
    if (text) {
      searchLoading.value = true
      allNfts.value = await getSearchNFTs(text)
      SortFilterNFts.value = formatNFTList(allNfts.value, filterOptions.value.value, sortOptions.value.value)
      sliceNfts.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
      setTimeout(() => {
        searchLoading.value = false
        goToNfts('ethnfts')
      }, 300)
    } else {
      allNfts.value = await getNfts()
      SortFilterNFts.value = formatNFTList(allNfts.value, filterOptions.value.value, sortOptions.value.value)
      sliceNfts.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
    }
  } catch (error) {
    networkError.value = true
  }
}
const viewMoreBatchNfts = (batchName: string) => {
  searchText.value = batchName
  tabOptions.value = 2
  goToNfts('ethnfts')
  searchNfts(batchName)
}
const loadMoreBatchNft = () => {
  if (batchNftLength.value < collectionBatchs.value.length) {
    batchNftLength.value = batchNftLength.value + (window.innerWidth > 768 ? 10 : 2)
    collectionNft.value = collectionBatchs.value.slice(0, batchNftLength.value)
  }
}
const loadMoreNft = () => {
  if (exploreNftLength.value < SortFilterNFts.value.length) {
    exploreNftLength.value = exploreNftLength.value + (window.innerWidth > 768 ? 20 : 10)
    sliceNfts.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
  }
}
const switchTab = (tabId: number) => {
  tabOptions.value = tabId
}

watch(() => tabOptions.value, () => {
  nextTick(() => {
    nftBoxWidth.value = (document.getElementById('collection') as HTMLElement).offsetWidth
  })
})
const sortOptionsList = [
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

const sortOptions = ref(sortOptionsList[0])
const switchSortOptions = async (options: Options) => {
  sortOptions.value = options
  const { value } = filterOptions.value
  SortFilterNFts.value = formatNFTList(allNfts.value, value, options.value)
  sliceNfts.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
}

const filterOptionsList = [
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

const filterOptions = ref(filterOptionsList[0])
const switchFilterOptions = async (options: Options) => {
  filterOptions.value = options
  const { value } = sortOptions.value
  SortFilterNFts.value = formatNFTList(allNfts.value, options.value, value)
  sliceNfts.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
}
onMounted(async () => {
  window.addEventListener('resize', () => {
    windowWidth.value = document.documentElement.offsetWidth
    batchNftLength.value = window.innerWidth > 768 ? 10 : 2
    collectionNft.value = collectionBatchs.value.slice(0, batchNftLength.value)
    exploreNftLength.value = window.innerWidth > 768 ? 20 : 10
    sliceNfts.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
  })
  document.addEventListener('click', (e) => {
    if (!isSortSelectTarget(e.target as any)) {
      sortOptionsVisible.value = false
    }
    if (!isFilterSelectTarget(e.target as any)) {
      filterOptionsVisible.value = false
    }
  })
})
</script>

<template>
  <div class="md:pt-52 pt-32 relative">
    <img src="@/images/ar-nft-bg.png" class="ar-nfts-img absolute bottom-0 right-0" alt="">
    <NftHeads />
    <div class="hot-nfts relative">
      <img src="@/images/hot-nft-bg.png" class="hot-nfts-img absolute" alt="">
      <div class="xl:w-1200px px-4 xl:px-0 mx-auto md:mt-20 mt-14">
        <LabelItem :title="t('nft.hot_nfts')">
          <Active
            class-name="border-permaGreen11 text-permaGreen11"
            default-class-name="border-permaBorderGreen text-permaWhite2"
            class="md:py-1.5 py-1 md:px-4 px-2 hover:border-permaGreen9 hover:text-permaGreen9 border border-solid rounded-md text-14px cursor-pointer transition-colors"
            @click="goToNfts('ethnfts')">
            {{ t('nft.view_more') }}
          </Active>
        </LabelItem>
        <div class="md:mt-10  mt-4 flex flex-wrap justify-between grid-nft">
          <NftCard
            v-for="(nftItem, index) in (windowWidth > 650 ? hotNfts : hotNfts.slice(0, 4))"
            :key="index"
            class="sm:mb-6 mb-4 hover:-translate-y-2 hover:bg-permaBlack6 transform transition-all"
            :image-url="nftItem.imageUrl"
            :owner="nftItem.owner"
            :collection-name="nftItem.collectionName"
            :name="nftItem.name"
            :amount="nftItem.price"
            :symbol="nftItem.priceSymbol"
            :perma-link="nftItem.permaLink"
            :owner-link="nftItem.ownerLink" />
        </div>
      </div>
    </div>

    <div id="ethnfts" class="ethereum-nft-area pt-8 md:pt-20">
      <div class="xl:w-1200px mx-auto px-4 xl:px-0">
        <LabelItem title="Ethereum NFTs" />
        <div class="flex justify-between md:items-center items-start flex-col md:flex-row md:mt-6 mt-3">
          <Tabs :tab="tabOptions" @switch="switchTab" />
          <div v-show="tabOptions === 2" class="flex items-center md:flex-row flex-col md:mt-0 mt-6 md:w-auto w-full">
            <SeachInput
              v-model="searchText"
              class="md:hidden block"
              @search="searchNfts(searchText)"
              @close="searchText = ''" />
            <div class="flex flex-row mt-4 w-full md:w-auto md:mt-0 justify-between">
              <SelectOptions
                class="filterSelect md:mr-6 mr-4 flex-1 md:flex-none"
                :options-list="filterOptionsList"
                :visible="filterOptionsVisible"
                :current-options="filterOptions.value"
                @click="filterOptionsVisible = !filterOptionsVisible; sortOptionsVisible = false"
                @switchOptions="switchFilterOptions">
                <span class="md:mr-5">{{ t(filterOptions.label) }}</span>
              </SelectOptions>
              <SelectOptions
                class="sortSelect md:mr-6 flex-1 md:flex-none"
                :options-list="sortOptionsList"
                :visible="sortOptionsVisible"
                :current-options="sortOptions.value"
                @click="sortOptionsVisible = !sortOptionsVisible; filterOptionsVisible = false"
                @switchOptions="switchSortOptions">
                <span class="md:mr-5 whitespace-nowrap">{{ t(sortOptions.label) }}</span>
              </SelectOptions>
            </div>
            <SeachInput
              v-model="searchText"
              class="md:block hidden"
              @search="searchNfts(searchText)"
              @close="searchText = ''" />
          </div>
        </div>
      </div>
      <div v-show="tabOptions === 1">
        <div v-for="(collection, index) in collectionNft" :key="collection.name" class="xl:w-1264px mx-auto batch-box">
          <BatchCard
            :key="collection.name"
            :name="collection.name"
            :image-url="collection.image_url"
            :stats="collection.stats"
            :nft-box-width="nftBoxWidth"
            @viewMore="viewMoreBatchNfts"
            @mousemove="hoverIndex = index"
            @mouseout="hoverIndex = 0" />
          <div
            class="border border-b border-dashed line border-permaWhite5"
            :class="(hoverIndex - 1) === index || (index === collectionNft.length - 1) ? 'invisible' : ''" />
        </div>
        <LoadMore :no-more="batchNftLength >= collectionBatchs.length" @loadMore="loadMoreBatchNft" />
      </div>

      <div v-show="tabOptions === 2" class="xl:w-1200px mx-auto px-4 xl:px-0">
        <notSearchFound v-if="networkError" :title="t('network_err')" />
        <notSearchFound v-else-if="searchLoading" :title="t('searching')" />
        <notSearchFound v-else-if="noResults" :title="t('no_results')" />
        <div v-else>
          <div class="flex flex-wrap justify-between grid-nft md:mt-10 mt-6">
            <NftCard
              v-for="(nftItem, index) in sliceNfts"
              :key="index"
              class="sm:mb-6 mb-4"
              :image-url="nftItem.imageUrl"
              :owner="nftItem.owner"
              :collection-name="nftItem.collectionName"
              :name="nftItem.name"
              :amount="nftItem.price"
              :symbol="nftItem.priceSymbol"
              :perma-link="nftItem.permaLink"
              :owner-link="nftItem.ownerLink" />
          </div>
          <LoadMore :no-more="exploreNftLength >= SortFilterNFts.length" @loadMore="loadMoreNft" />
        </div>
      </div>
    </div>
    <div class="arweave-nft-area md:mt-32 mt-12">
      <div class="xl:w-1200px mx-auto px-4 xl:px-0">
        <h3 class="text-lg md:text-2xl">
          Arweave NFTs
        </h3>
        <div
          class="text-center cursor-not-allowed font-bold mt-4 md:mt-8 text-sm md:text-base py-3 w-32 md:w-36"
          style="color:#5D806E;background: linear-gradient(268.01deg, rgba(41, 41, 41, 0.8) -9.16%, rgba(51, 51, 51, 0.8) 109.32%);">
          {{ t('coming_soon') }}
        </div>
      </div>
    </div>
    <div>
      <Footer :window-width="windowWidth" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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

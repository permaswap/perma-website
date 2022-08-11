<template>
  <div :id="id" class="ethereum-nft-area pt-8 md:pt-20">
    <div class="xl:w-1200px mx-auto px-4 xl:px-0">
      <LabelItem :label="label" />
      <div class="flex justify-between md:items-center items-start flex-wrap flex-col md:flex-row md:mt-6 mt-3">
        <Tabs :tab="tabOptions" @switch="switchTab" />
        <div v-show="tabOptions === 2" class="flex items-center md:flex-row flex-col md:mt-0 mt-6 md:w-auto w-full">
          <SeachInput
            v-model="text"
            class="md:hidden block"
            @search="searchNfts(text)"
            @close="clearSearch" />
          <div class="flex flex-row mt-4 w-full md:w-auto md:mt-0 justify-between">
            <SelectOptions
              v-if="filterOptionsArr.length"
              :class="` ${locale === 'zh' ? 'md:min-w-145px' : 'md:min-w-160px'} ${checkParents[1]} `"
              class="md:mr-6 mr-4 flex-1 md:flex-none py-2 h-10"
              :options-list="filterOptionsArr"
              :visible="filterOptionsVisible"
              border-radius="rounded-lg"
              :current-options="filterOptions.value"
              @click="filterOptionsVisible = !filterOptionsVisible; sortOptionsVisible = false"
              @switchOptions="switchFilterOptions">
              <span class="md:mr-5 whitespace-nowrap">{{ t(filterOptions.label) }}</span>
            </SelectOptions>
            <SelectOptions
              v-if="sortOptionsArr.length"
              :class="`${locale === 'zh' ? 'md:min-w-145px' : 'md:min-w-198px'} ${checkParents[0]}`"
              class="md:mr-6 flex-1 md:flex-none h-10"
              :options-list="sortOptionsArr"
              :visible="sortOptionsVisible"
              border-radius="rounded-lg"
              :current-options="sortOptions.value"
              @click="sortOptionsVisible = !sortOptionsVisible; filterOptionsVisible = false"
              @switchOptions="switchSortOptions">
              <span class="md:mr-5 whitespace-nowrap">{{ t(sortOptions.label) }}</span>
            </SelectOptions>
          </div>
          <SeachInput
            v-model="text"
            class="md:block hidden"
            @search="searchNfts(text)"
            @close="clearSearch" />
        </div>
      </div>
    </div>
    <div v-show="tabOptions === 1">
      <div v-for="(collection, index) in collectionNft" :key="collection.name" class="xl:w-1264px mx-auto batch-box">
        <BatchCard
          :class-name="id"
          :name="collection.name"
          :image-url="collection.image_url"
          :stats="collection.stats ? collection.stats : null"
          :slug="collection.slug"
          :nft-box-width="nftBoxWidth"
          @viewMore="viewMoreBatchNfts"
          @mousemove="hoverIndex = index"
          @mouseout="hoverIndex = 0" />
        <Dashed class="h-px line xl:mx-8 mx-4" :class="(hoverIndex - 1) === index || (index === collectionNft.length - 1) ? 'invisible' : ''" />
      </div>
      <LoadMore :no-more="batchNftLength >= collectionBatchs.length" @loadMore="loadMoreBatchNft()" />
    </div>

    <div v-show="tabOptions === 2" class="xl:w-1200px mx-auto px-4 xl:px-0">
      <notSearchFound v-if="SearchNetworkErr || netWorkErr" :title="t('network_err')" />
      <notSearchFound v-else-if="searchLoading" :title="t('searching')" />
      <notSearchFound v-else-if="noResults" :title="t('no_results')" />
      <div v-else class="lg:pt-5">
        <div class="flex flex-wrap justify-between grid-nft md:mt-10 mt-6">
          <NftCard
            v-for="nftItem in nftResults"
            :key="nftItem.name"
            class="sm:mb-6 mb-4 transform transition-all"
            :class="nftItem.imageUrl ? 'hover:-translate-y-2 hover:bg-permaBlack6' : ''"
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
</template>

<script setup lang='ts'>
import LabelItem from '@/components/LabelItem.vue'
import { defineProps, ref, computed, nextTick, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { Options } from '@/lib/types'
import Tabs from '@/components/Tabs.vue'
import SeachInput from '@/components/SearchInput.vue'
import SelectOptions from '@/components/SelectOptions.vue'
import { sessionScrollTop, formatNFTList, checkParentsHas } from '@/lib/util'
import BatchCard from '@/components/BatchCard.vue'
import LoadMore from '@/components/LoadMore.vue'
import Dashed from '@/components/common/Dashed.vue'
import notSearchFound from '@/components/notSearchFound.vue'
import NftCard from '@/components/NftCard.vue'
import { getSearchEthNFTs, getSearchArNFTs } from '@/lib/api'
import { Collection, NftInfo, ArNftInfo } from '@/store/state'
interface Props {
  id: string
  collectionBatchs: Collection[]
  allNftsList: NftInfo[] | ArNftInfo[]
  label: string
  checkParents: string[]
  sortOptionsArr: Options[] | []
  filterOptionsArr: Options[] | []
  netWorkErr: boolean
}
const props = defineProps<Props>()
const { t, locale } = useI18n()
const nftBoxWidth = ref(0)
const text = ref('')
const tabOptions = ref(1)
const isViewMore = ref(false)
const searchLoading = ref(false)
const SearchNetworkErr = ref(false)
const sortOptionsVisible = ref(false)
const filterOptionsVisible = ref(false)
const sortOptions = ref(props.sortOptionsArr.length ? props.sortOptionsArr[0] : {} as Options)
const filterOptions = ref(props.filterOptionsArr.length ? props.filterOptionsArr[0] : {} as Options)
const batchNftLength = ref(10)
const exploreNftLength = ref(20)
const allNfts = ref<NftInfo[] | ArNftInfo[]>([])
const SortFilterNFts = ref<NftInfo[] | ArNftInfo[]>([])
const nftResults = ref<any[]>([])
const isSortSelectTarget = checkParentsHas(props.checkParents[0])
const isFilterSelectTarget = checkParentsHas(props.checkParents[1])
const noResults = computed(() => !nftResults.value.length)
const collectionNft = computed(() => {
  return props.collectionBatchs.slice(0, batchNftLength.value)
})
const hoverIndex = ref(0)
const getNftsInit = () => {
  searchLoading.value = true
  allNfts.value = props.allNftsList
  setTimeout(() => {
    searchLoading.value = false
  }, 300)
}
const viewMoreBatchNfts = (batchName: string) => {
  isViewMore.value = true
  text.value = batchName
  tabOptions.value = 2
  sortOptions.value = props.sortOptionsArr.length ? props.sortOptionsArr[0] : {} as Options
  filterOptions.value = props.filterOptionsArr.length ? props.filterOptionsArr[0] : {} as Options
  searchNfts(batchName)
  nextTick(() => {
    document.documentElement.scrollTop = (document.getElementById(props.id) as HTMLElement).offsetTop - 50
  })
}
const loadMoreBatchNft = async () => {
  batchNftLength.value = batchNftLength.value + (window.innerWidth > 768 ? 10 : 2)
  await updateScrollTop()
}
const loadMoreNft = async () => {
  if (exploreNftLength.value < SortFilterNFts.value.length) {
    exploreNftLength.value = exploreNftLength.value + (window.innerWidth > 768 ? 20 : 10)
    nftResults.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
  }
}

const searchNfts = async (text:string) => {
  try {
    SearchNetworkErr.value = false
    searchLoading.value = true
    if (text) {
      allNfts.value = await (props.id === 'ethnfts' ? getSearchEthNFTs(text) : getSearchArNFTs(text))
      setTimeout(async () => {
        searchLoading.value = false
      }, 300)
    } else {
      allNfts.value = props.allNftsList
      setTimeout(async () => {
        searchLoading.value = false
      }, 300)
    }
  } catch (error) {
    SearchNetworkErr.value = true
  }
}

const switchTab = (tabId: number) => {
  tabOptions.value = tabId
  isViewMore.value = tabId === 1
  if (tabId === 1) {
    nextTick(() => {
      nftBoxWidth.value = (document.querySelector(`.${props.id}`) as Element).clientWidth
    })
  } else {
    sortOptions.value = props.sortOptionsArr.length ? props.sortOptionsArr[0] : {} as Options
    filterOptions.value = props.filterOptionsArr.length ? props.filterOptionsArr[0] : {} as Options
    clearSearch()
  }
  updateScrollTop()
}

const switchSortOptions = async (options: Options) => {
  if (sortOptions.value.value === options.value) {
    return
  }
  sortOptions.value = options
}

const switchFilterOptions = async (options: Options) => {
  if (filterOptions.value.value === options.value) {
    return
  }
  filterOptions.value = options
}

const updateScrollTop = async () => {
  sessionScrollTop()
  nextTick(() => {
    if (sessionStorage.getItem('scrollTop')) {
      const top = sessionStorage.getItem('scrollTop')
      document.documentElement.scrollTop = +(top as string)
    }
  })
}

const clearSearch = () => {
  isViewMore.value = false
  text.value = ''
  allNfts.value = props.allNftsList
}
onMounted(() => {
  getNftsInit()
  document.addEventListener('click', (e) => {
    if (!isSortSelectTarget(e.target as any)) {
      sortOptionsVisible.value = false
    }
    if (!isFilterSelectTarget(e.target as any)) {
      filterOptionsVisible.value = false
    }
  })
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 500) {
      filterOptionsVisible.value = false
      sortOptionsVisible.value = false
    }
  })
  window.addEventListener('resize', () => {
    if (window.innerWidth > 500) {
      filterOptionsVisible.value = false
      sortOptionsVisible.value = false
    }
  })
})
watchEffect(async () => {
  if (!searchLoading.value && isViewMore.value) {
    document.documentElement.scrollTop = (document.getElementById(props.id) as HTMLElement).offsetTop - 50
    isViewMore.value = false
  }
})
watchEffect(async () => {
  if (!searchLoading.value) {
    SortFilterNFts.value = formatNFTList(allNfts.value, filterOptions.value.value, sortOptions.value.value, props.id)
    nftResults.value = SortFilterNFts.value.slice(0, exploreNftLength.value)
    await updateScrollTop()
  }
})
</script>

<style>

</style>

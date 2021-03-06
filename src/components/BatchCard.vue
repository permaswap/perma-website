<template>
  <div class="batch-nft-card duration-300 transition-colors xl:p-8  p-4 rounded-3xl md:my-7 my-4 hover:bg-opacity-90">
    <div class="flex">
      <div class="md:min-w-279px md:w-279px w-164px  min-w-164px md:mr-6 mr-4">
        <div class="md:w-120px md:h-120px w-20 h-20 bg-permaWhite4 md:p-1.5 p-1 md:rounded-xl rounded-lg">
          <div class="md:rounded-lg rounded-md overflow-hidden h-full bg-no-repeat" :style="`background-image:url(${ imageUrl }); background-size:cover;background-position:bottom`" />
        </div>
        <div class="md:mt-6 mt-4 md:text-18px text-14px text-info-two md:truncate  md:block min-h-44px md:min-h-0">
          {{ name }}
        </div>
        <div class="md:block hidden" style="min-height:66px">
          <MoreInfo
            info-class="text-14px mt-3 text-permaWhite text-info-three overflow-hidden"
            :info="batchNftI18">
            {{ batchNftI18 }}
          </MoreInfo>
        </div>
        <BatchInfoItems :items="stats.count" :owners="stats.num_owners" :floor-price="stats.floor_price" />
        <ViewMore
          class="md:mt-12 mt-6 inline-block text-black hover:bg-permaGreen9 border-none bg-permaGreen10"
          type="nftBatchActive"
          @click="emits('viewMore',name)" />
      </div>
      <div id="collection" class="flex-1 flex flex-wrap" :class="collectionNft.length > 2 ? 'justify-between' : 'justify-start'">
        <NftCard
          v-for="(item, index) in collectionNft"
          :key="index"
          class="nftCard"
          :amount="item.price"
          :image-url="item.imageUrl"
          :owner="item.owner"
          :collection-name="item.collectionName"
          :name="item.name"
          :symbol="item.priceSymbol"
          :perma-link="item.permaLink"
          :owner-link="item.ownerLink"
          :class="index === collectionNft.length - 1 ? '' : 'md:mr-6 mr-3'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, ref, onMounted, watch, defineEmits, computed } from 'vue'
import BatchInfoItems from './BatchInfoItems.vue'
import ViewMore from './ViewMore.vue'
import { NftInfo, Stats } from '@/lib/types'
import { getCollectionNFTs } from '@/lib/api'
import NftCard from './NftCard.vue'
import MoreInfo from '@/components/common/MoreInfo.vue'
import { floor } from 'lodash'
import { useI18n } from 'vue-i18n'
interface Props {
  name: string
  imageUrl: string
  stats: Stats
  nftBoxWidth: number
  slug: string
}
interface Emits {
  (e:'viewMore', batchName:string):void
}
const { t } = useI18n()
const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const collectionNfts = ref<NftInfo[]>([])
const getInitNFTs = async () => {
  collectionNfts.value = await getCollectionNFTs(props.name)
  updateCollectionNftLength()
}
const batchNftI18 = computed(() => {
  return t(`nft_info.${props.slug}`).replace('=', '@')
})
onMounted(() => {
  getInitNFTs()
  window.addEventListener('resize', () => {
    updateCollectionNftLength()
  })
})
const collectionNft = ref<NftInfo[]>([])
const updateCollectionNftLength = () => {
  const width = (document.getElementById('collection') as HTMLElement).offsetWidth ? (document.getElementById('collection') as HTMLElement).offsetWidth : props.nftBoxWidth
  const collectionSliceLength = floor((width / (window.innerWidth > 768 ? 299 : 170))) ? floor((width / (window.innerWidth > 768 ? 299 : 170))) : 1
  collectionNft.value = collectionNfts.value.slice(0, collectionSliceLength).sort((a, b) => +b.price - +a.price)
}
watch(() => props.nftBoxWidth, () => {
  updateCollectionNftLength()
})

</script>

<style lang="scss">
.text-info-three {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.text-info-two {
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width:768px) {
  .text-info-two {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.batch-nft-card:hover{
  background: #141814;
  .nftCard{
    background-color: #222422;
  }
}
</style>

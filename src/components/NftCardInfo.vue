<template>
  <div class="md:mt-4 mt-10px md:px-1 px-0.5">
    <div class="flex justify-between text-permaWhite3 text-12px">
      <span>{{ t('nft.price') }}</span>
      <span>{{ t('nft.owned_by') }}</span>
    </div>
    <div class="flex md:mt-0.5 justify-between md:text-base text-14px">
      <div v-if="amount" class="flex items-center">
        <TokenLogo :symbol="symbol" class="mr-1 w-5 h-5" />
        <span>{{ price }}</span>
      </div>
      <div v-else class="hover:text-permaGreen9 transition-all">
        <a :href="permaLink" target="_blank">
          Make offer
        </a>
      </div>
      <div class="hover:text-permaGreen9 text-permaWhite2 transition-all">
        <a :href="ownerLink" target="_blank">
          {{ formatAddress }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { toBN } from '@/lib/util'
import TokenLogo from '@/components/TokenLogo.vue'
interface Props {
  symbol: string
  amount: string
  address: string
  ownerLink: string
  permaLink: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const price = computed(() => {
  return toBN(props.amount).toFormat(2)
})
const formatAddress = computed(() => {
  return props.address.slice(0, 4) + '...' + props.address.slice(-2)
})
</script>

<style>
</style>

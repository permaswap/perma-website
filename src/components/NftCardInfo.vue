<template>
  <div class="md:mt-4 mt-10px md:px-1 px-0.5">
    <div class="flex justify-between text-permaWhite3 text-12px">
      <span>{{ t('nft.price') }}</span>
      <span>{{ t('nft.owned_by') }}</span>
    </div>
    <div class="flex md:mt-0.5 justify-between md:text-base text-14px">
      <div v-if="amount" class="flex items-center font-medium">
        <TokenLogo :symbol="symbol" class="mr-1 w-5 h-5" />
        <span>{{ price }}</span>
      </div>
      <div v-else class="hover:text-permaGreen9 transition-all">
        <a v-if="permaLink" :href="permaLink" target="_blank">
          {{ t('make_offer') }}
        </a>
        <div v-else class="text-permaWhite2">
          -
        </div>
      </div>
      <div class="hover:text-permaGreen9 text-permaWhite2 transition-all font-medium cursor-pointer">
        <div @click="openLink(ownerLink)">
          {{ formatAddress }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineProps, withDefaults } from 'vue'
import { useI18n } from 'vue-i18n'
import { toBN, openLink } from '@/lib/util'
import TokenLogo from '@/components/TokenLogo.vue'
interface Props {
  symbol: string
  amount: string
  address: string
  ownerLink: string
  permaLink: string
}

const props = withDefaults(defineProps<Props>(), {
  symbol: '',
  amount: '',
  address: '',
  ownerLink: '',
  permaLink: ''
})
const { t } = useI18n()
const price = computed(() => {
  if (props.amount) {
    return toBN(props.amount).toFormat(2)
  }
  return ''
})
const formatAddress = computed(() => {
  if (props.address) {
    return props.address.slice(0, 4) + '...' + props.address.slice(-2)
  }
  return ''
})
</script>

<style>
</style>

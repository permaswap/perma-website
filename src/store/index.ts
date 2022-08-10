import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { State, defaultState } from './state'
import { getEthCollections, getHotNfts, getEthNfts, getArNfts, getArCollections } from '@/lib/api'
import createPersistedState from 'vuex-persistedstate'
// eslint-disable-next-line symbol-description
export const vuexStoreKey: InjectionKey<Store<State>> = Symbol()
export default createStore<State>({
  state: defaultState,
  mutations: {
    updateEthNfts (state, nfts) {
      state.ethNfts = nfts
    },
    updateHotNfts (state, hotNfts) {
      state.hotNfts = hotNfts
    },
    updatEthBatchNfts (state, nfts) {
      state.ethBatchNfts = nfts
    },
    updateArNfts (state, nfts) {
      state.arNfts = nfts
    },
    updateArCollectNfts (state, nfts) {
      state.arBatchNfts = nfts
    }
  },
  actions: {
    async updateEthNftsInfoAsync ({ commit }) {
      const allNfts = await getEthNfts()
      commit('updateEthNfts', allNfts)
    },
    async updateArNftsInfoAsync ({ commit }) {
      const allNfts = await getArNfts()
      commit('updateArNfts', allNfts)
    },
    async updateHotNftsInfoAsync ({ commit }) {
      const nfts = await getHotNfts()
      const hotNfts = nfts.sort((a, b) => {
        return +b.price - +a.price
      })
      commit('updateHotNfts', hotNfts)
    },
    async updateEthBatchInfoAsync ({ commit }) {
      const nfts = await getEthCollections()
      commit('updatEthBatchNfts', nfts)
    },
    async updateArBatchInfoAsync ({ commit }) {
      const nfts = await getArCollections()
      commit('updateArCollectNfts', nfts)
    }
  },
  plugins: [createPersistedState()]
})

export const useStore = (): Store<State> => {
  return baseUseStore(vuexStoreKey)
}

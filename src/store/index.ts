import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { State, defaultState } from './state'
import { getAllNftsCollections, getHotNfts, getAllNfts } from '@/lib/api'
import createPersistedState from 'vuex-persistedstate'
// eslint-disable-next-line symbol-description
export const vuexStoreKey: InjectionKey<Store<State>> = Symbol()
export default createStore<State>({
  state: defaultState,
  mutations: {
    updateAllNfts (state, nfts) {
      state.allNfts = nfts
    },
    updateHotNfts (state, hotNfts) {
      state.hotNfts = hotNfts
    },
    updateCollectNfts (state, nfts) {
      console.log(nfts)
      state.collectionBatchNfts = nfts
    }
  },
  actions: {
    async updateAllNftsInfoAsync ({ commit }) {
      const allNfts = await getAllNfts()
      commit('updateAllNfts', allNfts)
    },
    async updateHotNftsInfoAsync ({ commit }) {
      const nfts = await getHotNfts()
      const hotNfts = nfts.sort((a, b) => {
        return +b.price - +a.price
      })
      commit('updateHotNfts', hotNfts)
    },
    async updateCollectionBatchInfoAsync ({ commit }) {
      const nfts = await getAllNftsCollections()
      console.log(nfts)
      commit('updateCollectNfts', nfts)
    }
  },
  plugins: [createPersistedState()]
})

export const useStore = (): Store<State> => {
  return baseUseStore(vuexStoreKey)
}

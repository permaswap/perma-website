import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nft',
    name: 'NFT',
    component: async () => await import('../pages/NFT.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: async () => await import('../pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/nft',
    name: 'nft',
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
router.afterEach(() => {
  document.documentElement.scrollTop = 0
})

export default router

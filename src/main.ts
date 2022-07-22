import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import i18n from './i18n'
import store, { vuexStoreKey } from './store'
import './style/index.css'

createApp(App)
  .use(store, vuexStoreKey)
  .use(i18n)
  .use(router)
  .mount('#app')

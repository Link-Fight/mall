import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/common.scss'
Vue.config.productionTip = false

import wxAction from '@/controllers/wx.js'
import storage from '@/util/storage'
import { SESSION_LATLNG } from '@/storeKey'
new Vue({
  data() {
    return {
      latlng: null
    }
  },
  router,
  render: h => h(App),
  async created() {
    this.latlng = storage.getStorage(SESSION_LATLNG, 'sessionStorage')
    await wxAction.config()
    wxAction.getLocation({
      success: (res) => {
        this.latlng = storage.setStorage(SESSION_LATLNG, res, 'sessionStorage') || this.latlng
      }
    })
  },
}).$mount('#app')

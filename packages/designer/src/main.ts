import 'babel-polyfill' // 为支持ie
import Vue from 'vue'
import App from './App.vue'
import '@config'
import router from '@config/router'
import store from '@config/store'
import Vuetify from 'vuetify'
import VuetifyPreset from '@config/vuetify/Preset'

const vuetify = new Vuetify(VuetifyPreset)
const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  vuetify,
  router,
  store,
  render(h) {
    return this.isLoaded ? h(App) : undefined
  }
}).$mount('#app')

vm.isLoaded || window.addEventListener('load', () => {
  vm.isLoaded = true
})
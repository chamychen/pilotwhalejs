import Vue from 'vue'
import App from './App'
import Vuetifyx from 'vuetifyx'
import vuelidate from 'vuelidate'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.performance = true

Vue.use(Vuetifyx)
Vue.use(vuelidate)

const vuetifyx = new Vuetifyx()

const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  vuetifyx,
  router,
  render (h) {
    return this.isLoaded ? h(App) : undefined
  }
}).$mount('#app')

// Prevent layout jump while waiting for styles
vm.isLoaded || window.addEventListener('load', () => {
  vm.isLoaded = true
})

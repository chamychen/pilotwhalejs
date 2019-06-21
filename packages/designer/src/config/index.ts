import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'
import VueLazyload from 'vue-lazyload'
import vuelidate from 'vuelidate'
import utils from 'pilotwhale-utils'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

if (process.env.NODE_ENV === 'production') {
  // 生产环境中：取消生产提示
  Vue.config.productionTip = false
  Vue.config.devtools = true
} else {
  // 其它环境中：打开生产提示
  Vue.config.productionTip = true
  Vue.config.devtools = true
}
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(vuelidate)
Vue.use(Router)
Vue.use(VueI18n)
Vue.use(VueLazyload, {
  preLoad: 1.5 // 启用图片懒加载,按屏幕的1.5倍
})

utils.componentUtils.registerComponent(require.context('@components', true, /(\.vue$)|(index\.ts$)|(index\.tsx$)/))

// 异常处理
// Vue.config.errorHandler = function(err, vm, info) {}
// 警告处理F
// Vue.config.warnHandler = function(msg, vm, trace) {}


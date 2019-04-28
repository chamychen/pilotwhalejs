import Vue from 'vue'

import { install } from 'vuetifyx/es5/install'
import VBtn from 'vuetifyx/es5/components/VBtn'
import * as VCard from 'vuetifyx/es5/components/VCard'
import { Ripple } from 'vuetifyx/es5/directives'
import * as directives from 'vuetifyx/es5/directives'

install(Vue, {
  components: {
    VBtn,
    ...VCard
  },
  directives: {
    Ripple,
    ...directives
  }
})

Vue.extend({
  components: {
    VBtn,
    ...VCard
  },
  directives: {
    Ripple
  }
})

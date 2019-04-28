import Vue from 'vue'

import Vuetifyx, {
  VBtn,
  VCard,
  VCardText,
  directives,
  colors
} from 'vuetifyx/lib'

Vuetifyx.install(Vue, {
  components: {
    VBtn,
    VCard,
    VCardText
  },
  directives,
  theme: {
    themes: {
      dark: {
        primary: colors.green.base,
        secondary: colors.blueGrey.base
      }
    } as any
  }
})

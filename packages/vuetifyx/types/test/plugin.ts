import Vue from 'vue'
import Vuetifyx from 'vuetifyx'

const version: string = Vuetifyx.version

Vuetifyx.install(Vue)

Vuetifyx.install(Vue, {
  theme: false
})

Vuetifyx.install(Vue, {
  theme: {
    options: {
      cspNonce: 'asdf123'
    },
    themes: {
      light: {
        primary: '#123456',
        accent: '#123456',
        secondary: '#123456',
        info: '#123456',
        warning: '#123456',
        error: '#123456',
        success: '#123456'
      }
    } as any
  },
  icons: {
    iconfont: 'fa',
    values: {
      cancel: 'custom icon'
    }
  },
  rtl: true,
  lang: {
    locales: {
      es: {
        noDataText: ''
      }
    }
  }
})

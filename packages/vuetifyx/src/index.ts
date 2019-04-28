import * as components from './components'
import * as directives from './directives'
import Vuetifyx from './framework'

export default Vuetifyx

const install = Vuetifyx.install
Vuetifyx.install = (Vue, args) => {
  install.call(Vuetifyx, Vue, {
    components,
    directives,
    ...args
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetifyx)
}

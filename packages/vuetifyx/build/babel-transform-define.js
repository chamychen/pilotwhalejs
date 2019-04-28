const vuetifyPackage = require('../package.json')

module.exports = {
  __VUETIFYX_VERSION__: vuetifyPackage.version,
  __REQUIRED_VUE__: vuetifyPackage.peerDependencies.vue
}

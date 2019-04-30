const package = require('../package.json')

module.exports = {
  __UTILS_VERSION__: package.version,
  __REQUIRED_VUE__: package.peerDependencies.vue
}

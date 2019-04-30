const path = require('path')
const moment = require('moment')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  devServer: {
    port: 666,
    after: app => {
      console.log(
        '\n\n**************执行时间:%s**************\n\n',
        new moment(Date.now()).format('YYYY-MM-DD hh:mm:ss')
      )
    }
  },
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()

    config.resolve.alias.set('@config', resolve('/src/config')).set('@components', resolve('/src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  }
}

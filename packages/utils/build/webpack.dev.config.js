const path = require('path')
const merge = require('webpack-merge')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { config: baseWebpackConfig, happyThreadPool } = require('./webpack.base.config')

// Helpers
const resolve = file => path.resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  entry: ['babel-polyfill', './dev/index.js'],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'pilotwhale-utils'
  },
  resolve: {
    alias: {
      utils: resolve('../src'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            modules: [VuetifyProgressiveModule]
          }
        }
      },
      {
        test: /\.ts$/,
        use: 'happypack/loader?id=ts',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: resolve('../tsconfig.json')
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            happyPackMode: true
          }
        },
        'eslint-loader?cache=false?emitWarning=true'
      ]
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader', 'eslint-loader?cache=false?emitWarning=true']
    })
  ]
})

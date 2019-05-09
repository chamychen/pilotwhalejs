const path = require('path')
const merge = require('webpack-merge')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {
  config: baseWebpackConfig,
  happyThreadPool
} = require('./webpack.base.config')

// Helpers
const resolve = file => path.resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  devServer: {
    contentBase: resolve('../public'),
    publicPath: '/public/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '666',
    disableHostCheck: true
  },
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/main.ts'],
  output: {
    filename: '[name].js',
    path: resolve('../public'),
    publicPath: '/public/',
    library: 'PilotwhaleDesigner'
  },
  resolve: {
    alias: {
      designer: resolve('../src'),
      vue$: 'vue/dist/vue.esm.js',
      '@config': resolve('../src/config'),
      '@components': resolve('../src/components'),
      '@views': resolve('../src/views'),
      '@core': resolve('../src/core'),
      '@dto': resolve('../src/dto'),
      '@entity': resolve('../src/entity')
    }
  },
  module: {
    rules: [
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

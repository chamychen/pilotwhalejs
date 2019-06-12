const merge = require('webpack-merge')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {
  config: baseWebpackConfig,
  happyThreadPool
} = require('./webpack.base.config')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'PilotwhaleDesigner',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'typeof self !== "undefined" ? self : this'
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
      '@entity': resolve('../src/entity'),
      '@service': resolve('../src/service'),
      '@data': resolve('../src/data'),
      '@api': resolve('../src/api'),
      '@assets': resolve('../src/assets')
    }
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'happypack/loader?id=scripts',
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
      id: 'scripts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {          
            happyPackMode: true
          }
        }
      ]
    })
  ]
})

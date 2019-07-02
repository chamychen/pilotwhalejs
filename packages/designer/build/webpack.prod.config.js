const merge = require('webpack-merge')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {
  config: baseWebpackConfig,
  happyThreadPool,
  resolve
} = require('./webpack.base.config')

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

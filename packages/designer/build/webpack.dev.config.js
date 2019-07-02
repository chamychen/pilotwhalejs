const path = require('path')
const merge = require('webpack-merge')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {
  config: baseWebpackConfig,
  happyThreadPool,
  resolve
} = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  devServer: {
    contentBase: resolve('../public'),
    publicPath: '/public/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '666',
    disableHostCheck: true
  },
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/main.ts'],
  output: {
    filename: '[name].js',
    path: resolve('../public'),
    publicPath: '/public/',
    library: 'PilotwhaleDesigner'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'happypack/loader?id=ts',
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
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader', 'eslint-loader?cache=false?emitWarning=true'],
      debug: true
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
            appendTsxSuffixTo: [/\.vue$/],
            happyPackMode: true
          }
        },
        'eslint-loader?cache=false?emitWarning=true'
      ],
      debug: true
    })
  ]
})

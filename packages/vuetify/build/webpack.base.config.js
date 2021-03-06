require('dotenv').config()

const os = require('os')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'

exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4)
})

const cssLoaders = [
  // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
  // TODO: remove style-loader: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
  extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  { loader: 'postcss-loader', options: { sourceMap: !isProd } },
  { loader: 'stylus-loader', options: { sourceMap: !isProd } }
]

const sassLoaders = [
  extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader' },
  { loader: 'postcss-loader', options: { sourceMap: !isProd } },
  { loader: 'sass-loader' }
]

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true
  })
]

exports.config = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts', '.tsx']
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: cssLoaders
      },
      {
        test: /\.s(a|c)ss$/,
        use: sassLoaders
      }
    ]
  },
  plugins,
  performance: {
    hints: false
  },
  stats: { children: false }
}

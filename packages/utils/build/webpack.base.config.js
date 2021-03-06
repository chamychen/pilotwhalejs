require('dotenv').config()

const os = require('os')
const HappyPack = require('happypack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4)
})

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true
  })
]

exports.config = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.vue', '.ts', '.tsx']
  },
  node: {
    fs: 'empty'
  },
  plugins,
  performance: {
    hints: false
  },
  stats: { children: false }
}

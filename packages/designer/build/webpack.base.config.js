require('dotenv').config()
const os = require('os')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'
const resolve = file => require('path').resolve(__dirname, file)

exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4)
})
exports.resolve = resolve

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

exports.config = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.vue', '.ts', '.tsx'],
    alias: {
      designer: resolve('../src'),
      vue$: 'vue/dist/vue.esm.js',
      '@assets': resolve('../src/assets'),
      '@views': resolve('../src/views'),
      '@components': resolve('../src/components'),
      '@config': resolve('../src/config'),
      '@core': resolve('../src/core'),
      '@api': resolve('../src/api'),
      '@service': resolve('../src/service'),
      '@entity': resolve('../src/entity'),
      '@mock': resolve('../src/mock')
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl(us)?$/,
        use: cssLoaders
      },
      {
        test: /\.s(a|c)ss$/,
        use: sassLoaders
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        oneOf: [
          {
            test: /\.(png|jpe?g|gif)$/,
            resourceQuery: /vuetify-preload/,
            use: [
              'vuetify-loader/progressive-loader',
              {
                loader: 'url-loader',
                options: { limit: 8000 }
              }
            ]
          },
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    })
  ],
  performance: {
    hints: false
  },
  stats: { children: false }
}

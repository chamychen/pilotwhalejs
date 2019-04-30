const webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const base = require('./webpack.prod.config')
const version = process.env.VERSION || require('../package.json').version

const builds = {
  development: {
    config: {
      devtool: 'source-map',
      mode: 'development',
      output: {
        filename: 'pilotwhale-designer.js',
        libraryTarget: 'umd'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'pilotwhale-designer.css'
        })
      ]
    }
  },
  production: {
    config: {
      mode: 'production',
      output: {
        filename: 'pilotwhale-designer.min.js',
        libraryTarget: 'umd'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'pilotwhale-designer.min.css'
        })
      ],
      performance: {
        hints: 'warning',
        maxEntrypointSize: 500000
      }
    },
    env: 'production'
  }
}

function genConfig (opts) {
  const config = merge({}, base, opts.config)

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(opts.env || 'development')
    })
  ])

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.BannerPlugin({
        banner: `/*!
* Pilotwhale-Designer v${version}
* Forged by Chamy Chan
* Released under the MIT License.
*/     `,
        raw: true,
        entryOnly: true
      })
    ])
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            discardComments: { removeAll: true },
            postcssZindex: false,
            reduceIdents: false
          },
          canPrint: false
        })
      ]
    }
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]))
}

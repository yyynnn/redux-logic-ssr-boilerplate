import path from 'path'

import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import merge from 'webpack-merge'

import { common } from './common'
import { clientEntries } from './entries'

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

// eslint-disable-next-line no-console
const env = dotenv ? dotenv.parsed : console.log('ENV IS EMTPY!')

const prodConfig = merge(common, {
  name: 'client',
  mode: 'production',
  target: 'web',
  devtool: '',
  entry: clientEntries,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'initial'
        }
      },
      // Files will invalidate i. e. when more chunks with the same vendors are added.
      // medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      name: false
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new ManifestPlugin({ basePath: '/' }),
    new webpack.DefinePlugin({
      'process.env': {
        IS_SSR: JSON.stringify(process.env.IS_SSR),
        APP_ID: JSON.stringify(env.APP_ID),
        IS_CLIENT: 1
      }
    })
  ]
})

module.exports = prodConfig

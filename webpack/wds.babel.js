import path from 'path'

import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import WebpackBar from 'webpackbar'
import merge from 'webpack-merge'

import { clientEntries } from './entries'
import { common } from './common'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

// eslint-disable-next-line no-console
const env = dotenv ? dotenv.parsed : console.log('ENV IS EMTPY!')

const wdsDevConfig = merge(common, {
  name: 'client',
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: clientEntries,
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    publicPath: '/',
    compress: true,
    port: env.PORT,
    hot: true,
    overlay: true,
    filename: 'bundle.app.js',
    historyApiFallback: { disableDotRule: true },
    proxy: {
      '/api': {
        target: process.env.BASE_API,
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: env.APP_ID
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new WebpackBar(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin({ basePath: '/' }),
    new webpack.DefinePlugin({
      'process.env': {
        IS_SSR: JSON.stringify(process.env.IS_SSR),
        BASE_API: JSON.stringify(process.env.BASE_API),
        IS_CLIENT: 1,
        APP_ID: JSON.stringify(env.APP_ID)
      }
    })
  ]
})

module.exports = wdsDevConfig

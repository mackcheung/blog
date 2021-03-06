'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pre_entry = require('../config/defined')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// pre_entry['pre_entry']=['crypto'];
module.exports = {
  entry: pre_entry,
  // entry: {
  //   manage: './src/admin.js',
  //   app: './src/index.js',
  //   detail: './src/detail.js',
  //   archives: './src/archives.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [
      '.js', '.vue', '.json'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [
      //     resolve('src'), resolve('test')
      //   ],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      //  {
      //   test: /\.less$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     }, {
      //       loader: 'css-loader'
      //     }, {
      //       loader: 'less-loader'
      //     }
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   exclude: /node_modules/,
      //   // loader: 'style-loader!css-loader!less-loader?importLoaders=1'
      // },
      //  {
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader" //添加对样式表的处理
      // },
      // {
      //   test: /\.less/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "less-loader"
      //   })
      // },
      // {
      //   test: /\.css/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use:"css-loader"
      //   })
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

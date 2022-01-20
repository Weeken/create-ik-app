const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common.js')
const ProgressBar = require('./progressBar')
const progress = new ProgressBar({ width: 80 })

const severConfig = require('../static/config.js')

const { publicPath } = require('./publicPath')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  mode: 'development',
  cache: { type: 'memory' },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    liveReload: false,
    // host: 'localhost',
    port: 8090,
    // open: 'Google Chrome'
    proxy: {
      '/api': {
        target: severConfig['development'].BASE_URL,
        // target: 'https://api.marketing.uat.superlinke.com',
        secure: false,
        changeOrigin: true, // 支持跨域
        logLevel: 'debug',
        pathRewrite: {
          // '^/api': '/api' // 路径重写
          // '^/api': '/api' // 路径重写
        }
      }
    }
  },
  output: {
    path: resolve('devDist'),
    publicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProgressPlugin({
      percentBy: 'dependencies',
      handler(percentage, message, ...args) {
        // console.info(percentage + '/' + message + '/', ...args)
        if (args === 'shutdown') {
          process.exit()
        }
        if (Number(percentage) > 0.1) progress.render(percentage, message)
      }
    })
  ]
})

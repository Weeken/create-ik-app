// pro
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common.js')
const ora = require('ora')
const chalk = require('chalk')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const { publicPath } = require('./publicPath')

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const productionConfig = merge(common, {
  mode: 'production',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      'vuex': 'vuex/dist/vuex.min.js',
      'vue-router$': 'vue-router/dist/vue-router.min.js',
      'axios': 'axios/dist/axios.min.js'
    }
  },
  output: {
    publicPath,
    path: resolve('dist'),
    filename: 'static/js/[name].[contenthash].js',
    // 每次构建输出之前清空输出目录
    clean: true
  },
  cache: {
    type: 'filesystem',
    name: 'AppBuildCache',
    store: 'pack',
    cacheDirectory: resolve('node_modules/.production_build_cache'),
    cacheLocation: resolve('node_modules/.production_build_cache'),
    maxAge: 1000 * 60 * 60 * 24, // 允许未使用的缓存留在文件系统缓存中的时间（以毫秒为单位）
    maxMemoryGenerations: 1 // 定义内存缓存中未使用的缓存项的生命周期
  },
  optimization: {
    minimize: true,
    runtimeChunk: 'single', // 通过配置 optimization.runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'bundle',
          test: /\.css$/,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // 打包构建分析工具
    // new BundleAnalyzerPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + ['html', 'js', 'css'].join('|') + ')$'
      ),
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      deleteOriginalAssets: false // 删除原文件
    })
  ]
})

const spinner = ora({
  text: 'building for production...',
  spinner: 'dots12'
})
setTimeout(() => {
  spinner.start()
}, 1000)

webpack(productionConfig, function(err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    // modules: true,
    entrypoints: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  spinner.succeed(chalk.cyanBright('Build complete.\n'))
  spinner.info(chalk.keyword('orange')('Built files are meant to be served over an HTTP server.\n'))
  spinner.info(chalk.keyword('orange')('Opening index.html over file:// won\'t work.\n'))
})

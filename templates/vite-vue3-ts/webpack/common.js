// common
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { publicPath } = require('./publicPath')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

process.traceDeprecation = true

module.exports = {
  entry: {
    app: './src/main.js'
  },
  // output: {
  //   filename: 'static/js/[id].[contenthash].js'
  // },
  resolve: {
    modules: [resolve('src'), resolve('node_modules')],
    extensions: ['.js', '.vue', '.scss'],
    mainFields: ['jsnext:main', 'browser', 'main'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // include: [resolve('src')],
        // exclude: /node_modules/,
        use: [
          /* { loader: 'cache-loader' }, */
          // { loader: 'thread-loader',
          //   options: {
          //     workers: 2 // 开启2个进程
          //   }},
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
          /* { loader: 'cache-loader' }, */
          // { loader: 'thread-loader',
          //   options: {
          //     workers: 2 // 开启2个进程
          //   }},
          {
            loader: 'babel-loader',
            options: { babelrc: true, cacheDirectory: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          /* { loader: 'cache-loader' }, */
          { loader: process.env.NODE_ENV === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
        // include: [resolve('src')],
        // exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          /* { loader: 'cache-loader' }, */
          { loader: process.env.NODE_ENV === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ],
        include: [resolve('src')]
        // exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       // limit: 10000,
        //       name: '[name].[ext]',
        //       outputPath: 'static/images/',
        //       publicPath: 'static/images/',
        //       esModule: false
        //     }
        //   }
        // ]
        // 对应 webpack 5 之前的 url-loader
        type: 'asset/resource',
        // 指定输出目录
        generator: {
          // 生成的文件名（目录）
          filename: 'static/images/[hash][ext][query]',
          // 引用 url 基础路径
          publicPath
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        // 指定输出目录
        generator: {
          // 生成的文件名（目录）
          filename: 'static/fonts/[hash][ext][query]',
          // 引用 url 基础路径
          publicPath
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*', '*.html']
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[id].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: resolve('./static/index.html'),
      inject: true,
      chunks: ['app'],
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去掉空格
        removeAttributeQuotes: true // 去掉属性的双引号
      }
    })
  ]
}

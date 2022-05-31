const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const threadLoader = require('thread-loader')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const env = require('./public/env')

const resolve = dir => path.resolve(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// thread-loader 预热
IS_PROD && threadLoader.warmup({}, ['babel-loader', 'postcss-loader', 'vue-loader'])

const vueConfig = {
	// 使用相对路径
	publicPath: IS_PROD ? './' : '/',
	// 将静态资源文件放到 static 文件夹里面
	assetsDir: 'static',
	transpileDependencies: true,
	productionSourceMap: false,
	// 是否开启 eslint 校验
	lintOnSave: !IS_PROD,
	css: {
		// css添加版本号
		extract: {
			filename: `static/css/[name].[contenthash].css`,
			chunkFilename: `static/css/[name].[contenthash].css`
		}
	},
	chainWebpack: config => {
		// 忽略解析markdown文件
		config.module.noParse(/\.md$/)
		// 移除 preload,prefetch 插件
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')

		config.module.rules.delete('media')
		config.module.rules.delete('stylus')
		// 文件路径别名设置
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@comp', resolve('src/components'))
			.set('@assets', resolve('src/assets'))
			.set('@api', resolve('src/api'))
			.set('@utils', resolve('src/utils'))
			.set('@router', resolve('src/router'))
			.set('@store', resolve('src/store'))
		// 生产环境使用 source-map 做源码映射
		config.when(!IS_PROD, config => config.devtool('eval-cheap-module-source-map'))
		const fileTypes = ['vue', 'ts', 'scss', 'images', 'fonts', 'svg']
		fileTypes.forEach(item => config.module.rule(item).include.add(resolve('src')))
		// 调试使用 speed measure
		if (process.env.npm_lifecycle_event === 'report') {
			config.plugin('speed').use(SpeedMeasurePlugin)
		}
		// node_modules下的 .cache - webpack 文件夹下会生成对应环境下的文件缓存
		config.cache({
			type: 'filesystem', // 将缓存类型设置为文件系统,默认是memory
			buildDependencies: {
				config: [__filename] // 更改配置文件时，重新缓存
			}
		})
		if (IS_PROD) {
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					vendor: {
						name: 'chunk-vendor',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial' // only package third parties that are initially dependent
					},
					elementPlus: {
						name: 'chunk-element-plus', // split elementUI into a single package
						priority: 12, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 13,
						reuseExistingChunk: true
					}
				}
			})
			config.optimization.runtimeChunk('single')
			config.optimization.moduleIds = 'deterministic'
			config.optimization.chunkIds = 'deterministic'
		}
	},
	configureWebpack: config => {
		config.experiments = { topLevelAwait: true }
		config.resolve.modules.unshift(resolve('src'))
		// 构建性能提升，查找模块时减少无用文件类型查找
		config.resolve.extensions = ['.vue', '.ts', '.tsx', '.js', '.json']
		const webpackMerge = {
			// webpack 配置的项目名称, 可以在 index.html 中被访问，用来注入页面标题
			name: 'vue3-ts-admin',
			resolve: {
				fallback: {
					// 默认情况下，Webpack5 不再包含用于 Node.js 模块的 polyfills，所以引入 path-browserify
					path: require.resolve('path-browserify')
				}
			}
		}
		if (IS_PROD) {
			// js添加版本号
			config.output.filename = `static/js/[name].[chunkhash:8].js`
			config.output.chunkFilename = `static/js/[name].[chunkhash:8].js`
			webpackMerge.plugins = [
				// element-plus 按需引入
				AutoImport({
					resolvers: [ElementPlusResolver({ exclude: new RegExp(/^(?!.*loading-directive).*$/) })]
				}),
				Components({ resolvers: [ElementPlusResolver()] })
			]
			// 生产环境清除 console.log
			webpackMerge.optimization = {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						include: [resolve('src')],
						terserOptions: {
							mangle: true,
							compress: {
								warnings: false,
								drop_console: false,
								drop_debugger: false,
								// 清除 console.log
								pure_funcs: ['console.log']
							},
							output: {
								comments: false // 删除注释
							}
						}
					})
				]
			}
		}
		return webpackMerge
	},
	devServer: {
		hot: true,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: env.Proxy,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: ''
				}
			}
		}
	}
}

module.exports = defineConfig(vueConfig)

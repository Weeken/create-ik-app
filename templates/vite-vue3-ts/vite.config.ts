/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import requireTransform from 'vite-plugin-require-transform'
// import { resolve } from 'path'
import path from 'path'

// element-plus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolve = (dir: string) => path.resolve(__dirname, dir)
// const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
	// base: isProd ? './' : '/',
	resolve: {
		alias: {
			path: 'path-browserify',
			'@': path.resolve(__dirname, './src'),
			'@comp': resolve('src/comp'),
			'@assets': resolve('src/assets'),
			'@api': resolve('src/api'),
			'@utils': resolve('src/utils'),
			'@router': resolve('src/router'),
			'@store': resolve('src/store')
		}
	},
	plugins: [
		vue(),
		requireTransform({ fileRegex: /.ts$|.tsx$|.js$|.jsx$|.vue$/ }),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		rollupOptions: {
			output: {
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js',
				assetFileNames: '[ext]/[name]-[hash].[ext]'
			}
		}
	},
	test: {
		globals: true,
		environment: 'jsdom'
	}
})

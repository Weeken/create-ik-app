import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'

const resolve = dir => path.resolve(__dirname, dir)

export default (/** if you want to use mode : { mode }*/) => {
	return defineConfig({
		// base: "./",
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@comp': resolve('src/components'),
				'@assets': resolve('src/assets'),
				'@api': resolve('src/api'),
				'@utils': resolve('src/utils'),
				'@router': resolve('src/router'),
				'@store': resolve('src/store')
			}
		},
		plugins: [
			Vue2(),
			viteCommonjs(),
			ScriptSetup(),
			legacy({
				targets: ['ie >= 11'],
				additionalLegacyPolyfills: ['regenerator-runtime/runtime']
			}),
			viteCompression()
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
		}
	})
}

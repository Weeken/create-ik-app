/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface Window {
	SYSTEM_CONFIG: any
}

declare module 'store'
declare module 'axios'
declare module 'nprogress'
declare module 'vue-ls'
declare module 'mockjs2'

declare module 'lodash-es'

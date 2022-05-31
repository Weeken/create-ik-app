/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface Window {
	SYSTEM_CONFIG: any
}

declare module 'store'
declare module 'nprogress'
declare module 'vue-ls'

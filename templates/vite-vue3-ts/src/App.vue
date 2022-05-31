<template>
	<nav>
		<router-link to="/">Home</router-link>
		|
		<router-link to="/about">About</router-link>
	</nav>
	<router-view />
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { login } from '@api/user'

// login({ username: 'admin', password: '123456' }).then((res: any) => {
// 	console.log('----------------', res)
// })
const locale = zhCn // Element UI 默认中文
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	color: #2c3e50;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>

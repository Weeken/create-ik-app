<template>
	<div id="app">
		<nav>
			<router-link to="/">Home</router-link>
			|
			<router-link to="/about">About</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script setup lang="ts"></script>

<style>
#app {
	margin-top: 60px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	color: #2c3e50;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>

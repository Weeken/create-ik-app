<template>
	<div>
		<h1>{{ msg }}</h1>
		<button @click="onClick">click me</button>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'new message'
		}
	},
	methods: {
		onClick() {
			this.msg = 'new message'
		}
	}
}
</script>

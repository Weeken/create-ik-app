<template>
	<div>
		<h1>{{ msg }}</h1>
		<button @click="onClick">click me</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
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
})
</script>

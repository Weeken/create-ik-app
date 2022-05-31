<template>
	<div>
		<h1>{{ msg }}</h1>

		<button type="button" @click="count++">count is: {{ count }}</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code>
			to test hot module replacement.
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			count: 0
		}
	}
})
</script>

<style scoped>
a {
	color: #42b983;
}
</style>

<template>
	<div class="about">
		<h1>This is an {{ name }} page</h1>
	</div>
</template>

<script setup>
import { ref } from '@vue/composition-api'

const name = ref('about')
</script>

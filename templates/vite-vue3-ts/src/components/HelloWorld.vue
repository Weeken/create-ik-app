<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  created() {
    console.log(process.env.NODE_ENV)
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>

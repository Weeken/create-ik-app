<template>
  <div class="home">
    <img alt="Vue logo" :src="logo">
    <HelloWorld :msg="`Hello Vue ${version}`" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Logo from '@/assets/logo.png'

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      logo: Logo
    }
  },
  computed: {
    version() {
      return this.$store.state.version
    }
  }
}
</script>
<style scoped lang="less">

</style>

<script>
import Navigation from './Navigation.vue'
export default {
  name: 'charts',
  components: {
    Navigation
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>
    <h1>Graficos</h1>
  </div>
</template>
<style lang="scss" scoped>
$main-bg: #ecf0f1;

.wrapper{
  background: $main-bg;
  height: 100vh;
}
</style>

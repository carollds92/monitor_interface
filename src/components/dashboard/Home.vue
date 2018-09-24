<script>
import Navigation from './Navigation.vue'
export default {
  name: 'Home',
  components: {
    Navigation
  }
}
</script>
<template>
  <div class="wrapper">
    <Navigation></Navigation>
      <h1>HOME </h1>
  </div>
</template>
<style lang="sass" scoped>
$main-bg: #ecf0f1

.md-dialog 
  max-width: 768px
  
.wrapper
  background: $main-bg;
  height: 100vh;

.chart-wrapper
  display: flex
  align-items: center
  justify-content: center

.table-wrapper
  height: 70vh
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center

.table-color
  background: #fff
  padding: 2.5rem
  border-radius: 20px

</style>

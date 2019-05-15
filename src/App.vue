<template>
  <div id="app">
     <app-header></app-header> 
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/Header.vue'

  export default {
    methods: {
    },
    components: {
      'app-header': Header
    }
  }
</script>

<style>
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');

</style>
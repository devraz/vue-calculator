<template>
  <div id="app">
    <img src="./assets/images/logo.png">
    <h1>Welcome to the Vue.js Calculator</h1>
    <Calculator :debug="false"></Calculator>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
export default {
  components: {
    Calculator
  }
};
</script>

<style src="./assets/stylesheets/style.css"></style>
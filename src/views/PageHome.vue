<!-- PageHome.vue -->
<template>
    <div class="home">
      <img alt="logo" src="../assets/logo.png">
      <HelloWorld msg="Solcast CI/CD Test"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'PageHome',
    components: {
      HelloWorld
    }
  }
  </script>

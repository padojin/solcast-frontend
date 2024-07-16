<!-- PageHeader.vue -->
<template>
    <header>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/main/list">강의</router-link> |
        <router-link to="/board/list">강의실</router-link>        |
        <router-link to="/signin">회원 가입</router-link> |
        <router-link to="/login">로그인</router-link>
      </div>
    </header>
    <hr/>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  
  </style>
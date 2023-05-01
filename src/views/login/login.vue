<template>
  <div class="login">
    <h1 class="title">宏远后台管理系统</h1>
    <login-pannel />
  </div>
</template>

<script setup lang="ts">
import LoginPannel from './c-cpns/login-pannel.vue'
</script>

<style scoped lang="less">
.login {
  background-color: #fff;
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>

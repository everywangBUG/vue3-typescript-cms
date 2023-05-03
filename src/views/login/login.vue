<template>
  <div class="login">
    <div class="login-center">
      <h1 class="title">宏远后台管理系统</h1>
      <login-pannel />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginPannel from './c-cpns/login-pannel.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/imgs/login-bg.svg');
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>

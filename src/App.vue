<template>
  <div class="app">
    <!-- 占位符 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="less" scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('./assets/imgs/login-bg.svg');
}
</style>

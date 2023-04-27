<template>
  <div class="app">
    <h2>app</h2>
    <router-link to="/main">首页</router-link>
    <router-link to="/login">登录</router-link>
    <!-- 占位符 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.app {
  color: red;
}
</style>

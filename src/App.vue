<template>
  <div class="app">
    <h2>app</h2>
    <router-link to="/main">首页</router-link>
    <router-link to="/login">登录</router-link>
    <!-- 占位符 -->
    <router-view></router-view>
    <el-row class="mb-4">
      <el-button disabled>Default</el-button>
      <el-button type="primary" disabled>Primary</el-button>
      <el-button type="success" disabled>Success</el-button>
      <el-button type="info" disabled>Info</el-button>
      <el-button type="warning" disabled>Warning</el-button>
      <el-button type="danger" disabled>Danger</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="less" scoped>
.app {
  color: red;
}
</style>

<template>
  <div class="login-tabs">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="账号登录" name="userlogin">账号登录</el-tab-pane>
      <el-tab-pane label="手机登录" name="phonelogin">手机登录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('账号登录')

function handleClick() {}
</script>

<style lang="less" scoped>
.login-tabs {
}
</style>

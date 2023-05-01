<template>
  <div class="login-pannel">
    <div class="control">
      <el-checkbox v-model="isRemember" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isRemember = ref(false)
</script>

<style lang="less" scoped>
.login-pannel {
  .control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 330px;

    --el-button-size: 50px;
  }
}
</style>

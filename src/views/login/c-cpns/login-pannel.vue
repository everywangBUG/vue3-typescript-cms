<template>
  <div class="login-pannel">
    <div class="login-tabs">
      <el-tabs
        v-model="activeName"
        class="tabs"
        @tab-click="handleLoginClick"
        stretch
        type="border-card"
      >
        <el-tab-pane label="账号登录" name="userlogin">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phonelogin">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="isRemember" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleBtnLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isRemember = ref<boolean>(false)
const activeName = ref<string>('userlogin')
function handleLoginClick() {}

function handleBtnLogin() {
  if (activeName.value === 'userlogin') {
    console.log('用户进行账号登录')
  } else {
    console.log('用户进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-pannel {
  .login-tabs {
    .tabs {
      .label {
        display: flex;
        align-items: center;
        .text {
          margin-left: 5px;
        }
      }
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 330px;
  }
}
</style>

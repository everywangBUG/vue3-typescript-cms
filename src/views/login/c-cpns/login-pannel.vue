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
        <!-- 账号登录 -->
        <el-tab-pane label="账号登录" name="userlogin">
          <PannelAccount ref="accountRef" />
        </el-tab-pane>

        <!-- 手机登录 -->
        <el-tab-pane label="手机登录" name="phonelogin">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PannelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="isRemember" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleBtnLogin">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PannelAccount from './pannel-account.vue'
import PannelPhone from './pannel.phone.vue'

const isRemember = ref<boolean>(false)
const activeName = ref<string>('userlogin')
const accountRef = ref<InstanceType<typeof PannelAccount>>()

function handleLoginClick() {}

function handleBtnLogin() {
  if (activeName.value === 'userlogin') {
    // 1. 获取子组件的实例
    accountRef.value?.loginAction()
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

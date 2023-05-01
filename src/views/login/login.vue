<template>
  <div class="login">
    <h1 class="title">宏远后台管理系统</h1>
    <login-tabs />
    <div class="login-input">
      <div class="account">
        <div>账号</div>
        <el-input type="text" v-model="username" />
      </div>
      <div class="password">
        密码
        <el-input type="text" v-model="username" />
      </div>
    </div>
    <login-pannel />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginPannel from './c-cpns/login-pannel.vue'
import LoginTabs from './c-cpns/login-tabs.vue'

const username = ref('')
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

  .login-input {
    .account {
      display: flex;
    }
  }
}
</style>

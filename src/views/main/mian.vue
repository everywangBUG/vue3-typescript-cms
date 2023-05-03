<template>
  <div class="main">
    <h2>这是main页面</h2>
    <button @click="handleExitLand">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/constants/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleExitLand() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 退回到login页面
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: skyblue;
}
</style>

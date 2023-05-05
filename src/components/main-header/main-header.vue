<template>
  <div class="main-header">
    <h2>main-header</h2>
    <button @click="handleLogout">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/constants/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main-header {
}
</style>

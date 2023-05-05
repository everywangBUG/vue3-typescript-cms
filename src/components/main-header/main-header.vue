<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <el-icon size="28px"><component :is="isFold ? 'Expand' : 'Fold'" /></el-icon>
    </div>
    <div class="header-content">
      <div class="bread-crumbs">面包屑</div>
    </div>
    <button @click="handleLogout">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/constants/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

let isFold = ref<boolean>(false)
const router = useRouter()

// 处理退出逻辑
function handleLogout() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

// 子组件定义自定义事件
const emit = defineEmits(['foldChange'])

// 点击折叠菜单
function handleMenuClick() {
  isFold.value = !isFold.value

  // 通过emit发送给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  .menu-icon {
    display: flex;
    align-items: center;
    margin: 0 10px;
    cursor: pointer;
  }
  .header-content {
    margin: 0 10px;
    .bread-crumbs {
    }
  }
}
</style>

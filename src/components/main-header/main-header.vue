<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <el-icon size="28px"><component :is="isFold ? 'Expand' : 'Fold'" /></el-icon>
    </div>
    <div class="header-content">
      <div class="bread-crumbs">
        <HeaderCrumb />
      </div>
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCrumb from './c-cpns/header-crumb.vue'
import HeaderInfo from './c-cpns/header-info.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

let isFold = ref<boolean>(false)
const router = useRouter()

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    width: 100%;
    .bread-crumbs {
    }
  }
}
</style>

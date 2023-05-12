<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '200px'">
        <!-- 自定义属性isCollapse传递给子组件main-menu -->
        <MainMenu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { MainMenu, MainHeader } from '@/components/index'
import { ref } from 'vue'

// 记录折叠的状态
const isFold = ref<boolean>(false)
// 处理mainheader中是否折叠的变化
function handleFoldChange(flag: boolean) {
  // console.log(isFold)
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-content {
    height: 100%;
    .el-aside {
      background-color: #001121;
      height: 100%;
      transition: width 1s ease-in-out;
      overflow-y: hidden;
    }
    .el-header {
      display: flex;
    }
    .el-main {
      background-color: #f1f2f7;
    }
  }
}
</style>

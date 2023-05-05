<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">
        <MainMenu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { MainMenu, MainHeader } from '@/components/index'
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-content {
    height: 100%;
    .el-aside {
      background-color: #0d1e37;
      height: 100%;
    }
  }
}
</style>

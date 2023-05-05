<template>
  <div class="main-menu">
    <div class="logo">
      <img class="menu-img" src="@/assets/imgs/logo.svg" alt="宏远后台管理系统" />
      <h3 class="menu-title">宏远管理系统</h3>
    </div>
    <div calss="menu-container">
      <el-menu
        default-active="39"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in menuInfo" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">{{ subitem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'

// 1.获取动态菜单
const loginStore = useLoginStore()
const menuInfo = loginStore.menuInfo
</script>

<style lang="less" scoped>
.main {
  .main-content {
    .el-aside {
      .main-menu {
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          .menu-img {
            width: 40px;
            height: 40px;
          }
          .menu-title {
            margin-left: 10px;
            color: #fff;
          }
        }

        .el-menu-item.is-active {
          background-color: #0a60bd !important;
        }

        .el-menu-item:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>

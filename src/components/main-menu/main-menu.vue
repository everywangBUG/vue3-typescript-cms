<template>
  <div class="main-menu">
    <div class="logo">
      <img class="menu-img" src="@/assets/imgs/logo.svg" alt="宏远后台管理系统" />
      <h3 class="menu-title" v-show="!isFold">宏远管理系统</h3>
    </div>
    <div calss="menu-container">
      <el-menu
        default-active="39"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        mode="vertical"
        :collapse-transition="true"
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
              <el-menu-item :index="subitem.id + ''" @click="handleMenuClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRouter } from 'vue-router'

// 0.定义props接收父组件传来的isCollapse
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态菜单
const loginStore = useLoginStore()
const menuInfo = loginStore.menuInfo

const router = useRouter()
// 2.点击menunav中的选项跳转到对象的main页面
function handleMenuClick(item: any) {
  const itemUrl = item.url
  router.push(itemUrl)
}
</script>

<style lang="less" scoped>
.main {
  .main-content {
    .el-aside {
      .main-menu {
        .logo {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 5px;
          .menu-img {
            width: 40px;
            height: 40px;
          }
          .menu-title {
            margin-left: 15px;
            color: #fff;
            white-space: nowrap;
          }
        }
        .el-menu {
          width: 200.5px;
          .el-menu-item.is-active {
            background-color: #0a60bd !important;
          }

          .el-menu-item {
            width: 201px;
          }
          .el-menu-item:hover {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

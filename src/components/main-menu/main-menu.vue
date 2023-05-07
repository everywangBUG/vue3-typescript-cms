<template>
  <div class="main-menu">
    <div class="logo">
      <div class="logo-item">
        <img class="menu-img" src="@/assets/imgs/logo.svg" alt="宏远后台管理系统" />
        <h3 class="menu-title" v-show="!isFold">宏远管理系统</h3>
      </div>
    </div>
    <div calss="menu-container">
      <el-menu
        :default-active="defaultActive"
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
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus-to-routes'
import { computed } from 'vue'

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

// 3.ElMenu默认选中的菜单
const route = useRoute()
// route.path当前点击菜单的对应的页面路径，拿到当前路径
const defaultActive = computed(() => {
  // 当路径重新变化的时候，重新计算menu
  const pathMenu = mapPathToMenu(route.path, menuInfo)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main {
  .main-content {
    .el-aside {
      .main-menu {
        width: 100%;
        .logo {
          display: flex;
          .logo-item {
            display: flex;
            height: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            overflow: hidden;
            margin: auto;
            .menu-img {
              width: 25px;
              height: 25px;
            }
            .menu-title {
              margin-left: 15px;
              color: #fff;
              white-space: nowrap;
            }
          }
        }
        .el-menu {
          .el-sub-menu {
            margin-right: -1px;
          }
          .el-menu-item.is-active {
            background-color: #0a60bd !important;
          }

          .el-menu-item {
            width: 200px;
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

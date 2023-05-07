<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="(item, index) of breadcrumbs" :key="index">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadCrumb } from '@/utils/map-menus-to-routes'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// computed实现数据响应式，实时更新面包屑路径
const breadcrumbs = computed(() => {
  const route = useRoute()
  const loginStore = useLoginStore()
  const breadcrumbs = mapPathToBreadCrumb(route.path, loginStore.menuInfo)
  // console.log('breadcrumbs', breadcrumbs)
  return breadcrumbs
})
</script>

<style lang="less" scoped>
.header-crumb {
  display: flex;
}
</style>

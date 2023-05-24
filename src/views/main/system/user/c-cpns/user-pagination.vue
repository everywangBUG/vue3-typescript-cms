<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      :small="small"
      layout="sizes, prev, pager, next, jumper, total"
      :total="usersTotalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(true)

// 请求总数据条数
const systemUserStore = useSystemStore()
const usersTotalCount = systemUserStore.usersTotalCount

// 处理页码发生改变的监听
function handleSizeChange() {
  console.log(pageSize)
}

// 处理当前页面改变的监听
function handleCurrentChange() {
  // 调用网络请求函数，根据pageSize和currentPage动态获取
  fetchUserList()
}

// 获取网络请求的函数
function fetchUserList() {
  // 1.获取offset和size
  const size = pageSize.value
  // 2.获取每次的偏移量*10 1：0 2：10
  const offset = (currentPage.value - 1) * 10
  const info = { size, offset }
  systemUserStore.postUsersListAction(info)
}
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>

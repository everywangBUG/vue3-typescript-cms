<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h2>部门列表</h2>
        <el-button type="primary" @click="handleCreateNewUser">新建部门</el-button>
      </div>
      <div class="department-list">
        <el-table border :data="pageList" style="width: 100%">
          <el-table-column type="selection" width="50px" align="center" />
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column width="180" prop="name" label="部门名称" align="center">
            <template #default="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="cellphone" label="部门领导" align="center">
            <template #default="scope">
              {{ scope.row.leader }}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="name" label="上级部门" align="center">
            <template #default="scope">
              {{ scope.row.parentId }}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="createAt" label="创建时间" align="center">
            <template #default="scope">
              {{ formatUTC(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="updateAt" label="更新时间" align="center">
            <template #default="scope">
              {{ formatUTC(scope.row.updateAt) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button 
                size="small" 
                text type="primary" 
                icon="Edit" 
                @click="handleEditClick(scope.row)"
              >
              编辑
              </el-button>
              <el-button 
                size="small" 
                text type="danger" 
                icon="Delete" 
                @click="handleDeleteClick(scope.row.id)"
              >
              删除
            </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          :small="small"
          layout="sizes, prev, pager, next, jumper, total"
          :total="pageTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import formatUTC from '@/utils/formatUTCTime'
import useSystemStore from '@/store/main/system/system'
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(true)
const emit = defineEmits(['createNewuser', 'editUserInfo'])

// 1.通过action发起数据请求
const systemUserStore = useSystemStore()
fetchPageList()

// 2.获取userList数据进行展示，第一次会获取空值，使用computed或storeToRefs(响应式)
const { pageList, pageTotalCount } = storeToRefs(systemUserStore)

// 处理页码发生改变的监听
function handleSizeChange() {
  fetchPageList()
}

// 处理当前页面改变的监听
function handleCurrentChange() {
  fetchPageList()
}

// 获取网络请求的函数
function fetchPageList(formData: any = {}) { // 需要给一个默认的值防止上面函数报错
  // 1.获取offset和size
  const size = pageSize.value
  // 2.获取每次的偏移量*10 1：0 2：10
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  // 3.把offset size和search框中的数据一起传入网络请求函数
  systemUserStore.postPageListAction('department', queryInfo)
}

// 处理删除点击事件
function handleDeleteClick(id: number) {
  systemUserStore.deletePageListByIdAction('department', id)
}

// 新建部门
function handleCreateNewUser() {
  emit('createNewuser')
}

// 编辑部门
function handleEditClick(rowData: any) {
  emit("editUserInfo", rowData)
}

// 将网络请求的方法暴露出去 
defineExpose({ fetchPageList })
</script>

<style lang="less" scoped>
.content {
  padding: 20px 0 20px 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px 0;
  }
  .department-list {
    width: 100%;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 20px 10px 20px 0;
  }
}
</style>

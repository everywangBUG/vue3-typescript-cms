<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h2>用户列表</h2>
        <el-button type="primary">新建数据</el-button>
      </div>
      <div class="userList">
        <el-table border :data="usersList" style="width: 100%">
          <el-table-column type="selection" width="50px" align="center" />
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column width="180" prop="name" label="用户名" align="center">
            <template #default="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="name" label="真实姓名" align="center">
            <template #default="scope">
              {{ scope.row.realname }}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="cellphone" label="手机号码" align="center">
            <template #default="scope">
              {{ scope.row.cellphone }}
            </template>
          </el-table-column>
          <!-- 使用作用域插槽，default指定插槽 -->
          <el-table-column prop="enable" label="状态" width="80px" align="center">
            <template #default="scope">
              <el-button size="small" text>
                {{ scope.row.enable ? '启用' : '禁用' }}
              </el-button>
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
            <el-button size="small" text type="primary" icon="Edit">编辑</el-button>
            <el-button size="small" text type="danger" icon="Delete">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import formatUTC from '@/utils/formatUTCTime'
import useSystemStore from '@/store/main/system/system'

// 1.通过action发起数据请求
const systemUserStore = useSystemStore()
systemUserStore.postUsersListAction()

// 2.获取userList数据进行展示，第一次会获取空值，使用computed或storeToRefs(响应式)
const { usersList } = storeToRefs(systemUserStore)
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

  .userList {
    width: 100%;
  }
}
</style>

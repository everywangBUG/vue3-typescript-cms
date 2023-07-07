<template>
  <div class="user-search">
    <el-form size="large" label-width="90px" :model="searchForm" ref="formRef">
      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" placeholder="请输入部门领导名字"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              placeholder="请选择创建时间"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button @click="resetInput">重置</el-button>
      <el-button type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

// 定义form的数据
const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  id: '',
  name: '',
  parentId: '',
  createAt: '',
  updatedAt: '',
  leader: ''
})

// 自定义事件l
const emit = defineEmits(['querySelect', 'resetInput'])

// 查询功能的实现
function handleQueryClick() {
  // 发送querySelect
  emit('querySelect', searchForm)
}

// 重置按钮的实现
function resetInput() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.事件传递出去，在content中重新发送网络请求
  emit('resetInput')
}
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 0 20px 0 20px;
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>

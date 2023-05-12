<template>
  <div class="user-search">
    <el-form size="large" label-width="90px" :model="searchForm" ref="formRef">
      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="searchForm.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="searchForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              placeholder="请选择查询的状态"
              style="width: 100%"
              v-model="searchForm.enable"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.ceateAt"
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

const searchForm = reactive({
  name: '',
  realName: '',
  phone: '',
  enable: 1,
  ceateAt: []
})

const formRef = ref<InstanceType<typeof ElForm>>()

/**
 * @description 查询功能的实现
 * @returns
 */
function handleQueryClick() {
  console.log('查询')
}

/**
 * @description 重置按钮的实现
 * @returns
 */
function resetInput() {
  formRef.value?.resetFields()
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

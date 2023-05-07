<template>
  <div class="user-search">
    <el-form size="large" label-width="90px">
      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="请选择查询的状态" style="width: 100%">
              <el-option label="One" value="shanghai" />
              <el-option label="Two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
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
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
}
</style>

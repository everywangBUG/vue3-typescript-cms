<template>
  <div class="page-search">
    <el-form size="large" label-width="90px" :model="searchForm" ref="formRef">
      <el-row :gutter="100">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- 第一种情况，使用动态组件 -->
              <!-- <component :is="`'el-'+${item.type}`"></component> -->
              <!-- 第二种情况，使用template -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder" 
                />
              </template>
              <template v-if="item.type === 'data-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  placeholder="请选择创建时间"
                  type="daterange"  
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import type { IProps } from '@/components/page-search/type'

const emit = defineEmits(['querySelect', 'resetInput'])
const props = defineProps<IProps>()

// 使用search.config.ts对象初始化定义form的数据
const initialForm: any = {}
for(const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
  
// 查询功能的实现
function handleQueryClick() {
  // 发送querySelect
  emit('querySelect', searchForm)
}

// 重置功能的实现
const formRef = ref<InstanceType<typeof ElForm>>()
function resetInput() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.事件传递出去，在content中重新发送网络请求
  emit('resetInput')
}
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  padding: 0 20px 0 20px;
  line-height: 42px;
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

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateNewUserRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <div class="newdepartment-form">
        <el-form :model="formData" label-width="100px" align-center labelPosition="left" ref="formDataRef" :rules="departmentRules">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="formData.name"/>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导名字" v-model="formData.leader"/>
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select placeholder="请选择上级部门" v-model="formData.parentId" style="width: 100%">
              <template v-for="item of entireDepartments" :key="item.parentId">
                <el-option :label="item.name" :value="item.parentId"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick(formDataRef)"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'

import type { FormRules, FormInstance } from 'element-plus'

interface IFormData {
  name: string
  leader: string
  parentId: string
}

const formData = reactive<IFormData>({
  name: '',
  leader: '',
  parentId: ''
})

const dialogVisible = ref(false)
let isCreateNewUserRef = ref(true)
// 定义变量记录编辑的哪一条数据
const editData = ref()

// 获取用户和部门数据
const userMainStore = useMainStore()
const systemUserStore = useSystemStore()
const { entireDepartments } = storeToRefs(userMainStore)

// 定义设置dialogVisible方法，在函数中拦截，false表示编辑，true表示新建
function setDialogVisible(isCreateNewUser: boolean = true, rowData?: any) {
  // 新建用户时显示modal框
  dialogVisible.value = true
  // 编辑时把content中的信息填充进去
  if (!isCreateNewUser && rowData) {
    isCreateNewUserRef.value = false
    for (const key in formData) {
      formData[key] = rowData[key]
    }
    editData.value = rowData
  } else {
    // 新建时
    isCreateNewUserRef.value = true
    // 新建时清空modal中的数据
    for (const key in formData) {
      formData[key] = ''
    }
    // 新建数据时editData.value没有数据
    editData.value = null
  }
}


// 表单规则验证
const departmentRules = reactive<FormRules> ({
  name: [{  required: true, message: '请输入部门名称' }],
  leader: [{ required: true, message: '请输入部门领导名字' }],
  parentId: [{ required: true, message: '请输入上级部门id' }]
})

const formDataRef = ref<FormInstance>()
// 添加部门的逻辑
async function handleConfirmClick(formDataRef: FormInstance | undefined) {
  // 表单验证
  if (!formDataRef) return
  await formDataRef.validate((valid) => {
    if (valid) {
      // 编辑部门
      if (!isCreateNewUserRef.value && editData.value) {
        // 此处的id获取是定义的获取到某一行数据的id
        systemUserStore.editPageInfoAction('department', editData.value.id, formData)
        dialogVisible.value = false
      } else {
        // 创建新部门
        systemUserStore.postNewPageInfoAction('department', formData)
        dialogVisible.value = false
      }
    }
    return false
  })
}

// 弹框消失去除验证规则
watch(dialogVisible, (val) => {
  if (!val) formDataRef.value?.clearValidate()
})

// 暴露属性和方法(统一暴露方法)
defineExpose({ setDialogVisible })
</script>
<style lang="less" scoped>
.modal {
  .newdepartment-form {
    padding: 0 80px;

    :deep(.el-form) {
      .el-form-item {
        .el-form-item__label {
          justify-content: flex-end;
          width: 80px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateNewUserRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <div class="newuser-form">
        <el-form
          :model="formData"
          label-width="100px"
          align-center
          labelPosition="left"
          ref="formDataRef"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isCreateNewUserRef">
            <el-input placeholder="请输入密码" type="password" v-model="formData.password" />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入电话号码" v-model="formData.cellphone" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select placeholder="请选择角色" v-model="formData.roleId" style="width: 100%">
              <template v-for="item of entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select placeholder="请选择部门" v-model="formData.departmentId" style="width: 100%">
              <template v-for="item of entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
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
import type { IRuleForm } from '../types/type'

const formDataRef = ref<FormInstance>()
const formData = reactive<IRuleForm>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符之间', trigger: 'blur' }
  ],
  realname: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 18, message: '长度在 3 到 18 个字符之间', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,18}$/, message: '请输入正确格式的密码', trigger: 'blur' }
  ],
  cellphone: [
    { required: true, message: '请输入手机号或固定电话', trigger: 'change' },
    {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
      message: '请输入正确格式的手机号或固定电话',
      trigger: 'change'
    }
  ],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
  departmentId: [{ required: true, message: '请选择部门', trigger: 'change' }]
})

const dialogVisible = ref(false)
let isCreateNewUserRef = ref(true)
// 定义变量记录编辑的哪一条数据
const editData = ref()

// 获取用户和部门数据
const userMainStore = useMainStore()
const systemUserStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(userMainStore)

// 定义设置dialogVisible方法，在函数中拦截，false表示编辑用户，true表示新建用户
function setDialogVisible(isCreateNewUser: boolean = true, rowData?: any) {
  // 新建用户时显示modal框
  dialogVisible.value = true
  // 编辑用户时把user-content中的用户信息填充进去
  if (!isCreateNewUser && rowData) {
    // 编辑用户不显示password
    isCreateNewUserRef.value = false
    for (const key in formData) {
      formData[key] = rowData[key]
    }
    editData.value = rowData
  } else {
    // 新建用户时
    isCreateNewUserRef.value = true
    // 新建用户时清空modal中的数据
    for (const key in formData) {
      formData[key] = ''
    }
    // 新建数据时editData.value没有数据
    editData.value = null
  }
}

// 添加用户的逻辑
async function handleConfirmClick(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 编辑用户
      if (!isCreateNewUserRef.value && editData.value) {
        systemUserStore.editUserInfoAction(editData.value.id, formData)
        dialogVisible.value = false
        // 新建用户
      } else {
        systemUserStore.postNewUserInfoAction(formData)
        dialogVisible.value = false
      }
    }
    return false
  })
}

// 弹框消失去除验证
watch(dialogVisible, (val) => {
  if (!val) formDataRef.value?.clearValidate()
})

// 暴露属性和方法(统一暴露方法)
defineExpose({ setDialogVisible })
</script>
<style lang="less" scoped>
.modal {
  .newuser-form {
    padding: 0 80px;

    :deep(.el-form) {
      .el-form-item {
        justify-content: center;
        .el-form-item__label {
          justify-content: flex-end;
          width: 80px;
        }
      }
    }
  }
}
</style>
../types/type

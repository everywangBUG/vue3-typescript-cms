<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isCreateNewUserRef ? '新建用户' : '编辑用户'" width="30%" center>
      <div class="newuser-form">
        <el-form :model="formData" label-widt="100px" align-center labelPosition="left">
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
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
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
function handleConfirmClick() {
  dialogVisible.value = false
  // 不是isCreatedNewUser，编辑用户
  if (!isCreateNewUserRef.value && editData.value ) {
    // 此处的id获取是定义的获取到某一行数据的id
    systemUserStore.editUserInfoAction(editData.value.id  , formData)
  } else {
    systemUserStore.postNewUserInfoAction(formData)
  }
}

// 暴露属性和方法(统一暴露方法)
defineExpose({ setDialogVisible })
</script>
<style lang="less" scoped>
.modal {
  .newuser-form {
    padding: 0 80px;

    .el-form {
      .el-form-item {
        .el-form--label-left .el-form-item__label {
          justify-content: flex-end !important;
          width: 80px !important;
        }
      }
    }
  }
}
</style>

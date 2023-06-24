<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" 
        :title="isCreateNewUserRef ? modalConfig.header?.newTitle : modalConfig.header?.editTitle" 
        width="30%" 
        center
      >
      <div class="newdepartment-form">
        <el-form :model="formData" label-width="100px" align-center labelPosition="left">
          <template v-for="item in modalConfig.propList" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
              </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'
// 3.3版本之前目前不支持从外部导入，3.3开始支持
import type { IProps } from '@/components/page-modal/type'

const props = defineProps<IProps>()

// 使用modal.config.ts中的propList数据动态展示
const initailForm: any = {}
for(const item of props.modalConfig.propList) {
  initailForm[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initailForm)


const dialogVisible = ref(false)
let isCreateNewUserRef = ref(true)
// 定义变量记录编辑的哪一条数据
const editData = ref()

// 获取用户和部门数据
const systemUserStore = useSystemStore()

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
      // 新建时给定初始值
      const item = props.modalConfig.propList.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    // 新建数据时editData.value没有数据
    editData.value = null
  }
}

// 添加新数据的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  // 不是isCreatedNewUser，编辑数据
  if (!isCreateNewUserRef.value && editData.value ) {
    // 此处的id获取是定义的获取到某一行数据的id
    systemUserStore.editPageInfoAction(props.modalConfig.pageName, editData.value.id , infoData)
  } else {
    // 创建新数据
    systemUserStore.postNewPageInfoAction(props.modalConfig.pageName, infoData)
  }
}

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

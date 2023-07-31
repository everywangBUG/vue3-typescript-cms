import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

const formDataRef = ref<FormInstance>()
async function useFormValidator(formDataRef: FormInstance | undefined, isCreateNewUserRef: boolean, editData: object, dialogVisible: boolean) {
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

  return 
}
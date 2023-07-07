import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

/**
 * @description 新建和编辑的hooks
 * @param {function} editCallback 编辑回显的回调函数
 * @returns {*} modalRef pageModal的DOM实例
 * @returns {function} handleNewClick 新建数据
 * @returns {function} handleEditClick 编辑数据
 */
function usePageModal(editCallback?: CallbackFnType, newCallback?: CallbackFnType): any {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  // 点击新建交互
  function handleNewClick() {
    modalRef.value?.setDialogVisible()
    // 如果新建时在编辑框设置了elTree的值，可以清空elTree中的数据
    if (newCallback) newCallback()
  }

  // 点击page-content时modal编辑交互
  function handleEditClick(rowData: any) {
    modalRef.value?.setDialogVisible(false, rowData)
    // 如果有编辑的回调，运行editCallback
    if (editCallback) editCallback(rowData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal

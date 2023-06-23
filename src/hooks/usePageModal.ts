import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType <typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setDialogVisible()
  }

  // 点击page-content时modal编辑交互
  function handleEditClick(rowData: any) {
    modalRef.value?.setDialogVisible(false, rowData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
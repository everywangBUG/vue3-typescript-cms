import { ref } from "vue"
import type PageContent  from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  // 查询按钮请求查询的数据
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageList(queryInfo)
  }
    
  // 重置按钮重新请求数据
  function handleResetInput() {
    contentRef.value?.fetchPageList()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetInput
  }
}

export default usePageContent
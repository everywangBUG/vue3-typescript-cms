import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

/**
 * @description 查询和重置的hooks
 * @returns {*} contentRef pageContent的DOM实例
 * @returns {function} handleQueryClick 查询函数
 * @returns {function} handleResetInput 重置函数
 */
function usePageContent(): any {
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

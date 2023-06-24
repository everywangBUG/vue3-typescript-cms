<template>
  <div class="department">
    <PageSearch
      :search-config="searchConfig"
      @query-select="handleQueryClick"
      @reset-input="handleResetInput" 
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @create-new-table="handleNewClick"
      @edit-table-info="handleEditClick" 
    > 
      <!-- 具名插槽自定义表格项 -->
      <template #leader="scope">
        <span class="leader">哈哈哈{{scope.row.leader}}</span>·
      </template>
      <template #name="scope">
        <span class="name">呵呵呵呵{{scope.row[scope.prop]}}</span>
      </template>
    </PageContent>
    <PageModal
      :modal-config="modalConfigRef"
      ref="modalRef"
    />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { computed } from 'vue'
import useMainStore from '@/store/main/main'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modal-config.ts操作动态加入option属性，使用计算属性
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.propList.forEach(item => {
    if(item.prop === 'parentId') {
      item.options.push(...departments)
    }
  });
  return modalConfig
})

const { contentRef, handleQueryClick, handleResetInput } = usePageContent()

// const contentRef = ref<InstanceType<typeof PageContent>>()
// // 查询按钮请求查询的数据
// function handleQueryClick(queryInfo: any) {
//   contentRef.value?.fetchPageList(queryInfo)
// }
  
// // 重置按钮重新请求数据
// function handleResetInput() {
//   contentRef.value?.fetchPageList()
// }

// 使用抽取的hooks
const { modalRef, handleNewClick, handleEditClick } = usePageModal()

// 点击page-content时modal新建交互
// const modalRef = ref<InstanceType <typeof PageModal>>()
// function handleNewClick() {
//   modalRef.value?.setDialogVisible()
// }

// // 点击page-content时modal编辑交互
// function handleEditClick(rowData: any) {
//   modalRef.value?.setDialogVisible(false, rowData)
// }
</script>

<style scoped lang="less">
.department {
  .leader {
    color: red;
  }
  .name {
    background-color: skyblue;
  }
}
</style>

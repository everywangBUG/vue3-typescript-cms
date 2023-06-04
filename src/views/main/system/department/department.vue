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
      @create-new-department="handleNewClick"
      @edit-department-info="handleEditClick" 
    >
      <!-- 具名插槽 -->
      <template #leader="scope">
        <span class="leader">哈哈哈{{scope.row.leader}}</span>
      </template>
      <template #name="scope">
        <span class="name">呵呵呵呵{{scope.row[scope.prop]}}</span>
      </template>
    </PageContent>
    <PageModal 
      ref="modalRef"
    />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

const contentRef = ref<InstanceType<typeof PageContent>>()
// 查询按钮请求查询的数据
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageList(queryInfo)
}

// 重置按钮重新请求数据
function handleResetInput() {
  contentRef.value?.fetchPageList()
}

// 点击page-content时modal新建交互
const modalRef = ref<InstanceType <typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setDialogVisible()
}

// 点击page-content时modal编辑交互
function handleEditClick(rowData: any) {
  modalRef.value?.setDialogVisible(false, rowData)
}
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

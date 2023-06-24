<template>
  <div class="menu">
    <PageContent 
      :content-config="contentConfig"
      @create-new-table="handleNewClick"
      @edit-table-info="handleEditClick"
    />
    <PageModal
    :modal-config="modalConfig"
      ref="modalRef"
    />
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import contentConfig from './config/content.config'
import modalConfig from '../menu/config/modal.config'
import usePageModal from '@/hooks/usePageModal'

// 新建和编辑
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
.menu {
}
</style>

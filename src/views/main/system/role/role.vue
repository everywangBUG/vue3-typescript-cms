<template>
  <div class="role">
    <PageContent 
      :content-config="contentConfig"
      @create-new-table="handleCreateNewRole"
    />
    <PageModal 
      :modal-config="modalConfig"
      ref="modalRef"
    >
      <template #span>
        <span>呵呵呵</span>
      </template>
      <template #title>
        <h3>This is title</h3>
      </template>
      <template #btn>
        <el-button>点击创建角色</el-button>
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

import contentConfig from '@/views/main/system/role/config/content.config'
import modalConfig from '@/views/main/system/role/config/modal.config'

const modalRef = ref<InstanceType <typeof PageModal>>()
function handleCreateNewRole() {
  modalRef.value?.setDialogVisible()
}
</script>

<style lang="less" scoped>
.role {
}
</style>

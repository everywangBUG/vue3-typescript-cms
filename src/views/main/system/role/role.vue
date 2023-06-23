<template>
  <div class="role">
    <PageContent 
      :content-config="contentConfig"
      @create-new-table="handleCreateNewRole"
      @edit-table-info="handleEditRole"
    />
    <PageModal 
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #elTree>
        <el-tree
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name'}"
        @check="handleCheckClick"
      />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'

import contentConfig from '@/views/main/system/role/config/content.config'
import modalConfig from '@/views/main/system/role/config/modal.config'

const modalRef = ref<InstanceType <typeof PageModal>>()
function handleCreateNewRole() {
  modalRef.value?.setDialogVisible()
}

const mainUseStore = useMainStore()
const { menuList } = storeToRefs(mainUseStore)

// 新增用户
const otherInfo = ref({})
function handleCheckClick(data1: any, data2: any) {
  const menuList = [ ...data2.checkedKeys, ...data2.halfCheckedKeys ]
  otherInfo.value = { menuList }
}

// 编辑用户
function handleEditRole(rowData: any) {
  modalRef.value?.setDialogVisible(false, rowData)
}

</script>

<style lang="less" scoped>
.role {
}
</style>

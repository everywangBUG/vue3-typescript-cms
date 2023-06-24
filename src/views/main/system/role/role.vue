<template>
  <div class="role">
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
        ref="treeRef"
      />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import PageSearch from '@/components/page-search/page-search.vue'

import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'

import searchConfig from './config/search.config'
import contentConfig from '@/views/main/system/role/config/content.config'
import modalConfig from '@/views/main/system/role/config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { ElTree } from 'element-plus'

import { mapMenusListToId } from '@/utils/map-menus-to-routes'

const mainUseStore = useMainStore()
const { menuList } = storeToRefs(mainUseStore)

// 新增用户
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleCheckClick(data1: any, data2: any) {
  const menuList = [ ...data2.checkedKeys, ...data2.halfCheckedKeys ]
  otherInfo.value = { menuList }
}

// 重置和查询
const { contentRef, handleQueryClick, handleResetInput } = usePageContent()

// 新建和编辑
const { modalRef, handleNewClick, handleEditClick } = usePageModal(editCallback)

// 编辑的回调，用于解决每次点击角色权限的回显
function editCallback(rowData) {
  const menuIds = mapMenusListToId(rowData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

</script>

<style lang="less" scoped>
.role {
}
</style>

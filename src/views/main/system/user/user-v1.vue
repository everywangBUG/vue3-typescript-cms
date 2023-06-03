<template>
  <div class="user">
    <UserSearch @query-select="handleQuerySelect" @reset-input="handleResetInput"/>
    <UserContent ref="contentRef" @create-newuser="handleCreateNewUser" @edit-user-info="handleEditClick"/>
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue';

// 处理user-search中的传来的数据
const contentRef = ref<InstanceType<typeof UserContent>>()
// 拿到user-search中的内容formData
function handleQuerySelect(formData: any) {
  // 通过ref拿到userContent组件实例上的fetchUserList网络请求方法
  contentRef.value?.fetchUserList(formData)
}

// 处理uer-search中重置数据
function handleResetInput() {
  contentRef.value?.fetchUserList()
}

// 处理user-content中edit按钮
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleEditClick(rowData: any) {
  modalRef.value?.setDialogVisible(false, rowData)
}

// 处理user-modal中事件
function handleCreateNewUser() {
  modalRef.value?.setDialogVisible()
}

</script>

<style lang="less" scoped>
.user {
  border-radius: 10px;
}
</style>

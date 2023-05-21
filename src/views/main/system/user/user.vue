<template>
  <div class="user">
    <UserSearch @query-select="handleQuerySelect" @reset-input="handleResetInput"/>
    <UserContent ref="contentRef"/>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import { ref } from 'vue';

/**
 * @description 处理user-search中的传来的数据
 * @param {object} formData
 */
const contentRef = ref<InstanceType<typeof UserContent>>()
// 拿到user-search中的内容formData
function handleQuerySelect(formData: any) {
  // 通过ref拿到userContent组件实例上的fetchUserList网络请求方法
  contentRef.value?.fetchUserList(formData)
}

/**
 * @description 处理uer-search中重置数据
 */
function handleResetInput() {
  contentRef.value?.fetchUserList()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 10px;
}
</style>

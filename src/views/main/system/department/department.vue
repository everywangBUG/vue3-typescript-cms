<template>
  <div class="department">
    <PageSearch @query-select="handleQueryClick" @reset-input="handleResetInput"/>
    <PageContent ref="contentRef"/>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import { ref } from 'vue';

const contentRef = ref<InstanceType<typeof PageContent>>()
// 查询按钮请求查询的数据
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageList(queryInfo)
}

// 重置按钮重新请求数据
function handleResetInput() {
  contentRef.value?.fetchPageList()
}
</script>

<style scoped>
.department {
}
</style>

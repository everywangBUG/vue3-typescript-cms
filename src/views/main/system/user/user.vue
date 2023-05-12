<template>
  <div class="user">
    <UserSearch />
    <UserContent />
    <UserPagination />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserPagination from './c-cpns/user-pagination.vue'
</script>

<style lang="less" scoped>
.user {
  border-radius: 10px;
}
</style>

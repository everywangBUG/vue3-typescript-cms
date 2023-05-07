<template>
  <div class="user">
    <UserSearch />
    <div class="content">
      <div class="header">头部</div>
      <div class="userList">用户列表</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
</script>

<style lang="less" scoped>
.user {
  border-radius: 10px;
}
</style>

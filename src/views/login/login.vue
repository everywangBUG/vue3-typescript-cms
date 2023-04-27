<template>
  <div class="home">
    <h2>这是登录页面</h2>
  </div>
</template>

<script setup lang="ts">
import { myRequest } from '@/service'

myRequest
  .get({
    url: 'search?keywords=海阔天空'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style lang="less" scoped>
.home {
  color: red;
}
</style>

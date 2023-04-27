<template>
  <div class="main">
    <h2>这是main页面</h2>
    <div>current counter: {{ counter.counter }}-{{ counter.doubleCounter }}</div>
    <button @click="changeCounter">修改</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counter = useCounterStore()

function changeCounter() {
  counter.changeCounterAction(1000)
}
</script>

<style lang="less" scoped>
.main {
  color: skyblue;
}
</style>

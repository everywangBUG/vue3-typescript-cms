<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <template #footer>
        <p>hello zhangsang</p>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="dialogVisible = false" type="primary">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

// 定义设置dialogVisible方法，在函数中拦截
function setDialogVisible() {
  dialogVisible.value = true
}

// 暴露属性和方法(统一暴露方法)
defineExpose({ setDialogVisible })
</script>
<style lang="less" scoped>
.modal{
}
</style>
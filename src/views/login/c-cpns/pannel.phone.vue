<template>
  <div class="login-phone">
    <div style="margin: 20px" />
    <el-form label-width="65px" :model="formLabelPhone" :rules="phoneRules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formLabelPhone.phone" />
      </el-form-item>

      <el-form-item label="验证码" prop="verification">
        <div class="verify-RL">
          <el-input v-model="formLabelPhone.verification" class="verify" />
          <span class="verify-btn">
            <el-button type="primary" @click="handleSend">发送验证码</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const formLabelPhone = reactive({
  phone: '',
  verification: ''
})

// 手机号验证规则
const phoneRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^[0-9]{11}$/, message: '请输入11位的手机号', trigger: 'blur' }
  ],
  verification: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{4}$/, message: '必须是四位数验证码', trigger: 'blur' }
  ]
})

const handleSend = function () {}
</script>

<style lang="less" scoped>
.login-phone {
  .verify-RL {
    display: flex;
    justify-content: space-between !important;
    .verify {
      width: 50%;
    }
  }
}
</style>

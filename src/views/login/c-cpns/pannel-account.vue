<template>
  <div class="pannel-account">
    <div style="margin: 20px" />
    <el-form
      label-width="65px"
      :model="formLabelAccount"
      :rules="accountRules"
      ref="formRef"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="formLabelAccount.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formLabelAccount.password"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="account">
import { type ElForm, type FormRules, ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/index'
import { reactive, ref } from 'vue'
import { localCache } from '@/utils/cache'
import { CACHE_NAME, CACHE_PASSWORD } from '@/constants/login'

const formLabelAccount = reactive<IAccount>({
  // 有密码记住密码功能
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 帐号校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { pattern: /^[a-z0-9]{2,10}$/, message: '用户名称在2到10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,18}$/, message: '必须是三位以上的密码字符', trigger: 'blur' }
  ]
})

// 执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRmbPsw: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户名和密码
      const name = formLabelAccount.name
      const password = formLabelAccount.password
      // 2.新建文件夹文件在专属模块发送网络请求，在service中post/get到的数据存储到piana中的store/login/login中
      // 3.登录成功后则记住密码
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRmbPsw) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
      // 3.记住密码
    } else {
      ElMessage.error({ message: '哎呦！请输入合法的用户名和密码！' })
    }
  })
}

// 将方法暴露出去给父组件调用
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pannel-account {
}
</style>

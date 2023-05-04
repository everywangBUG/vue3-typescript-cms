import { LOGIN_TOKEN } from '@/constants/login'
import router from '@/router/route'
import { accountLogin, userInfoById } from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {}
  }),
  // 异步请求网络数据
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLogin(account)
      // 1.帐号登录，获取token的信息，把token结果保存到state中
      console.log(loginResult)
      const id = loginResult.data.data.id
      this.token = loginResult.data.data.token

      // 2.使用localStorage或sessionStorages本地缓存，可以使用封装过后的localStorage
      localCache.setCache('token', this.token)

      // 3.获取用户登录的详细信息(权限信息、角色信息、部门等)，存到state中
      const userInfoRes = await userInfoById(id)
      this.userInfo = userInfoRes

      // 4.页面跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore

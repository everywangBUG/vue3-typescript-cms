import { LOGIN_TOKEN } from '@/constants/login'
import router from '@/router/route'
import { accountLogin } from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  // 异步请求网络数据
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLogin(account)
      // 1.帐号登录，获取token的信息，把结果保存到state中
      this.id = loginResult.data.data.id
      this.token = loginResult.data.data.token
      this.name = loginResult.data.data.name

      // 2.使用localStorage或sessionStorages本地缓存，可以使用封装过后的localStorage
      localCache.setCache('token', this.token)

      // 3.页面跳转
      router.push('/main')
    }
  }
})

export default useLoginStore

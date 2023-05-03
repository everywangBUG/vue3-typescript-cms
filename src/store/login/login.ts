import { accountLogin } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

export interface IAccount {
  name: string
  password: string
}

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache('token') ?? '',
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
    }
  }
})

export default useLoginStore

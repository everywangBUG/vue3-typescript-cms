import { BASE_URL, TIME_OUT } from './request/config'
import MyRequest from './request'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/constants/login'

export const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      // 如果header和token有值，则配置config拦截，类型缩小
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})

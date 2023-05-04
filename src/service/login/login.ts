import type { IAccount } from '@/types/index'
import { myRequest } from '..'
import MyRequest from '../request'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/constants/login'

export function accountLogin(account: IAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function userInfoById(id: number) {
  return myRequest.get({
    url: `/users/${id}`,
    // 获取用户的角色权限必须携带token，而token放在headers中的Authorization，可以在axios: service/request/index.ts拦截中实现
    headers: {
      // 如果服务器没有对Bearer字符做处理需要加上
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

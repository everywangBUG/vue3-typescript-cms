import type { IAccount } from '@/store/login/login'
import { myRequest } from '..'
import MyRequest from '../request'

export function accountLogin(account: IAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

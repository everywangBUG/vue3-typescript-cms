import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

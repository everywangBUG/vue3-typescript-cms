import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface MyInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

//对于AxiosRequestConfig配置进行拓展
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>
}

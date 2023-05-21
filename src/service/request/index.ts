import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyInterceptors, MyRequestConfig } from './type'

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyInterceptors

  constructor(config: MyRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    // this.interceptors = config.interceptors

    //每个instance添加response和request拦截器： loading/token/修改配置
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err: any) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err: any) => {
        return err
      }
    )

    //针对特定的myRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: MyRequestConfig<T>): Promise<T> {
    //单个请求config的处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    //返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单次响应拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MyRequest

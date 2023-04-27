//第一种方式：手动设定
// export const BASE_URL = 'http://codercba.com:9002'
// export const TIME_OUT = 10000

//第二种方式：依赖当前的环境：development/production，依据vite默认配置生产环境和开发环境
let BASE_URL = ''
// console.log(import.meta.env.PROD) // 生产环境
// console.log(import.meta.env.DEV) // 开发环境
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.com:9002'
} else {
  BASE_URL = 'http://codercba.prod:9002'
}

export { BASE_URL }
export const TIME_OUT = 10000

// 第三种方式：从定义的环境中加载变量(在程序总文件夹下添加.env.development和.env.production)
// 让这里有REACT_APP_BASE_URL的提示，必须在react-scripts中的lib文件下的interface ProcessEnv加上readOnly React_APP_BASE_URL: string，源码中加上不好
// 故自己拓展声明一个react-app-env.d.ts文件，加入上述的的配置
// console.log(process.env.NODE_ENV)

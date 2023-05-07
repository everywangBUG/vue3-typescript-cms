/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// 声明.mjs文件可以被识别
declare module '*.mjs'

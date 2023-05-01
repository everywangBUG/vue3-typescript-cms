# 创建Vue项目

## 使用webpack搭建

- 命令：`vue create` 

## 使用vite搭建项目环境

- 命令：`npm init vue@latest` ，根据提示进行开发环境的搭配
- vscode安装`volar`插件，使用TS时有更好的提示
- vscode安装volar+TS插件

## 文件解析

### `env.d.ts`

- 表示声明或引用文件，可以定义`interface` 和`type` 等TS类型

### tsconfig.node.json

- 建议项目中的单独的配置或打包相关配置在该文件中修改（不强制）

```javascript
{
  // 两个作用，第一个提供nodejs服务端ssr的实现；第二个给include中提供的vite环境的编译
  "extends": "@vue/tsconfig/tsconfig.node.json",
  // 基于node的vite进行打包
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "playwright.config.*"
  ],
  "compilerOptions": {
    // 合成jsconfig.json和jsconfig.node.json文件为一个文件
    "composite": true,
    // 基于node环境实现
    "types": [
      "node"
    ]
  }
}
```

### tsconfig.json

- 建议tsconfig.json配置完毕尽量不要修改，推荐开发环境下的配置在此处修改

```javascript
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  // 告诉TS哪些文件需要编译
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
    // 此处是配置vscode代码的提示
      "@/*": [
        "./src/*"
      ]
    }
  },
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

### vite.config.ts

```javascript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
  // 使用vite打包的时候的出口路径，类似于webpack.config.js中的alias
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

 ## 项目搭建规范

* 见项目搭建规范.md文件

## CSS重置

* `npm install normalize.css`
* 或安装其他的css重置库
* 安装less：`npm install less` 

## 路由的配置

* `npm install vue-router` 

* 官网：https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html

## 状态管理库

### VUEX

### Pinia

* `npm install pinia` 

#### index.ts中配置pinia

```javascript
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

* 在`main.ts`中使用：`app.use(pinia)`
* 配置详见pinia官网：https://pinia.vuejs.org/introduction.html

## 配置service

### 区分开发环境和生产环境

* 第一种

  ```javascript
  // 1.区分开发环境和生产环境，手动设置可能上线出现忘记分开开发生产环境
  export const BASE_URL = 'http://codercba.com:8000'
  export const BASE_URL = 'http://codercba.production:8000'
  ```

* 第二种：vite默认提供的环境变量

  ```javascript
  // console.log(import.meta.env.PROD) // 生产环境
  // console.log(import.meta.env.DEV) // 开发环境
  let BASE_URL = ''
  if (import.meta.env.MODE === 'production') {
    BASE_URL = 'http://codercba.com:9002'
  } else {
    BASE_URL = 'http://codercba.prod:9002'
  }
  
  export { BASE_URL }
  export const TIME_OUT = 10000
  ```

* 第三种：配置`.env/.env.production/.env.development`

  * `.env`表示不管生产或开发环境都读取
  * `.env.production`表示生产环境读取
  * `.env.development`表示开发环境读取
  * `.env.development.local`中的`.local` 表示是否在本地或推动到git仓库中


## Element-plus集成

### VUE3集成

* elementUI(vue2)、elementPlus(vue3)、VantUI(vue3)
* antdesignVue

### 引入的方式

* 见官网：`https://element-plus.org/zh-CN/guide/design.html`

#### 全局引入

* 不能做`tree shaking` 

```typescript
// 全局引入
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
app.use(ElementPlus)
```

#### 按需引入

##### 在`main.ts`中引用

```typescript
// 按需手动引入
import { ElButton } from 'element-plus'
app.component(ElButton.name, ElButton)
```

##### 在页面组件中直接引用

```vue
<template>
    <el-row class="mb-4">
    <el-button disabled>Default</el-button>
    <el-button type="primary" disabled>Primary</el-button>
    <el-button type="success" disabled>Success</el-button>
    <el-button type="info" disabled>Info</el-button>
    <el-button type="warning" disabled>Warning</el-button>
    <el-button type="danger" disabled>Danger</el-button>
  </el-row>
</template>
<script>
    import { ElButton } from 'element-plus'
</script>
```

##### 使用volar插件按需自动引入(推荐)

**vite配置**

* 类型提示的较好，比较推荐
* 自动导入的插件：`npm install -D unplugin-vue-components unplugin-auto-import`

###### 问题

* 引入完毕后多了两个文件`auto-imports.d.ts` `compponents.d.ts` 
* 此时引入组件时没有类型声明提示，在`tsconfig.json`的`include`字段中加入`"auto-imports.d.ts"` `"components.d.ts"`  

### css修改样式

* 第一种：在common.css中`:root: { --el-button-size: 50px !import }`，加上!import确保覆盖
* 在组件中进行样式的修改并覆盖即可



## 问题汇总

### 1. volar等插件报错问题 

#### 解决：

vscode右下角会有警报提示，根据提示强制清除npm缓存命令

- `npm cache clean --force` 

- 重新安装对应的库即可

# 接口替换

http://123.207.32.32/


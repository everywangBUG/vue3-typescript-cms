import App from '@/App.vue'
import { createApp } from 'vue'
import '@/assets/css/index.less'
import router from './router/route'
import registerIcons from './global/registerIcons'
import registerStore from './store'

// 1.对ElMessage和ElLoading全局注册引入element-plus的所有样式
// import 'element-plus/dist/index.css'
// 2.局部引入ElMessage样式
// import 'element-plus/theme-chalk/el-message.css'
// 3.使用插件引入样式
// vite-plugin-style-import插件

const app = createApp(App)
app.use(registerIcons)
// 使用刷新时加载路由的导出函数
app.use(registerStore)

// 等本地的路由全部加载完毕，再加载路由
app.use(router)
app.mount('#app')

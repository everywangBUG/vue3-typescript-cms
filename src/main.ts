import App from '@/App.vue'
import { createApp } from 'vue'
import '@/assets/css/index.less'
import router from './router/route'
import pinia from './store'
import registerIcons from './global/registerIcons'

// 1.对ElMessage和ElLoading全局注册引入element-plus的所有样式
// import 'element-plus/dist/index.css'
// 2.局部引入ElMessage样式
// import 'element-plus/theme-chalk/el-message.css'
// 3.使用插件引入样式
// vite-plugin-style-import插件

const app = createApp(App)
app.use(registerIcons)
app.use(pinia)
app.use(router)
app.mount('#app')

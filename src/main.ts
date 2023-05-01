import App from '@/App.vue'
import { createApp } from 'vue'
import '@/assets/css/index.less'
import router from './router/route'
import pinia from './store'
import registerIcons from './global/registerIcons'

const app = createApp(App)
app.use(registerIcons)
app.use(pinia)
app.use(router)
app.mount('#app')

import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 1.首先use(pinia)
  app.use(pinia)
  // 2.在使用pinia下面完成store中的加载本地的所有数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore

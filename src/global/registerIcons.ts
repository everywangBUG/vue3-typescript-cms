import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 把所有的图标注册为组件
    app.component(key, component)
  }
}

export default registerIcons

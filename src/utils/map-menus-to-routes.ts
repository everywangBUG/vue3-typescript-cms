import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.1.定义一个数组，类型是router中的类型
  const localRoutes: RouteRecordRaw[] = []
  // 1.2.读取router/main中的所有ts文件，加载main下面的所有的ts文件，中间的两个**表示匹配main下面的所有子目录
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 1.3.遍历出模块，拿到path属性
  for (let key in files) {
    const module = files[key]
    // 动态路由放在数组中
    localRoutes.push(module.default)
  }
  // console.log('localRoutes:', localRoutes)
  return localRoutes
}

// 第一次进到main中的时候，进入到firstMenu的url中
export let firstMenu: any = null
export function mapMenusRoutes(menusInfo: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of menusInfo) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      // 类型缩小
      if (route) routes.push(route)
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

import type { RouteRecordRaw } from 'vue-router'

// 第一次进到main中的时候，进入到firstMenu的url中
export let firstMenu: any = null

/**
 * @description 通过路径获取所有的动态路由path放在一个数组中
 * @returns {Array} localRoutes 本地的路由
 */
function loadLocalRoutes() :Array<any> {
  // 1.1.定义一个数组，类型是router中的类型
  const localRoutes: RouteRecordRaw[] = []
  // 1.2.读取router/main中的所有ts文件，加载main下面的所有的ts文件，中间的两个**表示匹配main下面的所有子目录
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 1.3.遍历出模块，拿到path属性
  for (const key in files) {
    const module = files[key]
    // 动态路由放在数组中
    localRoutes.push(module.default)
  }
  return localRoutes
}

/**
 * @description 根据菜单显示映射正确的路由
 * @param menusInfo
 * @returns {Array} 匹配到的正确的路由
 */
export function mapMenusRoutes(menusInfo: any[]): Array<any> {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of menusInfo) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      // 类型缩小
      // 1.给route的顶层菜单增加重定向的功能(只需要添加一次)
      if (!routes.find((item) => item.path === menu.url) && route) {
        routes.push({ path: menu.url, redirect: route.path })
      }
      if (route) routes.push(route)
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

/**
 * @description 根据路径匹配需要显示的菜单
 * @param {string} path 需要匹配的路径
 * @param menuInfo 所有的菜单
 * @returns {Array} subMenu 子菜单
 */
export function mapPathToMenu(path: string, menuInfo: any[]) {
  for (const menu of menuInfo) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}

interface IBreadcrumb {
  name: string
  path: string
}

/**
 * @description 根据动态获取的路由菜单显示面包屑
 * @param path
 * @param menuInfo
 * @returns {Array} 面包屑数组
 */
export function mapPathToBreadCrumb(path: string, menuInfo: any[]): Array<any> {
  const breadcrumbs: IBreadcrumb[] = []
  for (const menu of menuInfo) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * @description 根据菜单映射的为id数组
 * @param {Array} menus 菜单数组
 * @returns {Array} ids 菜单的id数组
 */
export function mapMenusListToId(menus: any[]): Array<any> {
  const ids: number[] = []
  function _recurseGetId(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetId(menu.children) 
      } else {
        ids.push(menu.id)
      }
    }
  }
  _recurseGetId(menus)
  return ids
}

import { LOGIN_TOKEN } from '@/constants/login'
import { localCache } from '@/utils/cache'
import { firstMenu, mapMenusRoutes } from '@/utils/map-menus-to-routes'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // 判断用户是否登录? '/main' : '/login'
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/not-found/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// const localRoutes = [
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/analysis/overview',
//     component: () => import('@/views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('@/views/main/system/role/role.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('@/views/main/system/user/user.vue')
//   }
// ]

export function addRoutesWithMenu(menusInfo: any) {
  // 获取匹配的所有路由
  const routes = mapMenusRoutes(menusInfo)
  // 动态添加到router中
  routes.forEach((route) => router.addRoute('main', route))

  // 路由导航守卫
  //参数：to(跳转的位置)/from(从哪里跳转过来)
  //返回值：返回值决定了导航的路径(不返回或返回undefined，默认跳转)
  router.beforeEach((to) => {
    // 如果登录成功，即token验证成功，进入main页面
    // token没有获取到值的时候，跳转到login页面
    const token = localCache.getCache(LOGIN_TOKEN)
    // 如果进入到以main开头的路由页面中
    if (to.path.startsWith('/main') && !token) {
      return '/login'
    }
    // 如果进入到login页面中，已经登录了，直接进入main页面
    if (to.path === '/login' && token) {
      return '/main'
    }
    // 如果进入到main页面中，进入到第一个选择的菜单页面中
    if (to.path === '/main' && firstMenu) {
      return firstMenu.url
    }
  })
}

export default router

import { LOGIN_TOKEN } from '@/constants/login'
import { localCache } from '@/utils/cache'
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
    component: () => import('@/views/main/mian.vue')
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

// 路由守卫
//参数：to(跳转的位置)/from(从哪里跳转过来)
//返回值：返回值决定了导航的路径(不返回或返回undefined，默认跳转)
router.beforeEach((to) => {
  // 如果登录成功，即token验证成功，进入main页面
  // token没有获取到值的时候，跳转到login页面
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/login' && token) {
    return '/main'
  }
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
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

// 路由守卫

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

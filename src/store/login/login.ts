import { LOGIN_TOKEN, MENUS_INFO, USER_INFO } from '@/constants/login'
import router from '@/router/route'
import { accountLogin, menusInfoById, userInfoById } from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { mapMenusRoutes } from '@/utils/map-menus-to-routes'
import { defineStore } from 'pinia'

// 指定箭头函数的类型
interface ILoginState {
  token: string
  userInfo: any
  menuInfo: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? {},
    menuInfo: localCache.getCache(MENUS_INFO) ?? {}
  }),
  // 异步请求网络数据
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLogin(account)
      // 1.帐号登录，获取token的信息，把token结果保存到state中
      // console.log(loginResult)
      const id = loginResult.data.data.id
      this.token = loginResult.data.data.token

      // 2.使用localStorage或sessionStorages本地缓存，可以使用封装过后的localStorage
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取用户登录的详细信息(权限信息、角色信息、部门等)，存到state中，存到缓存中
      const userInfoRes = await userInfoById(id)
      const userInfo = userInfoRes.data.data
      this.userInfo = userInfo
      localCache.setCache(USER_INFO, userInfo)
      // console.log('userInfoRes:', userInfoRes.data.data)
      // console.log('userInfoRole', this.userInfo.role)

      // 4.根据用户角色权限动态获取菜单信息，将菜单信息存到state和浏览器内存中
      const menusInfoRes = await menusInfoById(this.userInfo.role.id)
      const menusInfo = menusInfoRes.data.data
      this.menuInfo = menusInfo
      localCache.setCache(MENUS_INFO, menusInfo)
      // console.log('menus:', menusInfoRes)
      // console.log('menuInfo:', menusInfoRes.data.data)

      // 重点：根据菜单动态添加路由
      const routes = mapMenusRoutes(menusInfo)
      routes.forEach((route) => router.addRoute('main', route))

      // 4.页面跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore

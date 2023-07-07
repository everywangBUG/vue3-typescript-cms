import {
  deletePageListById,
  deleteUserListById,
  editPageInfo,
  editUserInfo,
  postNewPageInfo,
  postNewUserInfo,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

import type { ISystemState } from '@/types/types'
import useMainStore from '../main'
import { messagePop } from '@/utils/messagePop'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 展示用户管理数据
    async postUsersListAction(info: object) {
      const systemUserRes = await postUserListData(info)
      const { totalCount, list } = systemUserRes.data.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    // 根据用户id删除用户数据
    async deleteUserListByIdAction(id: number) {
      try {
        // 删除完数据
        const deleteUserRes = await deleteUserListById(id)
        // 重新请求新的数据
        this.postUsersListAction({ offset: 0, size: 10 })
        const { code, data } = deleteUserRes.data
        messagePop(code, data)
      } catch (err) {
        console.log(err)
      }
    },
    // post新增用户信息
    async postNewUserInfoAction(userInfo: object) {
      try {
        const postNewUserInfoRes = await postNewUserInfo(userInfo)
        this.postUsersListAction({ offset: 0, size: 10 })
        const { code, data } = postNewUserInfoRes.data
        messagePop(code, data)
      } catch (err) {
        console.log(err)
      }
    },
    // 修改用户信息
    async editUserInfoAction(id: number, userInfo: any) {
      try {
        // 1.更新用户信息
        const editUserInfoRes = await editUserInfo(id, userInfo)
        // 2.重新请求数据
        this.postUsersListAction({ offset: 0, size: 10 })
        // 提示语
        const { code, data } = editUserInfoRes.data
        messagePop(code, data)
      } catch (err) {
        console.log(err)
      }
    },

    /** 所有页面通用的增删改查 */
    /** 页面请求的增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      try {
        const pageListRes = await postPageListData(pageName, queryInfo)
        const { totalCount, list } = pageListRes.data.data
        this.pageTotalCount = parseInt(totalCount)
        this.pageList = list
      } catch (err) {
        console.log(err)
      }
    },

    // 根据id删除页面的数据
    async deletePageListByIdAction(pageName: string, id: number) {
      try {
        const deletePageListRes = await deletePageListById(pageName, id)
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        // 删除数据后再次发送网络请求获取完整的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        const { code, data } = deletePageListRes.data
        messagePop(code, data)
      } catch (err) {
        console.log(err)
      }
    },

    // 根据页面新建数据
    async postNewPageInfoAction(pageName: string, pageInfo: any) {
      try {
        const postNewPageInfoRes = await postNewPageInfo(pageName, pageInfo)
        // 重新请求新的数据
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        // 新建数据后再次发送网络请求获取完整的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        const { code, data } = postNewPageInfoRes.data
        messagePop(code, data)
      } catch (err) {
        console.log(err)
      }
    },

    // 根据页面编辑数据
    async editPageInfoAction(pageName: string, id: number, queryInfo: any) {
      try {
        const editPageInfoRes = await editPageInfo(pageName, id, queryInfo)
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        // 编辑数据后再次发送网络请求获取完整的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        const { code, data } = editPageInfoRes.data
        messagePop(code, data)
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default useSystemStore

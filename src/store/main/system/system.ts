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
      // 删除完数据
      const deleteRes = await deleteUserListById(id)
      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // post新增用户信息
    async postNewUserInfoAction(userInfo: object) {
      const postUserRes = await postNewUserInfo(userInfo)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 修改用户信息
    async editUserInfoAction(id: number, userInfo: any) {
      // 1.更新用户信息
      const editRes = await editUserInfo(id, userInfo)
      // 2.重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 页面请求的增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListRes.data.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },

    // 根据id删除页面的数据
    async deletePageListByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageListById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    // 根据页面新建数据
    async postNewPageInfoAction(pageName: string, pageInfo: any) {
      const newPageRes = await postNewPageInfo(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    // 根据页面编辑数据
    async editPageInfoAction(pageName: string, id: number, queryInfo: any) {
      const editRes = await editPageInfo(pageName, id, queryInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore

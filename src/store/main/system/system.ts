import {
  deleteUserListById,
  editUserInfo,
  postNewUserInfo,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

import type { IUserSystemState } from '@/types'

const useSystemStore = defineStore('system', {
  state: (): IUserSystemState => ({
    usersList: [],
    usersTotalCount: 0
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
      console.log(deleteRes)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // post新增用户信息
    async postNewUserInfoAction(userInfo: object) {
      const postUserRes = await postNewUserInfo(userInfo)
      console.log(postUserRes)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 修改用户信息
    async editUserInfoAction(id: number, userInfo: any) {
      // 1.更新用户信息
      const editRes = await editUserInfo(id, userInfo)
      console.log(editRes)
      // 2.重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore

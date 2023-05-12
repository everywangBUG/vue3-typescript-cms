import { postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

import type { IUserSystemState } from '@/types'

const useSystemStore = defineStore('system', {
  state: (): IUserSystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const systemUserRes = await postUserListData()
      const { totalCount, list } = systemUserRes.data.data
      this.usersTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore

import { getEntireRoles, getEntireDepartments, getEntireMenuList } from '@/service/main/main'
import { defineStore } from 'pinia'
import type { IMainState } from '@/types'

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    menuList: []
  }),
  actions: {
    // 获取角色用户和部门的的数据
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentsRes = await getEntireDepartments()
      const menuListRes = await getEntireMenuList()

      // 保存数据
      this.entireRoles = rolesRes.data.data.list
      this.entireDepartments = departmentsRes.data.data.list
      this.menuList = menuListRes.data.data.list
    }
  }
})

export default useMainStore

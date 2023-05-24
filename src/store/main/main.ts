import { getEntireRoles, getEntireDepartments } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    // 获取角色用户和部门的的数据
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentsRes = await getEntireDepartments()
      // 需要在登录网络请求的页面进行调用该action
      console.log(rolesRes.data.data.list, departmentsRes)

      // 保存数据
      this.entireRoles = rolesRes.data.data.list
      this.entireDepartments = departmentsRes.data.data.list
    }
  }
})

export default useMainStore

export interface IUserList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: string
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystemState {
  usersList: IUserList[]
  usersTotalCount: number

  pageList: any[]
  pageTotalCount: number
}

export interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

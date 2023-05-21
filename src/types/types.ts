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

export interface IUserSystemState {
  usersList: IUserList[]
  usersTotalCount: number
}

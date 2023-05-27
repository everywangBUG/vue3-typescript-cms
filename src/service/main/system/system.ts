import { myRequest } from '@/service'

export function postUserListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserListById(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}

export function postNewUserInfo(userInfo: any) {
  return myRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserInfo(id: number, userInfo: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

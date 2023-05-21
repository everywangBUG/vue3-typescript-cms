import { myRequest } from '@/service'

export function postUserListData(queryInfo: any) {
  return myRequest.post({
    url: 'users/list',
    data: queryInfo
  })
}

export function deleteUserListById(id: number) {
  return myRequest.delete({
    url: `users/${id}`
  })
}

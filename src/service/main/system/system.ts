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

/** 页面的增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageListById(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function postNewPageInfo(pageName: string, pageInfo: string) {
  return myRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageInfo(pageName: string, id: number, pageInfo: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}

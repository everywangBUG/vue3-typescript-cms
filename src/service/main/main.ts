import { myRequest } from '..'

export function getEntireRoles() {
  return myRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return myRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenuList() {
  return myRequest.post({
    url: '/menu/list'
  })
}

import useLoginStore from '@/store/login/login'

/**
 * @description 根据权限id判断是否需要展示按钮
 * @param permissionID 权限id
 * @returns 是否展示按钮
 */
export default function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permission } = loginStore

  return !!permission.find((item: any[]) => item.includes(permissionID))
}

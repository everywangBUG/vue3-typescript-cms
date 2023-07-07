import useLoginStore from '@/store/login/login'

export default function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permission } = loginStore

  return !!permission.find((item: any[]) => item.includes(permissionID))
}

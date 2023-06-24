// 动态配置表格内容
const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单管理',
  },
  propList: [
    { width: '180', prop: 'name', label: '菜单名称', align: 'center' },
    { width: '80', prop: 'type', label: '级别', align: 'center' },
    { width: '180', prop: 'url', label: '菜单url  ', align: 'center' },
    { width: '180', prop: 'icon', label: '菜单icon', align: 'center' },
    { width: '80', prop: 'sort', label: '排序', align: 'center' },
    { width: '200', prop: 'permission', label: '权限', align: 'center' },
    { type: 'timer', width: '200', prop: 'createAt', label: '创建时间', align: 'center' },
    { type: 'timer', width: '200', prop: 'updateAt', label: '更新时间', align: 'center' },
    { type: 'handler', label: '操作', align: 'center' }
  ],
  childrenTree: {
    rowKey: 'id'
  }
}

export default contentConfig

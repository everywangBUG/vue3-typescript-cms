// 动态配置表格内容
const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色管理',
    btnTitle: '新建角色'
  },
  propList: [
    { type: 'selection', width: '50', align: 'center' },
    { type: 'index', width: '80', align: 'center', label: '序号' },
    { type: 'normal', width: '180', prop: 'id', label: '角色id', align: 'center' },
    { type: 'normal', width: '180', prop: 'name', label: '角色名称', align: 'center' },
    { type: 'timer', width: '350', prop: 'createTime', label: '创建时间', align: 'center' },
    { type: 'timer', width: '350', prop: 'updateTime', label: '更新时间', align: 'center' },
    { type: 'handler', label: '操作', align: 'center' }
  ]
}

export default contentConfig

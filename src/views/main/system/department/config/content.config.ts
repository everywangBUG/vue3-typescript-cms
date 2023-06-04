// 动态配置表格内容
const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propList: [
    // 1. selection 2. index
    { type: 'selection', width: '50', align: 'center' },
    { type: 'index', width: '80', align: 'center', label: '序号' },
    { type: 'normal', width: '180', prop: 'name', label: '部门名称', align: 'center' },
    { type: 'normal', width: '180', prop: 'leader', label: '部门领导', align: 'center' },
    { type: 'normal', width: '180', prop: 'parentId', label: '上级部门  ', align: 'center' },
    // 第一种定制化不高的配置
    { type: 'timer', width: '200', prop: 'createAt', label: '创建时间', align: 'center' },
    { type: 'timer', width: '200', prop: 'updateAt', label: '更新时间', align: 'center' },
    { type: 'handler', label: '操作', align: 'center' }
    // 第二种自定义高的配置
    // { type: 'custom', prop: 'leader', label: '自定义插槽1', align: 'center', slotName: 'leader' },
    // { type: 'custom', prop: 'name', label: '自定义插槽2', align: 'center', slotName: 'name' }
  ]
}

export default contentConfig

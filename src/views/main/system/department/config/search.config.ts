// 配置需要显示的表单表头
const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的部门领导'
    },
    {
      type: 'data-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig

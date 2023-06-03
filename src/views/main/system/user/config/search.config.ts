const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入用户名',
      initailValue: '张三'
    },
    {
      type: 'input',
      prop: 'realName',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手机号码',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请输入查询的状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 }
      ]
    },
    {
      type: 'data-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig

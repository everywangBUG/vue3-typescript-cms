import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'menu',
  header: {
    newTitle: '新建菜单',
    editTitle: '编辑菜单'
  },
  propList: [
    {
      type: 'input',
      label: '菜单名称',
      prop: 'name',
      placeholder: '请输入菜单名称',
      initialValue: ''
    },
    {
      type: 'input',
      label: '菜单类型',
      prop: 'type',
      placeholder: '请输入菜单类型',
      initialValue: ''
    },
    {
      type: 'input',
      label: '菜单url',
      prop: 'url',
      placeholder: '请输入菜单url',
      initialValue: ''
    },
    {
      type: 'input',
      label: '菜单排序',
      prop: 'sort',
      placeholder: '请输入菜单sort',
      initialValue: ''
    },
    {
      type: 'select',
      label: '父级菜单',
      prop: 'parentId',
      placeholder: '请输入父级菜单',
      initialValue: '',
      options: []
    }
  ]
}

export default modalConfig

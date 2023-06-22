import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  propList: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      initialValue: ''
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'leader',
      placeholder: '请输入权限介绍 ',
      initialValue: ''
    },
    {
      type: 'custom',
      slotName: 'span'
    },
    {
      type: 'custom',
      slotName: 'btn'
    },
    {
      type: 'custom',
      slotName: 'title'
    }
  ]
}

export default modalConfig

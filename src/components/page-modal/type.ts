export interface IModalConfig {
  header?: {
    newTitle: string
    editTitle: string
  }
  propList: any[]
}

export interface IModalProps {
  modalConfig: IModalConfig
}

export interface IProps {
  modalConfig: {
    header?: {
      newTitle: string
      editTitle: string
    }
    propList: any[]
  }
}

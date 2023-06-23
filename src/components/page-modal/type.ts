export interface IModalConfig {
  pageName: string,
  header?: {
    newTitle: string
    editTitle: string
  }
  propList: any[],
  otherInfo?: any
}

export interface IModalProps {
  modalConfig: IModalConfig
}

export interface IProps {
  modalConfig: {
    pageName: string,
    header?: {
      newTitle: string
      editTitle: string
    }
    propList: any[]
  },
  otherInfo?: any
}

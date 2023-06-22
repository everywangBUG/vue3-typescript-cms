export interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    },
    propList: any[],
    childrenTree?: any
  }
}

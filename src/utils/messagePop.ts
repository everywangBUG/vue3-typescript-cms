import { ElMessage } from 'element-plus'

export function messagePop( data: string, code?: number ) {
  if (code === 0 && data) {
    ElMessage({
      message: `${data}`,
      type: 'success'
    })
  } else if (code === 400 && data) {
    ElMessage({
      message: `${data}`,
      type: 'warning'
    })
  }
}

export function messageRule(data: string) {
  ElMessage({
    message: `${data}`,
    type: 'warning'
  })
}

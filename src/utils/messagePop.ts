import { ElMessage } from 'element-plus'

export function messagePop(code: number, data: string) {
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

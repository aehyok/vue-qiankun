import { ElMessage } from 'element-plus'

const useMessage = () => {

  // 消息
  const Message = (message: string) => {
    return ElMessage({
      showClose: true,
      message
    })
  }

  // 成功
  const successMessage = (message: string) => {
    return ElMessage({
      showClose: true,
      message,
      type: 'success'
    })
  }

  // 警告
  const warnMessage = (message: string) => {
    return ElMessage({
      showClose: true,
      message,
      type: 'warning'
    })
  }

  // 失败
  const errorMessage = (message: string) => {
    return ElMessage({
      showClose: true,
      message,
      type: 'error'
    })
  }

  return {
    Message, successMessage, warnMessage, errorMessage
  }
}

export default useMessage

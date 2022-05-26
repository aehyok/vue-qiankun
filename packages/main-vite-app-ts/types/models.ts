// declare global {
//   interface Window {
//     handConfig: any;
//   }
// }

// 菜单核心定义
export interface Menu {
  id: string
  path?: string
  url?: string
  title: string
  children?: Menu[]
}

export interface SystemMenu {
  MenuList: Menu[]
  Key: string
}

export interface SystemInfo {
  systemId: string
  path: string
  title: string
}

export type Dictionary = {
  [key: number]: string
}

export interface LoginState {
  account: string
  password: string
  captchaValue: string
  captchaId: string
  vcodeImg: string
  loading: boolean
}

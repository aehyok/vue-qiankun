import { SystemInfo } from '../../types/models'

export interface headerProp {
  systemInfo?: SystemInfo
  logoImage: string
  avatorImage: string
  userName?: string
  updateDialogVisible: boolean
  versionDialogVisible: boolean
}

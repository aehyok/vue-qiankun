import { defineStore } from 'pinia'
import { getMenuList } from './data.d'
import { SystemMenu, SystemInfo } from '../../types/models'
import { getSystemList } from '../services/index'

interface AppState {
  menuList: SystemMenu[]
  systemId?: string
  currentSystem?: SystemInfo
  systemList: any[]
}

export const useSystemMenu = defineStore("useSystemMenu", {
  state: (): AppState => ({
    systemList: [],
    systemId: '',
    menuList: [], // 所有菜单
    currentSystem: {
      systemId: '',
      path: '',
      title: ''
    }
  }),

  actions: {
    changeSystem(type: string) {
      this.currentSystem = this.systemList.find((item: any) => item.systemId === type)
      this.systemId = type
    },
    setSystemList(data: any) {
      this.systemList = data
    },
    setMenuList(data: any) {
      this.menuList = data
    },
    async fetchSystemList() {
      try {
        const res: any = await getSystemList()

        if (res?.code === 200) {
          // commit('setSystemList', res.data)
          // commit('setMenuList', getMenuList())
          this.setSystemList(res.data)
          this.setMenuList(getMenuList())
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error, 'fetchSystemList-error')
      }
    }
  },
  persist: {
    enabled: true,
  }
});

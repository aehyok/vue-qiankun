import { createStore } from "vuex"
import { getMenuList } from './data.d'
import createPersistedState  from 'vuex-persistedstate'
import { SystemMenu, SystemInfo } from '../../types/models'
import handConfig from '../../public/config'

interface AppState {
  menuList: SystemMenu[];
  systemId?: string;
  currentSystem?: SystemInfo
}

const dataState = createPersistedState({
    paths: ['menuList','systemId',"currentSystem"]  // 持久化的数据
})

export default createStore({
  state:():AppState =>({
    menuList: getMenuList(),  // 所有菜单
    currentSystem: {
      systemId:"",
      path:"",
      title:""
    },
  }),
  mutations: {
    // 切换系统
    changeSystem(state: AppState, type: string) {
      state.systemId = type
      state.currentSystem = handConfig.systemList.find(item=> item.systemId === type)
      console.log(state.currentSystem, 'store----');
    },
  },
  plugins: [dataState]
})
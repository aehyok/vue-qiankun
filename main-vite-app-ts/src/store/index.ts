import { createStore } from "vuex"
import { getMenuList } from './data.d'
import createPersistedState  from 'vuex-persistedstate'
import { SystemMenu, SystemInfo } from '../../types/models'
import handConfig from '../../public/config'
import { getSystemList } from '../services/index'

interface AppState {
  menuList: SystemMenu[];
  systemId?: string;
  currentSystem?: SystemInfo;
  systemList: [],
}

const dataState = createPersistedState({
    paths: ['menuList','systemId',"currentSystem", "systemList"]  // 持久化的数据
})

export default createStore({
  state:():AppState =>({
    systemList:[],
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
    setSystemList(state: AppState, data) {
      state.systemList = data
      console.log(state.systemList, 'state.Slist')
    }
  },
  actions: {
    async fetchSystemList({ commit }) {
      try {
        const res:any = await getSystemList()

        if (res?.code === 200) {
          commit('setSystemList', res.data)
          window.location.href = "/"
        }
       
      } catch (error) {
        console.log(error, 'fetchSystemList-error')
      }
    },
  },
  plugins: [dataState]
})
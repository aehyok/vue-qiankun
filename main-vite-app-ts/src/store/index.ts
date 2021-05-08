import { createStore } from 'vuex'
import permission from './modules/permission'

export default createStore({
  state: {
    toDoList: [
      { id: 1, text: '111111111.', done: true },
      { id: 2, text: '222222222.', done: false }
    ],
    menuList: [
      {
        id: 1,
        path: '/form-app',
        name: 'form-app',
        meta: {
          title: '组织管理',
          hidden: false,
          permissions: 7
        },
        children: [
          {
            path: '/form-app/#/',
            name: 'form-app-dynamic',
            meta: {
              title: 'form-app-dynamic',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/form-app/#/form',
            name: 'aehyok-form',
            meta: {
              title: 'form',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/form-app/#/about',
            name: 'form-app-about',
            meta: {
              title: 'form-app-about',
              hidden: false,
              permissions: 10
            }
          }
        ]
      },
      {
        id: 2,
        path: '/me-app',
        name: '/me-app',
        meta: {
          title: '基础管理',
          hidden: false,
          permissions: 7
        },
        children: [
          {
            path: '/editor',
            name: 'editor',
            meta: {
              title: 'wangeditor',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/home',
            name: 'me-app-dynamic',
            meta: {
              title: 'me-app-dynamic',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/me/about',
            name: 'me-app-about',
            meta: {
              title: 'me-app-about',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/ffmpeg',
            name: 'ffmpeg',
            meta: {
              title: 'ffmpeg',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/video',
            name: 'video',
            meta: {
              title: 'video',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/cesium',
            name: 'me-app-cesium',
            meta: {
              title: 'me-app-cesium',
              hidden: false,
              permissions: 10
            }
          }
        ]
      },
      {
        id: 3,
        path: '/table-app',
        name: 'table-app',
        meta: {
          title: '数据管理',
          hidden: false,
          permissions: 1543
        },
        children: [
          {
            path: '/table-app/#/',
            name: 'table-dynamic',
            meta: {
              title: 'table-dynamic',
              hidden: false,
              permissions: 10
            }
          },
          {
            path: '/table-app/#/about',
            name: 'table-app-about',
            meta: {
              title: 'about',
              hidden: false,
              permissions: 10
            }
          }
        ]
      }
    ],
    headerMenu: '',
    count: 0,
  },
  getters: {
    headerMenuList: (state: any) => {
      return state.menuList.filter((item:any) =>{
        return {
          ...item,
          children: []
        }
      })
    },
    baseInfo: state => {
      return state.toDoList.filter(item => item.done)
    },
    getTodo: (state) => (id: any) => {
      return state.toDoList.find(todo => todo.id === id)
    }
  },
  mutations: {
    increment (state, edge) {
      state.count = state.count + edge
    },
    header(state, path) {
      state.headerMenu = path
    }
  },
  // actions 类似于 mutation，actions中可以包含异步
  // store.dispatch('increment')
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  modules: {
    // permission,
  },
})

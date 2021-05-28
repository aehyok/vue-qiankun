import { createStore } from "vuex"
import permission from "./modules/permission"

export default createStore({
  state: {
    toDoList: [
      { id: 1, text: "111111111.", done: true },
      { id: 2, text: "222222222.", done: false }
    ],
    menuList: [
      {
        id: 0,
        path: "/home",
        name: "home",
        source: {
          title: "首页",
          hidden: false,
          main: true,
          permissions: 7,
          showLeft: true
        }
      },
      {
        id: 1,
        path: "/button-list",
        name: "button-list",
        source: {
          title: "主应用",
          hidden: false,
          main: true,
          permissions: 7
        },
        children: [
          {
            path: "/button-list",
            name: "button-list",
            source: {
              title: "按钮样式列表",
              hidden: false,
              main: true,
              permissions: 10
            }
          },
          {
            path: "/about",
            name: "aehyok-form",
            source: {
              title: "主应用关于",
              hidden: false,
              main: false,
              permissions: 10
            }
          },
          {
            path: "/home",
            name: "home",
            source: {
              title: "主应用主页",
              hidden: false,
              permissions: 10
            }
          }
        ]
      },
      {
        id: 2,
        path: "/form-app/form",
        name: "form-app",
        source: {
          title: "基础管理",
          hidden: false,
          permissions: 7
        },
        children: [
          {
            path: "/editor",
            name: "editor",
            source: {
              title: "wangeditor",
              hidden: false,
              permissions: 10
            }
          },
          {
            path: "/form-app/home",
            name: "me-app-dynamic",
            source: {
              title: "me-app-dynamic",
              hidden: false,
              permissions: 10
            }
          },
          {
            path: "/form-app/about",
            name: "me-app-about",
            source: {
              title: "me-app-about",
              hidden: false,
              permissions: 10
            }
          },
          {
            path: "/ffmpeg",
            name: "ffmpeg",
            source: {
              title: "ffmpeg",
              hidden: false,
              permissions: 10
            }
          },
          {
            path: "/video",
            name: "video",
            source: {
              title: "video",
              hidden: false,
              permissions: 10
            }
          },
          {
            path: "/cesium",
            name: "me-app-cesium",
            source: {
              title: "me-app-cesium",
              hidden: false,
              permissions: 10
            }
          }
        ]
      },
      {
        id: 3,
        path: "/wp-app/home",
        name: "table-app",
        source: {
          title: "数据管理",
          hidden: false,
          permissions: 1543
        },
        children: [
          {
            path: "/wp-app/table",
            name: "table-dynamic",
            source: {
              title: "table-dynamic",
              hidden: false,
              permissions: 10
            }
          },
          {
            path: "/wp-app/about",
            name: "table-app-about",
            source: {
              title: "about",
              hidden: false,
              permissions: 10
            }
          }
        ]
      }
    ],
    headerMenu: "",
    count: 0
  },
  getters: {
    headerMenuList: (state: any) => {
      return state.menuList.filter((item: any) => {
        return {
          ...item,
          children: []
        }
      })
    },
    baseInfo: (state) => {
      return state.toDoList.filter((item) => item.done)
    },
    getTodo: (state) => (id: any) => {
      return state.toDoList.find((todo) => todo.id === id)
    }
  },
  mutations: {
    increment(state, edge) {
      state.count = state.count + edge
    },
    header(state, path) {
      state.headerMenu = path
    }
  },
  // actions 类似于 mutation，actions中可以包含异步
  // store.dispatch('increment')
  actions: {
    increment(context) {
      context.commit("increment")
    }
  },
  modules: {
    // permission,
  }
})

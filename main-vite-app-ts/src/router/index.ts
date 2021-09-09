import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import NProgress from "../utils/progress"

// TODO 此处无法通过引用 import { useStore } from 'vuex'
import store from "@/store/index"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/login.vue"),
    meta: {
      title: "登录",
      showLayout: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "../components/NotFound.vue"),
    meta: {
      title: "404",
      main: true
    }
  },
  {
    path: "/button-list",
    name: "button-list",
    component: () => import(/* webpackChunkName: "buttonlist" */ "../views/button-list/index.vue"),
    meta: {
      main: true // 是否为主应用的路由菜单
    }
  }
  // ,
  // {
  //   // 找不到路由重定向到404页面
  //   path: '/:pathMatch(.*)',
  //   redirect: '/404',
  //   meta: {
  //     icon: 'el-icon-s-home',
  //     title: 'message.hshome',
  //     showLink: false,
  //     savedPosition: false
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// const childrenPath = ['webpack-app', 'map-app', 'form-app', 'table-app']
// 获取子模块路由前缀 判断是否为子路由
const childrenPath = store.state.systemList.map((item:any) => {
  return item.systemId
})
console.log(childrenPath, "childrenPath")

router.beforeEach((to, _from, next) => {
  NProgress.start()

  console.log(store.state.systemList, "----useStore----")
  if (to.path === "/login" || to.path === "/init-password") {
    next()
    return false
  }
  if (!localStorage.getItem("token")) {
    next("/login")
    return false
  }
  if (to.name) {
    next()
    return false
  }
  if (childrenPath.some((item) => to.path.includes(item))) {
    next()
    console.log("child")

    return false
  }
  // 如果找不到路由跳转到404
  next("/404")
  return false
})

// 页面进入之后
router.afterEach(() => {
  NProgress.done()
})

export default router

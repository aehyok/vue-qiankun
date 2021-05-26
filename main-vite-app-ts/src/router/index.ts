import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

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
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/about.vue"),
    meta: {
      title: "关于",
      main: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login.vue"),
    meta: {
      title: "登录",
      showLayout: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "../components/not-found.vue"),
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
const childrenPath = ["/form-app", "/wp-app"]

router.beforeEach((to, from, next) => {
  localStorage.setItem("token", 'aehyok')
  console.log(to, "before---each")
  if (to.name) {
    console.log(to, "main")

    // 有 name 属性，说明是主应用的路由
    next()
  }
  if (childrenPath.some((item) => to.path.includes(item))) {
    console.log(to, "child")

    next()
  }
  // 如果找不到路由跳转到404
  next("/404")
})

import NProgress from "../utils/progress"

// const whiteList = ['/login', '/register']
// 页面进入之前
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // const { t } = i18n.global;
  // // @ts-ignore
  // document.title = t(to.meta.title); // 动态title
  // whiteList.indexOf(to.path) !== -1 || storageSession.getItem("info")
  //   ? next()
  //   : next("/login"); // 全部重定向到登录页
})

// 页面进入之后
router.afterEach((to, from, failure) => {
  NProgress.done()
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: () => import(/* webpackChunkName: "main" */ "../components/main-layout.vue"),
    meta: {
      title: "主页",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/main/home.vue"),
        meta: {
          title: "首页",
        }
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import(/* webpackChunkName: "mine" */ "../views/main/mine.vue"),
        meta: {
          title: "我的",
        }
      },
    ]
  },
  
  {
    path: "/test",
    name: "Test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue"),
    meta: {
      title: "测试",
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, _from, next) => {
//   next()
// })

// // 页面进入之后
// router.afterEach(() => {
// })

export default router
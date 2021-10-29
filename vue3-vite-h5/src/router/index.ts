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
      title: "首页",
      showLayout: false,
    }
  },
  {
    path: "/test",
    name: "Test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue"),
    meta: {
      title: "测试",
      showLayout: false,
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
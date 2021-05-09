import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '登录',
      showLayout: false,
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../components/NotFound.vue')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import(/* webpackChunkName: "button" */ '../views/button/index.vue')
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    redirect: "/404",
    meta: {
      icon: "el-icon-s-home",
      title: "message.hshome",
      showLink: false,
      savedPosition: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


import NProgress from "../utils/progress";

const whiteList = ["/login", "/register"];

// router.beforeEach((to, _from, next) => {

//   // NProgress.start();
//   console.log('before Each');
//   // const { t } = i18n.global;
//   // // @ts-ignore
//   // document.title = t(to.meta.title); // 动态title
//   // whiteList.indexOf(to.path) !== -1 || storageSession.getItem("info")
//   //   ? next()
//   //   : next("/login"); // 全部重定向到登录页
// });

// router.afterEach(() => {
//   console.log('after Each');

//   // NProgress.done();
// });


export default router

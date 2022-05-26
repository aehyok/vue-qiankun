import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


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
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue'),
    meta: {
      title: '登录',
      showLayout: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../components/NotFound.vue'),
    meta: {
      title: '404',
      main: true
    }
  },
  {
    path: '/button-list',
    name: 'button-list',
    component: () => import(/* webpackChunkName: "buttonlist" */ '../views/button-list/index.vue'),
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

export default router

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
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "notFound" */ '../components/NotFound.vue')
  }
  // { path: '/catchAll(.*)', name:'404', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

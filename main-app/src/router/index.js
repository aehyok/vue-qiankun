import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '@/components/NotFound'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    component: () =>
      import('@/views/Test'),
    meta: {
      title: '户址管理',
      hidden: false
    }
  },
  {
    path: '/cesium',
    name: 'cesium',
    component: () =>
      import('@/views/Cesium'),
    meta: {
      title: '户址管理',
      hidden: false
    }
  },
  {
    path: '/agriculture',
    name: 'agriculture',
    component: Layout,
    meta: {
      title: '涉农数据管理'
    },
    children: [

    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ffmpeg',
    name: 'ffmpeg',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ffmpeg.vue')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import(/* webpackChunkName: "about" */ '../views/Video.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editor.vue')
  },
  { path: '/404', component: NotFound },
  { path: '*', redirect: '/404' },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

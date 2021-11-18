import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "main" */ '../components/main-layout.vue'),
    meta: {
      title: '主页',
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/main/home.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "mine" */ '../views/main/mine.vue'),
        meta: {
          title: '我的',
        },
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    meta: {
      title: '测试',
    },
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import(/* webpackChunkName: "scan" */ '../views/Scan.vue'),
    meta: {
      title: '扫描',
    },
  },
  {
    path: '/my-bill',
    name: 'my-bill',
    component: () => import(/* webpackChunkName: "my-bill" */ '../views/my-bill/index.vue'),
    meta: {
      title: '我的账单',
    },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news-list" */ '../views/news-list/index.vue'),
    meta: {
      title: '三务公开',
    },
  },
  {
    path: '/news-detail',
    name: 'news-detail',
    component: () =>
      import(/* webpackChunkName: "news-detail" */ '../views/news-list/news-detail.vue'),
    meta: {
      title: '详情',
    },
  },
  {
    path: '/form',
    name: 'form',
    component: () => import(/* webpackChunkName: "form" */ '../views/form/index.vue'),
    meta: {
      title: '动态表单',
    },
  },
  {
    path: '/slot',
    name: 'slot',
    component: () => import(/* webpackChunkName: "slot" */ '../views/slot/index.vue'),
    meta: {
      title: '博客列表',
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, _from, next) => {
//   next()
// })

// // 页面进入之后
// router.afterEach(() => {
// })

export default router;

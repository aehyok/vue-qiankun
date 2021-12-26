import React from 'react';

export interface IRouteConfig {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  exact?: boolean;
  // 路由信息
  title: string;
  icon?: string;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  routes?: IRouteConfig[];
}

const layouts: IRouteConfig[] = [
  {
    path: '/user',
    component: React.lazy(() => import('../layouts/UserLayout')),
    title: '用户路由',
    redirect: '/user/login',
    routes: [
      {
        path: '/user/login',
        component: React.lazy(() => import('../pages/User/Login')),
        title: '登录',
      },
      {
        path: '/user/register',
        component: React.lazy(() => import('../pages/User/Register')),
        title: '注册',
      },
    ],
  },
  {
    path: '/sys',
    component: React.lazy(() => import('../layouts/BasicLayout')),
    title: '系统路由',
    redirect: '/sys/home',
    // exact: true,
    routes: [
      {
        path: '/sys/home',
        title: '首页',
        icon: 'home',
        component: React.lazy(() => import('../pages/Home')),
      },
      {
        path: '/sys/about',
        title: '关于',
        icon: 'home',
        component: React.lazy(() => import('../pages/About')),
      },
      {
        path: '/sys/list',
        title: '关于',
        icon: 'home',
        component: React.lazy(() => import('../pages/List')),
      },
      {
        path: '/sys/detail',
        title: '关于',
        icon: 'home',
        component: React.lazy(() => import('../pages/Detail')),
      },
    ],
  },
  {
    path: '/noFond',
    title: '页面不存在',
    component: React.lazy(() => import('../pages/NoFond')),
  },
  {
    path: '/*',
    title: '错误页面',
    redirect: '/error',
  },
];

export default layouts;
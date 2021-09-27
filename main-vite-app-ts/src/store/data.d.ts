import { Menu, SystemMenu } from '../../types/models'

// Form表单菜单列表
export function mapList(): Menu[] {
  return [
    {
      id: 4,
      title: 'about',
      path: '/map-app/about'
    },
    {
      id: 1,
      title: 'marker',
      path: '/map-app/marker'
    },
    {
      id: 2,
      title: 'polygon',
      path: '/map-app/polygon'
    },
    {
      id: 3,
      title: 'marker-polygon',
      path: '/map-app/marker-polygon'
    }
  ]
}

// Form表单菜单列表
export function webpackList(): Menu[] {
  return [
    {
      id: 1,
      title: '1、form表单配置器',
      path: '/webpack-app/home'
    },
    {
      id: 3,
      title: '2、table列表封装',
      path: '/webpack-app/metable'
    },
    {
      id: 6,
      title: '3、动态表单设计器',
      path: '/webpack-app/dynamicformdesign'
    },
    {
      id: 4,
      title: 'about',
      path: '/webpack-app/about'
    },
    {
      id: 5,
      title: 'dragger',
      path: '/webpack-app/dragger'
    },
    {
      id: 2,
      title: 'table',
      path: '/webpack-app/table'
    }
  ]
}

// 系统所有菜单列表
export function getMenuList(): SystemMenu[] {
  return [
    {
      Key: 'webpack-app',
      MenuList: webpackList()
    },
    {
      Key: 'map-app',
      MenuList: mapList()
    }
  ]
}

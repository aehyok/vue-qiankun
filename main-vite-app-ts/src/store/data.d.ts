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
      title: '1、table列表form表单detail详情',
      path: '/webpack-app/tableandformanddetail'
    },
    {
      id: 2,
      title: '2、table列表封装',
      path: '/webpack-app/table'
    },
    {
      id: 3,
      title: '3、form表单配置器',
      path: '/webpack-app/form'
    },
    {
      id: 4,
      title: '4、列表详情查看器',
      path: '/webpack-app/detail'
    },
    {
      id: 5,
      title: '5、动态表单设计器',
      path: '/webpack-app/dynamicformdesign'
    },
    {
      id: 6,
      title: 'about',
      path: '/webpack-app/about'
    },
    {
      id: 7,
      title: 'dragger',
      path: '/webpack-app/dragger'
    },
    {
      id: 8,
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

import { Menu, SystemMenu } from "../../types/models"

// Form表单菜单列表
export function mapList(): Menu[] {
  return [
    {
      id: 4,
      title: "about",
      path: "/map-app/about"
    },
    {
      id: 1,
      title: "marker",
      path: "/map-app/marker"
    },
    {
      id: 2,
      title: "polygon",
      path: "/map-app/polygon"
    },
    {
      id: 3,
      title: "marker-polygon",
      path: "/map-app/marker-polygon"
    }
  ]
}

// Form表单菜单列表
export function webpackList(): Menu[] {
  return [
    {
      id: 1,
      title: "home",
      path: "/webpack-app/home"
    },
    {
      id: 2,
      title: "table",
      path: "/webpack-app/table"
    },
    {
      id: 3,
      title: "metable",
      path: "/webpack-app/metable"
    },
    {
      id: 4,
      title: "about",
      path: "/webpack-app/about"
    },
    {
      id: 5,
      title: "dragger",
      path: "/webpack-app/dragger"
    },
    {
      id: 6,
      title: "dynamicformdesign",
      path: "/webpack-app/dynamicformdesign"
    }
  ]
}

// 系统所有菜单列表
export function getMenuList(): SystemMenu[] {
  return [
    {
      Key: "webpack-app",
      MenuList: webpackList()
    },
    {
      Key: "map-app",
      MenuList: mapList()
    }
  ]
}

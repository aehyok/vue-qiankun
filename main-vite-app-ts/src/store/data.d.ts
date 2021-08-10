import { Menu, SystemMenu } from '../../types/models';

// 系统所有菜单列表
export function getMenuList(): SystemMenu[] {
  return [
    {
      Key:'webpack-app',
      // MenuList: MenuList_Village()
      MenuList: MenuList_Wp()
    },
    {
      Key:'map-app',
      // MenuList: MenuList_Village()
      MenuList: MenuList_Map()
    }
  ]
}

// Form表单菜单列表
function MenuList_Map():Menu[] {
  return [
    {
      id: 4,
      title:"about",
      path:"/map-app/about",
    },
    {
      id:1,
      title:"marker",
      path:"/map-app/marker",
    },
    {
      id: 2,
      title:"polygon",
      path:"/map-app/polygon",
    },
    {
      id: 3,
      title:"marker-polygon",
      path:"/map-app/marker-polygon",
    },
  ]
}

// Form表单菜单列表
function MenuList_Wp():Menu[] {
  return [
    {
      id:1,
      title:"home",
      path:"/webpack-app/home",
    },
    {
      id: 2,
      title:"table",
      path:"/webpack-app/table",
    },
    {
      id: 3,
      title:"metable",
      path:"/webpack-app/metable",
    },
    {
      id: 4,
      title:"about",
      path:"/webpack-app/about",
    },
    {
      id: 5,
      title:"dragger",
      path:"/webpack-app/dragger",
    },
  ]
}






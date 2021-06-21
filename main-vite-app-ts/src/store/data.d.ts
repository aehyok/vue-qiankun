import { Menu, SystemMenu } from '../../types/models';

// 系统所有菜单列表
export function getMenuList(): SystemMenu[] {
  return [
    {
      Key:'dvs-basic',
      MenuList: MenuList_Basic()
    },
    {
      Key:'dvs-cons',
      MenuList: MenuList_Cons()
    },
    {
      Key:'dvs-digital',
      MenuList: MenuList_Digital()
    },
    {
      Key:'dvs-village',
      // MenuList: MenuList_Village()
      MenuList: MenuList_Wp()
    },
    {
      Key:'dvs-geography',
      // MenuList: MenuList_Village()
      MenuList: MenuList_Map()
    }
  ]
}

// Form表单菜单列表
function MenuList_Map():Menu[] {
  return [ 
    {
      id:1,
      title:"leaflet",
      path:"/map-app/leaflet",
    },
    {
      id: 2,
      title:"about",
      path:"/map-app/about",
    },
    {
      id: 3,
      title:"geoman",
      path:"/map-app/geoman",
    },
    {
      id: 4,
      title:"vue-leaflet",
      path:"/map-app/vue-leaflet",
    },
  ]
}

// Form表单菜单列表
function MenuList_Wp():Menu[] {
  return [ 
    {
      id:1,
      title:"home",
      path:"/wp-app/home",
    },
    {
      id: 2,
      title:"table",
      path:"/wp-app/table",
    },
    {
      id: 3,
      title:"metable",
      path:"/wp-app/metable",
    },
    {
      id: 4,
      title:"about",
      path:"/wp-app/about",
    },
  ]
}



// 乡村治理菜单列表
function MenuList_Digital():Menu[] {
  return [ 
    {
        id:1,
        title:"首页",
        path:"/dvs-digital/digital-home",
    },
    {
      id: 2,
      title:"村情概况",
      path:"/dvs-digital/village-survey",
    },
    {
      id: 3,
      title:"协同办公",
      path:"3",
      children:[
        {
          id:31,
          title:"我发布的公文",
          path:"/dvs-digital/document-send",
        },
        {
          id:32,
          title:"我收到的公文",
          path:"/dvs-digital/document",
        }
      ]
    }
  ]
}

// 乡村治理菜单列表
function MenuList_Basic():Menu[] {
  return [ 
    {
      id: 1,
      title:"用户管理",
      path:"1",
      children:[
        {
          id:11,
          title:"公众用户",
          path:"/dvs-basic/user-manage/public",
        },
        {
          id:12,
          title:"村委用户",
          path:"/dvs-basic/user-manage/village",
        },
        {
          id:13,
          title:"政务用户",
          path:"/dvs-basic/user-manage/govenment",
        },
        {
          id:14,
          title:"园区用户",
          path:"/dvs-basic/user-manage/enterprise",
        },
      ]
    },
    {
      id: 2,
      title:"部门管理",
      path:"/dvs-basic/depart-manage/department",
    },
    {
      id: 3,
      title:"类目管理",
      path:"/dvs-basic/cat-manage/category",
    },    
    {
      id: 4,
      title:"区域管理",
      path:"/dvs-basic/area-manage/area",
    },
  ]
}

// 乡村治理菜单列表
function MenuList_Village():Menu[] {
  return [ 
    {
        id:1,
        title:"户码管理",
        path:"/dvs-village/household-code",
    },
    {
      id: 2,
      title:"人口信息管理",
      path:"",
      children:[
        {
          id:21,
          title:"户籍人口",
          path:"/dvs-village/nationality-list",
        },
        // {
        //   id:22,
        //   title:"流动人口",
        //   path:"/dvs-village/flow",
        // },
        // {
        //   id:23,
        //   title:"外籍人口",
        //   path:"/dvs-village/out-nation",
        // },
      ]
    },
    // {
    //   id: 3,
    //   title:"土地信息管理",
    //   path:"/dvs-village/land-list",
    // },
    // {
    //   id: 4,
    //   title:"外出务工管理",
    //   path:"/dvs-village/out-worker",
    // },
    {
      id: 5,
      title:"收入来源管理",
      path:"/dvs-village/income",
    },
    {
      id: 6,
      title:"疫情防控",
      path:"/dvs-village/pestilence",
    }
  ]
}

// 便民服务菜单列表
function MenuList_Cons():Menu[] {
  return [ 
    {
      id: 1,
      title:"信息公开",
      path:"1",
      children:[
        {
          id:11,
          title:"三务公开",
          path: "/dvs-cons/three-things",
        },
        {
          id:12,
          title:"党建宣传",
          path: "/dvs-cons/party-building",
        },
        {
          id:13,
          title:"精神文明",
          path: "/dvs-cons/spiritual-civilization",
        },
        {
          id:14,
          title:"便民信息",
          path: "/dvs-cons/convenience-message",
        },
      ]
    },
    {
      id: 2,
      title:"随手拍管理",
      path:"2",
      children:[
        {
          id:21,
          title:"待处理",
          path:"/dvs-cons/pending",
        },
        {
          id:22,
          title:"已处理",
          path:"/dvs-cons/pass",
        },
      ]
    },
    {
      id: 3,
      title:"便民服务指南",
      path:"/dvs-cons/guide",
    },
    {
      id: 4,
      title:"农产品销售",
      path:"/dvs-cons/sale",
    }
  ]
}






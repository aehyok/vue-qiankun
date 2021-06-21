// 手动配置数据
const handConfig ={
	systemList:[
		{
			systemId: "dvs-farm", 
			path:"",
			title:"数字农业",
			normal:"images/module/dvs-farm-normal.png",
			selected: "images/module/dvs-farm-selected.png",
		},
		{
			systemId: "dvs-village", 
			// path:"/dvs-village/home?pageType=1",
			path: '/wp-app/home',
			title:"乡村治理",
			normal:"images/module/dvs-village-normal.png",
			selected: "images/module/dvs-village-selected.png",
		},
		{
			systemId: "dvs-digital",
			path:"/dvs-digital/digital-home",
			title:"数字信息",
			normal:"images/module/dvs-digital-normal.png",
			selected: "images/module/dvs-digital-selected.png",
		},
		{
			systemId: "dvs-cons",
			path:"/dvs-cons/three-things",
			title:"便民服务",
			normal:"images/module/dvs-cons-normal.png",
			selected: "images/module/dvs-cons-selected.png",
		},
		{
			systemId: "dvs-geography",
			path:"/map-app/leaflet",
			title:"地理信息管理",
			normal:"images/module/dvs-geography-normal.png",
			selected: "images/module/dvs-geography-selected.png",
		},
		{
			systemId: "dvs-basic",
			path:"/dvs-basic/user-manage/public",
			title:"支撑子系统",
			normal:"images/module/dvs-basic-normal.png",
			selected: "images/module/dvs-basic-selected.png",
		}
	],
}
export default handConfig
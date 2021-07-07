// 手动配置数据
const handConfig ={
	systemList:[
		{
			systemId: "wp-app", 
			path:"/wp-app/home",
			title:"阿里巴巴",
			normal:"images/module/dvs-farm-normal.png",
			selected: "images/module/dvs-farm-selected.png",
		},
		{
			systemId: "map-app", 
			// path:"/dvs-village/home?pageType=1",
			path: '/map-app/leaflet',
			title:"腾讯",
			normal:"images/module/dvs-village-normal.png",
			selected: "images/module/dvs-village-selected.png",
		},
		{
			systemId: "dvs-digital",
			path:"/dvs-digital/digital-home",
			title:"字节跳动",
			normal:"images/module/dvs-digital-normal.png",
			selected: "images/module/dvs-digital-selected.png",
		},
		{
			systemId: "dvs-cons",
			path:"/dvs-cons/three-things",
			title:"京东",
			normal:"images/module/dvs-cons-normal.png",
			selected: "images/module/dvs-cons-selected.png",
		},
		{
			systemId: "dvs-geography",
			path:"/map-app/leaflet",
			title:"字节跳动",
			normal:"images/module/dvs-geography-normal.png",
			selected: "images/module/dvs-geography-selected.png",
		},
		{
			systemId: "dvs-basic",
			path:"/dvs-basic/user-manage/public",
			title:"美团",
			normal:"images/module/dvs-basic-normal.png",
			selected: "images/module/dvs-basic-selected.png",
		}
	],
}
export default handConfig
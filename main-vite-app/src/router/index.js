import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("../views/Home.vue"),
		meta: {
			title: "首页"
		}
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;

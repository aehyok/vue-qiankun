import { createRouter,createWebHistory } from "vue-router"
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
	},
    {
        path: '/404',
        name: '404',
        component: () => import("../components/NotFound.vue"),
    },
    // { path: '/catchAll(.*)', name:'404', redirect: '/404' },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

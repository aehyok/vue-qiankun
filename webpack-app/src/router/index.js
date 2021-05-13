import Home from "../views/Home.vue";
import Table from "../views/Table.vue";
const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      // 其他的路由都写到这里
      {
        path: "/table",
        name: "Table",
        component: Table
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  }
];

export default routes;

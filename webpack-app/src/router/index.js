import Home from "../views/Home.vue";
import Table from "../views/Table.vue";
const routes = [
  {
    path: "/main",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/table1",
        name: "Table1",
        component: Table
      },
      {
        path: "/about1",
        name: "About1",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/table",
    name: "table",
    component: Table
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

export default routes;

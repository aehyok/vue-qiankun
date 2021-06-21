import Home from "../views/Home.vue";
import Table from "../views/Table.vue";
import MeTable from "../views/MeTable.vue";
import ffmpeg from "../views/video/ffmpeg.vue";

const routes = [
  {
    path: "/",
    redirect: "/wp-app/home"
  },
  {
    path: "/wp-app/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "table1",
        name: "Table1",
        component: Table
      },
      {
        path: "about1",
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
    path: "/wp-app/table",
    name: "table",
    component: Table
  },
  {
    path: "/wp-app/metable",
    name: "metable",
    component: MeTable
  },
  {
    path: "/ffmpeg",
    name: "ffmpeg",
    component: ffmpeg
  },
  {
    path: "/wp-app/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

export default routes;

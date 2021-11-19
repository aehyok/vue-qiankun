import Home from "../views/Home.vue";
import TableAndFormAndDetail from "../views/TableAndFormAndDetail.vue";
import Table from "../views/Table.vue";
import ffmpeg from "../views/video/ffmpeg.vue";
import Form from '../views/Form.vue'
import Detail from '../views/Detail.vue'

const routes = [
  {
    path: "/",
    redirect: "/webpack-app/home"
  },
  {
    path: "/webpack-app/home",
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
    path: "/webpack-app/tableandformanddetail",
    name: "TableAndFormAndDetail",
    component: TableAndFormAndDetail
  },
  {
    path: "/webpack-app/form",
    name: "form",
    component: Form
  },
  {
    path: "/webpack-app/detail",
    name: "detail",
    component: Detail
  },
  {
    path: "/webpack-app/table",
    name: "table",
    component: Table
  },
  {
    path: "/ffmpeg",
    name: "ffmpeg",
    component: ffmpeg
  },
  {
    path: "/webpack-app/dragger",
    name: "dragger",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dragger.vue")
  },
  {
    path: "/webpack-app/dynamicformdesign",
    name: "DynamicFormDesign",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DynamicFormDesign.vue")
  },
  {
    path: "/webpack-app/visualdesign",
    name: "VisualDesign",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VisualDesign.vue")
  },
  {
    path: "/webpack-app/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

export default routes;

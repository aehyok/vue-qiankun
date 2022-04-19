import { RouteRecordRaw } from 'vue-router'
import Home from "../views/Home.vue";
import TableAndFormAndDetail from "../views/TableAndFormAndDetail.vue";
import Table from "../views/Table.vue";
import TableApi from "../views/Table-Api.vue";
import ffmpeg from "../views/video/ffmpeg.vue";
import Form from '../views/Form.vue'
import FormApi from '../views/Form-Api.vue'
import Detail from '../views/Detail.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: "/webpack-app/form-api",
    name: "form-api",
    component: FormApi
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
    path: "/webpack-app/table-api",
    name: "table-api",
    component: TableApi
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
      import(/* webpackChunkName: "dragger" */ "../views/dragger/index.vue")
  },
  {
    path: "/webpack-app/dragger-clone",
    name: "dragger-clone",
    component: () =>
      import(/* webpackChunkName: "dragger" */ "../views/dragger-clone/index.vue")
  },
  {
    path: "/webpack-app/dynamicformdesign",
    name: "DynamicFormDesign",
    component: () =>
      import(/* webpackChunkName: "DynamicFormDesign" */ "../views/DynamicFormDesign.vue")
  },
  {
    path: "/webpack-app/visualdesign",
    name: "VisualDesign",
    component: () =>
      import(/* webpackChunkName: "VisualDesign" */ "../views/VisualDesign.vue")
  },
  {
    path: "/webpack-app/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/webpack-app/eltable",
    name: "eltable",
    component: () =>
      import(/* webpackChunkName: "eltable" */ "../views/ElTable.vue")
  },
  {
    path: "/webpack-app/item-config",
    name: "item-config",
    component: () =>
      import(/* webpackChunkName: "eltable" */ "../views/Item-Config.vue")
  },
  {
    path: "/webpack-app/echarts",
    name: "echarts",
    component: () =>
      import(/* webpackChunkName: "eltable" */ "../views/echarts/index.vue")
  },
];

export default routes

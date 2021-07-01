import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/map-app/cesium',
  },
  {
    path: '/map-app/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/map-app/leaflet',
    name: 'Leaflet',
    component: () => import(/* webpackChunkName: "leaflet" */ '../views/leaflet/index.vue'),
  },
  {
    path: '/map-app/geoman',
    name: 'Geoman',
    component: () => import(/* webpackChunkName: "geoman" */ '../views/leaflet/geoman.vue'),
  },
  {
    path: '/map-app/vue-leaflet',
    name: 'Vue-leaflet',
    component: () => import(/* webpackChunkName: "vue-leaflet" */ '../views/leaflet/vue-leaflet.vue'),
  },
  {
    path: '/map-app/cesium',
    name: 'cesium',
    component: () => import(/* webpackChunkName: "cesium" */ '../views/cesium/index.vue'),
  },
];

export default routes;

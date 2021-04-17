import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start,getActiveRule } from 'qiankun'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'leaflet/dist/leaflet.css'
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import VueCesium from 'vue-cesium'
// VueCesium 默认使用 `https://unpkg.com/cesium/Build/Cesium/Cesium.js`
Vue.use(VueCesium, {
  // cesiumPath is path of Cesium.js', for example:
  // local Cesium Build package:
  // cesiumPath: /static/Cesium/Cesium.js
  // Personal online Cesium Build package：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // Personal online SuperMap Cesium Build package：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // Official Online Cesium Build package：
  cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js'
})

Vue.prototype.$video = Video

Vue.L = Vue.prototype.$L = L
Vue.config.productionTip = false
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.use(ElementUI, {
  size: 'medium'
})

const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
// 在主应用中注册微应用
registerMicroApps([
  {
    name: 'form-app', // app name registered
    entry: '//localhost:2000',
    container: '#mainwrapper',
    activeRule: getActiveRule('#/form-app')
  },
  {
    name: 'table-app',
    entry: '//localhost:3000',
    container: '#mainwrapper',
    activeRule: '/table-app'
  }
])

start()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

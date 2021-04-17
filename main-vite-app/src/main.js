import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import local from "element-plus/lib/locale/lang/zh-cn";
import router from "./router"

// 在主应用中注册微应用
registerMicroApps([
  {
    name: 'form-app', // app name registered
    entry: '//localhost:2000',
    container: '#mainwrapper',
    activeRule: '/form-app'
  },
  {
    name: 'table-app',
    entry: '//localhost:3000',
    container: '#mainwrapper',
    activeRule: '/table-app'
  }
])

start();
const app = createApp(App)
app.use(ElementPlus, local)
app.use(router)
app.mount('#app')

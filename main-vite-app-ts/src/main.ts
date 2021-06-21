import { createApp } from "vue"
import { registerMicroApps, start } from "qiankun"

// 内置ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import App from './App.vue'
import router from './router'
import store from './store'

const getActiveRule = (hash: any) => (location: any) => location.hash.startsWith(hash)


// 在主应用中注册微应用
registerMicroApps([
  {
    name: "form-app",
    entry: process.env.NODE_ENV === "production" ? "/child/form-app/" : "//localhost:2000/",
    container: "#mainwrapper",
    activeRule: getActiveRule("#/form-app"),
  },
  {
    name: "table-app",
    entry: process.env.NODE_ENV === "production" ? "/child/table-app/" : "//localhost:3000/",
    container: "#mainwrapper",
    activeRule: getActiveRule("#/table-app")
  },
  {
    name: "wp-app",
    entry: process.env.NODE_ENV === "production" ? "/child/wp-app/" : "//localhost:4000/",
    container: "#mainwrapper",
    activeRule: getActiveRule("#/wp-app")
  },
  {
    name: "map-app",
    entry: process.env.NODE_ENV === "production" ? "/child/map-app/" : "//localhost:5000/",
    container: "#mainwrapper",
    activeRule: getActiveRule("#/map-app")
  }
])

const app = createApp(App)

app.use(router).use(ElementPlus, { locale }).use(store)
app.mount('#app')

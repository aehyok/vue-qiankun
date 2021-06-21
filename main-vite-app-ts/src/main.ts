import { createApp } from "vue"
import { registerMicroApps, start } from "qiankun"

// 内置ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(ElementPlus, { locale }).use(store)
app.mount('#app')

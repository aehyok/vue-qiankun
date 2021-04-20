import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 内置ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// import store from "./store"

const app = createApp(App)
app.use(router).use(ElementPlus)
app.mount('#app')

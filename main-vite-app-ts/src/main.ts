import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 内置ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(router).use(ElementPlus).use(store)
app.mount('#app')

import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus, { locale: zhCn })
app.mount('#app')

import 'v-contextmenu/dist/themes/default.css'
import { createApp } from 'vue'
import { add } from '@app/utils'
// 内置ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import store from './store'

console.log( add(3,4), 'add')
const app = createApp(App)
app.use(store).use(router).use(ElementPlus, { locale: zhCn })
app.mount('#app')

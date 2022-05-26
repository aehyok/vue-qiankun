import 'v-contextmenu/dist/themes/default.css'
import { createApp } from 'vue'
// 内置ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist';
import App from './App.vue'
import router from './router'
import { useRoute } from './router/useRouter'

const pinia = createPinia();
pinia.use(piniaPluginPersist);
const app = createApp(App)
// eslint-disable-next-line no-restricted-syntax
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia).use(router).use(ElementPlus, { locale: zhCn })
useRoute(router)
app.mount('#app')

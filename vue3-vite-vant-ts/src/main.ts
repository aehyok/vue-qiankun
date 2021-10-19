import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'

createApp(App).use(router).use(store).mount('#app')

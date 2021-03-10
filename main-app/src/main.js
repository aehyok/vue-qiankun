import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun'

// 在主应用中注册微应用
registerMicroApps([
  {
    name: 'form-app', // app name registered
    entry: '//localhost:2000',
    container: '#appContainer',
    activeRule: '/form-app'
  },
  {
    name: 'table-app',
    entry: '//localhost:3000',
    container: '#appContainer',
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

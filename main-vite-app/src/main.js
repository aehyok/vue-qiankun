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
    activeRule: '/form-app',
    props:{//额外参数
      getToken: {

          token: 'aehyok',
          id: '789',
          name: '123'
      },
      Test: function(test) {
        console.log('子应用传递数据到主应用',test)
      }
    }
  },
  {
    name: 'table-app',
    entry: '//localhost:3000',
    container: '#mainwrapper',
    activeRule: '/table-app'
  }
])

start({
  // 开启css 样式隔离
  sandbox: {
    // strictStyleIsolation = false，才可以获取到子应用的dom节点，主应用可修改子应用样式，但是子应用不可修改主应用的样式。
    strictStyleIsolation: true,
    experimentalStyleIsolation: true
  }
});
const app = createApp(App)
app.use(ElementPlus, local)
app.use(router)
app.mount('#app')

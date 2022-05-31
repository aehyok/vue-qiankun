import '../../common/qiankun/public-path.js'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './registerServiceWorker'
import routes from './router'
import store from './store'
import { autoComponentRegister } from '../../common/utils/auto-component-register.js'
import plugins from './plugins'

let instance = null

function render(props: any = {}) {
  if (props) {
    // 注入 actions 实例
    // actions.setActions(props);
  }
  const { container } = props
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  instance = createApp(App)
  instance
    .use(ElementPlus, { locale: zhCn })
    .use(store)
    .use(router)
    .use(plugins)
    .mount(container ? container.querySelector('#webpackapp') : '#webpackapp')
  autoComponentRegister(instance)
}

// 独立运行时
// eslint-disable-next-line no-underscore-dangle
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('独立运行')
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props: any) {
  console.log('[vue] props from main framework', props)

  render(props)
}

export async function unmount() {
  // instance.$destroy();
  // instance.$el.innerHTML = "";
  // instance = null;
}

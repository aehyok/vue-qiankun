import { createApp } from 'vue'
import '@nutui/nutui-taro/dist/style.css';
import  registerComponents from  './utils/register-components/index'
import './app.scss'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

registerComponents(App)

export default App

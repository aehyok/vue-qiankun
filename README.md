# vue-qiankun
微前端


### 乾坤官网教程 https://qiankun.umijs.org/zh/cookbook
### 1、main-vite-app 主应用  http://localhost:1000
 #### 使用Vue3 + Vite2 +TypeScript + Element Plus 搭建

### 2、form-app 子应用 主要处理表单相关子菜单 http://localhost:2000

### 3、table-app 子应用 主要处理table列表相关子菜单 http://localhost:3000

### 1、创建项目命令 https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project
- 我平常习惯用yarn，不过用yarn创建项目的时候报错，用npm是没问题的
- yarn create @vitejs/app dvs-platform --template vue
- npm init @vitejs/app dvs-platform -- --template vue
### 2、引入Element Plus
- npm install element-plus --save
### 3、在main.js中引入
    ```javascript
      import { createApp } from 'vue'
      import ElementPlus from 'element-plus';
      import 'element-plus/lib/theme-chalk/index.css';
      import App from './App.vue';

      const app = createApp(App)
      app.use(ElementPlus)
      app.mount('#app')
    ```

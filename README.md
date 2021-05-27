# vue-qiankun

### 乾坤官网教程 https://qiankun.umijs.org/zh/cookbook

- main 主应用和 child 子应用不限制接入的技术栈，具备完全的自主权，可以选择 Vue、React、Angular、JQuery 等其他前端框架。
- main 主应用和 child 子应用可完全独立开发、独立部署、 实现解耦

### 1、main-vite-app-ts 主应用 http://localhost:1000

- 使用 Vue3 + Vite2 +TypeScript + Element Plus 搭建

### 2、webpack-app 子应用 http://localhost:4000

- 使用 Vue3 + Webpack + Element Plus 搭建

### 2、form-app 子应用 主要处理表单相关子菜单 http://localhost:2000

### 3、table-app 子应用 主要处理 table 列表相关子菜单 http://localhost:3000

### 1、创建项目命令 https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

- 我平常习惯用 yarn，不过用 yarn 创建项目的时候报错，用 npm 是没问题的
- yarn create @vitejs/app dvs-platform --template vue
- npm init @vitejs/app dvs-platform -- --template vue

### 2、引入 Element Plus

- npm install element-plus --save

### 3、在 main.js 中引入

    ```javascript
      import { createApp } from 'vue'
      import ElementPlus from 'element-plus';
      import 'element-plus/lib/theme-chalk/index.css';
      import App from './App.vue';

      const app = createApp(App)
      app.use(ElementPlus)
      app.mount('#app')
    ```

### 4、vue-router 引入 https://next.router.vuejs.org/zh/installation.html

- npm install vue-router@4

### 5、vuex 引入https://next.vuex.vuejs.org/installation.html

- npm install vuex@next --save

### 6、qiankun框架的引入
- npm i qiankun -S

### 6、部署方式，2021 年 5 月 24 日考虑主应用和子应用部署在同一台服务器，并且主应用部署在一级目录模式为 hash，子应用部署在二级目录模式也为 hash。

    └── main/                 # 根文件夹
    |
    ├── child/                # 存放所有微应用的文件夹
    |   ├── webpack-app/      # 存放微应用 webpack-app 的文件夹
    |   ├── form-app/         # 存放微应用 form-app 的文件夹
    |   ├── ....-app/         # 存放微应用 ....-app 的文件夹
    ├── index.html            # 主应用的index.html
    ├── css/                  # 主应用的css文件夹
    ├── js/                   # 主应用的js文件夹

### 7、目前部署方式变更为，（2021 年 5 月 25 日）每个子应用可自己单独设置端口，不在二级目录的限制，可单独部署服务器，主应用和子应用仍然都为 hash 模式。

### 8、用户登录信息的 token 存储在 localStorage 中，子应用可直接通过 localStorage.getItem 获取其他数据信息暂时不同享。

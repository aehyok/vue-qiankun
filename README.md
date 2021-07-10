# vue-qiankun

### 基于乾坤搭建的公司项目已经线上发布，目前运行平稳，特此搭建一个demo，为日后继续升级或记录使用，并且将持续打磨将日常使用的模版demo引入。目前本项目所使用的一些常用开源框架如下
    ├── qiankun                #  微前端搭建框架，在主应用中
    ├── leaflet and geoman     #   web地图展示和编辑图层的组件，在map-app子应用中
    ├──                        # 
    ├──                        # 
### 微前端乾坤官网教程 https://qiankun.umijs.org/zh/cookbook

- main 主应用和 child 子应用不限制接入的技术栈，具备完全的自主权，可以选择 Vue、React、Angular、JQuery 等其他前端框架。
- main 主应用和 child 子应用可完全独立开发、独立部署、 实现解耦。

### 个人微前端项目搭建
---
#### 1、main-vite-app-ts 主应用开发环境启动后的访问地址 http://localhost:1000

- 使用 Vue3 + Vite2 +TypeScript + Element Plus 搭建

- 主要负责搭建项目的整体布局，顶部导航栏和左侧菜单列表，以及登录页面等404通用页面布局

- 负责子应用的注册引入和管理

##### 2、webpack-app 子应用，开发环境启动后的访问地址 http://localhost:4000

- 使用 Vue3 + Webpack + Element Plus 搭建
- 将负责菜单管理和字典元数据管理（还未做）
- 目前有一个简单的demo页面

##### 3、form-app 子应用 主要处理表单相关子菜单 http://localhost:2000

##### 4、table-app 子应用 主要处理 table 列表相关子菜单 http://localhost:3000

##### 5、map-app 子应用  主要处理 leaflet地图相关插件  http://localhost:5000(目前正在处理中2021年7月)

##### 6、部署方式，主应用部署在一级目录模式为 hash模式，子应用部署在二级目录模式也为 hash，打包后部署目录结构如下

    └── main/                 # 根文件夹
    |
    ├── child/                # 存放所有微应用的文件夹
    |   ├── webpack-app/      # 存放微应用 webpack-app 的文件夹
    |   ├── form-app/         # 存放微应用 form-app 的文件夹
    |   ├── table-app/        # 存放微应用 table-app 的文件夹
    |   ├── map-app/          # 存放微应用 map-app 的文件夹
    ├── index.html            # 主应用的index.html
    ├── css/                  # 主应用的css文件夹
    ├── js/                   # 主应用的js文件夹
----

### 项目搭建过程常用命令备注
#### 1、创建项目命令 https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

- 我平常习惯用 yarn，不过用 yarn 创建项目的时候报错，用 npm 是没问题的
- yarn create @vitejs/app dvs-platform --template vue
- npm init @vitejs/app dvs-platform -- --template vue

#### 2、引入 Element Plus

- npm install element-plus --save

#### 3、在 main.js 中引入

    ```javascript
      import { createApp } from 'vue'
      import ElementPlus from 'element-plus';
      import 'element-plus/lib/theme-chalk/index.css';
      import App from './App.vue';

      const app = createApp(App)
      app.use(ElementPlus)
      app.mount('#app')
    ```

#### 4、vue-router 引入 https://next.router.vuejs.org/zh/installation.html

- npm install vue-router@4

#### 5、vuex 引入https://next.vuex.vuejs.org/installation.html

- npm install vuex@next --save

#### 6、qiankun框架的引入
- npm i qiankun -S
#### 7、用户登录信息的 token 存储在 localStorage 中，子应用可直接通过 localStorage.getItem 获取其他数据信息暂时不同享。

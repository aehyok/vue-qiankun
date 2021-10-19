# Vite + Vue 3 + Typescript + tsx + less + router + vuex + elementplus 教程示范demo

> 本文为作者尝试使用vite结合vue3和tsx一步步完成todo list示范demo的心路历程整理，希望能给初学者相关踩坑指引



## 已实现的相关功能示范

- [x] typescript
- [x] eslint
- [x] vue3大部分语法示例
- [x] vite脚手架配置
- [x] tsx开发模式
- [x] less
- [x] router
- [x] vuex
- [x] Element-plus

上述功能再结合axios我认为大部分小项目需求都足以胜任，如果有有兴趣的同学欢迎fork代码体验一番,也欢迎各位提交issue交流。



## 为什么vue项目要抛弃SFC写法而尝试jsx/tsx方式来编码？

这个问题本人觉得有一篇博客已经总结得相当不错，我就不再多赘述相关细节，博客链接如下：

[为什么我推荐使用JSX开发Vue3](https://juejin.cn/post/6911175470255964174)

当然这也是见仁见智，每个人有自己的喜好偏见都很正常，但是多一种思路多一种方案对后期业务实现也能多一种选择。



## 为什么要写这个demo?

现前端主流框架中我又喜欢vue的双向数据绑定的机制，又喜欢react jsx语法的灵活，但这两者在vue2时代一直没能有较为完美的结合方案，所以我也一直较为遗憾。

直到vue3问世之后，越来越多开源UI组件库都在使用tsx的方式来实现相关组件业务，生态也越来越成熟，于是趁着公司业务还不繁重之际赶紧体验了一番，体验完之后简直舒爽至极，我也仿佛找到了一个完美的框架编码方式（当然这个完美仅对于我来说，毕竟每个人喜爱的框架，编码方式都不尽相同）。

我觉得目前还是有相当一部分人对该编码模式是比较感兴趣的，因为该类社区文章也很多，但是从这几天的阅读来看，目前本人还没有找到一个完整的示例demo，得每个部分单独去查找和阅读，所以基于这个现状我也总结了一篇简单的示例文章供有兴趣的小伙伴学习和阅读，希望能够帮助到各位。

下面我就结合项目创建顺序以及各个功能模块一个个说明



## 示范解析

### 涉及到的主要依赖：

1. `vue@^3.0.5`
2. `vite@^2.3.5`
3. `vue-router@4.0.8`
4. `vuex@4.0.1`
5. `typescript@^4.1.3`
6. `less@^4.1.1`
7. `@vitejs/plugin-vue-jsx@^1.1.5`
8. `element-plus@^1.0.2-beta.46`



### 项目创建

#### 准备工作

1. 确保安装`yarn`
```bash
$ npm install yarn -g
```
2. 确保安装`vite`脚手架
```bash
$ npm install -g create-vite-app
# or
$ yarn add -g create-vite-app
```



#### 创建

```bash
$ npm init @vitejs/app
# or
$ yarn create @vitejs/app
```

接着你想输入的项目名称，回车之后就会出现让你选择模版预设的选项：

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue3-tsx/main/public/source/1.png" alt="image-20210608173556878" style="zoom:50%;" />

可以看到预设是比较多的，官网上给出了当前支持的预设模版：

- `vanilla`
- `vanilla-ts`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `preact`
- `preact-ts`
- `lit-element`
- `lit-element-ts`
- `svelte`
- `svelte-ts`

这里我们选择 **vue**

然后让我们接着选择 **vue-ts**，回车之后脚手架就帮我们把项目构建好了。

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue3-tsx/main/public/source/2.png" alt="image-20210608173943271" style="zoom:50%;" />

下面是构建完成的目录结构：

```bash
│  ├─public # 静态资源目录
│  │      favicon.ico 
│  │
│  ├─src
│  │  │  App.vue # 入口vue文件
│  │  │  main.ts # 入口文件
│  │  │  shims-vue.d.ts # vue文件模块声明文件
│  │  │  vite-env.d.ts # vite环境变量声明文件
│  │  │
│  │  ├─assets # 资源文件目录
│  │  │      logo.png
│  │  │
│  │  └─components # 组件文件目录
│  │         HelloWorld.vue
│  │
│  │ .gitignore
│  │ index.html # Vite项目的入口文件 
│  │ package.json
│  │ README.md
│  │ tsconfig.json # tsconfig配置文件
│  │ vite.config.ts # vite配置文件
```

由上面目录结构可以看到vite脚手架构建的项目目录结构还是很清晰的，装完依赖之后运行 `yarn dev`则可以看到跑起来的项目是怎样的了。当然这样的配置远不是我们需要的，所以从这里开始要进行改造了。



### 项目改造

#### 配置eslint

增加eslint用来规范`Typescript`以及`vue`代码，首先安装相关依赖：

```bash
yarn add eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

这三个依赖的作用分别是：

- eslint: ESLint的核心代码
- eslint-plugin-vue：ESLint关于检测vue代码规范的插件
- @typescript-eslint/parser：ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
- @typescript-eslint/eslint-plugin：这是一个ESLint插件，包含了各类定义好的检测Typescript代码的规范



结合Prettier和Eslint

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

其中：

- prettier：prettier插件的核心代码
- eslint-config-prettier：解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
- eslint-plugin-prettier：将prettier作为ESLint规范来使用



依赖装好之后便可以开始相关文件的配置工作了，首先在项目根目录新增`.eslintrc.js`文件

> 这个地方遇到了一个坑，如果`eslint-config-prettier`版本号在8.0.0以上，则在`.eslintrc.js`配置extends中不需要再新增 *'prettier/@typescript-eslint'* 这个配置，否则执行eslint会报错

```javascript
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      // Allows for the parsing of JSX
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended', 
    'plugin:prettier/recommended'
  ],
  rules: {}
}
```

紧接着增加**prettier**配置，再在项目根目录中新增`.prettierrc.js`文件

```javascript
// 具体配置可以参考 https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false, // 未尾逗号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 单引号
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'none', // 未尾分号
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf'
};
```

做到这里，eslint除了脚本配置之外就配置完成了，现在只需在`package.json`中配置好脚本命令就完成了整个eslint的配置工作了。

```json
{
  ...
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit --skipLibCheck && vite build", // 增加skipLibCheck可以跳过引入库的ts检查
    "serve": "vite preview",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix --ext .ts,.tsx"
  },
}
```

现在我们试一下eslint检测的结果：

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue3-tsx/main/public/source/5.png" alt="image-20210608173943271" style="zoom:50%;" />

可以看到eslint已经成功执行代码检查了，接着我们自动修复一下：

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue3-tsx/main/public/source/6.png" alt="image-20210608173943271" style="zoom:50%;" />

eslint的自动修复也成功了，至此为止eslint的配置就完成了。



#### tsx支持

首先需要安装官方维护的vite插件`@vitejs/plugin-vue-jsx`,这个插件其实核心还是`@vue/babel-plugin-jsx`,只是在这个插件上封装了一层供vite插件调用。所以关于vue的jsx语法规范可以直接参看`@vue/babel-plugin-jsx`,文档链接如下，建议大家可以先读一遍语法规范。官方写得比较详细，后续我也会结合实际讲解一下大部分规范的用法，[vue jsx语法规范](https://github.com/vuejs/jsx-next)。

```bash
$ npm install @vitejs/plugin-vue-jsx -D
# or
$ yarn add @vitejs/plugin-vue-jsx -D
```

安装完之后在`vite.config.ts`进行插件使用，代码如下：

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx() //插件使用
  ],
});
```

后面就可以把目录中的`app.vue`、`HelloWorld.vue`以及`shims.vue.d.ts`这三个文件删除了，因为后面我们就只需要写tsx文件了。

然后src目录下新增App.tsx文件，写入如下代码：

```tsx
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return () => <div>hello world</div> //写一个 hello world祭天
    }
})
```

接着重新运行`yarn dev`就可以在页面上看到熟悉的hello world了。是的你没有看错，就这么简单。

这边我在这个时候遇到了一个小问题，就是3000端口被占了，这个时候怎么配置vite的端口配置，实际vite的官网都写得比较清楚，由于`vite.config.ts`也有相关的类型提示，所以问题解决得也很快，在`vite.config.ts`中新增一个serve对象，并设置端口就行了，此时配置如下：

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx() //插件使用
  ],
  server: {
    port: 8888
  }
});
```

> 小tip

每次书写vue3模式的tsx模板也比较麻烦，这里建议大家如果使用vscode可以添加一个自定义代码片段，这是本人日常使用的模板：

```json
{
	"Print to console": {
      "prefix": "vuetsx",
      "body": [
			"import { defineComponent } from 'vue'\n",
      "export default defineComponent({",
      "    props: {},",
			"    emits: [],",
			"    components: {},",
			"    setup(props, ctx) {",
			"        return () => <div></div>",
			"    }",
      "})",
      ],
      "description": "Create vue template"
    }
}
```



#### 配置路径别名

路径别名同样需要在`vite.config.ts`中配置，此时具体配置如下：

```typescript
import { resolve } from "path"; // 此处如果报错则安装 node/path依赖
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 8888
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },
});
```

此时在项目中就可以直接使用新的路径别名了，使用`vscode`可能会没有路径提示，这个时候只需要在`jsconfig.json`/`tsconfig.json`配置`paths`和`baseUrl`就会出现路径提示了，具体如下：

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
    },
  },
  // ...
}
```



#### less配置

Vite 提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持。因此没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖，依赖安装完项目就可以直接解析less文件了。

```bash
$ npm install less less-loader -D
# or
$ yarn add less less-loader -D
```

> 注意这里有个坑，less 和 less-loader 需要写到 devDependencies 里面，否则运行会报错。



#### router配置

##### 安装

> 请注意，路由一定得安装4.0.0以上版本，最好直接安装当前最新版本。

查看 vue-router 版本：

```bash
$ npm info vue-router versions
```

直接安装最新版 vue-router：

```bash
$ npm install vue-router@4.0.8
# or
$ yarn add vue-router@4.0.8
```

在 src 目录下创建以下目录结构：

```basic
- src
  |- router
  |   index.ts
  |- views
  |   404.tsx
  |   login.tsx
  |   home.tsx
```



##### 配置

新版本的路由配置和之前非常相似，只有些许不同。新版本路由的API全部采用了函数式引入的方式，配合ts的类型提示，让我们无需文档也能够完成配置。

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 路由配置 和以前一样
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      type: "home",
    },
    component: () => import("@/views/home"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      type: "login",
    },
    component: () => import("@/views/login"),
  },
  {
    path: "/:pathMatch(.*)*", // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: "404",
    component: () => import("@/views/404"),
  },
];

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes,
});

export default router;
```



##### 增加路由守卫

```typescript
// 路由守卫和之前的实现方式一致 此处只是做了一个demo仅供演示
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
  // 获取userToken，根据业务场景可由localStorage也可由cookie中获取
  const user = localStorage.getItem("user");
  // 路由守卫判断
  if (to.meta.type === "login" && user) {
    next({ name: "home" });
    return;
  }

  if (to.meta.type === "home" && !user) {
    next({ name: "login" });
    return;
  }

  next();
});
```

现在一个vue3的基础路由就配置完成了，接着在`main.ts`这个入口文件中插件的方式通过vue引入就可以了

```typescript
import App from './App'
import router from "@/router"
import { createApp } from 'vue'

createApp(App).use(router).mount("#app");
```

此时在启动项目就可以看到地址栏已经是采用hash路由的链接了，但是这个时候还差最后一步来实现路由跳转，这就需要用到`router-view`了，这个部分跟vue2实现方式一样，这里我统一采用import的方式来实现。

```tsx
# App.tsx
import "@/assets/base.less"
import { defineComponent } from "vue";
import { RouterView } from "vue-router"; //从vue router中引入RouterView组件 实际上也可以不用引入直接使用

export default defineComponent({
  setup() {
    return () => <RouterView />;
  },
});
```



#### vuex配置

##### 安装

> 请注意，vuex也得安装4.0.0及以上版本，最好直接安装当前最新版本。

查看 vuex 版本：

```bash
$ npm info vuex versions
```

直接安装最新版 vue-router：

```bash
$ npm install vuex@4.0.1
# or
$ yarn add vuex@4.0.1
```

在 src 目录下创建以下目录结构：

```basic
- src
  |- store
  |  | index.ts 
  |  |- home
  |  |  | index.ts
  |  |  | actionType.ts
  |  |- login
  |  |  | index.ts
  |  |  | actionType.ts
```

##### 配置

vue3中的vuex配置和vue2基本上相同，这里我就直接采用模块化的方式创建作为演示了。

首先配置主入口

```typescript
# store/index.ts
import { createStore } from "vuex"
import home from "./home";
import login from "./login"

// 此处和router类似
const store = createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        home,
        login
    }
})

export default store
```

后面我就只拿login这个模块仓库做相关代码演示了

```typescript
# store/login/index.ts
import { Module } from "vuex";
import { SET_USER } from "./actionType";

export type IUser = Record<"name" | "password", string>;

export interface ILoginState {
  user: IUser;
}

// Module这个类型可以传两个范型变量 第一个是当前模块state的对象接口类型 第二个是主仓库state的对象接口类型 
const LoginStore: Module<ILoginState, {}> = {
  namespaced: true,
  state: {
    user: {
      name: "",
      password: "",
    },
  },
  getters: {},
  mutations: {
    // 此处注意不要把state解构，不要将丧失响应式能力
    [SET_USER](state, payload: IUser) {
      state.user = payload;
    },
  },
  actions: {
    [SET_USER]({ commit }, payload: IUser) {
      commit(SET_USER, payload);
    },
  },
};

export default LoginStore;
```

其实从代码可以看出和vue2的基本上没有差别，让我比较无语的是升级后的vuex对ts的支持依旧不是很给力，声明文件中很多any类型，导致基本上无法用到ts类型提示的优势，这个看后期官方能不能优化吧，当然现在社区也有相关的解决方案，有兴趣的可以移步这里 [一个让 vuex 更好的支持 typescript 的解决方案](https://juejin.cn/post/6844903871219761159)

现在状态仓库创建完了，接着和引入路由一样引入store就行了

```typescript
import App from './App'
import store from "@/store"
import router from "@/router"
import { createApp } from 'vue'

createApp(App).use(router).use(store).mount("#app");
```

后边vuex在组件中的使用方法我会结合组件内的代码来做相关演示。



#### Element-plus引入

其实element-plus的引入官网已经介绍得十分详细了，这边就以按需引入的方式来做演示。

##### 安装

```bash
$ npm install element-plus
# or
$ yarn add element-plus
```

然后安装vite样式引入插件

```bash
$ npm install vite-plugin-style-import -D
# or
$ yarn add vite-plugin-style-import -D
```



##### 配置

接着在`vite.config.ts`中如下配置即可

```typescript
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport from "vite-plugin-style-import";

export default ({ mode }) => // vite配置文件中环境变量可以以如下方式取到
  defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`;
            },
          },
        ],
      }),
    ],
    base: mode === "development" ? "/" : "./", //此时把环境打包路径也配置好，避免生产环境打包出现白屏
    server: {
      port: 8888,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "/src"),
      },
    },
  });
```

然后`main.ts`中引入样式文件，之后便可以按需直接在组件中使用`element-plus`了

```typescript
// main.ts
import App from "./App";
import store from "./store";
import router from "./router";
import { createApp } from "vue";
import "element-plus/lib/theme-chalk/index.css";

createApp(App).use(router).use(store).mount("#app");
```



### 项目解析

#### jsx/tsx语法规范

如果有过react的开发经验，可以发现除了vue中独有的几个新概念：`slot`、`directive`、`emit`等以外，大部分支持vue的jsx语法规范和react的都是一样的，相同的部分我就不多说了，大家不了解的可以翻下文档很快就能理解，不同的接下来我就一个个的结合代码进行举例示范：



##### Fragment

在vue3的模版语法中是支持解析多根节点的语法结构的，比如这样：

```vue
<template>
  <div></div>
  <div></div>
  <div></div>
</template>
```

但是使用jsx的方式是不支持这种写法的，还是必须只有一个根结点，这个时候我们可以和react一样通过添加一个虚拟节点来完成同样的需求：

```tsx
const App = () => (
  <>
    <span>I'm</span>
    <span>Fragment</span>
  </>
);
```



##### 指令

`@vue/babel-plugin-jsx`帮我们解析了几个常见的vue指令，比如`v-show`、`v-model`,这两个的用法和功能与vue中一摸一样，就不多赘述了，接下来说几个常见但是需要自己实现的指令功能：

- v-bind

```tsx
import { defineComponent, ref } from "vue";
const App = defineComponent({
  setup(){
    const size = ref<"large" | "medium" | "small" | "mini">("mini")
    return () => 
      <Button size={size.value}></Button> //此处直接换成jsx的模版语法 效果和v-bind是一致的
  }
});
```

- v-if

使用条件判断语句来实现v-if的功能，与react中一致。

```tsx
const App = () => (
  <>
   {
     condition ?  <span>A</span> : <span>B</span>
   }
  </>
);
```

- v-for

和react中一样，采用map循环的方式

```tsx
import { defineComponent, ref } from "vue";
const App = defineComponent({
  setup(){
    const list = ref<string[]>([])
    return () => {
      list.value.map((data,index) => <p key={index}>{data}</p>)
    }
  }
});
```

- 自定义指令

首先创建自定义指令

```typescript
import { ObjectDirective } from "vue";

const foucsDirective: ObjectDirective<HTMLElement, any> = {
  mounted(el) {
    switch (el.tagName) {
      case "INPUT":
        el.focus();
        break;
      default:
        const input = el.querySelector("input");
        input?.focus();
        break;
    }
  },
};

export default foucsDirective;
```

全局引入

```typescript
import App from "./App";
import store from "./store";
import router from "./router";
import { createApp } from "vue";
import foucsDirective from "@/directive/focus";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);

// 全局挂载指令
app.directive("focus",foucsDirective);

app.use(router).use(store).mount("#app");
```

局部引入

```tsx
import { defineComponent, ref } from "vue";
import foucsDirective from "@/directive/focus";

const App = defineComponent({
  directives: { focus: foucsDirective },
  setup(){
    const value = ref<string>("")
    return () => <input type="text" v-focus v-model={value.value}/>
  }
});
```



##### 插槽

不像 react，component 自带一个 children 的 props，vue 的自定义组件嵌套全得靠 slot，所以在jsx中想要实现vue中的插槽写法也有很大不同。

```tsx
import { defineComponent } from "vue";

// 子组件
const Child = defineComponent({
  setup(props, { slots }) {
    return () => (
      <>
        默认插槽: {slots.default && slots.default()}
        <br />
        具名插槽: {slots.prefix && slots.prefix()}
        <br />
        作用域插槽:{slots.suffix && slots.suffix({ name: "这是作用域插槽的示范" })}
      </>
    );
  },
});

// 父组件
const Father = defineComponent({
  setup() {
    return () => (
      <Child
        v-slots={{
          prefix: <i class="el-icon-star-on"></i>, // 具名插槽
          suffix: (props: Record<"name", string>) => <span>{props.name}</span>, // props可作插槽作用域的作用
        }}
      >
        这是默认插槽的示范
      </Child>
    );
  },
});

export default Father
```

由上述的简单例子很容易就能总结出vue中默认插槽、具名插槽以及作用域插槽的用法，它渲染的结果如下：

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue3-tsx/main/public/source/3.png" alt="image-20210608173943271" style="zoom:50%;" />

> 这里有一个坑，v-slots中直接传入defineComponent包裹的组件将不会执行渲染

```tsx
const Test1 = defineComponent({
  setup() {
    return <i class="el-icon-star-on"></i>;
  },
}); // 错误 此组件作为slot传入子组件不会被成功渲染

const Test2 = () => <i class="el-icon-star-on"></i> // 正确 此组件作为slot传入子组件会被成功渲染
```



##### emit

vue中子向父传值一般都是emit的方式，这个在vue3中大致写法相似，只是多了一个定义emit的步骤，这也是为了后续的类型推倒做准备。

```jsx
import { defineComponent } from "vue";

// 子组件
const Child = defineComponent({
  emits: ["click"],
  setup(props ,{ emit }) {
    return () => (
      <button onClick={() => {emit("click")}}>点我触发emit</button>
    );
  },
});

// 父组件
const Father = defineComponent({
  setup() {
    return () => (
      <Child onClick={() => {
          console.log("emit 触发了")
      }}/>
    );
  },
});
```

这种方式本没有问题，但是在tsx中由于子组件props中没有相关emit事件的类型声明，就会报错

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue3-tsx/main/public/source/4.png" alt="image-20210608173943271" style="zoom:50%;" />

但是实际功能是能够触发的，这里只是类型检测出现了异常。有时候遇到了没能兼容tsx写法形式(比如element-plus = =)的库，又不想有红色报错，这个时候其实可以这么处理：

```tsx
import { defineComponent } from "vue";

// 子组件
const Child = defineComponent({
  emits: ["click"],
  setup(props ,{ emit }) {
    return () => (
      <button onClick={() => {emit("click")}}>点我触发emit</button>
    );
  },
});

// 父组件
const Father = defineComponent({
  setup() {
    return () => (
      <Child {...{  // 避免出现因为类型检测导致的报错 此方法可适用于任何不存在props类型声明的参数
        onClick:() => {
          console.log("emit 触发了")
        }
      }}/>
    );
  },
});
```

但是这个其实也是一个曲线救国的方案，所以如果大家有开发库的打算或者平时打算用vue3结合tsx写项目，最好还是使用下面的方式，做个兼容处理：

```tsx
import { defineComponent, PropType } from "vue";

// 子组件
const Child = defineComponent({
  emits: ["click"], // 传统template写法
  props: {
    onClick: Function as PropType<(event:MouseEvent) => void> // 兼容tsx写法，让事件有类型声明
  },
  setup(props ,{ emit }) {
    return () => (
      <button onClick={(event:MouseEvent) => {emit("click",event)}}>点我触发emit</button>
    );
  },
});

// 父组件
const Father = defineComponent({
  setup() {
    return () => (
      <Child onClick={(event:MouseEvent) => { // 此处便不会出现类型报错 并且有好的类型提示
          console.log("emit 触发了")
      }}/>
    );
  },
});
```



##### tsx Render方式

tsx目前还支持render方式的写法，这种写法目前也是大多数开源UI库的写法，个人比较推荐这种写法，它将逻辑层和模板层分开后期更易维护

```tsx
import { ref, renderSlot, onUnmounted, defineComponent } from "vue";

// 带render函数的组件 优点：可将逻辑区与模版区分开
export const RenderComponent = defineComponent({
  props: {
    title: String,
  },
  // 逻辑层
  setup() {
    const count = ref<number>(1);

    const timer = setInterval(() => {
      count.value++;
    }, 2000);

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      count,
    };
  },
  // 渲染层
  render() {
    // render函数在响应式数据发生更改时会自动触发（与react类似）
    const { count, $slots, title } = this;
    return (
      <div class="render-component">
        {renderSlot($slots, "prefix")} {count}
        <br />
        这是props：{title}
        <br />
        {renderSlot($slots, "default")}
      </div>
    );
  },
});
```



#### router和vuex项目中使用

##### router项目中的使用

```tsx
import { defineComponent } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";

const App = defineComponent({
  setup(){
    const router = useRouter();
    const route = useRoute();
    
    function go(pathName:string){
      // 跳转路由
      router.push({
        name: pathName,
        query: {
          value: "路由传参"
        }
      })
      
      // 取路由传递的参数 params的同理
      const { query } = route;
      console.log(query)
    }
    
    return () => <>
      <button onClick={() => {go('home')}}>跳转home</button>
      <button onClick={() => {go('login')}}>跳转login</button>
      <RouterView />
    </>
  }
});
```



##### vuex项目中的使用

```tsx
import { useStore } from "vuex";
import { SET_USER } from "@/store/login/actionType";
import { defineComponent, computed, readonly } from "vue";

const App = defineComponent({
  setup(){
    // 暴露state以及dispatch
    const { state, dispatch } = useStore();
    // 此处最好用readonly包裹暴露出的state，让其成为只读属性 避免直接修改
    const loginState = computed(() => readonly(store.state.login));
    
    function modifyUserInfo(){
      // 直接调用dispatch 用法和vue2中一致
      dispatch(`login/${SET_USER}`,{})
    }
    
    return () => <>
      <button onClick={modifyUserInfo}>修改state</button>
      <div>{loginState.user} {loginState.password}</div>
    </>
  }
});
```



## 结语

至此相关示例解析就全部结束了，本文示例源码在这个仓库 [vite-vue3-tsx](https://github.com/cangshudada/vite-vue3-tsx) 有兴趣的欢迎fork下来跑一跑，也能对vue3相关语法更加熟悉。

我本人写此文章也只是帮助初学vue3和tsx的同学建立一个较完善的框架，文章肯定也有本人认知不甚清晰的地方，欢迎各位多多交流，互相进步！


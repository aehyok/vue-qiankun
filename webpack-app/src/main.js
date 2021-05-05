import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// function useTable (app: App) {
//     app.use(VXETable)

//     // 给 vue 实例挂载内部对象，例如：
//     // app.config.globalProperties.$XModal = VXETable.modal
//     // app.config.globalProperties.$XPrint = VXETable.print
//     // app.config.globalProperties.$XSaveFile = VXETable.saveFile
//     // app.config.globalProperties.$XReadFile = VXETable.readFile
//   }

createApp(App).use(ElementPlus).use(VXETable).use(store).use(router).mount("#app");

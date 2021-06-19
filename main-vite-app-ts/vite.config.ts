import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") // 设置 `@` 指向 `src` 目录
    }
  },
  // 全局css样式变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_variable.scss";`
      }
    }
  },
  base: "./", // 设置打包路径
  build: {
    outDir: "../qiankun/main"
  },
  // 本地运行配置，及反向代理配置
  server: {
    port: 1000,
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/infra': {
        target: 'http://rap2api.taobao.org/app/mock/283135/',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/infra/, '')
      }
    }
  }
})

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          // {
          //   libraryName: "element-plus",
          //   esModule: true,
          //   ensureStyleFile: true,
          //   resolveStyle: (name) => {
          //     return `element-plus/lib/theme-chalk/${name}.css`;
          //   },
          //   resolveComponent: (name) => {
          //     return `element-plus/lib/${name}`;
          //   },
          // },
        ]
      })
    ],
    base: mode === 'development' ? '/' : './',
    server: {
      port: 8888,
      host: '0.0.0.0', // 可查看到局域网IP地址
      https: true // 可开启https
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '/src')
      }
    }
  })

import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
  // 全局css样式变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_variable.scss";`,
      },
    },
  },
  base: './', // 设置打包路径
  build: {
    target: 'es2015',
    outDir: '../../qiankun/main/h5/',
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 8888,
    host: '0.0.0.0', // 可查看到局域网IP地址
    // https: true, // 可开启https
  },
});

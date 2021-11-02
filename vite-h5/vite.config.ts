import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

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
  // 全局css样式变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_variable.scss";`,
      },
    },
  },
  server: {
    port: 9528,
    host: '0.0.0.0', // 可查看到局域网IP地址
    // https: true // 可开启https
  },
});

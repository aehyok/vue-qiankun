import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import { resolve } from 'path';
import vue from "@vitejs/plugin-vue"


function pathResolve(dir: string) {
  console.log(process.cwd(),'process.cwd(),')
  return resolve(process.cwd(), '.', dir);
}


export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  return {
    root,
    resolve: {
      alias: [
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
        // ['@vue/compiler-sfc', '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'],
      ],
    },
    server: {
      port: 1000,
      // Load proxy configuration from .env
      // proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: "../../release/ui/main-app",
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: [vue()],
    // 全局css样式变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/_variable.scss";`
        }
      }
    },   
  };
};

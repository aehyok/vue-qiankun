import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8000,
    host: '0.0.0.0', // 可查看到局域网IP地址
    // https: true // 可开启https
  }
})

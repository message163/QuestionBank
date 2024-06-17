import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as port from '@questionbank/config'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{
    port: port.appPort
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

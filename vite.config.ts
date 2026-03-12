import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'react-style-singleton': (() => {
        const rootDir = dirname(fileURLToPath(import.meta.url))
        const candidate = resolvePath(rootDir, 'node_modules/react-style-singleton/dist/es2015/index.js')
        return existsSync(candidate) ? candidate : 'react-style-singleton'
      })(),
    },
  },
})


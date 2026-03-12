import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'react-style-singleton': (() => {
        const here = dirname(fileURLToPath(import.meta.url))
        const candidates = [
          resolvePath(here, '../../node_modules/react-style-singleton/dist/es2015/index.js'),
          resolvePath(here, 'node_modules/react-style-singleton/dist/es2015/index.js'),
        ]
        for (const c of candidates) if (existsSync(c)) return c
        return 'react-style-singleton'
      })(),
    },
  },
  server: { port: 5174 },
})

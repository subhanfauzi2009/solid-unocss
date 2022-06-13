import { defineConfig } from 'vite'
import { resolve } from 'path'

import Solid from 'vite-plugin-solid'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${resolve(__dirname, './src')}/`,
    },
  },
  publicDir: 'public',
  plugins: [
    Solid(),
    Unocss(),
    Pages({ dirs: 'src/pages' }),
    AutoImport({
      dts: './src/auto-import.d.ts',
      imports: ['solid-js', 'solid-app-router'],
    }),
  ],
})

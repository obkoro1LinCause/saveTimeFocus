import { fileURLToPath, URL } from 'node:url'
import * as path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  build:{
    target:'esnext',
    lib:{
      entry:path.resolve(__dirname,'src/index.ts')
    },
    cssCodeSplit: true,
    minify: false,
    rollupOptions:{
      output: [
        {
          format: 'es',
          dir: path.resolve(__dirname, 'es'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          dir: path.resolve(__dirname, 'lib'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          minifyInternalExports: false,
          externalLiveBindings: false,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
        },
      ],
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    }
  }
})
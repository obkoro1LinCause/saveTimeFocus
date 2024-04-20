import * as path from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  build:{
    // target:'esnext',
    lib:{
      entry:path.resolve(__dirname,'src/index.ts'),
      name:'toolkit',
      fileName: 'toolkit',
    },
    rollupOptions:{
      external:['vue-i18n'],
      output: {
        // 在 UMD 构建模式下,全局模式下为这些外部化的依赖提供一个全局变量
        globals: {
            vueI18n:'vue-i18n'
        },
      },
    }
  },
})

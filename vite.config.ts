
// https://github.com/Eptagone/Vite.AspNetCore/blob/main/examples/libraries/ViteNET.React/vite.config.ts#L69
// https://rollupjs.org/configuration-options/#input

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // https://stackoverflow.com/a/74192065
    cssCodeSplit: false,
    rollupOptions: {
      plugins: [],
      external: ['react', 'react-dom'],
      output: {
        format: 'umd',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
});

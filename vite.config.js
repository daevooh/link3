import { defineConfig } from 'vite'
import { resolve } from 'path'

// Using a very simple library build configuration
export default defineConfig({
  // Library mode
  build: {
    // Use library mode
    lib: {
      // The entry file 
      entry: resolve(__dirname, 'link3_project/src/reown-appkit-connector.js'),
      // Global variable name
      name: 'ReownAppKit',
      // Output file name
      fileName: 'reown'
    },
    // Where to output the files
    outDir: 'link3_project/static/js/vite',
    emptyOutDir: true,
    // For compatibility with older browsers
    target: 'es2015'
  }
})
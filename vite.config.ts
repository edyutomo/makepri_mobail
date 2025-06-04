/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Supaya warning muncul kalau > 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Misalnya kamu pakai library besar, bisa dipisah
          react: ['react', 'react-dom'],
          vendor: ['axios', 'lodash'] // Tambah sesuai library kamu
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    include: [
      'packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'apps/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'build'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@cvcraft/core': path.resolve(__dirname, './packages/core/src'),
      '@cvcraft/ui': path.resolve(__dirname, './packages/ui/src'),
    },
  },
})
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/utils/index.ts',
    'src/validation/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: 'es2022',
  outDir: 'dist',
  external: [
    'react',
    'react-dom'
  ],
  // Remove "use client" banner entirely for core library
  // Individual components that need it can add it themselves
  onSuccess: async () => {
    console.log('✅ @cvcraft/core built successfully')
  }
})
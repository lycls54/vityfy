import { defineConfig } from 'tsup'

export default defineConfig({
  // Tek entry point - en temiz yaklaşım
  entry: ['src/index.ts'],
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
    'react-dom',
    '@cvcraft/core',
    'tailwindcss',
    'framer-motion',
    '@radix-ui/react-slot',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-dialog',
    '@radix-ui/react-toast',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-popover',
    '@radix-ui/react-select',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-switch',
    '@radix-ui/react-tabs',
    '@radix-ui/react-accordion',
    '@radix-ui/react-avatar',
    '@radix-ui/react-progress',
    '@radix-ui/react-label',
    '@radix-ui/react-separator',
    'lucide-react',
    'clsx',
    'tailwind-merge',
    'class-variance-authority'
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"'
    }
  },
  onSuccess: async () => {
    console.log('✅ @cvcraft/ui built successfully')
    console.log('📦 Components: UI, Layout, Feedback')
    console.log('🪝 Hooks: LocalStorage, MediaQuery, Debounce')
    console.log('🎨 Utils: CN, Animations')
    console.log('📝 Types: Component interfaces')
  }
})
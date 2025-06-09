// packages/ui/src/index.ts - DÜZELTME

// Import styles first
import './styles/globals.css'
import './styles/components.css'
import './styles/animations.css'

// Export all components
export * from './components'

// Export hooks
export * from './hooks'

// Export utilities
export * from './utils'

// Export types - SADECE types klasöründen export et, components'ten değil
export * from './types'

// Export version
export const UI_VERSION = '0.1.0'

// ÖNEMLİ: ./components'ten gelen tipleri tekrar export etme
// Çünkü bu tipler zaten ./types klasöründe tanımlı ve oradan export ediliyor
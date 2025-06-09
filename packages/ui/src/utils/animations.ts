import { Variants, Transition } from 'framer-motion'

/**
 * Common animation variants for Framer Motion
 */

// Fade animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Scale animations
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

export const scaleInCenter: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
}

export const scaleBounce: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  exit: { opacity: 0, scale: 0.3 },
}

// Slide animations
export const slideInUp: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
  exit: { y: '100%' },
}

export const slideInDown: Variants = {
  hidden: { y: '-100%' },
  visible: { y: 0 },
  exit: { y: '-100%' },
}

export const slideInLeft: Variants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
  exit: { x: '-100%' },
}

export const slideInRight: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
}

// Rotation animations
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: -180 },
}

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: -90 },
}

// Stagger animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, y: 20 },
}

// Modal animations
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: { opacity: 0, scale: 0.8, y: -50 },
}

// Drawer animations
export const drawerOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const drawerContent: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
}

// Toast animations
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: -100, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  },
  exit: { 
    opacity: 0, 
    y: -100, 
    scale: 0.8,
    transition: { duration: 0.2 }
  },
}

// Loading animations
export const spinVariants: Variants = {
  spinning: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' }
  },
}

export const pulseVariants: Variants = {
  pulsing: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  },
}

export const bounceVariants: Variants = {
  bouncing: {
    y: [0, -10, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  },
}

// Hover animations
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export const hoverFloat: Variants = {
  rest: { y: 0 },
  hover: { y: -5 },
}

export const hoverGlow: Variants = {
  rest: { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
  hover: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
}

// Page transitions
export const pageTransition: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
}

/**
 * Common transition configurations
 */
export const transitions = {
  default: { duration: 0.3, ease: 'easeInOut' } as Transition,
  fast: { duration: 0.15, ease: 'easeInOut' } as Transition,
  slow: { duration: 0.5, ease: 'easeInOut' } as Transition,
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
  springFast: { type: 'spring', stiffness: 500, damping: 35 } as Transition,
  springSlow: { type: 'spring', stiffness: 200, damping: 25 } as Transition,
  bounce: { type: 'spring', stiffness: 400, damping: 10 } as Transition,
}

/**
 * Animation utility functions
 */
export const animationUtils = {
  /**
   * Creates a stagger animation with custom delay
   */
  createStagger: (delayChildren = 0.1, staggerChildren = 0.1): Variants => ({
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }),

  /**
   * Creates a slide animation from any direction
   */
  createSlide: (direction: 'up' | 'down' | 'left' | 'right', distance = 100): Variants => {
    const getInitialPosition = () => {
      switch (direction) {
        case 'up': return { y: distance }
        case 'down': return { y: -distance }
        case 'left': return { x: distance }
        case 'right': return { x: -distance }
      }
    }

    return {
      hidden: { opacity: 0, ...getInitialPosition() },
      visible: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...getInitialPosition() },
    }
  },

  /**
   * Creates a custom fade animation with configurable opacity
   */
  createFade: (fromOpacity = 0, toOpacity = 1): Variants => ({
    hidden: { opacity: fromOpacity },
    visible: { opacity: toOpacity },
    exit: { opacity: fromOpacity },
  }),

  /**
   * Creates a scale animation with custom scale values
   */
  createScale: (fromScale = 0.8, toScale = 1): Variants => ({
    hidden: { opacity: 0, scale: fromScale },
    visible: { opacity: 1, scale: toScale },
    exit: { opacity: 0, scale: fromScale },
  }),

  /**
   * Combines multiple animation variants - DÜZELTME
   */
  combine: (...variants: Variants[]): Variants => {
    const combined: Variants = {}
    
    variants.forEach(variant => {
      Object.keys(variant).forEach(key => {
        const existingVariant = combined[key]
        const newVariant = variant[key]
        
        // Undefined kontrolü ekle
        if (newVariant !== undefined) {
          if (existingVariant !== undefined) {
            // Her iki variant da tanımlı - birleştir
            combined[key] = { 
              ...(typeof existingVariant === 'object' ? existingVariant : {}), 
              ...(typeof newVariant === 'object' ? newVariant : {})
            }
          } else {
            // Sadece yeni variant tanımlı
            combined[key] = newVariant
          }
        }
      })
    })
    
    return combined
  },
}

/**
 * Predefined animation presets for common use cases
 */
export const animationPresets = {
  // Component entrance animations
  entrance: {
    fade: fadeVariants,
    slideUp: fadeInUp,
    slideDown: fadeInDown,
    slideLeft: fadeInLeft,
    slideRight: fadeInRight,
    scale: scaleVariants,
    bounce: scaleBounce,
    rotate: rotateIn,
  },
  
  // Layout animations
  layout: {
    stagger: staggerContainer,
    staggerItem: staggerItem,
    page: pageTransition,
  },
  
  // Interactive animations
  interactive: {
    hover: hoverScale,
    float: hoverFloat,
    glow: hoverGlow,
  },
  
  // Loading animations
  loading: {
    spin: spinVariants,
    pulse: pulseVariants,
    bounce: bounceVariants,
  },
  
  // Modal animations
  modal: {
    backdrop: modalBackdrop,
    content: modalContent,
  },
  
  // Toast animations
  toast: toastVariants,
}
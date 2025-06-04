// src/lib/utils.ts - SSR Güvenli Versiyon
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Optimized class name merger for Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Performance-optimized debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    const callNow = immediate && !timeout

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func(...args)
    }, wait)

    if (callNow) func(...args)
  }
}

/**
 * Throttle function for scroll events and animations
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generate optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  width: number,
  height: number,
  priority = false
) {
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  ).toString('base64')}`

  return {
    src,
    alt,
    width,
    height,
    priority,
    quality: 85,
    placeholder: 'blur' as const,
    blurDataURL,
    sizes: priority
      ? '100vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }
}

/**
 * Format date for display and SEO - SSR güvenli
 */
export function formatDate(date: string | Date, format: 'short' | 'long' | 'iso' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // SSR kontrolü
  if (typeof window === 'undefined') {
    // Server-side için statik tarih formatı
    return format === 'iso' ? dateObj.toISOString() : '2025'
  }
  
  switch (format) {
    case 'iso':
      return dateObj.toISOString()
    case 'long':
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    default:
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
  }
}

/**
 * Generate unique ID for CV sections - SSR güvenli
 */
export function generateId(): string {
  // Server-side için deterministik ID
  if (typeof window === 'undefined') {
    return `static-${Math.random().toString(36).substr(2, 9)}`
  }
  // Client-side için unique ID
  return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9)
}

/**
 * Slugify text for SEO-friendly URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Extract text content for meta descriptions
 */
export function extractTextContent(html: string, maxLength = 160): string {
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Calculate reading time for blog posts
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Local storage helpers with error handling - SSR güvenli
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }
}

/**
 * Check if code is running on client side
 */
export const isClient = (): boolean => typeof window !== 'undefined'

/**
 * Check if code is running on server side
 */
export const isServer = (): boolean => typeof window === 'undefined'

/**
 * Safe window access
 */
export const safeWindow = (): Window | undefined => {
  return isClient() ? window : undefined
}

/**
 * Get current year safely for SSR
 */
export const getCurrentYear = (): number => {
  if (isServer()) return 2025 // Fallback for SSR
  return new Date().getFullYear()
}

/**
 * Format currency safely
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  if (isServer()) return `${amount.toFixed(2)}` // Simple fallback for SSR
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)}`
  }
}
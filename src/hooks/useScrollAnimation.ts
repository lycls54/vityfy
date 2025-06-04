// src/hooks/useScrollAnimation.ts - SSR Güvenli Versiyon
'use client'

import { useEffect, useState } from 'react'

export const useScrollAnimation = (threshold: number = 0.1) => {
  const [isHydrated, setIsHydrated] = useState(false)

  // Client-side hydration kontrolü
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // SSR sırasında intersection observer çalıştırma
    if (!isHydrated || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { 
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    )

    // Sadece client-side'da elements'i seç
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold, isHydrated])

  return isHydrated
}

// Alternatif hook - component bazlı kullanım için
export const useClientSideAnimation = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Hydration sonrası animasyonları başlat
    if (mounted) {
      const timer = setTimeout(() => {
        document.body.classList.add('hydrated')
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [mounted])

  return mounted
}
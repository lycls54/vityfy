// src/components/ClientHydration.tsx - Hydration Kontrolü
'use client'

import { useEffect } from 'react'

/**
 * Client-side hydration kontrolü ve animasyon başlatma
 */
export default function ClientHydration() {
  useEffect(() => {
    // Hydration tamamlandığını işaretle
    document.body.classList.add('hydrated')
    
    // Performans için animasyonları slight delay ile başlat
    const timer = setTimeout(() => {
      // Tüm scroll animasyonları için observer başlat
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { 
          threshold: 0.1,
          rootMargin: '50px 0px -50px 0px'
        }
      )

      // Animate-on-scroll class'ına sahip tüm elementleri gözlemle
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))

      // Cleanup function
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Bu component UI render etmez
  return null
}
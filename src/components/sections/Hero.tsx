// src/components/sections/Hero.tsx - SSR Güvenli Versiyon
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Users, Download, Zap } from 'lucide-react'
import { cn, getOptimizedImageProps } from '@/lib/utils'
import { useClientSideAnimation } from '@/hooks/useScrollAnimation'

const Hero = () => {
  const mounted = useClientSideAnimation()
  
  const heroImageProps = getOptimizedImageProps(
    '/images/hero/cv-hero.webp',
    'Professional CV Designer Interface',
    800,
    600,
    true
  )

  const stats = [
    { icon: Users, value: '50,000+', label: 'CVs Created' },
    { icon: Star, value: '4.9/5', label: 'User Rating' },
    { icon: Download, value: '25,000+', label: 'Downloads' },
    { icon: Zap, value: '< 5 min', label: 'Creation Time' }
  ]

  useEffect(() => {
    if (!mounted) return

    // Sadece client-side'da animasyonları başlat
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible')
      }, index * 100)
    })
  }, [mounted])

  // SSR güvenli animasyon class'ları
  const getAnimationClass = (baseClass: string, stagger: number = 0) => {
    if (!mounted) return baseClass
    return `${baseClass} animate-on-scroll${stagger > 0 ? ` stagger-${stagger}` : ''}`
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
      {/* Background decoration - sadece client-side'da göster */}
      {mounted && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-700"></div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className={getAnimationClass("", 0)}>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 hover:bg-white/90 transition-all duration-300">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  Trusted by 50,000+ professionals
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className={getAnimationClass("", 1)}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Create Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Perfect CV
                </span>{' '}
                in Minutes
              </h1>
            </div>

            {/* Description */}
            <div className={getAnimationClass("", 2)}>
              <p className="text-xl text-gray-600 max-w-2xl lg:max-w-none leading-relaxed">
                Professional CV builder with AI-powered suggestions, stunning templates, 
                and instant PDF export. Land your dream job with a CV that stands out.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={getAnimationClass("", 3)}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/builder"
                  className={cn(
                    "group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold",
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    "text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30",
                    "transform hover:-translate-y-1 transition-all duration-300 focus-ring"
                  )}
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                
                <Link 
                  href="/templates"
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold",
                    "bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-gray-300",
                    "text-gray-700 rounded-xl shadow-sm hover:shadow-md",
                    "transform hover:-translate-y-1 transition-all duration-300 focus-ring"
                  )}
                >
                  View Templates
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className={getAnimationClass("", 4)}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left group">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                        <stat.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900" suppressHydrationWarning>
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={cn("relative lg:order-last", getAnimationClass("", 2))}>
            <div className="relative">
              {/* Main image placeholder */}
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-blue-500/20 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 hover:shadow-3xl hover:shadow-blue-500/30">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">CV Builder Interface</h3>
                    <p className="text-gray-600">Professional CV creation tool</p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="w-8 h-2 bg-blue-300 rounded"></div>
                      <div className="w-12 h-2 bg-blue-400 rounded"></div>
                      <div className="w-6 h-2 bg-blue-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements - sadece client-side'da göster */}
              {mounted && (
                <>
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-green-200 animate-float">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">CV Ready!</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-blue-200 animate-bounce-gentle">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">AI Powered</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator - sadece client-side'da göster */}
        {mounted && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
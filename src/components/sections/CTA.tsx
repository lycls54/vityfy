// src/components/sections/CTA.tsx - Pure CSS final section
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Users, Zap, Shield, Download, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const CTA = () => {
  const features = [
    { icon: Star, text: "4.9/5 Rating", subtext: "1,200+ reviews" },
    { icon: Users, text: "50,000+ Users", subtext: "Growing daily" },
    { icon: Zap, text: "5 Min Setup", subtext: "Quick & easy" },
    { icon: Shield, text: "100% Free", subtext: "No hidden costs" },
    { icon: Download, text: "Instant PDF", subtext: "High quality" },
    { icon: Clock, text: "24/7 Access", subtext: "Anytime, anywhere" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-700"></div>
      </div>

      <div className="relative container-custom text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center justify-center mb-6 animate-on-scroll">
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            Join 50,000+ Professionals
          </Badge>
        </div>

        {/* Main heading */}
        <div className="animate-on-scroll stagger-1">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Land Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who've successfully landed interviews 
            and job offers using our AI-powered CV builder. Start creating your 
            perfect CV today - completely free!
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center group animate-on-scroll stagger-${index + 2}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl mb-3 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                {feature.text}
              </div>
              <div className="text-xs text-blue-200">
                {feature.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-on-scroll stagger-6">
          <Link
            href="/builder"
            className={cn(
              "group inline-flex items-center justify-center px-8 py-4 text-lg font-bold",
              "bg-white text-blue-900 hover:bg-blue-50 rounded-xl shadow-xl hover:shadow-2xl",
              "transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus-ring"
            )}
          >
            Create Your CV Now - Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          
          <Link
            href="/templates"
            className={cn(
              "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold",
              "border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10",
              "rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 focus-ring"
            )}
          >
            Browse Templates
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="border-t border-white/20 pt-8 animate-on-scroll stagger-7">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
            <div className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">No registration required</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
              <span className="text-sm">No credit card needed</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
              <span className="text-sm">Instant PDF download</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-1 text-blue-100">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current hover:scale-110 transition-transform duration-200" />
            ))}
            <span className="ml-2 font-medium">4.9/5 rating from 1,200+ users</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
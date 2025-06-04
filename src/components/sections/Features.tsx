// src/components/sections/Features.tsx - Pure CSS version
'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FEATURES_DATA } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const Features = () => {
  const mainFeatures = FEATURES_DATA.slice(0, 3)
  const additionalFeatures = FEATURES_DATA.slice(3)

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
    <section className="section-padding bg-gradient-primary">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <Badge variant="primary" className="mb-4 hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 mr-1" />
            Powerful Features
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Stand Out</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Our professional CV builder combines cutting-edge AI technology with 
            expert design to help you create the perfect resume that gets you hired.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`animate-on-scroll stagger-${index + 1}`}
            >
              <Card className="group relative h-full bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-2 transition-all duration-300">
                {/* Feature icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  
                  {/* Checkmark badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Feature content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits list */}
                <div className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Hover effect */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={feature.id}
              className={`text-center p-6 bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-on-scroll stagger-${index + 4}`}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-on-scroll stagger-6">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/builder"
              className="btn-primary px-8 py-4 text-lg font-semibold hover:scale-105 focus-ring"
            >
              Try All Features Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            
            <a
              href="/features"
              className="btn-secondary px-8 py-4 text-lg font-semibold hover:scale-105 focus-ring"
            >
              Learn More
            </a>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            ✨ No registration required • Get started in 30 seconds
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features
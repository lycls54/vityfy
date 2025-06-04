// src/components/sections/Stats.tsx - Pure CSS version
'use client'

import { useEffect } from 'react'
import { Users, Star, Download, Globe, Award, Clock } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'CVs Created',
      description: 'Professionals trust our builder'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'User Rating',
      description: 'Based on 1,200+ reviews'
    },
    {
      icon: Download,
      value: '25,000+',
      label: 'PDF Downloads',
      description: 'High-quality exports daily'
    },
    {
      icon: Globe,
      value: '120+',
      label: 'Countries',
      description: 'Worldwide user base'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      description: 'Users land interviews'
    },
    {
      icon: Clock,
      value: '5 min',
      label: 'Avg. Creation',
      description: 'From start to finished CV'
    }
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
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Professionals{' '}
            <span className="text-gradient">Worldwide</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of job seekers who've successfully landed their dream jobs 
            using our professional CV builder.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center group animate-on-scroll stagger-${index + 1}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                {stat.value}
              </div>
              
              <div className="text-sm font-medium text-gray-700 mb-1">
                {stat.label}
              </div>
              
              <div className="text-xs text-gray-500 leading-tight">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-on-scroll stagger-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>100% Free</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-100"></div>
            <span>No Registration Required</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-200"></div>
            <span>ATS-Friendly Templates</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-300"></div>
            <span>Instant PDF Download</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
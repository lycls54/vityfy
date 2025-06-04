// src/components/sections/HowItWorks.tsx - Pure CSS version
'use client'

import { useEffect } from 'react'
import { FileText, Settings, Download, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Choose Template",
      description: "Select from our collection of professional, ATS-friendly templates designed by career experts.",
      color: "blue"
    },
    {
      icon: Settings,
      title: "Add Your Info",
      description: "Fill in your details with our intuitive form builder. Get AI suggestions for better content.",
      color: "purple"
    },
    {
      icon: Sparkles,
      title: "Customize Design",
      description: "Personalize colors, fonts, and layout to match your style and industry requirements.",
      color: "green"
    },
    {
      icon: Download,
      title: "Download & Apply",
      description: "Export your professional CV as a high-quality PDF and start applying to your dream jobs.",
      color: "orange"
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Your CV in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Our streamlined process makes it easy to create a professional CV 
            that gets you noticed by employers and passes ATS systems.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative text-center animate-on-scroll stagger-${index + 1}`}
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6 group">
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-110",
                    step.color === "blue" && "bg-gradient-to-br from-blue-400 to-blue-600",
                    step.color === "purple" && "bg-gradient-to-br from-purple-400 to-purple-600",
                    step.color === "green" && "bg-gradient-to-br from-green-400 to-green-600",
                    step.color === "orange" && "bg-gradient-to-br from-orange-400 to-orange-600"
                  )}></div>
                  <step.icon className="relative w-8 h-8 text-white" />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                  </div>
                </div>

                {/* Step content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 text-center animate-on-scroll stagger-5">
          <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-2xl px-8 py-6 hover:bg-gray-100 transition-colors duration-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5 min</div>
              <div className="text-sm text-gray-600">Average time</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success rate</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Free to use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
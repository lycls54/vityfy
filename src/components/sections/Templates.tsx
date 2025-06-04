// src/components/sections/Templates.tsx - Pure CSS version
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Download, Eye, Palette } from 'lucide-react'
import { cn, getOptimizedImageProps } from '@/lib/utils'
import { CV_TEMPLATES } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  
  const templates = Object.values(CV_TEMPLATES)
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'minimal', name: 'Minimal' }
  ]

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory)

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
    <section className="section-padding bg-gradient-secondary">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-on-scroll">
          <Badge variant="secondary" className="mb-4 hover:scale-105 transition-transform duration-200">
            <Palette className="w-4 h-4 mr-1" />
            Premium Templates
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Professional{' '}
            <span className="text-gradient">CV Templates</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Choose from our expertly designed, ATS-friendly templates created by 
            professional designers and loved by recruiters worldwide.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll stagger-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105",
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates grid with fade transition */}
        <div className={cn(
          "grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-500",
          "opacity-100" // Always visible, individual items animate
        )}>
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className={`group cursor-pointer animate-on-scroll stagger-${(index % 4) + 2}`}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <Card className="overflow-hidden bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                {/* Template preview */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    {...getOptimizedImageProps(
                      template.preview,
                      `${template.name} CV Template`,
                      300,
                      400
                    )}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={
                        template.category === 'professional' ? 'primary' :
                        template.category === 'creative' ? 'warning' :
                        template.category === 'traditional' ? 'secondary' : 'success'
                      }
                      size="sm"
                      className="capitalize"
                    >
                      {template.category}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>

                  {/* Hover actions */}
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center space-x-3 transition-all duration-300",
                    hoveredTemplate === template.id 
                      ? "opacity-100 visible" 
                      : "opacity-0 invisible"
                  )}>
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      icon={<Eye className="w-4 h-4" />}
                    >
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>

                {/* Template info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {template.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Download className="w-4 h-4 mr-1" />
                      <span>2.5k</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 2).map((feature, featureIndex) => (
                      <Badge
                        key={featureIndex}
                        variant="outline"
                        size="sm"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Color palette */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex space-x-1">
                        {template.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-4 h-4 rounded-full border border-gray-200 hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Link
                      href={`/builder?template=${template.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm group/link transition-colors duration-200"
                    >
                      Use Template
                      <ArrowRight className="inline ml-1 w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats and CTA */}
        <div className="text-center animate-on-scroll stagger-4">
          {/* Template stats */}
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 mb-8 hover:bg-white transition-colors duration-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{templates.length}+</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">ATS</div>
              <div className="text-sm text-gray-600">Friendly</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Customizable</div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/templates"
              className="btn-outline px-8 py-4 text-lg font-semibold inline-flex items-center hover:scale-105 focus-ring"
            >
              View All Templates
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <p className="text-sm text-gray-500">
              🎨 New templates added monthly • All templates are free to use
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Templates
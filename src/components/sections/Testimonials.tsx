// src/components/sections/Testimonials.tsx - Pure CSS version
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { getOptimizedImageProps } from '@/lib/utils'
import { TESTIMONIALS_DATA } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
  }

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex]

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
    <section className="section-padding bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <Badge variant="success" className="mb-4 hover:scale-105 transition-transform duration-200">
            <Star className="w-4 h-4 mr-1" />
            Success Stories
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by{' '}
            <span className="text-gradient">Professionals</span>{' '}
            Worldwide
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Join thousands of job seekers who've successfully landed their dream jobs 
            using our professional CV builder.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-4xl mx-auto mb-16 animate-on-scroll stagger-1">
          <Card className="h-96 bg-white/90 backdrop-blur-sm border-white/20 relative overflow-hidden hover:shadow-xl transition-all duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            
            {/* Quote icon */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="flex flex-col md:flex-row items-center h-full p-8 md:p-12">
              {/* Content */}
              <div className="flex-1 text-center md:text-left md:pr-8">
                {/* Rating */}
                <div className="flex justify-center md:justify-start items-center space-x-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                  <Image
                    {...getOptimizedImageProps(
                      currentTestimonial.image,
                      currentTestimonial.name,
                      64,
                      64
                    )}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h4>
                    <p className="text-gray-600">{currentTestimonial.role}</p>
                    <p className="text-blue-600 font-medium">{currentTestimonial.company}</p>
                    
                    {/* Social links */}
                    <div className="flex justify-center md:justify-start space-x-2 mt-2">
                      <button className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Twitter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Large avatar on desktop */}
              <div className="hidden md:block">
                <div className="relative">
                  <Image
                    {...getOptimizedImageProps(
                      currentTestimonial.image,
                      currentTestimonial.name,
                      200,
                      200
                    )}
                    className="w-48 h-48 rounded-2xl object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-2 rounded-xl shadow-lg animate-bounce-gentle">
                    <div className="text-sm font-bold">Hired!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTestimonial}
                className="bg-white/80 backdrop-blur-sm hover:bg-white"
                icon={<ChevronLeft className="w-4 h-4" />}
              />
              
              {/* Dots indicator */}
              <div className="flex space-x-2">
                {TESTIMONIALS_DATA.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTestimonial}
                className="bg-white/80 backdrop-blur-sm hover:bg-white"
                icon={<ChevronRight className="w-4 h-4" />}
              />
            </div>
          </Card>
        </div>

        {/* All testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`cursor-pointer transition-all duration-300 animate-on-scroll stagger-${index + 2} ${
                index === currentIndex 
                  ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                  : 'hover:shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  {...getOptimizedImageProps(
                    testimonial.image,
                    testimonial.name,
                    40,
                    40
                  )}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-semibold text-sm text-gray-900">{testimonial.name}</h5>
                  <p className="text-xs text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed truncate-3">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center animate-on-scroll stagger-5">
          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 mb-6 hover:bg-white transition-colors duration-200">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-900">4.9/5</span>
              <span className="text-sm text-gray-600">rating</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">1,200+</span> reviews
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">95%</span> hired rate
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">Ready to join our success stories?</p>
          
          <Button 
            size="lg"
            className="px-8 py-4 hover:scale-105 focus-ring"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Start Your Success Story
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
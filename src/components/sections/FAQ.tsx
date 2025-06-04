// src/components/sections/FAQ.tsx - Pure CSS version (Final Fix)
'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle, Search, MessageCircle, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQ_DATA } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const filteredFAQs = FAQ_DATA.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <Badge variant="primary" className="mb-4 hover:scale-105 transition-transform duration-200">
            <HelpCircle className="w-4 h-4 mr-1" />
            Help Center
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Everything you need to know about creating your perfect CV
          </p>

          {/* Search FAQ */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              />
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 animate-on-scroll">
              <p className="text-gray-500">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className={`border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 animate-on-scroll stagger-${index + 1}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={cn(
                    "w-full px-6 py-6 text-left flex items-center justify-between",
                    "hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50",
                    openItem === index && "bg-gray-50 border-b border-gray-200"
                  )}
                >
                  <span className="font-semibold text-gray-900 pr-4 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300",
                      openItem === index && "rotate-180"
                    )}
                  />
                </button>
                
                {/* Pure CSS accordion */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openItem === index 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed text-base">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact support */}
        <div className="grid md:grid-cols-2 gap-6 animate-on-scroll stagger-6">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Live Chat Support
            </h3>
            <p className="text-gray-600 mb-4">
              Get instant help from our CV experts. Available 24/7 to assist you.
            </p>
            <Button variant="primary" size="sm" className="hover:scale-105 transition-transform duration-200">
              Start Chat
            </Button>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Email Support
            </h3>
            <p className="text-gray-600 mb-4">
              Send us your questions and we'll respond within 24 hours.
            </p>
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
              Send Email
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default FAQ
// src/app/(main)/contact/page.tsx - Contact page
'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { generateSEO } from '@/lib/seo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input, Textarea } from '@/components/ui/Input'
import { 
  Send, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Star,
  Heart,
  Zap,
  Shield,
  HelpCircle,
  Bug,
  Lightbulb,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

// Note: In a real app, you'd use generateSEO in a server component
// For this demo, we'll handle it differently
const metadata = {
  title: 'Contact CVCraft - Get Help & Share Feedback',
  description: 'Get in touch with CVCraft team. We\'re here to help with any questions, feedback, or support needs. Fast response guaranteed.',
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'hello@cvcraft.pro',
      responseTime: 'Within 24 hours',
      color: 'blue'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      responseTime: 'Instant response',
      color: 'green'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      responseTime: 'Mon-Fri 9AM-6PM PST',
      color: 'purple'
    }
  ]

  const officeInfo = [
    {
      icon: MapPin,
      title: 'San Francisco Office',
      details: ['123 Market Street', 'San Francisco, CA 94105', 'United States']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM PST', 'Saturday: 10:00 AM - 4:00 PM PST', 'Sunday: Closed']
    }
  ]

  const categories = [
    { value: 'general', label: 'General Question', icon: HelpCircle },
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'feedback', label: 'Feedback', icon: Star },
    { value: 'partnership', label: 'Partnership', icon: Users }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Us
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              We're Here to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Help You
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Have questions about CVCraft? Need help with your CV? Want to share feedback? 
              Our team is ready to assist you every step of the way.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    method.color === 'blue' ? 'bg-blue-100' :
                    method.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <method.icon className={`w-8 h-8 ${
                      method.color === 'blue' ? 'text-blue-600' :
                      method.color === 'green' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                  <p className="text-gray-900 font-medium">{method.contact}</p>
                  <p className="text-green-600 text-sm mt-1">{method.responseTime}</p>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <MessageCircle className="mr-2 w-5 h-5" />
                Start Live Chat
              </Button>
              <a href="mailto:hello@cvcraft.pro">
                <Button size="lg" variant="outline" className="px-8">
                  <Mail className="mr-2 w-5 h-5" />
                  Send Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        What can we help you with?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            onClick={() => handleInputChange('category', category.value)}
                            className={`flex items-center space-x-2 p-3 border rounded-lg text-sm transition-all ${
                              formData.category === category.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <category.icon className="w-4 h-4" />
                            <span>{category.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <Input
                      label="Subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="How can we help you?"
                      required
                    />

                    {/* Message */}
                    <Textarea
                      label="Message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your question or feedback..."
                      className="h-32"
                      required
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              {/* Office Info */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {officeInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Help</h3>
                
                <div className="space-y-4">
                  <Link href="/features" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Help Center</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link href="/builder" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Try CV Builder</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link href="/templates" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Browse Templates</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </Card>

              {/* FAQ Preview */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked</h3>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Is CVCraft really free?</h4>
                    <p className="text-gray-600 text-sm">Yes! All features are completely free with no hidden costs.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">How do I download my CV?</h4>
                    <p className="text-gray-600 text-sm">Simply click the download button in the builder to export as PDF.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Are templates ATS-friendly?</h4>
                    <p className="text-gray-600 text-sm">Yes! All our templates are designed to pass ATS systems.</p>
                  </div>
                </div>
                
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4">
                  View All FAQs
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Ways to Get Help
            </h2>
            <p className="text-xl text-gray-600">
              Choose the support option that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">Get instant help from our support team. Available 24/7 for all your questions.</p>
              <Button className="w-full">
                Start Chat Now
              </Button>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Help Center</h3>
              <p className="text-gray-600 mb-6">Browse our comprehensive guides, tutorials, and frequently asked questions.</p>
              <Button variant="outline" className="w-full">
                Browse Help Center
              </Button>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 mb-6">Join our community of professionals sharing tips and success stories.</p>
              <Button variant="outline" className="w-full">
                Join Community
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Perfect CV?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't wait! Start building your professional CV today and take the next step in your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="px-8">
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Browse Templates
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Made with love by CVCraft team</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
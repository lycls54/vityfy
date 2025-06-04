// src/app/(main)/pricing/page.tsx - Pricing page (Free forever)
import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Check, 
  X, 
  Star, 
  Heart,
  Crown,
  Zap,
  Shield,
  Download,
  Users,
  Sparkles,
  ArrowRight,
  Gift,
  Infinity,
  Award,
  Globe,
  Clock,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generateSEO({
  title: 'CVCraft Pricing - 100% Free CV Builder Forever',
  description: 'CVCraft is completely free forever! No hidden costs, no premium plans, no limitations. Create unlimited professional CVs with all features included.',
  keywords: [
    'free cv builder', 'cvcraft pricing', 'free resume maker', 'no cost cv builder',
    'unlimited cv creation', 'free cv templates', 'no subscription cv builder'
  ],
  url: '/pricing'
})

export default function PricingPage() {
  const features = [
    'Unlimited CV Creation',
    'All Professional Templates',
    'AI-Powered Content Suggestions',
    'Real-time Preview',
    'High-Quality PDF Export',
    'ATS-Friendly Formats',
    'Mobile Responsive Builder',
    'No Watermarks',
    'All Color Customizations',
    'Multiple Export Formats',
    'Local Data Storage',
    '24/7 Customer Support'
  ]

  const competitors = [
    {
      name: 'Competitor A',
      price: '$29/month',
      limitations: ['Limited templates', 'Watermarks on free', 'Export limits'],
      color: 'gray'
    },
    {
      name: 'Competitor B',
      price: '$19/month',
      limitations: ['No AI features', 'Premium templates locked', 'Limited support'],
      color: 'gray'
    },
    {
      name: 'Competitor C',
      price: '$15/month',
      limitations: ['Basic features only', 'No customization', 'Ads on free plan'],
      color: 'gray'
    }
  ]

  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Users' },
    { icon: Download, value: '25,000+', label: 'CVs Created' },
    { icon: Globe, value: '120+', label: 'Countries' },
    { icon: Star, value: '4.9/5', label: 'User Rating' }
  ]

  const faqs = [
    {
      question: 'Is CVCraft really 100% free?',
      answer: 'Yes! CVCraft is completely free with no hidden costs, premium plans, or subscription fees. All features are included at no charge.'
    },
    {
      question: 'Will you introduce paid plans in the future?',
      answer: 'No. We\'re committed to keeping CVCraft free forever. Our mission is to democratize professional CV creation for everyone.'
    },
    {
      question: 'How do you sustain the service if it\'s free?',
      answer: 'We believe in giving back to the community. The service is supported by our team\'s passion for helping people succeed in their careers.'
    },
    {
      question: 'Are there any usage limits?',
      answer: 'No limits at all! Create as many CVs as you want, download unlimited PDFs, and access all features without restrictions.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="success" className="mb-6">
              <Gift className="w-4 h-4 mr-2" />
              100% Free Forever
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional CV Builder{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Completely Free
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              No subscriptions. No hidden costs. No premium plans. 
              All features included, forever free. That's our promise to you.
            </p>

            {/* Price Display */}
            <div className="mb-12">
              <div className="inline-flex items-center space-x-4 bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">$0</div>
                  <div className="text-gray-600">Forever</div>
                </div>
                <div className="w-px h-16 bg-gray-300"></div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-green-600 mb-1">100% Free</div>
                  <div className="text-gray-600">All Features Included</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm mb-3">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link href="/builder">
              <Button size="lg" className="px-8">
                Start Building Your CV - Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need, No Cost
            </h2>
            <p className="text-xl text-gray-600">
              All premium features included in our free plan
            </p>
          </div>

          <Card className="overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Crown className="w-8 h-8" />
                <h3 className="text-2xl font-bold">CVCraft Free Plan</h3>
              </div>
              <div className="text-4xl font-bold mb-2">$0</div>
              <div className="text-green-100">Forever • No Strings Attached</div>
            </div>

            {/* Features List */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link href="/builder">
                  <Button size="lg" className="px-8">
                    Get Started Now - Free
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Compare to Paid Alternatives
            </h2>
            <p className="text-xl text-gray-600">
              See why free doesn't mean compromising on quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CVCraft Card */}
            <Card className="relative overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 text-center">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white text-green-600">
                    <Crown className="w-3 h-3 mr-1" />
                    Best Value
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">CVCraft</h3>
                <div className="text-3xl font-bold mb-1">$0</div>
                <div className="text-green-100">Forever Free</div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">All Features Included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">AI-Powered Suggestions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">No Watermarks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Unlimited Downloads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Premium Support</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Competitor Cards */}
            {competitors.map((competitor, index) => (
              <Card key={index} className="opacity-75">
                <div className="bg-gray-600 text-white p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{competitor.name}</h3>
                  <div className="text-3xl font-bold mb-1">{competitor.price}</div>
                  <div className="text-gray-300">Monthly</div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {competitor.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Is CVCraft Free?
            </h2>
            <p className="text-xl text-gray-600">
              Our mission goes beyond profit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                We believe professional CV creation should be accessible to everyone, 
                regardless of their financial situation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community First</h3>
              <p className="text-gray-600">
                We're building a community of professionals helping each other succeed. 
                Your success is our success.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Giving Back</h3>
              <p className="text-gray-600">
                Our team believes in using technology to make a positive impact 
                on people's careers and lives.
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="p-8 text-center">
              <Infinity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Free Forever Guarantee
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We promise to keep CVCraft free forever. No "freemium" model, 
                no premium upgrades, no hidden costs. Just great tools to help you succeed.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>No Time Limits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span>All Features Included</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our free pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Thousands of professionals love our free CV builder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I couldn't believe this was actually free! Got my dream job within 2 weeks 
                of using CVCraft. The AI suggestions were incredibly helpful."
              </p>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Sarah M.</div>
                <div className="text-gray-500">Software Engineer</div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Finally, a CV builder that doesn't try to squeeze money out of you. 
                Professional results without the premium price tag."
              </p>
              <div className="text-sm">
                <div className="font-medium text-gray-900">David L.</div>
                <div className="text-gray-500">Marketing Manager</div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The templates are beautiful and the whole process was so smooth. 
                I've recommended CVCraft to all my friends."
              </p>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Emily R.</div>
                <div className="text-gray-500">UX Designer</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Gift className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Creating Your Perfect CV Today
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of professionals who've already created amazing CVs with CVCraft. 
              Remember: it's free forever, no catches!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="px-8">
                <Sparkles className="mr-2 w-5 h-5" />
                Create Your CV Now - Free
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Browse Free Templates
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5 text-green-300" />
              <span className="text-green-100">No Registration Required</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5 text-green-300" />
              <span className="text-green-100">Instant PDF Download</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5 text-green-300" />
              <span className="text-green-100">Free Forever Guarantee</span>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl font-bold">$0</div>
              <div className="text-left">
                <div className="text-lg font-semibold">Always Free</div>
                <div className="text-green-200 text-sm">No Hidden Costs Ever</div>
              </div>
            </div>
            <p className="text-green-100 text-sm">
              That's our promise to you - and we're sticking to it!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
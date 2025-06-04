// src/app/(main)/features/page.tsx - Features showcase page
import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { FEATURES_DATA } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  ArrowRight, 
  Check, 
  Star, 
  Sparkles,
  Zap,
  Shield,
  Users,
  Download,
  Globe,
  Clock,
  Award,
  Smartphone,
  FileText,
  Eye,
  Settings,
  Palette,
  Brain,
  Target
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = generateSEO({
  title: 'CV Builder Features - AI-Powered Resume Creation Tools',
  description: 'Discover powerful features of our CV builder: AI content suggestions, ATS-friendly templates, real-time preview, PDF export, and more. Create professional CVs effortlessly.',
  keywords: [
    'cv builder features', 'ai resume builder', 'ats friendly cv', 'resume maker tools',
    'cv generator features', 'professional cv builder', 'resume creation tools'
  ],
  url: '/features'
})

export default function FeaturesPage() {
  const coreFeatures = FEATURES_DATA.slice(0, 3)
  const additionalFeatures = FEATURES_DATA.slice(3)

  const featureComparison = [
    { feature: 'AI Content Suggestions', free: true, competitor1: false, competitor2: true },
    { feature: 'ATS-Friendly Templates', free: true, competitor1: true, competitor2: false },
    { feature: 'Real-time Preview', free: true, competitor1: false, competitor2: false },
    { feature: 'PDF Export', free: true, competitor1: true, competitor2: true },
    { feature: 'Mobile Responsive', free: true, competitor1: false, competitor2: true },
    { feature: 'No Watermarks', free: true, competitor1: false, competitor2: false },
    { feature: 'Unlimited Downloads', free: true, competitor1: false, competitor2: false },
    { feature: 'Multiple Templates', free: true, competitor1: true, competitor2: true }
  ]

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Users' },
    { icon: Star, value: '4.9/5', label: 'User Rating' },
    { icon: Download, value: '25,000+', label: 'CVs Created' },
    { icon: Award, value: '95%', label: 'Success Rate' }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Save Time',
      description: 'Create professional CVs in 5 minutes instead of hours',
      color: 'yellow'
    },
    {
      icon: Target,
      title: 'Get More Interviews',
      description: 'Our users get 3x more interview callbacks',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'ATS-Proof',
      description: '100% pass rate through applicant tracking systems',
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Smart suggestions based on your industry and role',
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Build Perfect CVs
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Our comprehensive CV builder combines cutting-edge AI technology with 
              expert design to help you create resumes that get you hired.
            </p>

            {/* Quick Stats */}
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
                Try All Features Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our CV Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by career experts and powered by AI to give you the best chance of landing your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  benefit.color === 'yellow' ? 'bg-yellow-100' :
                  benefit.color === 'green' ? 'bg-green-100' :
                  benefit.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <benefit.icon className={`w-8 h-8 ${
                    benefit.color === 'yellow' ? 'text-yellow-600' :
                    benefit.color === 'green' ? 'text-green-600' :
                    benefit.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create a professional CV that stands out
            </p>
          </div>

          <div className="space-y-20">
            {coreFeatures.map((feature, index) => (
              <div key={feature.id} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Badge variant="primary" className="mb-4">
                    {feature.category}
                  </Badge>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/builder">
                    <Button>
                      Try This Feature
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Visual */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 mx-auto">
                        {feature.category === 'ai' ? <Brain className="w-10 h-10 text-blue-600" /> :
                         feature.category === 'builder' ? <Settings className="w-10 h-10 text-green-600" /> :
                         feature.category === 'templates' ? <Palette className="w-10 h-10 text-purple-600" /> :
                         feature.category === 'export' ? <Download className="w-10 h-10 text-orange-600" /> :
                         feature.category === 'preview' ? <Eye className="w-10 h-10 text-pink-600" /> :
                         <Smartphone className="w-10 h-10 text-indigo-600" />}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 mt-2">Interactive Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Features
            </h2>
            <p className="text-xl text-gray-600">
              More tools to perfect your CV
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature) => (
              <Card key={feature.id} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {feature.category === 'export' ? <Download className="w-6 h-6 text-blue-600" /> :
                   feature.category === 'preview' ? <Eye className="w-6 h-6 text-green-600" /> :
                   <Smartphone className="w-6 h-6 text-purple-600" />}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {feature.benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Compare
            </h2>
            <p className="text-xl text-gray-600">
              See why we're the best choice for your CV creation needs
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">CVCraft (Free)</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Competitor A</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Competitor B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {featureComparison.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.competitor1 ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.competitor2 ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our features
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are all features really free?
              </h3>
              <p className="text-gray-600">
                Yes! All our core features including AI suggestions, professional templates, 
                and PDF export are completely free with no hidden costs or limitations.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the AI content suggestion work?
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your job title, industry, and experience level to provide 
                personalized content suggestions, helping you write compelling descriptions 
                that attract recruiters.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are the templates really ATS-friendly?
              </h3>
              <p className="text-gray-600">
                Absolutely! All our templates are designed to pass through Applicant Tracking 
                Systems (ATS) with a 100% success rate. We regularly test them against major 
                ATS platforms.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I edit my CV after downloading?
              </h3>
              <p className="text-gray-600">
                Yes! Your CV data is automatically saved in your browser, so you can return 
                anytime to make edits and download updated versions. You can also export your 
                data to use elsewhere.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience All Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've created perfect CVs with our powerful tools.
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
                <Eye className="mr-2 w-5 h-5" />
                View Templates
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Instant Download</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
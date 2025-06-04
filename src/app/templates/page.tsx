// src/app/(main)/templates/page.tsx - Templates showcase page
import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { CV_TEMPLATES } from '@/lib/constants'
import { TemplatePreview } from '@/components/cv/CVRenderer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  ArrowRight, 
  Download, 
  Eye, 
  Star, 
  Filter, 
  Search,
  Palette,
  CheckCircle,
  Users,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generateSEO({
  title: 'Professional CV Templates - Free ATS-Friendly Resume Templates',
  description: 'Choose from 20+ professional CV templates designed by experts. All templates are ATS-friendly, customizable, and perfect for any industry. Download for free.',
  keywords: [
    'cv templates', 'resume templates', 'professional cv', 'ats friendly templates',
    'free cv templates', 'modern resume design', 'cv template download',
    'curriculum vitae templates', 'job application templates'
  ],
  url: '/templates'
})

export default function TemplatesPage() {
  const templates = Object.values(CV_TEMPLATES)
  
  const templateCategories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'professional', name: 'Professional', count: templates.filter(t => t.category === 'professional').length },
    { id: 'creative', name: 'Creative', count: templates.filter(t => t.category === 'creative').length },
    { id: 'traditional', name: 'Traditional', count: templates.filter(t => t.category === 'traditional').length },
    { id: 'minimal', name: 'Minimal', count: templates.filter(t => t.category === 'minimal').length }
  ]

  const templateStats = [
    { icon: Users, label: '50,000+ Downloads', value: '50K+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' },
    { icon: CheckCircle, label: 'ATS Compatible', value: '100%' },
    { icon: Briefcase, label: 'Success Rate', value: '95%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6">
              <Palette className="w-4 h-4 mr-2" />
              Professional Templates
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Perfect{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CV Template
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional, ATS-friendly CV templates designed by experts. 
              Customizable, modern, and proven to get you more interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="px-8">
                Browse All Templates
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Link href="/builder">
                <Button variant="outline" size="lg" className="px-8">
                  <Eye className="mr-2 w-5 h-5" />
                  Try Builder Now
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {templateStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm mb-3">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center space-x-2"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" size="sm">{category.count}</Badge>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Most Downloaded</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Template Preview */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge 
                      variant={
                        template.category === 'professional' ? 'primary' :
                        template.category === 'creative' ? 'warning' :
                        template.category === 'traditional' ? 'secondary' : 'success'
                      }
                      className="capitalize"
                    >
                      {template.category}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>

                  {/* Preview Image Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-700">{template.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Preview</p>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Link href={`/builder?template=${template.id}`}>
                      <Button size="sm">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{template.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="w-4 h-4 mr-1" />
                        <span>2.5k</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" size="sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Color Palette & Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex space-x-1">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Link href={`/builder?template=${template.id}`}>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        Use Template
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Professional CV?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose from our professionally designed templates and create your perfect CV in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="px-8">
                Start Building Your CV
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
              <Download className="mr-2 w-5 h-5" />
              Download Samples
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
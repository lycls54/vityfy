// src/app/(main)/about/page.tsx - About page
import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Target,
  Award,
  Globe,
  Star,
  Sparkles,
  Building,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  Coffee,
  Code,
  Palette,
  Brain,
  MessageCircle,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generateSEO({
  title: 'About CVCraft - Professional CV Builder by Career Experts',
  description: 'Learn about CVCraft mission to help professionals land their dream jobs. Meet our team of career experts and developers who built the best free CV builder.',
  keywords: [
    'about cvcraft', 'cv builder team', 'career experts', 'resume builder company',
    'professional cv help', 'job search tools', 'career development'
  ],
  url: '/about'
})

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Users' },
    { icon: Globe, value: '120+', label: 'Countries' },
    { icon: Star, value: '4.9/5', label: 'User Rating' },
    { icon: Award, value: '95%', label: 'Success Rate' }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'Started with a simple idea: make CV creation accessible to everyone'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered content suggestions to help users write better CVs'
    },
    {
      year: '2024',
      title: '10K Users',
      description: 'Reached our first major milestone with 10,000 active users'
    },
    {
      year: '2025',
      title: '50K+ Users',
      description: 'Growing community of professionals using CVCraft worldwide'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      bio: 'Former HR Director with 10+ years experience helping people land their dream jobs.',
      icon: Building,
      color: 'blue'
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-founder',
      bio: 'Full-stack developer passionate about creating tools that make a difference.',
      icon: Code,
      color: 'green'
    },
    {
      name: 'Maria Garcia',
      role: 'Lead Designer',
      bio: 'UI/UX expert focused on creating beautiful, user-friendly experiences.',
      icon: Palette,
      color: 'purple'
    },
    {
      name: 'Dr. Alex Kim',
      role: 'AI Research Lead',
      bio: 'AI researcher developing intelligent features to enhance CV creation.',
      icon: Brain,
      color: 'orange'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'User-First',
      description: 'Every decision we make is based on what\'s best for our users'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data stays private and secure - we never share personal information'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We\'re constantly improving and adding new features based on user feedback'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Professional CV creation should be free and accessible to everyone'
    }
  ]

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
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Helping Professionals{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Land Dream Jobs
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We believe everyone deserves access to professional CV creation tools. 
              That's why we built CVCraft - a completely free, AI-powered CV builder 
              that helps you create resumes that get results.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link href="/builder">
              <Button size="lg" className="px-8">
                Start Your CV Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-6">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Democratizing Professional CV Creation
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We started CVCraft because we saw too many talented people struggling with CV creation. 
                Expensive tools, complicated interfaces, and poor results were keeping people from 
                showcasing their true potential.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is simple: provide world-class CV creation tools that are completely free, 
                easy to use, and proven to get results. Every feature we build is designed to help 
                you land your dream job.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">100% Free Forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">No Hidden Costs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Always Improving</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 mx-auto">
                    <Target className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Goal</h3>
                  <p className="text-gray-600 max-w-sm">
                    Help 1 million professionals land their dream jobs by 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at CVCraft
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Career experts, developers, and designers passionate about helping you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${
                  member.color === 'blue' ? 'bg-blue-100' :
                  member.color === 'green' ? 'bg-green-100' :
                  member.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <member.icon className={`w-10 h-10 ${
                    member.color === 'blue' ? 'text-blue-600' :
                    member.color === 'green' ? 'text-green-600' :
                    member.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
                
                <div className="flex justify-center space-x-3 mt-6">
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Twitter className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From idea to helping thousands of professionals worldwide
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Have questions, feedback, or want to join our mission? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8">
                <MessageCircle className="mr-2 w-5 h-5" />
                Get In Touch
              </Button>
            </Link>
            <Link href="/builder">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Try CVCraft Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Coffee className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100">Built with ❤️ in San Francisco</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
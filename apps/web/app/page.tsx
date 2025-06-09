import { ArrowRight, CheckCircle, Zap, Users, Globe, Palette, Star, Shield, Rocket, Download, Eye, Sparkles, Award, Clock, BarChart } from 'lucide-react'
import Link from 'next/link'

import { Button, Card, CardContent, Container, Badge } from '@cvcraft/ui'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CVCraft</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors">
                Templates
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <Container className="relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Introducing CVCraft 2.0 with AI
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Build Your Dream Career with{' '}
              <span className="gradient-text">
                Perfect CVs
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Create stunning, ATS-optimized resumes in minutes. Get AI-powered suggestions, 
              choose from professional templates, and land interviews 3x faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg">
                  Start Building for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                  <Eye className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Export as PDF instantly
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white border-y border-gray-200">
        <Container>
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Trusted by professionals from top companies</p>
            <div className="flex items-center justify-center space-x-12 opacity-50 grayscale">
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">CVs Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600 flex items-center justify-center">
                User Rating
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools and features helps you create professional CVs 
              that get noticed by recruiters and hiring managers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "Professional Templates",
                description: "Choose from 50+ stunning, ATS-friendly templates designed by industry experts",
                color: "bg-blue-500"
              },
              {
                icon: Zap,
                title: "AI-Powered Content",
                description: "Get intelligent suggestions for content, keywords, and formatting based on your industry",
                color: "bg-yellow-500"
              },
              {
                icon: Shield,
                title: "ATS Optimization",
                description: "Ensure your CV passes Applicant Tracking Systems with our optimization engine",
                color: "bg-green-500"
              },
              {
                icon: Globe,
                title: "Multi-Language Support",
                description: "Create CVs in 15+ languages with proper formatting and cultural adaptations",
                color: "bg-purple-500"
              },
              {
                icon: Download,
                title: "Multiple Export Formats",
                description: "Download your CV as PDF, Word, or share with a custom link",
                color: "bg-red-500"
              },
              {
                icon: BarChart,
                title: "Performance Analytics",
                description: "Track views, downloads, and get insights on your CV's performance",
                color: "bg-indigo-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build Your CV in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy to create a professional CV in minutes, not hours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Template",
                description: "Select from our collection of professional, industry-specific templates that match your style and career level."
              },
              {
                step: "02", 
                title: "Add Your Information",
                description: "Fill in your details with our smart forms. Get AI suggestions for content and see real-time preview updates."
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Export your CV as PDF or Word document. Share with a custom link or apply to jobs directly from our platform."
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -translate-y-0.5"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <Container className="relative">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Join over 50,000 professionals who have successfully built their careers with CVCraft. 
              Create your perfect CV today and start getting more interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/builder">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Building Now
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg border-white text-white hover:bg-white/10">
                  Browse Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No credit card required • Free plan available forever • Export instantly
            </p>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CV</span>
                </div>
                <span className="text-xl font-bold">CVCraft</span>
              </div>
              <p className="text-gray-400 mb-6">
                The most advanced CV builder for modern professionals. Create, customize, and export beautiful resumes in minutes.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-xs">𝕏</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-xs">in</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-xs">@</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CVCraft. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with ❤️ for professionals worldwide
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
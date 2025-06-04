// src/components/layout/Footer.tsx - Debug ve Düzeltme
import React from 'react'
import Link from 'next/link'
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react'

// Constants'ı tekrar tanımla import sorunlarını önlemek için
const SITE_NAME = "CVCraft"

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'CV Builder', href: '/builder' },
      { label: 'Templates', href: '/templates' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'CV Tips', href: '/blog/cv-tips' },
      { label: 'Career Advice', href: '/blog/career-advice' },
      { label: 'Industry Guides', href: '/blog/industry-guides' },
      { label: 'Help Center', href: '/help' }
    ]
  },
  {
    title: 'Connect',
    links: [
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Community', href: '/community' },
      { label: 'Support', href: '/support' },
      { label: 'Feedback', href: '/feedback' }
    ]
  }
]

const socialLinks = [
  { platform: "twitter", url: "https://twitter.com/cvcraft" },
  { platform: "linkedin", url: "https://linkedin.com/company/cvcraft" },
  { platform: "github", url: "https://github.com/cvcraft" }
]

// Default export ile React component
function Footer() {
  const currentYear = "2025" // Statik değer SSR uyumluluğu için

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{SITE_NAME}</span>
              </Link>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Create professional CVs that get you hired. Join thousands of job seekers 
                who landed their dream jobs with our AI-powered CV builder.
              </p>

              {/* Contact info */}
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-3 hover:text-white transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  <span>hello@cvcraft.pro</span>
                </div>
                <div className="flex items-center space-x-3 hover:text-white transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 hover:text-white transition-colors duration-200">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social links & newsletter */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={`Follow us on ${social.platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.platform}</span>
                  {/* Placeholder for social icons */}
                  <div className="w-5 h-5 bg-gray-400 hover:bg-white rounded transition-colors duration-200"></div>
                </Link>
              ))}
            </div>

            {/* Newsletter signup */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-all duration-200 hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Default export
export default Footer
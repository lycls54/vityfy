// src/app/(main)/page.tsx - Complete homepage with all sections
import type { Metadata } from 'next'
import { generateSEO, generateSoftwareAppStructuredData, generateFAQStructuredData } from '@/lib/seo'
import { FAQ_DATA } from '@/lib/constants'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Features from '@/components/sections/Features'
import Templates from '@/components/sections/Templates'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

// SEO optimized metadata
export const metadata: Metadata = generateSEO({
  title: 'Free Professional CV Builder - Create Perfect Resume Online',
  description: 'Build stunning professional CVs with our free AI-powered builder. Choose from 20+ ATS-friendly templates, get content suggestions, and download PDF instantly. Used by 50,000+ professionals.',
  keywords: [
    'free cv builder', 'resume maker online', 'professional cv template', 
    'ats friendly resume', 'cv generator free', 'resume builder', 
    'online cv maker', 'curriculum vitae builder', 'job application cv',
    'cv creator', 'resume template', 'cv design tool'
  ],
  url: '/'
})

export default function HomePage() {
  return (
    <>
      {/* Structured Data for Enhanced SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateSoftwareAppStructuredData()
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateFAQStructuredData(FAQ_DATA)
        }}
      />

      {/* Page Sections */}
      <Hero />
      <Stats />
      <Features />
      <Templates />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}

// src/app/builder/page.tsx - CV Builder Page
import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import CVBuilderApp from '@/components/builder/CVBuilderApp'

export const metadata: Metadata = generateSEO({
  title: 'CV Builder - Create Your Professional Resume',
  description: 'Build your professional CV with our free online builder. Choose from multiple templates, add your experience, and download as PDF instantly.',
  keywords: [
    'cv builder', 'resume builder', 'create cv online', 'professional resume',
    'cv maker', 'resume generator', 'cv template', 'free cv builder'
  ],
  url: '/builder'
})

export default function BuilderPage() {
  return <CVBuilderApp />
}
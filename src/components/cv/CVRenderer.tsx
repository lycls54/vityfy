// src/components/cv/CVRenderer.tsx - Main CV Renderer Component
'use client'

import React, { useRef, Suspense, lazy } from 'react'
import { CVData } from '@/types/cv'
import { usePDFExport } from '@/utils/pdfExport'
import { Download, Share2, Printer, Eye } from 'lucide-react'

// Lazy load templates for better performance
const ModernTemplate = lazy(() => import('./templates/ModernTemplate'))
const ClassicTemplate = lazy(() => import('./templates/ClassicTemplate'))
const CreativeTemplate = lazy(() => import('./templates/CreativeTemplate'))
const MinimalTemplate = lazy(() => import('./templates/MinimalTemplate'))

// Template Loading Skeleton
const TemplateSkeleton = () => (
  <div className="animate-pulse bg-white max-w-4xl mx-auto shadow-lg" style={{ minHeight: '297mm' }}>
    <div className="p-8 space-y-6">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
)

// Template Registry
const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate
} as const

// Template Names
const templateNames = {
  modern: 'Modern Professional',
  classic: 'Classic Business',
  creative: 'Creative Designer',
  minimal: 'Minimal Clean'
} as const

// Main CV Renderer Props
interface CVRendererProps {
  cv: CVData
  template?: string
  showControls?: boolean
  className?: string
  onTemplateChange?: (template: string) => void
}

export const CVRenderer: React.FC<CVRendererProps> = ({ 
  cv, 
  template = 'modern', 
  showControls = true,
  className = '',
  onTemplateChange
}) => {
  const cvRef = useRef<HTMLDivElement>(null)
  const { generatePDF, printCV, shareCV } = usePDFExport()
  
  const TemplateComponent = templates[template as keyof typeof templates] || ModernTemplate

  const handleDownloadPDF = async () => {
    await generatePDF(cv, {
      filename: `${cv.personal.firstName}-${cv.personal.lastName}-CV.pdf`,
      quality: 0.98,
      format: 'a4'
    })
  }

  const handlePrint = () => {
    printCV()
  }

  const handleShare = async () => {
    await shareCV(cv)
  }

  return (
    <div className={className}>
      {/* Controls */}
      {showControls && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 print:hidden">
          {/* Template Selector */}
          {onTemplateChange && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Template:</label>
              <select
                value={template}
                onChange={(e) => onTemplateChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(templateNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              title="Download as PDF"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
            
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
              title="Print CV"
            >
              <Printer className="w-5 h-5" />
              <span>Print</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              title="Share CV"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}

      {/* CV Template Container */}
      <div className="flex justify-center">
        <div 
          id="cv-template" 
          ref={cvRef} 
          className="print:shadow-none"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            backgroundColor: 'white'
          }}
        >
          <Suspense fallback={<TemplateSkeleton />}>
            <TemplateComponent cv={cv} />
          </Suspense>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          html, body {
            height: auto !important;
            overflow: visible !important;
          }
          
          body * {
            visibility: hidden;
          }
          
          #cv-template,
          #cv-template * {
            visibility: visible;
          }
          
          #cv-template {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .no-break {
            page-break-inside: avoid;
          }
        }
        
        @page {
          margin: 0;
          size: A4;
        }
      `}</style>
    </div>
  )
}

// Template Preview Component for Template Selection
interface TemplatePreviewProps {
  templateId: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  templateId, 
  isSelected, 
  onClick,
  className = ''
}) => {
  // Mock CV data for preview
  const mockCV: CVData = {
    id: 'preview',
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced professional with 5+ years in the industry.',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
      github: ''
    },
    experience: [{
      id: '1',
      company: 'Tech Company',
      position: 'Senior Developer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Leading development of innovative solutions.',
      achievements: ['Increased performance by 40%', 'Led team of 5 developers'],
      technologies: ['React', 'Node.js', 'TypeScript']
    }],
    education: [{
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2016-09',
      endDate: '2020-05',
      current: false,
      gpa: 3.8,
      description: 'Relevant coursework in software engineering and data structures.',
      achievements: ['Dean\'s List', 'Graduated Summa Cum Laude']
    }],
    skills: [
      { id: '1', name: 'JavaScript', level: 'expert', category: 'Technical' },
      { id: '2', name: 'React', level: 'advanced', category: 'Technical' },
      { id: '3', name: 'Node.js', level: 'advanced', category: 'Technical' },
      { id: '4', name: 'Leadership', level: 'intermediate', category: 'Soft Skills' }
    ],
    projects: [],
    languages: [],
    certifications: [],
    references: [],
    template: templateId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      fontSize: 14,
      lineHeight: 1.5,
      margins: 20,
      colors: { primary: '#3B82F6', secondary: '#8B5CF6', text: '#1F2937' },
      sections: {
        personal: { enabled: true, order: 1, title: 'Personal Information' },
        experience: { enabled: true, order: 2, title: 'Work Experience' },
        education: { enabled: true, order: 3, title: 'Education' },
        skills: { enabled: true, order: 4, title: 'Skills' },
        projects: { enabled: false, order: 5, title: 'Projects' },
        languages: { enabled: false, order: 6, title: 'Languages' },
        certifications: { enabled: false, order: 7, title: 'Certifications' },
        references: { enabled: false, order: 8, title: 'References' }
      }
    }
  }

  const TemplateComponent = templates[templateId as keyof typeof templates]
  
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isSelected 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
      } ${className}`}
    >
      {/* Preview */}
      <div className="h-64 overflow-hidden bg-gray-50">
        <div className="transform scale-[0.15] origin-top-left" style={{ width: '667%', height: '667%' }}>
          <Suspense fallback={<TemplateSkeleton />}>
            <TemplateComponent cv={mockCV} />
          </Suspense>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {templateNames[templateId as keyof typeof templateNames]}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Professional template for all industries
            </p>
          </div>
          
          {isSelected && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Export default
export default CVRenderer
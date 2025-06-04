// src/components/builder/CVBuilderApp.tsx - Main CV Builder Application (Pure CSS)
'use client'

import React, { useState, Suspense, lazy } from 'react'
import { useCV } from '@/hooks/useCV'
import { usePDFExport } from '@/utils/pdfExport'
import { 
  User, Briefcase, GraduationCap, Award, Settings, 
  Eye, Download, ArrowLeft, ArrowRight, CheckCircle, 
  AlertCircle, Clock
} from 'lucide-react'

// Lazy load components for better performance
const CVRenderer = lazy(() => import('@/components/cv/CVRenderer'))
const PersonalInfoForm = lazy(() => import('./forms/PersonalInfoForm'))
const ExperienceForm = lazy(() => import('./forms/ExperienceForm'))
const SkillsForm = lazy(() => import('./forms/SkillsForm'))
const EducationForm = lazy(() => import('./forms/EducationForm'))

// Loading Skeleton
const FormSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
)

// Template Selection Component
const TemplateSelector = ({ cv, setTemplate }: any) => {
  const templates = [
    { id: 'modern', name: 'Modern Professional', color: 'bg-blue-600', description: 'Clean and contemporary' },
    { id: 'classic', name: 'Classic Business', color: 'bg-gray-700', description: 'Traditional and professional' },
    { id: 'creative', name: 'Creative Designer', color: 'bg-purple-600', description: 'Bold and artistic' },
    { id: 'minimal', name: 'Minimal Clean', color: 'bg-green-600', description: 'Simple and elegant' }
  ]
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Choose Template</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              cv.template === template.id 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`w-full h-32 ${template.color} rounded-lg mb-4 flex items-center justify-center text-white font-bold relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <span className="relative text-lg">Preview</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
            {cv.template === template.id && (
              <div className="mt-3 flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Selected</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Main CV Builder App
export default function CVBuilderApp() {
  const {
    cv,
    updatePersonal,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    setTemplate,
    getCompletionPercentage,
    validateCV,
    resetCV
  } = useCV()

  const { generatePDF } = usePDFExport()
  
  const [activeSection, setActiveSection] = useState('personal')
  const [previewMode, setPreviewMode] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Navigation sections
  const sections = [
    { 
      id: 'personal', 
      name: 'Personal Info', 
      icon: User, 
      required: true,
      component: PersonalInfoForm,
      props: { cv, updatePersonal }
    },
    { 
      id: 'experience', 
      name: 'Experience', 
      icon: Briefcase, 
      required: true,
      component: ExperienceForm,
      props: { cv, addExperience, updateExperience, deleteExperience }
    },
    { 
      id: 'education', 
      name: 'Education', 
      icon: GraduationCap, 
      required: false,
      component: EducationForm,
      props: { cv, addEducation, updateEducation, deleteEducation }
    },
    { 
      id: 'skills', 
      name: 'Skills', 
      icon: Award, 
      required: false,
      component: SkillsForm,
      props: { cv, addSkill, updateSkill, deleteSkill }
    },
    { 
      id: 'template', 
      name: 'Template', 
      icon: Settings, 
      required: false,
      component: TemplateSelector,
      props: { cv, setTemplate }
    }
  ]

  // Calculate completion and validation
  const completionPercentage = getCompletionPercentage()
  const validation = validateCV()
  
  // Section completion status
  const getSectionStatus = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return cv.personal.firstName && cv.personal.lastName && cv.personal.email && cv.personal.phone && cv.personal.location
      case 'experience':
        return cv.experience.length > 0
      case 'education':
        return cv.education.length > 0
      case 'skills':
        return cv.skills.length > 0
      case 'template':
        return cv.template !== ''
      default:
        return false
    }
  }

  // Get current section component
  const currentSection = sections.find(s => s.id === activeSection)
  const CurrentComponent = currentSection?.component

  // Save indicator
  React.useEffect(() => {
    setLastSaved(new Date())
  }, [cv])

  // Navigation handlers
  const goToNextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id)
    }
  }

  const goToPreviousSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id)
    }
  }

  // Download PDF handler
  const handleDownloadPDF = async () => {
    if (!validation.isValid) {
      alert('Please complete all required fields before downloading.')
      return
    }
    
    try {
      await generatePDF(cv)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  // Preview mode
  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Preview Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Editor</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">CV Preview</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${validation.isValid ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {completionPercentage}% Complete
                </span>
              </div>
              
              <button
                onClick={handleDownloadPDF}
                disabled={!validation.isValid}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* CV Preview */}
        <div className="max-w-7xl mx-auto p-6">
          <Suspense fallback={<FormSkeleton />}>
            <CVRenderer cv={cv} template={cv.template} />
          </Suspense>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
            
            {/* Save Indicator */}
            <div className="flex items-center space-x-2 text-sm">
              {lastSaved && (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600">
                    Saved {lastSaved.toLocaleTimeString()}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {validation.isValid ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
              <span className="text-sm text-gray-600">
                {completionPercentage}% Complete
              </span>
            </div>
            
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            
            <button
              onClick={handleDownloadPDF}
              disabled={!validation.isValid}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">Progress</span>
              <span className="text-sm text-gray-600">{completionPercentage}%</span>
            </div>
            <div className="flex items-center space-x-2">
              {completionPercentage >= 100 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Ready to download!</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600">
                    {100 - completionPercentage}% remaining
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            >
              <div className="h-full bg-gradient-to-r from-transparent to-white opacity-25 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  const isCompleted = getSectionStatus(section.id)
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {section.required && !isCompleted && (
                          <span className="text-xs text-red-500">*</span>
                        )}
                        {isCompleted && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </nav>

              {/* Navigation Buttons */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={goToPreviousSection}
                  disabled={sections.findIndex(s => s.id === activeSection) === 0}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={goToNextSection}
                  disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Validation Errors */}
              {!validation.isValid && validation.errors.length > 0 && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-800 mb-2">
                    Complete these items:
                  </h4>
                  <ul className="text-xs text-orange-700 space-y-1">
                    {validation.errors.slice(0, 3).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {validation.errors.length > 3 && (
                      <li>• +{validation.errors.length - 3} more items</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[600px]">
              <Suspense fallback={<FormSkeleton />}>
                {CurrentComponent && (
                  <CurrentComponent {...currentSection.props} />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
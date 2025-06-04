// src/components/builder/forms/PersonalInfoForm.tsx - Personal Information Form
'use client'

import React, { useMemo } from 'react'
import { CVData, PersonalInfo } from '@/types/cv'
import { CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import { cvHelpers } from '@/utils/cvHelpers'

interface PersonalInfoFormProps {
  cv: CVData
  updatePersonal: (data: Partial<PersonalInfo>) => void
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ 
  cv, 
  updatePersonal 
}) => {
  // Memoize validation state
  const validationErrors = useMemo(() => {
    const errors = []
    if (!cv.personal.firstName) errors.push('First name is required')
    if (!cv.personal.lastName) errors.push('Last name is required')
    if (!cv.personal.email) errors.push('Email is required')
    if (!cv.personal.phone) errors.push('Phone is required')
    if (!cv.personal.location) errors.push('Location is required')
    if (cv.personal.email && !cvHelpers.isValidEmail(cv.personal.email)) {
      errors.push('Please enter a valid email address')
    }
    return errors
  }, [cv.personal])

  const isComplete = validationErrors.length === 0

  // AI Suggestion Generator
  const generateSummary = () => {
    if (cv.experience.length > 0 || cv.skills.length > 0) {
      const generatedSummary = cvHelpers.generateSummary(cv)
      updatePersonal({ summary: generatedSummary })
    } else {
      updatePersonal({ 
        summary: `Motivated professional with strong communication skills and a passion for continuous learning. Eager to contribute to a dynamic team and grow professionally in a challenging environment.` 
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {isComplete && (
          <CheckCircle className="w-6 h-6 text-green-500" />
        )}
      </div>
      
      {/* AI Suggestion Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Pro Tips</h4>
            <p className="text-sm text-blue-700 mt-1">
              Use a professional email address and include your LinkedIn profile to increase your chances by 40%.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={cv.personal.firstName}
            onChange={(e) => updatePersonal({ firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="John"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={cv.personal.lastName}
            onChange={(e) => updatePersonal({ lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={cv.personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="john.doe@email.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={cv.personal.phone}
            onChange={(e) => updatePersonal({ phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          value={cv.personal.location}
          onChange={(e) => updatePersonal({ location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="San Francisco, CA"
          required
        />
      </div>

      {/* Additional Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={cv.personal.linkedin || ''}
            onChange={(e) => updatePersonal({ linkedin: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="linkedin.com/in/johndoe"
          />
          <p className="text-xs text-gray-500 mt-1">
            Include your full LinkedIn URL
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website/Portfolio
          </label>
          <input
            type="url"
            value={cv.personal.website || ''}
            onChange={(e) => updatePersonal({ website: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="johndoe.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your personal website or portfolio
          </p>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <button
            type="button"
            onClick={generateSummary}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Generate with AI</span>
          </button>
        </div>
        <textarea
          value={cv.personal.summary}
          onChange={(e) => updatePersonal({ summary: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none transition-all"
          placeholder="A brief professional summary highlighting your key achievements and career goals..."
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            {cv.personal.summary.length}/500 characters
          </p>
          <p className="text-xs text-gray-500">
            3-4 sentences recommended
          </p>
        </div>
      </div>

      {/* GitHub (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GitHub Profile (Optional)
        </label>
        <input
          type="url"
          value={cv.personal.github || ''}
          onChange={(e) => updatePersonal({ github: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="github.com/johndoe"
        />
        <p className="text-xs text-gray-500 mt-1">
          Recommended for technical positions
        </p>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Please fix these errors:</h4>
              <ul className="text-sm text-red-700 mt-1 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800">Personal information complete!</h4>
              <p className="text-sm text-green-700 mt-1">
                Your contact details look great. You can now move on to adding your work experience.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">
          💡 Personal Information Tips
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use a professional email address (avoid nicknames or unprofessional domains)</li>
          <li>• Include your city and state/province (full address not necessary)</li>
          <li>• Keep your summary concise but impactful (3-4 sentences)</li>
          <li>• LinkedIn profiles increase callback rates by 71%</li>
          <li>• For tech roles, include your GitHub to showcase your coding projects</li>
        </ul>
      </div>
    </div>
  )
}

export default PersonalInfoForm
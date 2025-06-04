// src/components/builder/forms/EducationForm.tsx - Education Form
'use client'

import React, { useState } from 'react'
import { CVData, Education } from '@/types/cv'
import { Plus, Trash2, GraduationCap, Calendar, MapPin, School, GripVertical, Award } from 'lucide-react'
import { cvHelpers } from '@/utils/cvHelpers'

interface EducationFormProps {
  cv: CVData
  addEducation: () => string
  updateEducation: (id: string, data: Partial<Education>) => void
  deleteEducation: (id: string) => void
}

// Common degree types
const degreeTypes = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree (PhD)',
  'Professional Degree',
  'Certificate',
  'Diploma',
  'Other'
]

// Popular fields of study
const popularFields = [
  'Computer Science', 'Business Administration', 'Engineering', 'Psychology', 
  'Marketing', 'Finance', 'Accounting', 'Nursing', 'Education', 'Communications',
  'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Economics', 'Political Science',
  'Art & Design', 'Literature', 'History', 'Philosophy', 'Medicine', 'Law'
]

const EducationForm: React.FC<EducationFormProps> = ({ 
  cv, 
  addEducation, 
  updateEducation, 
  deleteEducation 
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const addAchievement = (eduId: string, currentAchievements: string[]) => {
    const newAchievement = ""
    updateEducation(eduId, { 
      achievements: [...currentAchievements, newAchievement] 
    })
  }

  const updateAchievement = (eduId: string, achievements: string[], index: number, value: string) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    updateEducation(eduId, { achievements: newAchievements })
  }

  const removeAchievement = (eduId: string, achievements: string[], index: number) => {
    const newAchievements = achievements.filter((_, i) => i !== index)
    updateEducation(eduId, { achievements: newAchievements })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={() => addEducation()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Education Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <GraduationCap className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900">Education Tips</h4>
            <p className="text-sm text-purple-700 mt-1">
              List your highest degree first. Include relevant coursework, honors, and academic achievements.
            </p>
          </div>
        </div>
      </div>

      {cv.education.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">No education added yet</p>
          <p className="text-sm text-gray-500 mb-6">
            Add your educational background to showcase your qualifications
          </p>
          <button
            onClick={() => addEducation()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cv.education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree || `Education ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {edu.institution && edu.startDate 
                          ? `${edu.institution} • ${cvHelpers.formatDate(edu.startDate)}`
                          : 'Click to expand and edit'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleExpanded(edu.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {expandedItems.has(edu.id) ? 'Collapse' : 'Expand'}
                    </button>
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedItems.has(edu.id) && (
                <div className="p-6 space-y-4">
                  {/* Degree & Institution */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <GraduationCap className="w-4 h-4 inline mr-1" />
                        Degree *
                      </label>
                      <select
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a degree</option>
                        {degreeTypes.map((degree) => (
                          <option key={degree} value={degree}>{degree}</option>
                        ))}
                      </select>
                      {edu.degree === 'Other' && (
                        <input
                          type="text"
                          value={edu.degree === 'Other' ? '' : edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                          placeholder="Enter custom degree"
                        />
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <School className="w-4 h-4 inline mr-1" />
                        Institution *
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="University of California, Berkeley"
                        required
                      />
                    </div>
                  </div>

                  {/* Field of Study & Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study
                      </label>
                      <input
                        list="fields"
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Computer Science"
                      />
                      <datalist id="fields">
                        {popularFields.map((field) => (
                          <option key={field} value={field} />
                        ))}
                      </datalist>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Berkeley, CA"
                      />
                    </div>
                  </div>

                  {/* Dates & GPA */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        End Date
                      </label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={edu.current}
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={edu.current}
                          onChange={(e) => updateEducation(edu.id, { 
                            current: e.target.checked, 
                            endDate: e.target.checked ? '' : edu.endDate 
                          })}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-600">Currently enrolled</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="4.0"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, { 
                          gpa: e.target.value ? parseFloat(e.target.value) : undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.8"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Only include if 3.5 or higher
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={edu.description || ''}
                      onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                      placeholder="Relevant coursework, thesis topic, study abroad experience..."
                    />
                  </div>

                  {/* Academic Achievements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <Award className="w-4 h-4 inline mr-1" />
                        Academic Achievements
                      </label>
                      <button
                        onClick={() => addAchievement(edu.id, edu.achievements || [])}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        + Add Achievement
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {(edu.achievements || []).map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-3">•</span>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => updateAchievement(edu.id, edu.achievements || [], achievementIndex, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Dean's List, Magna Cum Laude, Academic Scholarship..."
                            />
                            <button
                              onClick={() => removeAchievement(edu.id, edu.achievements || [], achievementIndex)}
                              className="text-xs text-red-600 hover:text-red-800 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {(!edu.achievements || edu.achievements.length === 0) && (
                        <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <p className="text-sm text-gray-500 mb-2">No achievements added yet</p>
                          <button
                            onClick={() => addAchievement(edu.id, [])}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Add academic achievements
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education Tips */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">
          💡 Education Tips
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• List your highest degree first, then work backwards</li>
          <li>• Include your GPA only if it's 3.5 or higher</li>
          <li>• Mention relevant coursework for your target field</li>
          <li>• Include academic honors, scholarships, and awards</li>
          <li>• For recent graduates, education can come before experience</li>
          <li>• High school education is optional if you have a college degree</li>
        </ul>
      </div>
    </div>
  )
}

export default EducationForm
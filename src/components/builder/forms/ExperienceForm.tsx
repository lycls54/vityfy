// src/components/builder/forms/ExperienceForm.tsx - Work Experience Form
'use client'

import React, { useState } from 'react'
import { CVData, Experience } from '@/types/cv'
import { Plus, Trash2, Briefcase, Calendar, MapPin, Building, GripVertical, Sparkles } from 'lucide-react'
import { cvHelpers } from '@/utils/cvHelpers'

interface ExperienceFormProps {
  cv: CVData
  addExperience: () => string
  updateExperience: (id: string, data: Partial<Experience>) => void
  deleteExperience: (id: string) => void
}

// Sample achievements for AI suggestions
const achievementSuggestions = [
  "Increased team productivity by 25% through implementation of agile methodologies",
  "Led a cross-functional team of 8 members to deliver project 2 weeks ahead of schedule",
  "Reduced operational costs by 15% through process optimization and automation",
  "Mentored 5 junior developers, resulting in 90% retention rate",
  "Implemented new system that improved customer satisfaction scores by 30%",
  "Managed budget of $500K+ and delivered projects within 5% of allocated resources",
  "Collaborated with stakeholders to define requirements for 10+ product features",
  "Developed training program that reduced onboarding time from 4 weeks to 2 weeks"
]

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  cv, 
  addExperience, 
  updateExperience, 
  deleteExperience 
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

  const addAchievement = (expId: string, currentAchievements: string[]) => {
    const newAchievement = ""
    updateExperience(expId, { 
      achievements: [...currentAchievements, newAchievement] 
    })
  }

  const updateAchievement = (expId: string, achievements: string[], index: number, value: string) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    updateExperience(expId, { achievements: newAchievements })
  }

  const removeAchievement = (expId: string, achievements: string[], index: number) => {
    const newAchievements = achievements.filter((_, i) => i !== index)
    updateExperience(expId, { achievements: newAchievements })
  }

  const suggestAchievement = (expId: string, achievements: string[], index: number) => {
    const randomAchievement = achievementSuggestions[Math.floor(Math.random() * achievementSuggestions.length)]
    updateAchievement(expId, achievements, index, randomAchievement)
  }

  const suggestSkills = (position: string, expId: string) => {
    const suggestions = cvHelpers.suggestSkills(position)
    if (suggestions.length > 0) {
      updateExperience(expId, { technologies: suggestions.slice(0, 5) })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <button
          onClick={() => addExperience()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* AI Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900">Experience Tips</h4>
            <p className="text-sm text-green-700 mt-1">
              Focus on achievements, not just responsibilities. Use numbers and metrics whenever possible.
            </p>
          </div>
        </div>
      </div>

      {cv.experience.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">No work experience added yet</p>
          <p className="text-sm text-gray-500 mb-6">
            Add your work experience to showcase your professional background
          </p>
          <button
            onClick={() => addExperience()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cv.experience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {exp.position || `Experience ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exp.company && exp.startDate 
                          ? `${exp.company} • ${cvHelpers.formatDate(exp.startDate)}`
                          : 'Click to expand and edit'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleExpanded(exp.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {expandedItems.has(exp.id) ? 'Collapse' : 'Expand'}
                    </button>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedItems.has(exp.id) && (
                <div className="p-6 space-y-4">
                  {/* Job Title & Company */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        onBlur={() => exp.position && suggestSkills(exp.position, exp.id)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Senior Software Engineer"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        Company *
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Google"
                        required
                      />
                    </div>
                  </div>

                  {/* Location & Dates */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
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
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={exp.current}
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { 
                            current: e.target.checked, 
                            endDate: e.target.checked ? '' : exp.endDate 
                          })}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-600">I currently work here</span>
                      </label>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                      placeholder="Brief description of your role and responsibilities..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Keep it concise - focus on key responsibilities
                    </p>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Key Achievements
                      </label>
                      <button
                        onClick={() => addAchievement(exp.id, exp.achievements || [])}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        + Add Achievement
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {(exp.achievements || []).map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-3">•</span>
                          <div className="flex-1">
                            <textarea
                              value={achievement}
                              onChange={(e) => updateAchievement(exp.id, exp.achievements || [], achievementIndex, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              placeholder="Describe a specific achievement with numbers/metrics..."
                              rows={2}
                            />
                            <div className="flex items-center justify-between mt-1">
                              <button
                                onClick={() => suggestAchievement(exp.id, exp.achievements || [], achievementIndex)}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Suggest</span>
                              </button>
                              <button
                                onClick={() => removeAchievement(exp.id, exp.achievements || [], achievementIndex)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {(!exp.achievements || exp.achievements.length === 0) && (
                        <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <p className="text-sm text-gray-500 mb-2">No achievements added yet</p>
                          <button
                            onClick={() => addAchievement(exp.id, [])}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Add your first achievement
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technologies/Skills Used */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technologies/Skills Used
                    </label>
                    <input
                      type="text"
                      value={(exp.technologies || []).join(', ')}
                      onChange={(e) => updateExperience(exp.id, { 
                        technologies: e.target.value.split(',').map(tech => tech.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="React, Node.js, Python, AWS..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate with commas. These help with ATS keyword matching.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience Tips */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">
          💡 Work Experience Tips
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Start each achievement with an action verb (Led, Increased, Developed, etc.)</li>
          <li>• Include specific numbers and metrics whenever possible</li>
          <li>• Focus on results and impact, not just job duties</li>
          <li>• Tailor your experience to match the job you're applying for</li>
          <li>• List your most recent experience first (reverse chronological order)</li>
        </ul>
      </div>
    </div>
  )
}

export default ExperienceForm
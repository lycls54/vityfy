// src/components/builder/forms/SkillsForm.tsx - Skills Form
'use client'

import React, { useState } from 'react'
import { CVData, Skill } from '@/types/cv'
import { Plus, Trash2, Award, Star, Code, Users, Lightbulb, Sparkles } from 'lucide-react'

interface SkillsFormProps {
  cv: CVData
  addSkill: () => string
  updateSkill: (id: string, data: Partial<Skill>) => void
  deleteSkill: (id: string) => void
}

// Skill Categories
const skillCategories = [
  { id: 'technical', name: 'Technical Skills', icon: Code, color: 'blue' },
  { id: 'soft', name: 'Soft Skills', icon: Users, color: 'green' },
  { id: 'tools', name: 'Tools & Software', icon: Award, color: 'purple' },
  { id: 'languages', name: 'Programming Languages', icon: Code, color: 'orange' },
  { id: 'other', name: 'Other Skills', icon: Lightbulb, color: 'gray' }
]

// Popular skills by category
const popularSkills = {
  technical: [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'SQL', 'HTML/CSS', 
    'AWS', 'Docker', 'Git', 'API Development', 'Database Design'
  ],
  soft: [
    'Leadership', 'Communication', 'Problem Solving', 'Team Management', 
    'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management'
  ],
  tools: [
    'Microsoft Office', 'Adobe Creative Suite', 'Figma', 'Slack', 'Jira', 
    'Salesforce', 'Google Analytics', 'Tableau', 'Excel', 'PowerPoint'
  ],
  languages: [
    'JavaScript', 'Python', 'Java', 'C++', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'C#'
  ],
  other: [
    'Digital Marketing', 'SEO', 'Content Creation', 'Data Analysis', 'Social Media', 
    'Public Speaking', 'Training & Development', 'Customer Service'
  ]
}

const SkillsForm: React.FC<SkillsFormProps> = ({ 
  cv, 
  addSkill, 
  updateSkill, 
  deleteSkill 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('technical')
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null)

  // Group skills by category
  const skillsByCategory = cv.skills.reduce((acc, skill) => {
    const category = skill.category?.toLowerCase() || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const addSkillFromSuggestion = (skillName: string, category: string) => {
    const skillId = addSkill()
    updateSkill(skillId, { 
      name: skillName, 
      category: category,
      level: 'intermediate' 
    })
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-500'
      case 'advanced': return 'bg-blue-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'beginner': return 'bg-gray-500'
      default: return 'bg-gray-300'
    }
  }

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert': return 'w-full'
      case 'advanced': return 'w-3/4'
      case 'intermediate': return 'w-1/2'
      case 'beginner': return 'w-1/4'
      default: return 'w-1/4'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          onClick={() => addSkill()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Skills Tips</h4>
            <p className="text-sm text-blue-700 mt-1">
              Include both hard and soft skills. Be honest about your skill levels - it's better to be accurate than overconfident.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const count = skillsByCategory[category.id]?.length || 0
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
                {count > 0 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Skills for Active Category */}
      <div className="space-y-4">
        {skillsByCategory[activeCategory]?.length > 0 ? (
          <div className="grid gap-4">
            {skillsByCategory[activeCategory].map((skill) => (
              <div key={skill.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 grid md:grid-cols-3 gap-4">
                    {/* Skill Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., JavaScript, Leadership"
                      />
                    </div>

                    {/* Skill Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Proficiency Level
                      </label>
                      <select
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={skill.yearsOfExperience || ''}
                        onChange={(e) => updateSkill(skill.id, { 
                          yearsOfExperience: e.target.value ? parseInt(e.target.value) : undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-red-600 hover:text-red-800 transition-colors ml-4 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Skill Level Visualization */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Proficiency:</span>
                    <span className="font-medium capitalize">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)} transition-all duration-300`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">No {skillCategories.find(c => c.id === activeCategory)?.name.toLowerCase()} added yet</p>
            <button
              onClick={() => addSkill()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Skill
            </button>
          </div>
        )}
      </div>

      {/* Popular Skills Suggestions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-800">
            Popular {skillCategories.find(c => c.id === activeCategory)?.name}
          </h4>
          <button
            onClick={() => setShowSuggestions(showSuggestions === activeCategory ? null : activeCategory)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showSuggestions === activeCategory ? 'Hide' : 'Show'} Suggestions
          </button>
        </div>

        {showSuggestions === activeCategory && (
          <div className="flex flex-wrap gap-2">
            {popularSkills[activeCategory as keyof typeof popularSkills]?.map((skillName) => {
              const alreadyAdded = cv.skills.some(skill => 
                skill.name.toLowerCase() === skillName.toLowerCase()
              )
              
              return (
                <button
                  key={skillName}
                  onClick={() => !alreadyAdded && addSkillFromSuggestion(skillName, activeCategory)}
                  disabled={alreadyAdded}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    alreadyAdded
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  {alreadyAdded ? '✓ ' : '+ '}{skillName}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Skills Summary */}
      {cv.skills.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Skills Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {skillCategories.map((category) => {
              const count = skillsByCategory[category.id]?.length || 0
              return (
                <div key={category.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-xs text-gray-600">{category.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills Tips */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">
          💡 Skills Tips
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Include 8-12 skills that are most relevant to your target job</li>
          <li>• Mix technical skills with soft skills (communication, leadership, etc.)</li>
          <li>• Be honest about your skill levels - employers may test you</li>
          <li>• Include years of experience for your strongest skills</li>
          <li>• Use keywords from job descriptions to match ATS systems</li>
          <li>• Update your skills regularly as you learn new technologies</li>
        </ul>
      </div>

      {/* Skill Level Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          📊 Skill Level Guide
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-2 bg-gray-500 rounded"></div>
              <span className="font-medium">Beginner:</span>
            </div>
            <p className="text-gray-600 text-xs ml-6">0-1 years, basic understanding</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-2 bg-yellow-500 rounded"></div>
              <span className="font-medium">Intermediate:</span>
            </div>
            <p className="text-gray-600 text-xs ml-6">1-3 years, practical experience</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-2 bg-blue-500 rounded"></div>
              <span className="font-medium">Advanced:</span>
            </div>
            <p className="text-gray-600 text-xs ml-6">3-5 years, can mentor others</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-2 bg-green-500 rounded"></div>
              <span className="font-medium">Expert:</span>
            </div>
            <p className="text-gray-600 text-xs ml-6">5+ years, industry recognition</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsForm
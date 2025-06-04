// src/hooks/useCV.ts - Main CV State Management Hook
import { useReducer, useEffect, useCallback } from 'react'
import { CVData, Experience, Education, Skill, PersonalInfo } from '@/types/cv'

// Initial CV state
const initialCV: CVData = {
  id: '',
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  references: [],
  template: 'modern',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  settings: {
    fontSize: 14,
    lineHeight: 1.5,
    margins: 20,
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      text: '#1F2937'
    },
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

// CV Actions
type CVAction = 
  | { type: 'LOAD_CV'; payload: CVData }
  | { type: 'RESET_CV' }
  | { type: 'UPDATE_PERSONAL'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'REORDER_EXPERIENCE'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<CVData['settings']> }
  | { type: 'TOGGLE_SECTION'; payload: { section: string; enabled: boolean } }

// CV Reducer
function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case 'LOAD_CV':
      return { ...action.payload, updatedAt: new Date().toISOString() }
    
    case 'RESET_CV':
      return { ...initialCV, id: generateId(), createdAt: new Date().toISOString() }
    
    case 'UPDATE_PERSONAL':
      return {
        ...state,
        personal: { ...state.personal, ...action.payload },
        updatedAt: new Date().toISOString()
      }
    
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [action.payload, ...state.experience],
        updatedAt: new Date().toISOString()
      }
    
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp => 
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
        updatedAt: new Date().toISOString()
      }
    
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload),
        updatedAt: new Date().toISOString()
      }
    
    case 'REORDER_EXPERIENCE':
      const { fromIndex, toIndex } = action.payload
      const newExperience = [...state.experience]
      const [removed] = newExperience.splice(fromIndex, 1)
      newExperience.splice(toIndex, 0, removed)
      return {
        ...state,
        experience: newExperience,
        updatedAt: new Date().toISOString()
      }
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [action.payload, ...state.education],
        updatedAt: new Date().toISOString()
      }
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu => 
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
        updatedAt: new Date().toISOString()
      }
    
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload),
        updatedAt: new Date().toISOString()
      }
    
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
        updatedAt: new Date().toISOString()
      }
    
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill => 
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        ),
        updatedAt: new Date().toISOString()
      }
    
    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload),
        updatedAt: new Date().toISOString()
      }
    
    case 'SET_TEMPLATE':
      return {
        ...state,
        template: action.payload,
        updatedAt: new Date().toISOString()
      }
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
        updatedAt: new Date().toISOString()
      }
    
    case 'TOGGLE_SECTION':
      return {
        ...state,
        settings: {
          ...state.settings,
          sections: {
            ...state.settings.sections,
            [action.payload.section]: {
              ...state.settings.sections[action.payload.section],
              enabled: action.payload.enabled
            }
          }
        },
        updatedAt: new Date().toISOString()
      }
    
    default:
      return state
  }
}

// Utility functions
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

const STORAGE_KEY = 'cvcraft-cv-data'
const AUTO_SAVE_DELAY = 1000 // 1 second

// Main CV Hook
export function useCV() {
  const [cv, dispatch] = useReducer(cvReducer, initialCV)

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      } catch (error) {
        console.warn('Failed to save CV to localStorage:', error)
      }
    }, AUTO_SAVE_DELAY)

    return () => clearTimeout(timeoutId)
  }, [cv])

  // Load CV from localStorage on mount
  useEffect(() => {
    try {
      const savedCV = localStorage.getItem(STORAGE_KEY)
      if (savedCV) {
        const parsedCV = JSON.parse(savedCV)
        // Ensure we have a valid CV structure
        if (parsedCV.personal && parsedCV.experience !== undefined) {
          dispatch({ type: 'LOAD_CV', payload: parsedCV })
        }
      } else {
        // Initialize with a new CV
        dispatch({ type: 'RESET_CV' })
      }
    } catch (error) {
      console.warn('Failed to load CV from localStorage:', error)
      dispatch({ type: 'RESET_CV' })
    }
  }, [])

  // Helper functions
  const addExperience = useCallback((company: string = '', position: string = '') => {
    const newExperience: Experience = {
      id: generateId(),
      company,
      position,
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
      technologies: []
    }
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience })
    return newExperience.id
  }, [])

  const addEducation = useCallback((institution: string = '', degree: string = '') => {
    const newEducation: Education = {
      id: generateId(),
      institution,
      degree,
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: undefined,
      description: '',
      achievements: []
    }
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation })
    return newEducation.id
  }, [])

  const addSkill = useCallback((name: string = '', category: string = 'Technical') => {
    const newSkill: Skill = {
      id: generateId(),
      name,
      level: 'intermediate',
      category,
      yearsOfExperience: undefined
    }
    dispatch({ type: 'ADD_SKILL', payload: newSkill })
    return newSkill.id
  }, [])

  const getCompletionPercentage = useCallback(() => {
    let completed = 0
    let total = 0

    // Personal info (required fields)
    const requiredPersonalFields = ['firstName', 'lastName', 'email', 'phone', 'location']
    requiredPersonalFields.forEach(field => {
      total++
      if (cv.personal[field as keyof PersonalInfo]) completed++
    })

    // Optional personal fields
    const optionalPersonalFields = ['summary', 'linkedin', 'website']
    optionalPersonalFields.forEach(field => {
      total++
      if (cv.personal[field as keyof PersonalInfo]) completed++
    })

    // Experience
    total++
    if (cv.experience.length > 0) completed++

    // Education
    total++
    if (cv.education.length > 0) completed++

    // Skills
    total++
    if (cv.skills.length > 0) completed++

    return Math.round((completed / total) * 100)
  }, [cv])

  const validateCV = useCallback(() => {
    const errors: string[] = []

    // Required personal info
    if (!cv.personal.firstName) errors.push('First name is required')
    if (!cv.personal.lastName) errors.push('Last name is required')
    if (!cv.personal.email) errors.push('Email is required')
    if (!cv.personal.phone) errors.push('Phone is required')
    if (!cv.personal.location) errors.push('Location is required')

    // Email validation
    if (cv.personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cv.personal.email)) {
      errors.push('Please enter a valid email address')
    }

    // Experience validation
    cv.experience.forEach((exp, index) => {
      if (!exp.company) errors.push(`Experience ${index + 1}: Company is required`)
      if (!exp.position) errors.push(`Experience ${index + 1}: Position is required`)
      if (!exp.startDate) errors.push(`Experience ${index + 1}: Start date is required`)
      if (!exp.current && !exp.endDate) errors.push(`Experience ${index + 1}: End date is required`)
    })

    // Education validation
    cv.education.forEach((edu, index) => {
      if (!edu.institution) errors.push(`Education ${index + 1}: Institution is required`)
      if (!edu.degree) errors.push(`Education ${index + 1}: Degree is required`)
    })

    // Skills validation
    cv.skills.forEach((skill, index) => {
      if (!skill.name) errors.push(`Skill ${index + 1}: Name is required`)
    })

    return {
      isValid: errors.length === 0,
      errors
    }
  }, [cv])

  return {
    cv,
    dispatch,
    
    // Helper functions
    addExperience,
    addEducation,
    addSkill,
    getCompletionPercentage,
    validateCV,
    
    // Quick actions
    updatePersonal: (data: Partial<PersonalInfo>) => 
      dispatch({ type: 'UPDATE_PERSONAL', payload: data }),
    updateExperience: (id: string, data: Partial<Experience>) => 
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } }),
    deleteExperience: (id: string) => 
      dispatch({ type: 'DELETE_EXPERIENCE', payload: id }),
    updateEducation: (id: string, data: Partial<Education>) => 
      dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } }),
    deleteEducation: (id: string) => 
      dispatch({ type: 'DELETE_EDUCATION', payload: id }),
    updateSkill: (id: string, data: Partial<Skill>) => 
      dispatch({ type: 'UPDATE_SKILL', payload: { id, data } }),
    deleteSkill: (id: string) => 
      dispatch({ type: 'DELETE_SKILL', payload: id }),
    setTemplate: (template: string) => 
      dispatch({ type: 'SET_TEMPLATE', payload: template }),
    updateSettings: (settings: Partial<CVData['settings']>) => 
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    toggleSection: (section: string, enabled: boolean) => 
      dispatch({ type: 'TOGGLE_SECTION', payload: { section, enabled } }),
    resetCV: () => 
      dispatch({ type: 'RESET_CV' })
  }
}
// src/types/cv.ts - TypeScript types for CV data structure
export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
  photo?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  achievements: string[]
  technologies?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: number
  description?: string
  achievements?: string[]
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: string
  yearsOfExperience?: number
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate: string
  endDate?: string
  current: boolean
  achievements: string[]
  image?: string
}

export interface Language {
  id: string
  name: string
  level: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic'
  certification?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Reference {
  id: string
  name: string
  position: string
  company: string
  email: string
  phone?: string
  relationship: string
}

export interface CVData {
  id: string
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  languages: Language[]
  certifications: Certification[]
  references: Reference[]
  template: string
  createdAt: string
  updatedAt: string
  settings: {
    fontSize: number
    lineHeight: number
    margins: number
    colors: {
      primary: string
      secondary: string
      text: string
    }
    sections: {
      [key: string]: {
        enabled: boolean
        order: number
        title: string
      }
    }
  }
}
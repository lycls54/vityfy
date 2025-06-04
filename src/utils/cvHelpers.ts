// src/utils/cvHelpers.ts - CV utility functions
import { CVData, Experience } from '@/types/cv'

export const cvHelpers = {
  // Generate a professional summary based on experience
  generateSummary: (cv: CVData): string => {
    const { personal, experience, skills } = cv
    const yearsOfExperience = experience.length
    const topSkills = skills.slice(0, 3).map(s => s.name).join(', ')
    
    if (yearsOfExperience === 0) {
      return `Motivated ${personal.firstName} with strong foundation in ${topSkills}. Eager to contribute to a dynamic team and grow professionally.`
    }
    
    const currentRole = experience[0]?.position || 'professional'
    return `Experienced ${currentRole.toLowerCase()} with ${yearsOfExperience}+ years of expertise in ${topSkills}. Proven track record of delivering results and driving innovation.`
  },

  // Calculate years of experience
  calculateExperience: (experience: Experience[]): number => {
    let totalMonths = 0
    
    experience.forEach(exp => {
      if (exp.startDate) {
        const start = new Date(exp.startDate)
        const end = exp.current ? new Date() : new Date(exp.endDate || exp.startDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
        totalMonths += diffMonths
      }
    })
    
    return Math.round(totalMonths / 12 * 10) / 10 // Round to 1 decimal
  },

  // Suggest skills based on job titles
  suggestSkills: (position: string): string[] => {
    const skillMap: Record<string, string[]> = {
      'software engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'Git'],
      'data scientist': ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
      'product manager': ['Agile', 'Scrum', 'Analytics', 'Strategy', 'Leadership'],
      'designer': ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Prototyping', 'Design Systems'],
      'marketing': ['Digital Marketing', 'SEO', 'Analytics', 'Content Creation', 'Social Media'],
      'sales': ['CRM', 'Lead Generation', 'Negotiation', 'Account Management', 'Pipeline Management']
    }
    
    const lowercasePosition = position.toLowerCase()
    for (const [key, skills] of Object.entries(skillMap)) {
      if (lowercasePosition.includes(key)) {
        return skills
      }
    }
    
    return []
  },

  // Format date for display
  formatDate: (dateString: string, format: 'short' | 'long' = 'short'): string => {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      if (format === 'long') {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })
      }
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
    } catch {
      return dateString
    }
  },

  // Check if CV is ATS-friendly
  checkATSCompliance: (cv: CVData): { 
    score: number; 
    issues: string[]; 
    suggestions: string[] 
  } => {
    const issues: string[] = []
    const suggestions: string[] = []
    let score = 100

    // Check for required sections
    if (cv.experience.length === 0) {
      issues.push('No work experience provided')
      score -= 20
    }

    if (cv.skills.length === 0) {
      issues.push('No skills listed')
      score -= 15
    }

    if (!cv.personal.summary) {
      issues.push('Missing professional summary')
      suggestions.push('Add a brief professional summary')
      score -= 10
    }

    // Check for keyword density
    const allText = [
      cv.personal.summary,
      ...cv.experience.map(e => `${e.position} ${e.description}`),
      ...cv.skills.map(s => s.name)
    ].join(' ').toLowerCase()

    if (allText.length < 200) {
      issues.push('CV content is too brief')
      suggestions.push('Add more detailed descriptions')
      score -= 10
    }

    // Check for measurable achievements
    const hasNumbers = /\d+/.test(allText)
    if (!hasNumbers) {
      suggestions.push('Include quantifiable achievements (numbers, percentages)')
      score -= 5
    }

    return { score: Math.max(0, score), issues, suggestions }
  },

  // Generate unique ID
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

  // Validate email format
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Validate URL format
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  // Clean and format phone number
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  },

  // Extract keywords from job description
  extractKeywords: (text: string): string[] => {
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'])
    
    return text
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 2 && !commonWords.has(word))
      .reduce((acc: string[], word) => {
        if (!acc.includes(word)) acc.push(word)
        return acc
      }, [])
      .slice(0, 20) // Top 20 keywords
  }
}
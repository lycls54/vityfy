
// src/types/index.ts - Exported types
export type { 
  CVData, 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill, 
  Project, 
  Language, 
  Certification, 
  Reference,
  TemplateConfig,
  TemplateTheme
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'png' | 'jpg'
  quality: 'low' | 'medium' | 'high'
  pageSize: 'a4' | 'letter'
  margins: number
}

export interface AIsuggestion {
  type: 'skill' | 'experience' | 'summary' | 'achievement'
  content: string
  relevance: number
  reasoning: string
}
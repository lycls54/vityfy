// src/types/template.ts - Template configuration types
export interface TemplateConfig {
  id: string
  name: string
  description: string
  category: 'professional' | 'creative' | 'traditional' | 'minimal'
  colors: string[]
  features: string[]
  preview: string
  layout: 'single-column' | 'two-column' | 'three-column'
  sections: {
    [key: string]: {
      enabled: boolean
      component: string
      styles: Record<string, any>
    }
  }
  fonts: {
    heading: string
    body: string
    accent?: string
  }
  spacing: {
    section: number
    item: number
    line: number
  }
}

export interface TemplateTheme {
  primary: string
  secondary: string
  accent: string
  text: string
  textLight: string
  background: string
  border: string
}
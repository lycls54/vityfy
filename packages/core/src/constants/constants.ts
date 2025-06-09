// API Constants
export const API_VERSION = 'v1'
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Authentication
export const AUTH_COOKIE_NAME = 'cvcraft-session'
export const AUTH_TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours
export const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100
export const DEFAULT_PAGE = 1

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

// CV Limits
export const CV_LIMITS = {
  FREE: {
    MAX_CVS: 1,
    MAX_EXPORTS_PER_MONTH: 5,
    MAX_AI_REQUESTS_PER_MONTH: 10
  },
  BASIC: {
    MAX_CVS: 3,
    MAX_EXPORTS_PER_MONTH: 25,
    MAX_AI_REQUESTS_PER_MONTH: 50
  },
  PREMIUM: {
    MAX_CVS: 10,
    MAX_EXPORTS_PER_MONTH: 100,
    MAX_AI_REQUESTS_PER_MONTH: 200
  },
  ENTERPRISE: {
    MAX_CVS: -1, // Unlimited
    MAX_EXPORTS_PER_MONTH: -1, // Unlimited
    MAX_AI_REQUESTS_PER_MONTH: -1 // Unlimited
  }
} as const

// Rate Limiting
export const RATE_LIMITS = {
  API: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
    REQUESTS_PER_DAY: 10000
  },
  AI: {
    REQUESTS_PER_MINUTE: 5,
    REQUESTS_PER_HOUR: 50,
    REQUESTS_PER_DAY: 200
  },
  EXPORT: {
    REQUESTS_PER_MINUTE: 2,
    REQUESTS_PER_HOUR: 20,
    REQUESTS_PER_DAY: 100
  }
} as const

// Export Settings
export const EXPORT_SETTINGS = {
  PDF: {
    MAX_PAGES: 10,
    DPI: 300,
    QUALITY: 'high' as const
  },
  IMAGE: {
    MAX_WIDTH: 2480, // A4 width at 300 DPI
    MAX_HEIGHT: 3508, // A4 height at 300 DPI
    QUALITY: 90
  }
} as const

// Template Categories
export const TEMPLATE_CATEGORIES = [
  'modern',
  'classic',
  'creative',
  'minimalist',
  'professional',
  'academic',
  'technical',
  'executive',
  'entry-level',
  'industry-specific'
] as const

// Supported Languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
] as const

// Skill Categories
export const SKILL_CATEGORIES = [
  'technical',
  'language',
  'soft',
  'design',
  'management',
  'other'
] as const

// Skill Levels
export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', percentage: 25 },
  { value: 'intermediate', label: 'Intermediate', percentage: 50 },
  { value: 'advanced', label: 'Advanced', percentage: 75 },
  { value: 'expert', label: 'Expert', percentage: 100 }
] as const

// Language Proficiency Levels
export const LANGUAGE_PROFICIENCY_LEVELS = [
  { value: 'basic', label: 'Basic', description: 'A1-A2' },
  { value: 'conversational', label: 'Conversational', description: 'B1' },
  { value: 'proficient', label: 'Proficient', description: 'B2' },
  { value: 'fluent', label: 'Fluent', description: 'C1' },
  { value: 'native', label: 'Native', description: 'C2' }
] as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM yyyy', // Jan 2024
  MEDIUM: 'MMM dd, yyyy', // Jan 15, 2024
  LONG: 'MMMM dd, yyyy', // January 15, 2024
  ISO: 'yyyy-MM-dd', // 2024-01-15
  DISPLAY: 'MMM yyyy' // For CV display
} as const

// Error Messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED: 'This field is required',
    EMAIL: 'Please enter a valid email address',
    PASSWORD_MIN: 'Password must be at least 8 characters',
    PASSWORD_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    PHONE: 'Please enter a valid phone number',
    URL: 'Please enter a valid URL',
    DATE: 'Please enter a valid date',
    MAX_LENGTH: 'This field is too long',
    MIN_LENGTH: 'This field is too short'
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_NOT_VERIFIED: 'Please verify your email address',
    ACCOUNT_LOCKED: 'Account is temporarily locked',
    SESSION_EXPIRED: 'Your session has expired',
    UNAUTHORIZED: 'You are not authorized to perform this action'
  },
  CV: {
    NOT_FOUND: 'CV not found',
    LIMIT_REACHED: 'You have reached your CV limit',
    INVALID_TEMPLATE: 'Invalid template selected',
    EXPORT_FAILED: 'Failed to export CV'
  },
  GENERAL: {
    NETWORK_ERROR: 'Network error occurred',
    SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Resource not found',
    RATE_LIMITED: 'Too many requests, please try again later'
  }
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  CV: {
    CREATED: 'CV created successfully',
    UPDATED: 'CV updated successfully',
    DELETED: 'CV deleted successfully',
    EXPORTED: 'CV exported successfully'
  },
  AUTH: {
    LOGGED_IN: 'Logged in successfully',
    LOGGED_OUT: 'Logged out successfully',
    PASSWORD_RESET: 'Password reset email sent',
    EMAIL_VERIFIED: 'Email verified successfully'
  },
  GENERAL: {
    SAVED: 'Changes saved successfully',
    UPLOADED: 'File uploaded successfully',
    DELETED: 'Deleted successfully'
  }
} as const

// Color Schemes
export const COLOR_SCHEMES = [
  { id: 'blue', name: 'Blue', primary: '#3B82F6', secondary: '#EFF6FF' },
  { id: 'green', name: 'Green', primary: '#10B981', secondary: '#ECFDF5' },
  { id: 'purple', name: 'Purple', primary: '#8B5CF6', secondary: '#F3E8FF' },
  { id: 'red', name: 'Red', primary: '#EF4444', secondary: '#FEF2F2' },
  { id: 'orange', name: 'Orange', primary: '#F97316', secondary: '#FFF7ED' },
  { id: 'gray', name: 'Gray', primary: '#6B7280', secondary: '#F9FAFB' },
  { id: 'dark', name: 'Dark', primary: '#1F2937', secondary: '#F3F4F6' }
] as const

// Font Families
export const FONT_FAMILIES = [
  { id: 'inter', name: 'Inter', css: 'Inter, sans-serif' },
  { id: 'roboto', name: 'Roboto', css: 'Roboto, sans-serif' },
  { id: 'open-sans', name: 'Open Sans', css: '"Open Sans", sans-serif' },
  { id: 'lato', name: 'Lato', css: 'Lato, sans-serif' },
  { id: 'source-sans', name: 'Source Sans Pro', css: '"Source Sans Pro", sans-serif' },
  { id: 'nunito', name: 'Nunito', css: 'Nunito, sans-serif' },
  { id: 'poppins', name: 'Poppins', css: 'Poppins, sans-serif' },
  { id: 'montserrat', name: 'Montserrat', css: 'Montserrat, sans-serif' }
] as const

// Page Sizes
export const PAGE_SIZES = [
  { id: 'A4', name: 'A4', width: 210, height: 297 },
  { id: 'Letter', name: 'Letter', width: 216, height: 279 },
  { id: 'A3', name: 'A3', width: 297, height: 420 },
  { id: 'Legal', name: 'Legal', width: 216, height: 356 }
] as const

// Social Media Platforms
export const SOCIAL_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', baseUrl: 'https://linkedin.com/in/' },
  { id: 'github', name: 'GitHub', icon: 'github', baseUrl: 'https://github.com/' },
  { id: 'twitter', name: 'Twitter', icon: 'twitter', baseUrl: 'https://twitter.com/' },
  { id: 'portfolio', name: 'Portfolio', icon: 'globe', baseUrl: '' },
  { id: 'behance', name: 'Behance', icon: 'behance', baseUrl: 'https://behance.net/' },
  { id: 'dribbble', name: 'Dribbble', icon: 'dribbble', baseUrl: 'https://dribbble.com/' }
] as const

// Industry Types
export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Marketing',
  'Design',
  'Sales',
  'Engineering',
  'Legal',
  'Non-profit',
  'Government',
  'Real Estate',
  'Media',
  'Entertainment',
  'Hospitality',
  'Transportation',
  'Other'
] as const

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level', years: '0-2 years' },
  { value: 'mid', label: 'Mid Level', years: '2-5 years' },
  { value: 'senior', label: 'Senior Level', years: '5-10 years' },
  { value: 'executive', label: 'Executive', years: '10+ years' }
] as const

// Time Zones
export const TIME_ZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Istanbul',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney'
] as const
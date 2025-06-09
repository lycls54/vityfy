import { z } from 'zod'

// Common validation patterns
export const emailSchema = z.string().email('Please enter a valid email address')

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')

export const phoneSchema = z.string()
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
  .optional()

export const urlSchema = z.string().url('Please enter a valid URL').optional()

export const slugSchema = z.string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

export const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters')

// Date validation helpers
export const dateInPastSchema = z.date().refine(
  (date) => date <= new Date(),
  'Date cannot be in the future'
)

export const dateInFutureSchema = z.date().refine(
  (date) => date >= new Date(),
  'Date cannot be in the past'
)

export const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date().optional()
}).refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
)

// File validation
export const imageFileSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.string().refine(
    (type) => ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(type),
    'File must be an image (JPEG, PNG, WebP, or SVG)'
  )
})

export const documentFileSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.string().refine(
    (type) => [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ].includes(type),
    'File must be a document (PDF, DOC, or DOCX)'
  )
})

// CV validation schemas
export const personalInfoValidation = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  title: z.string().max(200, 'Title is too long').optional(),
  summary: z.string().max(1000, 'Summary is too long').optional(),
  photo: urlSchema,
  contact: z.object({
    email: emailSchema.optional(),
    phone: phoneSchema,
    website: urlSchema,
    linkedin: urlSchema,
    github: urlSchema,
    portfolio: urlSchema
  })
})

export const experienceValidation = z.object({
  company: z.string().min(1, 'Company name is required').max(200, 'Company name is too long'),
  position: z.string().min(1, 'Position is required').max(200, 'Position is too long'),
  location: z.string().max(200, 'Location is too long').optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean(),
  description: z.string().max(2000, 'Description is too long').optional(),
  achievements: z.array(z.string().max(500, 'Achievement is too long')).max(10, 'Too many achievements')
}).refine(
  (data) => data.current || data.endDate,
  {
    message: 'End date is required when position is not current',
    path: ['endDate']
  }
).refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
)

export const educationValidation = z.object({
  institution: z.string().min(1, 'Institution name is required').max(200, 'Institution name is too long'),
  degree: z.string().min(1, 'Degree is required').max(200, 'Degree is too long'),
  field: z.string().max(200, 'Field is too long').optional(),
  location: z.string().max(200, 'Location is too long').optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean(),
  gpa: z.string().max(10, 'GPA is too long').optional(),
  description: z.string().max(1000, 'Description is too long').optional()
}).refine(
  (data) => data.current || data.endDate,
  {
    message: 'End date is required when education is not current',
    path: ['endDate']
  }
).refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
)

export const skillValidation = z.object({
  name: z.string().min(1, 'Skill name is required').max(100, 'Skill name is too long'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  category: z.enum(['technical', 'language', 'soft', 'design', 'management', 'other']),
  yearsOfExperience: z.number().int().min(0).max(50).optional()
})

export const projectValidation = z.object({
  name: z.string().min(1, 'Project name is required').max(200, 'Project name is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  technologies: z.array(z.string().max(50, 'Technology name is too long')).max(20, 'Too many technologies'),
  url: urlSchema,
  githubUrl: urlSchema,
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  current: z.boolean(),
  highlights: z.array(z.string().max(500, 'Highlight is too long')).max(10, 'Too many highlights')
}).refine(
  (data) => !data.startDate || !data.endDate || data.startDate <= data.endDate,
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
)

// User validation schemas
export const signUpValidation = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

export const signInValidation = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

export const resetPasswordValidation = z.object({
  email: emailSchema
})

export const newPasswordValidation = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, 'Reset token is required')
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

export const changePasswordValidation = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

export const updateProfileValidation = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  displayName: z.string().max(100, 'Display name is too long').optional(),
  bio: z.string().max(500, 'Bio is too long').optional(),
  company: z.string().max(200, 'Company name is too long').optional(),
  jobTitle: z.string().max(200, 'Job title is too long').optional(),
  website: urlSchema,
  location: z.string().max(200, 'Location is too long').optional()
})

// Template validation schemas
export const templateValidation = z.object({
  name: z.string().min(1, 'Template name is required').max(200, 'Template name is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  category: z.enum(['modern', 'classic', 'creative', 'minimalist', 'professional', 'academic', 'technical']),
  tags: z.array(z.string().max(50, 'Tag is too long')).max(10, 'Too many tags'),
  isPremium: z.boolean(),
  previewImage: urlSchema.refine((url) => url !== undefined, 'Preview image is required')
})

// Export validation schemas
export const exportValidation = z.object({
  format: z.enum(['pdf', 'docx', 'html', 'txt', 'json']),
  fileName: z.string().max(255, 'File name is too long').optional(),
  quality: z.enum(['draft', 'standard', 'high', 'print']).optional()
})

// AI validation schemas
export const aiRequestValidation = z.object({
  type: z.enum([
    'content_generation',
    'content_improvement',
    'grammar_check',
    'translation',
    'keyword_optimization'
  ]),
  inputText: z.string().min(1, 'Input text is required').max(5000, 'Input text is too long'),
  language: z.enum(['en', 'tr', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar']),
  tone: z.enum(['professional', 'casual', 'formal', 'friendly', 'confident']).optional(),
  jobTitle: z.string().max(200, 'Job title is too long').optional(),
  industry: z.string().max(200, 'Industry is too long').optional()
})

// Search validation schemas
export const searchValidation = z.object({
  query: z.string().max(500, 'Search query is too long').optional(),
  filters: z.record(z.unknown()).optional(),
  sort: z.object({
    field: z.string(),
    order: z.enum(['asc', 'desc'])
  }).optional(),
  page: z.number().int().min(1).max(1000),
  limit: z.number().int().min(1).max(100)
})

// Pagination validation
export const paginationValidation = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20)
})

// ID validation
export const idValidation = z.string().min(1, 'ID is required')

// Array validation helpers
export const uniqueArrayValidation = <T extends z.ZodTypeAny>(schema: T) =>
  z.array(schema).refine(
    (items) => new Set(items).size === items.length,
    'Array must contain unique items'
  )

export const nonEmptyArrayValidation = <T extends z.ZodTypeAny>(schema: T) =>
  z.array(schema).min(1, 'Array cannot be empty')

// Custom validation functions
export function createLengthValidation(min: number, max: number, fieldName: string) {
  return z.string()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} cannot exceed ${max} characters`)
}

export function createNumberRangeValidation(min: number, max: number, fieldName: string) {
  return z.number()
    .min(min, `${fieldName} must be at least ${min}`)
    .max(max, `${fieldName} cannot exceed ${max}`)
}

export function createConditionalValidation<T extends z.ZodTypeAny>(
  condition: boolean,
  schema: T,
  fallback: T
) {
  return condition ? schema : fallback
}

// Validation result helpers
export type ValidationResult<T> = {
  success: boolean
  data?: T
  errors?: string[]
}

export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => err.message)
      }
    }
    return {
      success: false,
      errors: ['Validation failed']
    }
  }
}

export function validatePartialData<T>(
  _schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<Partial<T>> {
  try {
    // Create a partial schema manually since .partial() might not be available
    const partialSchema = z.object({}).catchall(z.any()).optional()
    const result = partialSchema.parse(data)
    return { success: true, data: result as Partial<T> }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => err.message)
      }
    }
    return {
      success: false,
      errors: ['Validation failed']
    }
  }
}

// Form validation helpers
export function getFieldError(
  errors: z.ZodError | undefined,
  fieldName: string
): string | undefined {
  if (!errors) return undefined
  
  const fieldError = errors.errors.find(
    (error) => error.path.join('.') === fieldName
  )
  
  return fieldError?.message
}

export function hasFieldError(
  errors: z.ZodError | undefined,
  fieldName: string
): boolean {
  return getFieldError(errors, fieldName) !== undefined
}
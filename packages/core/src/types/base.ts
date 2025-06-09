import { z } from 'zod'

// Base entity with common fields
export const BaseEntitySchema = z.object({
  id: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().int().positive().default(1)
})

export type BaseEntity = z.infer<typeof BaseEntitySchema>

// Metadata for various entities
export const MetadataSchema = z.record(z.string(), z.unknown()).optional()
export type Metadata = z.infer<typeof MetadataSchema>

// Common status types
export const StatusSchema = z.enum([
  'draft',
  'active',
  'inactive',
  'archived',
  'deleted'
])
export type Status = z.infer<typeof StatusSchema>

// Pagination types
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  total: z.number().int().nonnegative().optional(),
  totalPages: z.number().int().nonnegative().optional()
})

export type Pagination = z.infer<typeof PaginationSchema>

// Sort order
export const SortOrderSchema = z.enum(['asc', 'desc'])
export type SortOrder = z.infer<typeof SortOrderSchema>

// Generic sort type
export interface Sort<T extends string = string> {
  field: T
  order: SortOrder
}

// Filter types
export type FilterOperator = 
  | 'eq' 
  | 'ne' 
  | 'gt' 
  | 'gte' 
  | 'lt' 
  | 'lte' 
  | 'in' 
  | 'nin' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith'

export interface Filter<T = unknown> {
  field: string
  operator: FilterOperator
  value: T
}

// Query parameters
export interface QueryParams<TSortField extends string = string> {
  pagination?: Partial<Pagination>
  sort?: Sort<TSortField>[]
  filters?: Filter[]
  search?: string
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  meta?: {
    pagination?: Pagination
    timestamp: string
    requestId?: string
  }
}

// Error types
export const ErrorTypeSchema = z.enum([
  'VALIDATION_ERROR',
  'AUTHORIZATION_ERROR', 
  'AUTHENTICATION_ERROR',
  'NOT_FOUND_ERROR',
  'CONFLICT_ERROR',
  'RATE_LIMIT_ERROR',
  'INTERNAL_SERVER_ERROR',
  'NETWORK_ERROR',
  'UNKNOWN_ERROR'
])

export type ErrorType = z.infer<typeof ErrorTypeSchema>

export interface AppError {
  type: ErrorType
  message: string
  code?: string
  field?: string
  details?: Record<string, unknown>
}

// Theme types
export const ThemeSchema = z.enum(['light', 'dark', 'system'])
export type Theme = z.infer<typeof ThemeSchema>

// Language/Locale types
export const LanguageSchema = z.enum([
  'en',
  'tr',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'ru',
  'zh',
  'ja',
  'ko',
  'ar'
])
export type Language = z.infer<typeof LanguageSchema>

// File types
export const FileTypeSchema = z.enum([
  'pdf',
  'docx',
  'txt',
  'html',
  'json',
  'jpeg',
  'jpg',
  'png',
  'svg',
  'webp'
])
export type FileType = z.infer<typeof FileTypeSchema>

export interface FileInfo {
  name: string
  size: number
  type: FileType
  mimeType: string
  url?: string
  path?: string
  lastModified?: Date
}
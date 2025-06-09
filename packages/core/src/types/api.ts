import { z } from 'zod'
import { BaseEntitySchema, ErrorTypeSchema, PaginationSchema, SortOrderSchema } from './base'

// HTTP methods
export const HTTPMethodSchema = z.enum([
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS'
])
export type HTTPMethod = z.infer<typeof HTTPMethodSchema>

// API response status
export const APIStatusSchema = z.enum([
  'success',
  'error',
  'pending',
  'partial'
])
export type APIStatus = z.infer<typeof APIStatusSchema>

// Generic API response wrapper
export const APIResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  success: z.boolean(),
  status: APIStatusSchema,
  data: dataSchema.optional(),
  message: z.string().optional(),
  errors: z.array(z.object({
    type: ErrorTypeSchema,
    message: z.string(),
    field: z.string().optional(),
    code: z.string().optional()
  })).optional(),
  meta: z.object({
    requestId: z.string(),
    timestamp: z.string(),
    version: z.string().default('1.0.0'),
    pagination: PaginationSchema.optional(),
    rateLimit: z.object({
      limit: z.number().int().positive(),
      remaining: z.number().int().nonnegative(),
      reset: z.number().int().positive(),
      retryAfter: z.number().int().nonnegative().optional()
    }).optional()
  })
})

// Paginated response
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
  items: z.array(itemSchema),
  pagination: PaginationSchema,
  total: z.number().int().nonnegative()
})

// API request context
export const RequestContextSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  requestId: z.string(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  country: z.string().optional(),
  timestamp: z.date(),
  method: HTTPMethodSchema,
  path: z.string(),
  query: z.record(z.string(), z.unknown()).optional(),
  headers: z.record(z.string(), z.string()).optional()
})

export type RequestContext = z.infer<typeof RequestContextSchema>

// API rate limiting
export const RateLimitSchema = z.object({
  identifier: z.string(), // User ID, IP, API key, etc.
  window: z.enum(['minute', 'hour', 'day']),
  limit: z.number().int().positive(),
  remaining: z.number().int().nonnegative(),
  resetTime: z.date(),
  blocked: z.boolean().default(false),
  blockedUntil: z.date().optional()
})

export type RateLimit = z.infer<typeof RateLimitSchema>

// API key management
export const APIKeySchema = BaseEntitySchema.extend({
  userId: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  
  // Key details
  keyId: z.string(),
  keyHash: z.string(), // Hashed version of the actual key
  prefix: z.string(), // First few characters for identification
  
  // Permissions and scopes
  scopes: z.array(z.enum([
    'cv:read',
    'cv:write',
    'cv:delete',
    'template:read',
    'template:write',
    'export:create',
    'ai:use',
    'user:read',
    'user:write',
    'analytics:read'
  ])).default(['cv:read']),
  
  // Rate limiting
  rateLimit: z.object({
    requestsPerMinute: z.number().int().positive().default(60),
    requestsPerHour: z.number().int().positive().default(1000),
    requestsPerDay: z.number().int().positive().default(10000)
  }).default({}),
  
  // Status and security
  isActive: z.boolean().default(true),
  lastUsedAt: z.date().optional(),
  usageCount: z.number().int().nonnegative().default(0),
  
  // Restrictions
  allowedIPs: z.array(z.string()).optional(),
  allowedDomains: z.array(z.string()).optional(),
  expiresAt: z.date().optional(),
  
  // Metadata
  environment: z.enum(['development', 'staging', 'production']).default('production')
})

export type APIKey = z.infer<typeof APIKeySchema>

// Webhook configuration
export const WebhookSchema = BaseEntitySchema.extend({
  userId: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  
  // Webhook details
  url: z.string().url(),
  secret: z.string().optional(),
  
  // Events to listen for
  events: z.array(z.enum([
    'cv.created',
    'cv.updated',
    'cv.deleted',
    'cv.exported',
    'user.created',
    'user.updated',
    'user.deleted',
    'subscription.created',
    'subscription.updated',
    'subscription.cancelled',
    'export.completed',
    'export.failed'
  ])).min(1),
  
  // Configuration
  isActive: z.boolean().default(true),
  retryCount: z.number().int().nonnegative().default(3),
  timeout: z.number().int().positive().default(30), // seconds
  
  // Security
  verifySSL: z.boolean().default(true),
  customHeaders: z.record(z.string(), z.string()).optional(),
  
  // Statistics
  totalDeliveries: z.number().int().nonnegative().default(0),
  successfulDeliveries: z.number().int().nonnegative().default(0),
  failedDeliveries: z.number().int().nonnegative().default(0),
  lastDeliveryAt: z.date().optional(),
  lastSuccessAt: z.date().optional(),
  lastFailureAt: z.date().optional(),
  lastFailureReason: z.string().optional()
})

export type Webhook = z.infer<typeof WebhookSchema>

// Webhook delivery
export const WebhookDeliverySchema = z.object({
  id: z.string(),
  webhookId: z.string(),
  
  // Event details
  event: z.string(),
  payload: z.record(z.string(), z.unknown()),
  
  // Delivery details
  url: z.string().url(),
  httpMethod: HTTPMethodSchema.default('POST'),
  headers: z.record(z.string(), z.string()),
  
  // Response
  statusCode: z.number().int().optional(),
  responseBody: z.string().optional(),
  responseHeaders: z.record(z.string(), z.string()).optional(),
  
  // Timing
  deliveredAt: z.date(),
  duration: z.number().nonnegative().optional(), // milliseconds
  
  // Status
  success: z.boolean(),
  error: z.string().optional(),
  retryCount: z.number().int().nonnegative().default(0),
  nextRetryAt: z.date().optional()
})

export type WebhookDelivery = z.infer<typeof WebhookDeliverySchema>

// API audit log
export const APIAuditLogSchema = z.object({
  id: z.string(),
  
  // Request details
  method: HTTPMethodSchema,
  path: z.string(),
  query: z.record(z.string(), z.unknown()).optional(),
  body: z.record(z.string(), z.unknown()).optional(),
  
  // Response details
  statusCode: z.number().int(),
  responseSize: z.number().int().nonnegative().optional(),
  duration: z.number().nonnegative(), // milliseconds
  
  // User context
  userId: z.string().optional(),
  apiKeyId: z.string().optional(),
  sessionId: z.string().optional(),
  
  // Client information
  userAgent: z.string().optional(),
  ipAddress: z.string(),
  country: z.string().optional(),
  
  // Security
  rateLimited: z.boolean().default(false),
  blocked: z.boolean().default(false),
  reason: z.string().optional(),
  
  // Metadata
  requestId: z.string(),
  timestamp: z.date(),
  environment: z.enum(['development', 'staging', 'production'])
})

export type APIAuditLog = z.infer<typeof APIAuditLogSchema>

// API metrics
export const APIMetricsSchema = z.object({
  // Time period
  period: z.enum(['minute', 'hour', 'day', 'week', 'month']),
  timestamp: z.date(),
  
  // Request metrics
  totalRequests: z.number().int().nonnegative().default(0),
  successfulRequests: z.number().int().nonnegative().default(0),
  failedRequests: z.number().int().nonnegative().default(0),
  
  // Performance metrics
  averageResponseTime: z.number().nonnegative().optional(),
  p95ResponseTime: z.number().nonnegative().optional(),
  p99ResponseTime: z.number().nonnegative().optional(),
  
  // Status code breakdown
  statusCodes: z.record(z.string(), z.number().int().nonnegative()).default({}),
  
  // Endpoint metrics
  endpoints: z.record(z.string(), z.object({
    requests: z.number().int().nonnegative(),
    averageResponseTime: z.number().nonnegative(),
    errorRate: z.number().min(0).max(1)
  })).default({}),
  
  // User metrics
  uniqueUsers: z.number().int().nonnegative().default(0),
  apiKeyUsage: z.record(z.string(), z.number().int().nonnegative()).default({}),
  
  // Error tracking
  errors: z.array(z.object({
    type: ErrorTypeSchema,
    count: z.number().int().nonnegative(),
    percentage: z.number().min(0).max(100)
  })).default([])
})

export type APIMetrics = z.infer<typeof APIMetricsSchema>

// Health check
export const HealthCheckSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  timestamp: z.date(),
  version: z.string(),
  uptime: z.number().nonnegative(), // seconds
  
  // Service status
  services: z.record(z.string(), z.object({
    status: z.enum(['healthy', 'degraded', 'unhealthy']),
    responseTime: z.number().nonnegative().optional(),
    lastCheck: z.date(),
    error: z.string().optional()
  })),
  
  // System metrics
  system: z.object({
    memory: z.object({
      used: z.number().nonnegative(),
      total: z.number().positive(),
      percentage: z.number().min(0).max(100)
    }).optional(),
    cpu: z.object({
      usage: z.number().min(0).max(100)
    }).optional(),
    disk: z.object({
      used: z.number().nonnegative(),
      total: z.number().positive(),
      percentage: z.number().min(0).max(100)
    }).optional()
  }).optional()
})

export type HealthCheck = z.infer<typeof HealthCheckSchema>

// API error response
export const APIErrorSchema = z.object({
  success: z.literal(false),
  status: z.literal('error'),
  error: z.object({
    type: ErrorTypeSchema,
    message: z.string(),
    code: z.string().optional(),
    field: z.string().optional(),
    details: z.record(z.string(), z.unknown()).optional()
  }),
  meta: z.object({
    requestId: z.string(),
    timestamp: z.string(),
    version: z.string(),
    documentation: z.string().url().optional()
  })
})

export type APIError = z.infer<typeof APIErrorSchema>

// API versioning
export const APIVersionSchema = z.object({
  version: z.string(),
  releaseDate: z.date(),
  status: z.enum(['current', 'supported', 'deprecated', 'retired']),
  deprecationDate: z.date().optional(),
  retirementDate: z.date().optional(),
  
  // Changes
  breaking: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  fixes: z.array(z.string()).default([]),
  
  // Documentation
  documentationUrl: z.string().url().optional(),
  migrationGuideUrl: z.string().url().optional()
})

export type APIVersion = z.infer<typeof APIVersionSchema>

// Batch request
export const BatchRequestSchema = z.object({
  id: z.string(),
  requests: z.array(z.object({
    id: z.string(),
    method: HTTPMethodSchema,
    path: z.string(),
    body: z.record(z.string(), z.unknown()).optional(),
    headers: z.record(z.string(), z.string()).optional()
  })).min(1).max(100), // Limit batch size
  
  // Configuration
  stopOnError: z.boolean().default(false),
  parallel: z.boolean().default(true),
  
  // Metadata
  userId: z.string().optional(),
  createdAt: z.date()
})

export type BatchRequest = z.infer<typeof BatchRequestSchema>

// Batch response
export const BatchResponseSchema = z.object({
  id: z.string(),
  responses: z.array(z.object({
    id: z.string(),
    statusCode: z.number().int(),
    body: z.record(z.string(), z.unknown()).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    error: z.string().optional()
  })),
  
  // Summary
  totalRequests: z.number().int().positive(),
  successfulRequests: z.number().int().nonnegative(),
  failedRequests: z.number().int().nonnegative(),
  
  // Timing
  startedAt: z.date(),
  completedAt: z.date(),
  duration: z.number().nonnegative() // milliseconds
})

export type BatchResponse = z.infer<typeof BatchResponseSchema>

// File upload
export const FileUploadSchema = z.object({
  id: z.string(),
  userId: z.string(),
  
  // File details
  originalName: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number().int().nonnegative(),
  
  // Storage
  url: z.string().url(),
  storageKey: z.string(),
  bucket: z.string().optional(),
  
  // Metadata
  metadata: z.record(z.string(), z.unknown()).optional(),
  
  // Processing status
  status: z.enum(['uploading', 'processing', 'completed', 'failed']).default('uploading'),
  processedAt: z.date().optional(),
  error: z.string().optional(),
  
  // Access control
  isPublic: z.boolean().default(false),
  expiresAt: z.date().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
})

export type FileUpload = z.infer<typeof FileUploadSchema>

// Search parameters
export const SearchParamsSchema = z.object({
  query: z.string().optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  sort: z.object({
    field: z.string(),
    order: SortOrderSchema
  }).optional(),
  pagination: PaginationSchema.optional(),
  facets: z.array(z.string()).optional(),
  highlight: z.boolean().default(false)
})

export type SearchParams = z.infer<typeof SearchParamsSchema>

// Search result
export const SearchResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
  items: z.array(z.object({
    item: itemSchema,
    score: z.number().min(0).max(1).optional(),
    highlights: z.record(z.string(), z.array(z.string())).optional()
  })),
  
  // Metadata
  total: z.number().int().nonnegative(),
  took: z.number().nonnegative(), // milliseconds
  
  // Facets
  facets: z.record(z.string(), z.array(z.object({
    value: z.string(),
    count: z.number().int().nonnegative()
  }))).optional(),
  
  // Suggestions
  suggestions: z.array(z.string()).optional()
})

// Cache control
export const CacheControlSchema = z.object({
  maxAge: z.number().int().nonnegative().optional(), // seconds
  sMaxAge: z.number().int().nonnegative().optional(), // seconds
  noCache: z.boolean().default(false),
  noStore: z.boolean().default(false),
  mustRevalidate: z.boolean().default(false),
  private: z.boolean().default(false),
  public: z.boolean().default(false),
  immutable: z.boolean().default(false),
  staleWhileRevalidate: z.number().int().nonnegative().optional(), // seconds
  staleIfError: z.number().int().nonnegative().optional() // seconds
})

export type CacheControl = z.infer<typeof CacheControlSchema>
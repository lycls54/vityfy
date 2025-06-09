import { z } from 'zod'
import { BaseEntitySchema, MetadataSchema } from './base'

// Export format types
export const ExportFormatSchema = z.enum([
  'pdf',
  'docx',
  'html',
  'txt',
  'json',
  'jpeg',
  'png'
])
export type ExportFormat = z.infer<typeof ExportFormatSchema>

// Export quality settings
export const ExportQualitySchema = z.enum([
  'draft',
  'standard',
  'high',
  'print'
])
export type ExportQuality = z.infer<typeof ExportQualitySchema>

// Page size options
export const PageSizeSchema = z.enum([
  'A4',
  'A3',
  'A5',
  'Letter',
  'Legal',
  'Tabloid'
])
export type PageSize = z.infer<typeof PageSizeSchema>

// Page orientation
export const PageOrientationSchema = z.enum([
  'portrait',
  'landscape'
])
export type PageOrientation = z.infer<typeof PageOrientationSchema>

// PDF-specific options
export const PDFOptionsSchema = z.object({
  pageSize: PageSizeSchema.default('A4'),
  orientation: PageOrientationSchema.default('portrait'),
  margins: z.object({
    top: z.number().nonnegative().default(20),
    right: z.number().nonnegative().default(20),
    bottom: z.number().nonnegative().default(20),
    left: z.number().nonnegative().default(20)
  }).default({}),
  quality: ExportQualitySchema.default('standard'),
  embedFonts: z.boolean().default(true),
  enableAccessibility: z.boolean().default(true),
  metadata: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    subject: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    creator: z.string().default('CVCraft'),
    producer: z.string().default('CVCraft')
  }).optional(),
  watermark: z.object({
    enabled: z.boolean().default(false),
    text: z.string().optional(),
    opacity: z.number().min(0).max(1).default(0.1),
    position: z.enum(['center', 'bottom-right', 'bottom-left']).default('bottom-right')
  }).optional(),
  security: z.object({
    enablePrinting: z.boolean().default(true),
    enableCopying: z.boolean().default(true),
    enableModification: z.boolean().default(false),
    enableAnnotation: z.boolean().default(false),
    password: z.string().optional()
  }).optional()
})
export type PDFOptions = z.infer<typeof PDFOptionsSchema>

// DOCX-specific options
export const DOCXOptionsSchema = z.object({
  pageSize: PageSizeSchema.default('A4'),
  orientation: PageOrientationSchema.default('portrait'),
  margins: z.object({
    top: z.number().nonnegative().default(20),
    right: z.number().nonnegative().default(20),
    bottom: z.number().nonnegative().default(20),
    left: z.number().nonnegative().default(20)
  }).default({}),
  enableComments: z.boolean().default(false),
  enableTrackChanges: z.boolean().default(false),
  includeProperties: z.boolean().default(true),
  compatibility: z.enum(['2007', '2010', '2013', '2016', '2019']).default('2016')
})
export type DOCXOptions = z.infer<typeof DOCXOptionsSchema>

// HTML-specific options
export const HTMLOptionsSchema = z.object({
  includeCSS: z.boolean().default(true),
  inlineCSS: z.boolean().default(false),
  includeScripts: z.boolean().default(false),
  minify: z.boolean().default(false),
  responsive: z.boolean().default(true),
  darkModeSupport: z.boolean().default(false),
  printOptimized: z.boolean().default(true),
  encoding: z.enum(['UTF-8', 'ISO-8859-1']).default('UTF-8')
})
export type HTMLOptions = z.infer<typeof HTMLOptionsSchema>

// Image-specific options
export const ImageOptionsSchema = z.object({
  width: z.number().int().positive().default(1200),
  height: z.number().int().positive().optional(),
  quality: z.number().int().min(1).max(100).default(90),
  format: z.enum(['jpeg', 'png', 'webp']).default('png'),
  background: z.string().regex(/^#[0-9A-F]{6}$/i).default('#FFFFFF'),
  deviceScaleFactor: z.number().positive().default(2)
})
export type ImageOptions = z.infer<typeof ImageOptionsSchema>

// Export status types
export const ExportStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
  'expired'
])
export type ExportStatus = z.infer<typeof ExportStatusSchema>

// Export priority
export const ExportPrioritySchema = z.enum([
  'low',
  'normal',
  'high',
  'urgent'
])
export type ExportPriority = z.infer<typeof ExportPrioritySchema>

// Export statistics
export const ExportStatsSchema = z.object({
  fileSize: z.number().nonnegative().optional(),
  pageCount: z.number().int().positive().optional(),
  processingTime: z.number().nonnegative().optional(), // in milliseconds
  downloadCount: z.number().int().nonnegative().default(0),
  lastDownloadedAt: z.date().optional()
})
export type ExportStats = z.infer<typeof ExportStatsSchema>

// Export result
export const ExportResultSchema = z.object({
  success: z.boolean(),
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().nonnegative().optional(),
  mimeType: z.string().optional(),
  downloadUrl: z.string().url().optional(),
  expiresAt: z.date().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional()
  }).optional()
})
export type ExportResult = z.infer<typeof ExportResultSchema>

// Main Export Job schema
export const ExportJobSchema = BaseEntitySchema.extend({
  // Job identification
  userId: z.string(),
  cvId: z.string(),
  templateId: z.string().optional(),
  
  // Export configuration
  format: ExportFormatSchema,
  fileName: z.string().optional(),
  
  // Format-specific options
  pdfOptions: PDFOptionsSchema.optional(),
  docxOptions: DOCXOptionsSchema.optional(),
  htmlOptions: HTMLOptionsSchema.optional(),
  imageOptions: ImageOptionsSchema.optional(),
  
  // Job management
  status: ExportStatusSchema.default('pending'),
  priority: ExportPrioritySchema.default('normal'),
  
  // Progress tracking
  progress: z.number().min(0).max(100).default(0),
  currentStep: z.string().optional(),
  totalSteps: z.number().int().positive().optional(),
  
  // Timing
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  
  // Result
  result: ExportResultSchema.optional(),
  
  // Statistics
  stats: ExportStatsSchema.default({}),
  
  // Error handling
  errorMessage: z.string().optional(),
  retryCount: z.number().int().nonnegative().default(0),
  maxRetries: z.number().int().nonnegative().default(3),
  
  // Metadata
  metadata: MetadataSchema
})

export type ExportJob = z.infer<typeof ExportJobSchema>

// Export job creation
export const CreateExportJobSchema = ExportJobSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
  status: true,
  progress: true,
  startedAt: true,
  completedAt: true,
  result: true,
  stats: true,
  errorMessage: true,
  retryCount: true
})

export type CreateExportJob = z.infer<typeof CreateExportJobSchema>

// Export job update
export const UpdateExportJobSchema = ExportJobSchema.partial().omit({
  id: true,
  userId: true,
  cvId: true,
  createdAt: true
})

export type UpdateExportJob = z.infer<typeof UpdateExportJobSchema>

// Export template (for batch exports)
export const ExportTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  userId: z.string(),
  
  // Default export settings
  defaultFormat: ExportFormatSchema,
  defaultOptions: z.object({
    pdf: PDFOptionsSchema.optional(),
    docx: DOCXOptionsSchema.optional(),
    html: HTMLOptionsSchema.optional(),
    image: ImageOptionsSchema.optional()
  }).optional(),
  
  // Template settings
  isDefault: z.boolean().default(false),
  isShared: z.boolean().default(false),
  
  createdAt: z.date(),
  updatedAt: z.date()
})

export type ExportTemplate = z.infer<typeof ExportTemplateSchema>

// Batch export job
export const BatchExportJobSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  
  // CVs to export
  cvIds: z.array(z.string()).min(1),
  
  // Export settings
  format: ExportFormatSchema,
  options: z.union([
    PDFOptionsSchema,
    DOCXOptionsSchema,
    HTMLOptionsSchema,
    ImageOptionsSchema
  ]).optional(),
  
  // Batch settings
  zipOutput: z.boolean().default(true),
  zipFileName: z.string().optional(),
  
  // Status and progress
  status: ExportStatusSchema.default('pending'),
  totalJobs: z.number().int().positive(),
  completedJobs: z.number().int().nonnegative().default(0),
  failedJobs: z.number().int().nonnegative().default(0),
  
  // Individual job IDs
  jobIds: z.array(z.string()).default([]),
  
  // Result
  result: z.object({
    success: z.boolean(),
    zipUrl: z.string().url().optional(),
    zipSize: z.number().nonnegative().optional(),
    individualResults: z.array(z.object({
      cvId: z.string(),
      jobId: z.string(),
      success: z.boolean(),
      fileUrl: z.string().url().optional(),
      error: z.string().optional()
    })).default([]),
    expiresAt: z.date().optional()
  }).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional()
})

export type BatchExportJob = z.infer<typeof BatchExportJobSchema>

// Export quota and limits
export const ExportQuotaSchema = z.object({
  userId: z.string(),
  period: z.enum(['daily', 'weekly', 'monthly']),
  
  // Limits
  maxExports: z.number().int().positive(),
  maxFileSize: z.number().positive(), // in bytes
  maxBatchSize: z.number().int().positive().default(10),
  
  // Current usage
  currentExports: z.number().int().nonnegative().default(0),
  currentFileSize: z.number().nonnegative().default(0),
  
  // Reset timing
  periodStart: z.date(),
  periodEnd: z.date(),
  
  // Premium features
  allowPremiumFormats: z.boolean().default(false),
  allowBatchExport: z.boolean().default(false),
  allowWatermarkRemoval: z.boolean().default(false)
})

export type ExportQuota = z.infer<typeof ExportQuotaSchema>

// Export analytics
export const ExportAnalyticsSchema = z.object({
  userId: z.string().optional(),
  cvId: z.string().optional(),
  templateId: z.string().optional(),
  
  // Event data
  format: ExportFormatSchema,
  quality: ExportQualitySchema.optional(),
  fileSize: z.number().nonnegative().optional(),
  processingTime: z.number().nonnegative().optional(),
  
  // User context
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  country: z.string().optional(),
  device: z.enum(['desktop', 'mobile', 'tablet']).optional(),
  
  // Success metrics
  success: z.boolean(),
  errorType: z.string().optional(),
  
  timestamp: z.date()
})

export type ExportAnalytics = z.infer<typeof ExportAnalyticsSchema>

// Export webhook
export const ExportWebhookSchema = z.object({
  id: z.string(),
  userId: z.string(),
  url: z.string().url(),
  secret: z.string().optional(),
  
  // Events to listen for
  events: z.array(z.enum([
    'export.started',
    'export.completed',
    'export.failed',
    'export.cancelled',
    'batch.completed'
  ])).default(['export.completed']),
  
  // Configuration
  active: z.boolean().default(true),
  retryCount: z.number().int().nonnegative().default(3),
  timeout: z.number().int().positive().default(30), // seconds
  
  // Statistics
  totalDeliveries: z.number().int().nonnegative().default(0),
  successfulDeliveries: z.number().int().nonnegative().default(0),
  lastDeliveryAt: z.date().optional(),
  lastSuccessAt: z.date().optional(),
  
  createdAt: z.date(),
  updatedAt: z.date()
})

export type ExportWebhook = z.infer<typeof ExportWebhookSchema>

// Export history entry
export const ExportHistorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  cvId: z.string(),
  jobId: z.string(),
  
  // Export details
  format: ExportFormatSchema,
  fileName: z.string(),
  fileSize: z.number().nonnegative().optional(),
  
  // Status
  success: z.boolean(),
  downloadCount: z.number().int().nonnegative().default(0),
  
  // URLs (may expire)
  fileUrl: z.string().url().optional(),
  downloadUrl: z.string().url().optional(),
  expiresAt: z.date().optional(),
  
  // Timestamps
  exportedAt: z.date(),
  lastDownloadedAt: z.date().optional(),
  
  // Metadata
  metadata: MetadataSchema
})

export type ExportHistory = z.infer<typeof ExportHistorySchema>
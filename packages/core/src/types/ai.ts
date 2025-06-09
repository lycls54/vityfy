import { z } from 'zod'
import { BaseEntitySchema, MetadataSchema, LanguageSchema } from './base'

// AI provider types
export const AIProviderSchema = z.enum([
  'openai',
  'anthropic',
  'google',
  'azure',
  'huggingface',
  'custom'
])
export type AIProvider = z.infer<typeof AIProviderSchema>

// AI model types
export const AIModelSchema = z.enum([
  'gpt-3.5-turbo',
  'gpt-4',
  'gpt-4-turbo',
  'claude-3-haiku',
  'claude-3-sonnet',
  'claude-3-opus',
  'gemini-pro',
  'palm-2'
])
export type AIModel = z.infer<typeof AIModelSchema>

// AI service types
export const AIServiceTypeSchema = z.enum([
  'content_generation',
  'content_improvement',
  'grammar_check',
  'translation',
  'keyword_optimization',
  'skill_suggestion',
  'job_matching',
  'resume_scoring',
  'interview_preparation',
  'cover_letter_generation'
])
export type AIServiceType = z.infer<typeof AIServiceTypeSchema>

// Content type for AI processing
export const ContentTypeSchema = z.enum([
  'summary',
  'experience_description',
  'skill_description',
  'achievement',
  'cover_letter',
  'job_description',
  'full_cv',
  'section_content'
])
export type ContentType = z.infer<typeof ContentTypeSchema>

// AI processing mode
export const ProcessingModeSchema = z.enum([
  'generate',
  'improve',
  'rewrite',
  'expand',
  'summarize',
  'translate',
  'optimize'
])
export type ProcessingMode = z.infer<typeof ProcessingModeSchema>

// Tone and style options
export const ToneSchema = z.enum([
  'professional',
  'casual',
  'formal',
  'friendly',
  'confident',
  'humble',
  'enthusiastic',
  'neutral'
])
export type Tone = z.infer<typeof ToneSchema>

export const WritingStyleSchema = z.enum([
  'concise',
  'detailed',
  'bullet_points',
  'paragraph',
  'technical',
  'creative',
  'academic',
  'business'
])
export type WritingStyle = z.infer<typeof WritingStyleSchema>

// AI request configuration
export const AIRequestConfigSchema = z.object({
  provider: AIProviderSchema,
  model: AIModelSchema,
  serviceType: AIServiceTypeSchema,
  mode: ProcessingModeSchema,
  
  // Content configuration
  contentType: ContentTypeSchema,
  language: LanguageSchema.default('en'),
  tone: ToneSchema.default('professional'),
  style: WritingStyleSchema.default('concise'),
  
  // Generation parameters
  maxTokens: z.number().int().positive().default(1000),
  temperature: z.number().min(0).max(2).default(0.7),
  topP: z.number().min(0).max(1).default(1),
  frequencyPenalty: z.number().min(-2).max(2).default(0),
  presencePenalty: z.number().min(-2).max(2).default(0),
  
  // Context
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'executive']).optional(),
  targetCompany: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  
  // Constraints
  maxLength: z.number().int().positive().optional(),
  minLength: z.number().int().positive().optional(),
  includeKeywords: z.array(z.string()).default([]),
  excludeWords: z.array(z.string()).default([]),
  
  // Formatting preferences
  useBulletPoints: z.boolean().optional(),
  includeMetrics: z.boolean().default(true),
  includeAchievements: z.boolean().default(true),
  formalLanguage: z.boolean().default(true)
})

export type AIRequestConfig = z.infer<typeof AIRequestConfigSchema>

// AI response quality metrics
export const AIQualityMetricsSchema = z.object({
  relevance: z.number().min(0).max(1).optional(),
  coherence: z.number().min(0).max(1).optional(),
  grammar: z.number().min(0).max(1).optional(),
  readability: z.number().min(0).max(1).optional(),
  keywordMatch: z.number().min(0).max(1).optional(),
  overall: z.number().min(0).max(1).optional()
})

export type AIQualityMetrics = z.infer<typeof AIQualityMetricsSchema>

// AI processing result
export const AIResultSchema = z.object({
  success: z.boolean(),
  content: z.string().optional(),
  alternatives: z.array(z.string()).default([]),
  suggestions: z.array(z.string()).default([]),
  
  // Quality assessment
  quality: AIQualityMetricsSchema.optional(),
  confidence: z.number().min(0).max(1).optional(),
  
  // Usage statistics
  tokensUsed: z.number().int().nonnegative().optional(),
  processingTime: z.number().nonnegative().optional(),
  
  // Error information
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional()
  }).optional(),
  
  // Metadata
  modelUsed: AIModelSchema.optional(),
  providerUsed: AIProviderSchema.optional(),
  requestId: z.string().optional()
})

export type AIResult = z.infer<typeof AIResultSchema>

// Main AI request schema
export const AIRequestSchema = BaseEntitySchema.extend({
  userId: z.string(),
  cvId: z.string().optional(),
  
  // Request details
  type: AIServiceTypeSchema,
  config: AIRequestConfigSchema,
  
  // Input data
  inputText: z.string(),
  context: z.record(z.string(), z.unknown()).optional(),
  
  // Processing status
  status: z.enum([
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled'
  ]).default('pending'),
  
  // Results
  result: AIResultSchema.optional(),
  
  // User feedback
  userRating: z.number().int().min(1).max(5).optional(),
  userFeedback: z.string().optional(),
  wasUsed: z.boolean().default(false),
  
  // System tracking
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  retryCount: z.number().int().nonnegative().default(0),
  maxRetries: z.number().int().positive().default(3),
  
  // Timing
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  
  // Metadata
  metadata: MetadataSchema
})

export type AIRequest = z.infer<typeof AIRequestSchema>

// AI request creation
export const CreateAIRequestSchema = AIRequestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
  status: true,
  result: true,
  userRating: true,
  userFeedback: true,
  wasUsed: true,
  retryCount: true,
  startedAt: true,
  completedAt: true
})

export type CreateAIRequest = z.infer<typeof CreateAIRequestSchema>

// AI suggestion
export const AISuggestionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cvId: z.string(),
  
  // Suggestion details
  type: z.enum([
    'skill_addition',
    'experience_improvement',
    'keyword_optimization',
    'structure_improvement',
    'content_enhancement',
    'ats_optimization'
  ]),
  
  title: z.string(),
  description: z.string(),
  content: z.string().optional(),
  
  // Target information
  targetSection: z.string(),
  targetField: z.string().optional(),
  
  // Confidence and priority
  confidence: z.number().min(0).max(1),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  
  // User interaction
  status: z.enum(['pending', 'accepted', 'rejected', 'dismissed']).default('pending'),
  acceptedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  
  // Context
  reasoning: z.string().optional(),
  beforeText: z.string().optional(),
  afterText: z.string().optional(),
  
  createdAt: z.date(),
  expiresAt: z.date().optional()
})

export type AISuggestion = z.infer<typeof AISuggestionSchema>

// AI usage quota
export const AIQuotaSchema = z.object({
  userId: z.string(),
  period: z.enum(['daily', 'weekly', 'monthly']),
  
  // Limits by service type
  limits: z.record(AIServiceTypeSchema, z.number().int().positive()),
  
  // Current usage
  usage: z.record(AIServiceTypeSchema, z.number().int().nonnegative()).default({}),
  
  // Token limits
  maxTokensPerRequest: z.number().int().positive().default(2000),
  maxTokensPerPeriod: z.number().int().positive().default(50000),
  tokensUsed: z.number().int().nonnegative().default(0),
  
  // Reset timing
  periodStart: z.date(),
  periodEnd: z.date(),
  
  // Premium features
  isPremium: z.boolean().default(false),
  premiumFeatures: z.array(z.string()).default([])
})

export type AIQuota = z.infer<typeof AIQuotaSchema>

// AI training data
export const AITrainingDataSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  
  // Data classification
  type: ContentTypeSchema,
  category: z.string(),
  
  // Content
  input: z.string(),
  expectedOutput: z.string(),
  actualOutput: z.string().optional(),
  
  // Quality metrics
  quality: AIQualityMetricsSchema.optional(),
  humanRating: z.number().int().min(1).max(5).optional(),
  
  // Context
  context: z.record(z.string(), z.unknown()).optional(),
  
  // Usage
  isApproved: z.boolean().default(false),
  isUsedForTraining: z.boolean().default(false),
  
  createdAt: z.date(),
  approvedAt: z.date().optional()
})

export type AITrainingData = z.infer<typeof AITrainingDataSchema>

// AI analytics
export const AIAnalyticsSchema = z.object({
  userId: z.string().optional(),
  
  // Request details
  serviceType: AIServiceTypeSchema,
  provider: AIProviderSchema,
  model: AIModelSchema,
  
  // Performance metrics
  tokensUsed: z.number().int().nonnegative(),
  processingTime: z.number().nonnegative(),
  success: z.boolean(),
  
  // Quality metrics
  quality: AIQualityMetricsSchema.optional(),
  userRating: z.number().int().min(1).max(5).optional(),
  wasUsed: z.boolean(),
  
  // Context
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  country: z.string().optional(),
  
  timestamp: z.date()
})

export type AIAnalytics = z.infer<typeof AIAnalyticsSchema>
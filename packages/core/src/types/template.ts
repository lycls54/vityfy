import { z } from 'zod'
import { BaseEntitySchema, StatusSchema, MetadataSchema, LanguageSchema } from './base'

// Template category types
export const TemplateCategorySchema = z.enum([
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
])
export type TemplateCategory = z.infer<typeof TemplateCategorySchema>

// Template style types
export const TemplateStyleSchema = z.enum([
  'single-column',
  'two-column',
  'three-column',
  'sidebar',
  'timeline',
  'grid',
  'card-based',
  'infographic'
])
export type TemplateStyle = z.infer<typeof TemplateStyleSchema>

// Color scheme types
export const ColorSchemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  primary: z.string().regex(/^#[0-9A-F]{6}$/i),
  secondary: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  accent: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  text: z.string().regex(/^#[0-9A-F]{6}$/i).default('#000000'),
  background: z.string().regex(/^#[0-9A-F]{6}$/i).default('#FFFFFF'),
  muted: z.string().regex(/^#[0-9A-F]{6}$/i).optional()
})
export type ColorScheme = z.infer<typeof ColorSchemeSchema>

// Typography settings
export const TypographySchema = z.object({
  headingFont: z.string().default('Inter'),
  bodyFont: z.string().default('Inter'),
  headingWeight: z.enum(['300', '400', '500', '600', '700', '800']).default('600'),
  bodyWeight: z.enum(['300', '400', '500', '600']).default('400'),
  headingSize: z.object({
    h1: z.number().positive().default(24),
    h2: z.number().positive().default(20),
    h3: z.number().positive().default(18),
    h4: z.number().positive().default(16)
  }).default({}),
  bodySize: z.number().positive().default(14),
  lineHeight: z.number().positive().default(1.5)
})
export type Typography = z.infer<typeof TypographySchema>

// Layout settings
export const LayoutSchema = z.object({
  style: TemplateStyleSchema.default('single-column'),
  margins: z.object({
    top: z.number().nonnegative().default(20),
    right: z.number().nonnegative().default(20),
    bottom: z.number().nonnegative().default(20),
    left: z.number().nonnegative().default(20)
  }).default({}),
  spacing: z.object({
    section: z.number().nonnegative().default(16),
    item: z.number().nonnegative().default(8),
    line: z.number().nonnegative().default(4)
  }).default({}),
  columns: z.object({
    count: z.number().int().positive().max(3).default(1),
    gap: z.number().nonnegative().default(20),
    ratio: z.array(z.number().positive()).optional()
  }).default({})
})
export type Layout = z.infer<typeof LayoutSchema>

// CV Section type for section configuration
export const CVSectionTypeSchema = z.enum([
  'personalInfo',
  'experience',
  'education',
  'skills',
  'languages',
  'projects',
  'certifications',
  'awards',
  'publications',
  'volunteer',
  'references',
  'customSections'
])
export type CVSectionType = z.infer<typeof CVSectionTypeSchema>

// Section configuration
export const SectionConfigSchema = z.object({
  id: CVSectionTypeSchema,
  enabled: z.boolean().default(true),
  title: z.string(),
  icon: z.string().optional(),
  order: z.number().int().nonnegative(),
  showTitle: z.boolean().default(true),
  showDivider: z.boolean().default(true),
  customStyles: z.record(z.string(), z.unknown()).optional()
})
export type SectionConfig = z.infer<typeof SectionConfigSchema>

// Template assets
export const TemplateAssetSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'icon', 'font', 'css']),
  name: z.string(),
  url: z.string().url(),
  size: z.number().positive().optional(),
  mimeType: z.string().optional(),
  description: z.string().optional()
})
export type TemplateAsset = z.infer<typeof TemplateAssetSchema>

// Template customization options
export const CustomizationOptionsSchema = z.object({
  colorSchemes: z.array(ColorSchemeSchema).default([]),
  typography: z.object({
    fonts: z.array(z.string()).default(['Inter', 'Roboto', 'Open Sans']),
    weights: z.array(z.string()).default(['400', '500', '600']),
    sizes: z.object({
      min: z.number().positive().default(10),
      max: z.number().positive().default(24),
      default: z.number().positive().default(14)
    }).default({})
  }).default({}),
  layout: z.object({
    styles: z.array(TemplateStyleSchema).default(['single-column']),
    customizable: z.boolean().default(true)
  }).default({}),
  sections: z.object({
    configurable: z.boolean().default(true),
    reorderable: z.boolean().default(true),
    hideable: z.boolean().default(true)
  }).default({})
})
export type CustomizationOptions = z.infer<typeof CustomizationOptionsSchema>

// Template compatibility
export const CompatibilitySchema = z.object({
  minVersion: z.string().default('1.0.0'),
  maxVersion: z.string().optional(),
  supportedFormats: z.array(z.enum(['pdf', 'html', 'docx'])).default(['pdf']),
  supportedLanguages: z.array(LanguageSchema).default(['en']),
  requiredFeatures: z.array(z.string()).default([]),
  limitations: z.object({
    maxPages: z.number().int().positive().optional(),
    maxSections: z.number().int().positive().optional(),
    maxCharacters: z.number().int().positive().optional()
  }).optional()
})
export type Compatibility = z.infer<typeof CompatibilitySchema>

// Template SEO
export const TemplateSEOSchema = z.object({
  keywords: z.array(z.string()).default([]),
  industry: z.array(z.string()).default([]),
  jobLevel: z.array(z.enum([
    'entry-level',
    'mid-level',
    'senior-level',
    'executive',
    'freelancer'
  ])).default([]),
  targetAudience: z.array(z.string()).default([])
})
export type TemplateSEO = z.infer<typeof TemplateSEOSchema>

// Template analytics
export const TemplateAnalyticsSchema = z.object({
  viewCount: z.number().int().nonnegative().default(0),
  downloadCount: z.number().int().nonnegative().default(0),
  useCount: z.number().int().nonnegative().default(0),
  rating: z.number().min(0).max(5).optional(),
  ratingCount: z.number().int().nonnegative().default(0),
  conversionRate: z.number().min(0).max(1).optional(),
  lastUsedAt: z.date().optional()
})
export type TemplateAnalytics = z.infer<typeof TemplateAnalyticsSchema>

// Main Template schema
export const TemplateSchema = BaseEntitySchema.extend({
  // Basic information
  name: z.string().min(1, 'Template name is required'),
  slug: z.string().min(1),
  description: z.string().optional(),
  shortDescription: z.string().max(200).optional(),
  
  // Categorization
  category: TemplateCategorySchema,
  tags: z.array(z.string()).default([]),
  
  // Status and visibility
  status: StatusSchema.default('draft'),
  isPublic: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isPremium: z.boolean().default(false),
  
  // Creator information
  createdBy: z.string(),
  authorName: z.string().optional(),
  authorEmail: z.string().email().optional(),
  authorUrl: z.string().url().optional(),
  
  // Template files and assets
  previewImage: z.string().url(),
  thumbnailImage: z.string().url().optional(),
  templateFile: z.string().url(), // Main template file (HTML/React component)
  stylesheetFile: z.string().url().optional(),
  assets: z.array(TemplateAssetSchema).default([]),
  
  // Design configuration
  colorScheme: ColorSchemeSchema,
  typography: TypographySchema.default({}),
  layout: LayoutSchema.default({}),
  sections: z.array(SectionConfigSchema).default([]),
  
  // Customization
  customizationOptions: CustomizationOptionsSchema.default({}),
  defaultSettings: z.record(z.string(), z.unknown()).default({}),
  
  // Technical specifications
  compatibility: CompatibilitySchema.default({}),
  templateEngine: z.enum(['react', 'html', 'pdf']).default('react'),
  
  // SEO and discoverability
  seo: TemplateSEOSchema.default({}),
  
  // Analytics
  analytics: TemplateAnalyticsSchema.default({}),
  
  // Licensing
  license: z.enum(['free', 'premium', 'custom']).default('free'),
  licenseUrl: z.string().url().optional(),
  
  // Metadata
  metadata: MetadataSchema
})

export type Template = z.infer<typeof TemplateSchema>

// Template creation and update types
export const CreateTemplateSchema = TemplateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
  analytics: true
})

export type CreateTemplate = z.infer<typeof CreateTemplateSchema>

export const UpdateTemplateSchema = TemplateSchema.partial().omit({
  id: true,
  createdAt: true,
  createdBy: true
})

export type UpdateTemplate = z.infer<typeof UpdateTemplateSchema>

// Template collection
export const TemplateCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  templates: z.array(z.string()), // Template IDs
  createdBy: z.string(),
  isPublic: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type TemplateCollection = z.infer<typeof TemplateCollectionSchema>

// Template usage tracking
export const TemplateUsageSchema = z.object({
  id: z.string(),
  templateId: z.string(),
  userId: z.string(),
  cvId: z.string().optional(),
  action: z.enum(['view', 'download', 'use', 'customize']),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.date()
})

export type TemplateUsage = z.infer<typeof TemplateUsageSchema>

// Template review and rating
export const TemplateReviewSchema = z.object({
  id: z.string(),
  templateId: z.string(),
  userId: z.string(),
  rating: z.number().int().min(1).max(5),
  review: z.string().max(1000).optional(),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  wouldRecommend: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type TemplateReview = z.infer<typeof TemplateReviewSchema>
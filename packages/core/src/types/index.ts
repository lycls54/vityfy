// Base types
export * from './base'

// CV related types
export * from './cv'

// User types
export * from './user'

// Template types - exclude CVSectionType to avoid conflict
export type {
  TemplateCategory,
  TemplateStyle,
  ColorScheme,
  Typography,
  Layout,
  SectionConfig,
  TemplateAsset,
  CustomizationOptions,
  Compatibility,
  TemplateSEO,
  TemplateAnalytics,
  Template,
  CreateTemplate,
  UpdateTemplate,
  TemplateCollection,
  TemplateUsage,
  TemplateReview
} from './template'

export {
  TemplateCategorySchema,
  TemplateStyleSchema,
  ColorSchemeSchema,
  TypographySchema,
  LayoutSchema,
  SectionConfigSchema,
  TemplateAssetSchema,
  CustomizationOptionsSchema,
  CompatibilitySchema,
  TemplateSEOSchema,
  TemplateAnalyticsSchema,
  TemplateSchema,
  CreateTemplateSchema,
  UpdateTemplateSchema,
  TemplateCollectionSchema,
  TemplateUsageSchema,
  TemplateReviewSchema
} from './template'

// Export template CVSectionType with a different name to avoid conflict
export type { CVSectionType as TemplateCVSectionType } from './template'
export { CVSectionTypeSchema } from './template'

// Export types
export * from './export'

// AI types
export * from './ai'

// API types
export * from './api'

// Common utility types
export type Maybe<T> = T | null | undefined
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
export type NonEmptyArray<T> = [T, ...T[]]
export type ValueOf<T> = T[keyof T]
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]
import { z } from 'zod'
import { BaseEntitySchema, MetadataSchema, LanguageSchema, ThemeSchema } from './base'

// User role types
export const UserRoleSchema = z.enum([
  'user',
  'premium',
  'admin',
  'super_admin'
])
export type UserRole = z.infer<typeof UserRoleSchema>

// User status types
export const UserStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'pending_verification',
  'deleted'
])
export type UserStatus = z.infer<typeof UserStatusSchema>

// Authentication provider types
export const AuthProviderSchema = z.enum([
  'email',
  'google',
  'github',
  'linkedin',
  'microsoft'
])
export type AuthProvider = z.infer<typeof AuthProviderSchema>

// User preferences
export const UserPreferencesSchema = z.object({
  theme: ThemeSchema.default('system'),
  language: LanguageSchema.default('en'),
  timezone: z.string().default('UTC'),
  dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']).default('MM/DD/YYYY'),
  timeFormat: z.enum(['12h', '24h']).default('12h'),
  emailNotifications: z.object({
    marketing: z.boolean().default(false),
    product: z.boolean().default(true),
    security: z.boolean().default(true),
    updates: z.boolean().default(true)
  }).default({}),
  privacy: z.object({
    profileVisible: z.boolean().default(false),
    showEmail: z.boolean().default(false),
    allowIndexing: z.boolean().default(false)
  }).default({})
})
export type UserPreferences = z.infer<typeof UserPreferencesSchema>

// User profile
export const UserProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  displayName: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.string().url().optional(),
  location: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    portfolio: z.string().url().optional()
  }).optional()
})
export type UserProfile = z.infer<typeof UserProfileSchema>

// User subscription
export const SubscriptionPlanSchema = z.enum([
  'free',
  'basic',
  'premium',
  'enterprise'
])
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>

export const SubscriptionStatusSchema = z.enum([
  'active',
  'inactive',
  'cancelled',
  'past_due',
  'trialing'
])
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>

export const UserSubscriptionSchema = z.object({
  plan: SubscriptionPlanSchema.default('free'),
  status: SubscriptionStatusSchema.default('inactive'),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  trialEndDate: z.date().optional(),
  customerId: z.string().optional(),
  subscriptionId: z.string().optional(),
  priceId: z.string().optional(),
  cancelAtPeriodEnd: z.boolean().default(false),
  features: z.object({
    maxCVs: z.number().int().positive().default(1),
    maxTemplates: z.number().int().positive().default(3),
    maxExports: z.number().int().positive().default(5),
    advancedFeatures: z.boolean().default(false),
    prioritySupport: z.boolean().default(false),
    customBranding: z.boolean().default(false),
    aiAssistance: z.boolean().default(false)
  }).default({})
})
export type UserSubscription = z.infer<typeof UserSubscriptionSchema>

// User usage statistics
export const UserUsageSchema = z.object({
  cvsCreated: z.number().int().nonnegative().default(0),
  cvsExported: z.number().int().nonnegative().default(0),
  templatesUsed: z.number().int().nonnegative().default(0),
  aiRequestsUsed: z.number().int().nonnegative().default(0),
  storageUsed: z.number().nonnegative().default(0), // in bytes
  lastActiveAt: z.date().optional()
})
export type UserUsage = z.infer<typeof UserUsageSchema>

// User authentication info
export const UserAuthSchema = z.object({
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  emailVerifiedAt: z.date().optional(),
  passwordHash: z.string().optional(),
  providers: z.array(z.object({
    provider: AuthProviderSchema,
    providerId: z.string(),
    connectedAt: z.date()
  })).default([]),
  lastLoginAt: z.date().optional(),
  lastLoginIp: z.string().optional(),
  loginCount: z.number().int().nonnegative().default(0),
  twoFactorEnabled: z.boolean().default(false),
  backupCodes: z.array(z.string()).optional()
})
export type UserAuth = z.infer<typeof UserAuthSchema>

// Main User schema
export const UserSchema = BaseEntitySchema.extend({
  email: z.string().email(),
  role: UserRoleSchema.default('user'),
  status: UserStatusSchema.default('active'),
  
  // Profile information
  profile: UserProfileSchema.default({}),
  
  // Preferences
  preferences: UserPreferencesSchema.default({}),
  
  // Subscription
  subscription: UserSubscriptionSchema.default({}),
  
  // Usage statistics
  usage: UserUsageSchema.default({}),
  
  // Authentication
  auth: UserAuthSchema,
  
  // Metadata
  metadata: MetadataSchema,
  
  // Timestamps
  lastSeenAt: z.date().optional(),
  deletedAt: z.date().optional()
})

export type User = z.infer<typeof UserSchema>

// User creation and update types
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
  usage: true,
  lastSeenAt: true,
  deletedAt: true
}).extend({
  password: z.string().min(8).optional()
})

export type CreateUser = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true,
  auth: true
}).extend({
  auth: UserAuthSchema.partial().optional()
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>

// Public user profile (for sharing)
export const PublicUserProfileSchema = z.object({
  id: z.string(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  socialLinks: UserProfileSchema.shape.socialLinks.optional(),
  joinedAt: z.date(),
  cvsCount: z.number().int().nonnegative().default(0)
})

export type PublicUserProfile = z.infer<typeof PublicUserProfileSchema>

// User session
export const UserSessionSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  deviceInfo: z.object({
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    device: z.string().optional(),
    browser: z.string().optional(),
    os: z.string().optional()
  }).optional(),
  createdAt: z.date(),
  expiresAt: z.date(),
  lastAccessedAt: z.date()
})

export type UserSession = z.infer<typeof UserSessionSchema>

// User invitation
export const UserInvitationSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: UserRoleSchema.default('user'),
  invitedBy: z.string(),
  token: z.string(),
  expiresAt: z.date(),
  acceptedAt: z.date().optional(),
  createdAt: z.date()
})

export type UserInvitation = z.infer<typeof UserInvitationSchema>
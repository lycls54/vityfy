import { z } from 'zod'
import { BaseEntitySchema, StatusSchema, MetadataSchema, LanguageSchema } from './base'

// Contact Information
export const ContactSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional()
  }).optional()
})

export type Contact = z.infer<typeof ContactSchema>

// Personal Information
export const PersonalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  summary: z.string().optional(),
  photo: z.string().url().optional(),
  dateOfBirth: z.date().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed', 'other']).optional(),
  contact: ContactSchema
})

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>

// Experience
export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0)
})

export type Experience = z.infer<typeof ExperienceSchema>

// Education
export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
  coursework: z.array(z.string()).default([]),
  honors: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0)
})

export type Education = z.infer<typeof EducationSchema>

// Skills
export const SkillLevelSchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert'])
export type SkillLevel = z.infer<typeof SkillLevelSchema>

export const SkillCategorySchema = z.enum([
  'technical',
  'language',
  'soft',
  'design',
  'management',
  'other'
])
export type SkillCategory = z.infer<typeof SkillCategorySchema>

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  level: SkillLevelSchema.optional(),
  category: SkillCategorySchema.default('technical'),
  yearsOfExperience: z.number().int().nonnegative().optional(),
  order: z.number().int().nonnegative().default(0)
})

export type Skill = z.infer<typeof SkillSchema>

// Languages
export const LanguageProficiencySchema = z.enum([
  'basic',
  'conversational', 
  'proficient',
  'fluent',
  'native'
])
export type LanguageProficiency = z.infer<typeof LanguageProficiencySchema>

export const LanguageSkillSchema = z.object({
  id: z.string(),
  language: LanguageSchema,
  name: z.string().min(1, 'Language name is required'),
  proficiency: LanguageProficiencySchema,
  certifications: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0)
})

export type LanguageSkill = z.infer<typeof LanguageSkillSchema>

// Projects
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  url: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  highlights: z.array(z.string()).default([]),
  role: z.string().optional(),
  teamSize: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().default(0)
})

export type Project = z.infer<typeof ProjectSchema>

// Certifications
export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  description: z.string().optional(),
  order: z.number().int().nonnegative().default(0)
})

export type Certification = z.infer<typeof CertificationSchema>

// Awards
export const AwardSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Award title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.date(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  order: z.number().int().nonnegative().default(0)
})

export type Award = z.infer<typeof AwardSchema>

// Publications
export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Publication title is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  date: z.date(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  authors: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0)
})

export type Publication = z.infer<typeof PublicationSchema>

// Volunteer Experience
export const VolunteerSchema = z.object({
  id: z.string(),
  organization: z.string().min(1, 'Organization name is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0)
})

export type Volunteer = z.infer<typeof VolunteerSchema>

// References
export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Reference name is required'),
  position: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  relationship: z.string().optional(),
  order: z.number().int().nonnegative().default(0)
})

export type Reference = z.infer<typeof ReferenceSchema>

// Custom Sections
export const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Section title is required'),
  content: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    url: z.string().url().optional(),
    order: z.number().int().nonnegative().default(0)
  })).default([]),
  order: z.number().int().nonnegative().default(0)
})

export type CustomSection = z.infer<typeof CustomSectionSchema>

// CV Settings
export const CVSettingsSchema = z.object({
  language: LanguageSchema.default('en'),
  theme: z.string().default('modern'),
  colorScheme: z.string().default('blue'),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  spacing: z.enum(['compact', 'normal', 'spacious']).default('normal'),
  showPhoto: z.boolean().default(true),
  showReferences: z.boolean().default(false),
  sectionsOrder: z.array(z.string()).default([
    'personalInfo',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages'
  ]),
  customSections: z.array(CustomSectionSchema).default([])
})

export type CVSettings = z.infer<typeof CVSettingsSchema>

// Main CV Schema
export const CVSchema = BaseEntitySchema.extend({
  userId: z.string().min(1),
  title: z.string().min(1, 'CV title is required'),
  status: StatusSchema.default('draft'),
  
  // Main sections
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  languages: z.array(LanguageSkillSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  awards: z.array(AwardSchema).default([]),
  publications: z.array(PublicationSchema).default([]),
  volunteer: z.array(VolunteerSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
  
  // Settings and customization
  settings: CVSettingsSchema.default({}),
  
  // Template information
  templateId: z.string().optional(),
  templateVersion: z.string().optional(),
  
  // Metadata
  metadata: MetadataSchema,
  
  // Sharing and privacy
  isPublic: z.boolean().default(false),
  shareUrl: z.string().optional(),
  
  // Analytics
  viewCount: z.number().int().nonnegative().default(0),
  downloadCount: z.number().int().nonnegative().default(0),
  lastViewedAt: z.date().optional()
})

export type CV = z.infer<typeof CVSchema>

// CV creation and update types
export const CreateCVSchema = CVSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
  viewCount: true,
  downloadCount: true,
  lastViewedAt: true
})

export type CreateCV = z.infer<typeof CreateCVSchema>

export const UpdateCVSchema = CVSchema.partial().omit({
  id: true,
  userId: true,
  createdAt: true
})

export type UpdateCV = z.infer<typeof UpdateCVSchema>

// CV section types for dynamic handling
export type CVSectionType = 
  | 'personalInfo'
  | 'experience' 
  | 'education'
  | 'skills'
  | 'languages'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'publications'
  | 'volunteer'
  | 'references'
  | 'customSections'

export type CVSectionData<T extends CVSectionType> = 
  T extends 'personalInfo' ? PersonalInfo :
  T extends 'experience' ? Experience[] :
  T extends 'education' ? Education[] :
  T extends 'skills' ? Skill[] :
  T extends 'languages' ? LanguageSkill[] :
  T extends 'projects' ? Project[] :
  T extends 'certifications' ? Certification[] :
  T extends 'awards' ? Award[] :
  T extends 'publications' ? Publication[] :
  T extends 'volunteer' ? Volunteer[] :
  T extends 'references' ? Reference[] :
  T extends 'customSections' ? CustomSection[] :
  never
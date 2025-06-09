# @cvcraft/core

Core utilities, types, and shared logic for CVCraft monorepo.

## Features

- 🔧 **TypeScript Types** - Comprehensive type definitions for CV data, users, templates, exports, AI, and API
- ✅ **Validation Schemas** - Zod-based validation for all data structures  
- 🛠️ **Utility Functions** - String, date, ID generation, CSS helpers, and more
- 📋 **Constants** - Shared constants for limits, formats, and configurations
- 🎨 **CSS Utilities** - Tailwind CSS helpers and component variants

## Installation

```bash
pnpm add @cvcraft/core
```

## Usage

### Types

```typescript
import { CV, User, Template, ExportJob } from '@cvcraft/core'

// Use comprehensive type definitions
const cv: CV = {
  id: 'cv_123',
  title: 'Software Engineer CV',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    // ...
  }
}
```

### Validation

```typescript
import { CVSchema, validateData } from '@cvcraft/core'

// Validate CV data
const result = validateData(CVSchema, cvData)
if (!result.success) {
  console.log('Validation errors:', result.errors)
}
```

### Utilities

```typescript
import { 
  generateId, 
  formatDate, 
  cn, 
  slugify,
  truncate 
} from '@cvcraft/core'

// Generate unique IDs
const id = generateId() // Random nanoid
const cvId = generateCVId() // Prefixed: cv_xxx

// Date formatting
const displayDate = formatDate(new Date(), 'MMM yyyy') // "Jan 2024"
const duration = calculateDuration(startDate, endDate) // "2 years 3 months"

// CSS utilities
const className = cn('base-class', { 'active': isActive })

// String utilities  
const slug = slugify('My Awesome Template') // "my-awesome-template"
const preview = truncate(longText, 100) // "Long text..."
```

### Constants

```typescript
import { 
  CV_LIMITS, 
  SUPPORTED_LANGUAGES,
  ERROR_MESSAGES 
} from '@cvcraft/core'

// Use predefined limits
const maxCVs = CV_LIMITS.PREMIUM.MAX_CVS // 10

// Language options
const languages = SUPPORTED_LANGUAGES // [{ code: 'en', name: 'English' }, ...]

// Consistent error messages
const error = ERROR_MESSAGES.VALIDATION.REQUIRED // "This field is required"
```

## Type Definitions

### Core Types

- **BaseEntity** - Common fields for all entities (id, createdAt, updatedAt, version)
- **Pagination** - Pagination parameters and metadata
- **ApiResponse** - Standardized API response wrapper
- **Filter** & **Sort** - Query filtering and sorting
- **ErrorType** - Standardized error types

### CV Types

- **CV** - Complete CV data structure
- **PersonalInfo** - Personal information and contact details
- **Experience** - Work experience entries
- **Education** - Education entries
- **Skill** - Skills with categories and levels
- **Project** - Project portfolio entries
- **Certification** - Professional certifications
- And many more section types...

### User Types

- **User** - Complete user profile
- **UserAuth** - Authentication details
- **UserSubscription** - Subscription and billing
- **UserPreferences** - User settings and preferences

### Template Types

- **Template** - CV template definition
- **ColorScheme** - Color configurations
- **Typography** - Font and text styling
- **Layout** - Template layout settings

### Export Types

- **ExportJob** - Export job configuration and status
- **PDFOptions** - PDF export settings
- **DOCXOptions** - Word document export settings
- **ImageOptions** - Image export settings

### AI Types

- **AIRequest** - AI service requests
- **AIResult** - AI processing results
- **AIQuota** - Usage limits and tracking

### API Types

- **APIKey** - API key management
- **Webhook** - Webhook configurations
- **RateLimit** - Rate limiting settings
- **HealthCheck** - System health monitoring

## Validation Schemas

All types come with corresponding Zod validation schemas:

```typescript
// Validate entire CV
CVSchema.parse(cvData)

// Validate sections
PersonalInfoSchema.parse(personalInfo)
ExperienceSchema.parse(experience)

// Validate user input
SignUpValidation.parse(formData)
```

## Utility Functions

### String Utilities
- `capitalize`, `titleCase`, `camelCase`, `kebabCase`
- `slugify`, `truncate`, `stripHtml`
- `getInitials`, `maskEmail`, `formatPhone`

### Date Utilities
- `formatDate`, `formatCVDate`, `formatDateRange`
- `calculateDuration`, `calculateAge`
- `isToday`, `isPast`, `isFuture`

### ID Generation
- `generateId`, `generateShortId`, `generateUUID`
- `generateCVId`, `generateUserId`, `generateTemplateId`
- `isValidId`, `isValidUUID`

### CSS Utilities
- `cn` - Tailwind class merging with conflict resolution
- `buttonVariant`, `inputVariant`, `cardVariant`
- `focusRing`, `animate`, `responsive`

## Constants

- **CV_LIMITS** - Subscription-based limits
- **RATE_LIMITS** - API rate limiting
- **SUPPORTED_LANGUAGES** - Internationalization
- **ERROR_MESSAGES** - Standardized error messages
- **COLOR_SCHEMES** - Predefined color palettes
- **FONT_FAMILIES** - Available fonts

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Watch for changes
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Exports

```typescript
// Main exports
export * from './types'      // All type definitions
export * from './utils'      // All utility functions  
export * from './validation' // All validation schemas
export * from './constants'  // All constants

// Specific exports
export { VERSION } from './index'
```

## Dependencies

- **zod** - Schema validation
- **clsx** - Conditional classes
- **tailwind-merge** - Tailwind conflict resolution
- **class-variance-authority** - Component variants
- **date-fns** - Date manipulation
- **nanoid** - ID generation

## License

MIT
import { nanoid } from 'nanoid'

/**
 * Generates a unique ID using nanoid
 */
export function generateId(length = 12): string {
  return nanoid(length)
}

/**
 * Generates a short ID (8 characters)
 */
export function generateShortId(): string {
  return nanoid(8)
}

/**
 * Generates a long ID (21 characters - default nanoid length)
 */
export function generateLongId(): string {
  return nanoid()
}

/**
 * Generates a numeric ID
 */
export function generateNumericId(length = 8): string {
  const chars = '0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Generates an alphanumeric ID (letters and numbers only)
 */
export function generateAlphanumericId(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Generates a URL-safe ID
 */
export function generateUrlSafeId(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Generates a UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Generates a prefixed ID
 */
export function generatePrefixedId(prefix: string, length = 12): string {
  return `${prefix}_${generateId(length)}`
}

/**
 * Generates IDs for different entity types
 */
export function generateCVId(): string {
  return generatePrefixedId('cv', 12)
}

export function generateUserId(): string {
  return generatePrefixedId('user', 12)
}

export function generateTemplateId(): string {
  return generatePrefixedId('tpl', 12)
}

export function generateExportId(): string {
  return generatePrefixedId('exp', 12)
}

export function generateAIRequestId(): string {
  return generatePrefixedId('ai', 12)
}

export function generateAPIKeyId(): string {
  return generatePrefixedId('key', 16)
}

export function generateSessionId(): string {
  return generatePrefixedId('sess', 16)
}

export function generateUploadId(): string {
  return generatePrefixedId('upload', 12)
}

/**
 * Validates if a string is a valid nanoid
 */
export function isValidId(id: string): boolean {
  // Basic validation for nanoid format
  return /^[A-Za-z0-9_-]{8,}$/.test(id)
}

/**
 * Validates if a string is a valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

/**
 * Validates if a string is a valid prefixed ID
 */
export function isValidPrefixedId(id: string, expectedPrefix: string): boolean {
  const pattern = new RegExp(`^${expectedPrefix}_[A-Za-z0-9_-]{8,}$`)
  return pattern.test(id)
}

/**
 * Extracts the prefix from a prefixed ID
 */
export function extractPrefix(id: string): string | null {
  const match = id.match(/^([a-z]+)_/)
  return match && match[1] ? match[1] : null
}

/**
 * Extracts the ID part from a prefixed ID
 */
export function extractIdPart(id: string): string | null {
  const match = id.match(/^[a-z]+_(.+)$/)
  return match && match[1] ? match[1] : null
}

/**
 * Generates a secure random string for tokens
 */
export function generateSecureToken(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  
  return result
}

/**
 * Generates a verification code (numeric)
 */
export function generateVerificationCode(length = 6): string {
  const chars = '0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  
  return result
}

/**
 * Generates a backup code
 */
export function generateBackupCode(): string {
  // Format: XXXX-XXXX
  const part1 = generateAlphanumericId(4).toUpperCase()
  const part2 = generateAlphanumericId(4).toUpperCase()
  return `${part1}-${part2}`
}

/**
 * Generates multiple backup codes
 */
export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = []
  for (let i = 0; i < count; i++) {
    codes.push(generateBackupCode())
  }
  return codes
}

/**
 * Generates a slug-friendly ID
 */
export function generateSlugId(prefix?: string): string {
  const id = generateId(8).toLowerCase()
  return prefix ? `${prefix}-${id}` : id
}

/**
 * Generates a file name with ID
 */
export function generateFileName(extension: string, prefix?: string): string {
  const id = generateId(12)
  const name = prefix ? `${prefix}-${id}` : id
  return `${name}.${extension}`
}

/**
 * Generates a unique key for caching
 */
export function generateCacheKey(...parts: string[]): string {
  return parts.join(':')
}

/**
 * Generates a request ID for API tracking
 */
export function generateRequestId(): string {
  return `req_${generateId(16)}`
}

/**
 * Generates a correlation ID for distributed tracing
 */
export function generateCorrelationId(): string {
  return `cor_${generateId(20)}`
}
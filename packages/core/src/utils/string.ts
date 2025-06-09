/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Converts string to title case
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Converts string to camelCase
 */
export function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
}

/**
 * Converts string to kebab-case
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Converts string to snake_case
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase()
}

/**
 * Creates a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Truncates a string to a specified length
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}

/**
 * Truncates a string by word boundary
 */
export function truncateWords(str: string, wordCount: number, suffix = '...'): string {
  const words = str.split(' ')
  if (words.length <= wordCount) return str
  return words.slice(0, wordCount).join(' ') + suffix
}

/**
 * Strips HTML tags from a string
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

/**
 * Escapes HTML entities
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return str.replace(/[&<>"']/g, (char) => map[char] || char)
}

/**
 * Unescapes HTML entities
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }
  return str.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => map[entity] || entity)
}

/**
 * Generates initials from a name
 */
export function getInitials(name: string, maxLength = 2): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, maxLength)
    .join('')
}

/**
 * Masks sensitive information (email, phone, etc.)
 */
export function maskString(str: string, visibleStart = 2, visibleEnd = 2, maskChar = '*'): string {
  if (str.length <= visibleStart + visibleEnd) return str
  
  const start = str.slice(0, visibleStart)
  const end = str.slice(-visibleEnd)
  const maskLength = str.length - visibleStart - visibleEnd
  
  return start + maskChar.repeat(maskLength) + end
}

/**
 * Masks email address
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')
  if (!username || !domain) return email
  
  const maskedUsername = username.length > 2 
    ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
    : username
  
  return `${maskedUsername}@${domain}`
}

/**
 * Formats phone number
 */
export function formatPhone(phone: string, format = '(XXX) XXX-XXXX'): string {
  const digits = phone.replace(/\D/g, '')
  
  if (digits.length === 10) {
    let result = format
    for (let i = 0; i < digits.length; i++) {
      result = result.replace('X', digits.charAt(i))
    }
    return result
  }
  
  return phone
}

/**
 * Validates if string is a valid JSON
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Counts words in a string
 */
export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Counts characters in a string (excluding spaces)
 */
export function charCount(str: string, includeSpaces = true): number {
  return includeSpaces ? str.length : str.replace(/\s/g, '').length
}

/**
 * Generates a random string
 */
export function randomString(length = 10, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

/**
 * Pluralizes a word based on count
 */
export function pluralize(word: string, count: number, plural?: string): string {
  if (count === 1) return word
  
  if (plural) return plural
  
  // Simple pluralization rules
  if (word.endsWith('y')) {
    return word.slice(0, -1) + 'ies'
  }
  if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) {
    return word + 'es'
  }
  
  return word + 's'
}

/**
 * Removes extra whitespace and normalizes spacing
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ')
}

/**
 * Extracts mentions (@username) from text
 */
export function extractMentions(text: string): string[] {
  const mentionRegex = /@([a-zA-Z0-9_]+)/g
  const mentions: string[] = []
  let match
  
  while ((match = mentionRegex.exec(text)) !== null) {
    if (match[1]) {
      mentions.push(match[1])
    }
  }
  
  return mentions
}

/**
 * Extracts hashtags (#hashtag) from text
 */
export function extractHashtags(text: string): string[] {
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g
  const hashtags: string[] = []
  let match
  
  while ((match = hashtagRegex.exec(text)) !== null) {
    if (match[1]) {
      hashtags.push(match[1])
    }
  }
  
  return hashtags
}

/**
 * Highlights search terms in text
 */
export function highlightText(text: string, searchTerm: string, highlightClass = 'highlight'): string {
  if (!searchTerm) return text
  
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, `<span class="${highlightClass}">$1</span>`)
}

/**
 * Calculates similarity between two strings (Levenshtein distance)
 */
export function similarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  
  if (longer.length === 0) return 1.0
  
  return (longer.length - levenshteinDistance(longer, shorter)) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []
  
  // Initialize first row and column
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0]![j] = j
  }
  
  // Fill the matrix
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (!matrix[i]) {
        matrix[i] = []
      }
      
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!
      } else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1, // substitution
          matrix[i]![j - 1]! + 1,     // insertion
          matrix[i - 1]![j]! + 1      // deletion
        )
      }
    }
  }
  
  return matrix[str2.length]![str1.length]!
}
/**
 * Check if string is valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

/**
 * Get domain from URL
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

/**
 * Add query parameters to URL
 */
export function addQueryParams(url: string, params: Record<string, string>): string {
  const urlObj = new URL(url)
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value)
  })
  return urlObj.toString()
}

/**
 * Remove query parameters from URL
 */
export function removeQueryParams(url: string, params: string[]): string {
  const urlObj = new URL(url)
  params.forEach(param => {
    urlObj.searchParams.delete(param)
  })
  return urlObj.toString()
}
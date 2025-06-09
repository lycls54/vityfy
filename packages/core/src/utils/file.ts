/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice((Math.max(0, filename.lastIndexOf('.')) || Infinity) + 1)
}

/**
 * Get filename without extension
 */
export function getFileNameWithoutExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '')
}

/**
 * Check if file is image
 */
export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
  const extension = getFileExtension(filename).toLowerCase()
  return imageExtensions.includes(extension)
}

/**
 * Check if file is document
 */
export function isDocumentFile(filename: string): boolean {
  const docExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf']
  const extension = getFileExtension(filename).toLowerCase()
  return docExtensions.includes(extension)
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}
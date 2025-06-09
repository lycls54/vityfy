import { format, formatDistanceToNow, isValid, parseISO, startOfDay, endOfDay, addDays, subDays, addMonths, subMonths, addYears, subYears, differenceInDays, differenceInMonths, differenceInYears, isAfter, isBefore, isSameDay, isSameMonth, isSameYear } from 'date-fns'

/**
 * Formats a date using the specified format string
 */
export function formatDate(date: Date | string, formatString = 'MMM yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  return format(dateObj, formatString)
}

/**
 * Formats a date for CV display (e.g., "Jan 2024")
 */
export function formatCVDate(date: Date | string): string {
  return formatDate(date, 'MMM yyyy')
}

/**
 * Formats a full date (e.g., "January 15, 2024")
 */
export function formatFullDate(date: Date | string): string {
  return formatDate(date, 'MMMM dd, yyyy')
}

/**
 * Formats a short date (e.g., "01/15/2024")
 */
export function formatShortDate(date: Date | string): string {
  return formatDate(date, 'MM/dd/yyyy')
}

/**
 * Formats an ISO date (e.g., "2024-01-15")
 */
export function formatISODate(date: Date | string): string {
  return formatDate(date, 'yyyy-MM-dd')
}

/**
 * Formats a date range (e.g., "Jan 2020 - Dec 2023" or "Jan 2020 - Present")
 */
export function formatDateRange(
  startDate: Date | string,
  endDate?: Date | string | null,
  currentLabel = 'Present'
): string {
  const start = formatCVDate(startDate)
  
  if (!endDate) {
    return `${start} - ${currentLabel}`
  }
  
  const end = formatCVDate(endDate)
  return `${start} - ${end}`
}

/**
 * Formats relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

/**
 * Calculates duration between two dates
 */
export function calculateDuration(
  startDate: Date | string,
  endDate?: Date | string | null
): string {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
  const end = endDate ? (typeof endDate === 'string' ? parseISO(endDate) : endDate) : new Date()
  
  if (!isValid(start) || !isValid(end)) return ''
  
  const years = differenceInYears(end, start)
  const months = differenceInMonths(end, start) % 12
  
  if (years === 0 && months === 0) {
    return '1 month'
  }
  
  const parts: string[] = []
  
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  }
  
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  }
  
  return parts.join(' ')
}

/**
 * Gets the current date
 */
export function getCurrentDate(): Date {
  return new Date()
}

/**
 * Gets the start of today
 */
export function getStartOfToday(): Date {
  return startOfDay(new Date())
}

/**
 * Gets the end of today
 */
export function getEndOfToday(): Date {
  return endOfDay(new Date())
}

/**
 * Checks if a date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isSameDay(dateObj, new Date())
}

/**
 * Checks if a date is in the past
 */
export function isPast(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isBefore(dateObj, new Date())
}

/**
 * Checks if a date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isAfter(dateObj, new Date())
}

/**
 * Adds days to a date
 */
export function addDaysToDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return addDays(dateObj, days)
}

/**
 * Subtracts days from a date
 */
export function subtractDaysFromDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return subDays(dateObj, days)
}

/**
 * Adds months to a date
 */
export function addMonthsToDate(date: Date | string, months: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return addMonths(dateObj, months)
}

/**
 * Subtracts months from a date
 */
export function subtractMonthsFromDate(date: Date | string, months: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return subMonths(dateObj, months)
}

/**
 * Adds years to a date
 */
export function addYearsToDate(date: Date | string, years: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return addYears(dateObj, years)
}

/**
 * Subtracts years from a date
 */
export function subtractYearsFromDate(date: Date | string, years: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return subYears(dateObj, years)
}

/**
 * Gets the age based on birth date
 */
export function calculateAge(birthDate: Date | string): number {
  const dateObj = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate
  return differenceInYears(new Date(), dateObj)
}

/**
 * Gets the difference in days between two dates
 */
export function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return differenceInDays(dateObj2, dateObj1)
}

/**
 * Gets the difference in months between two dates
 */
export function getMonthsDifference(date1: Date | string, date2: Date | string): number {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return differenceInMonths(dateObj2, dateObj1)
}

/**
 * Gets the difference in years between two dates
 */
export function getYearsDifference(date1: Date | string, date2: Date | string): number {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return differenceInYears(dateObj2, dateObj1)
}

/**
 * Validates if a date string is valid
 */
export function isValidDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isValid(dateObj)
}

/**
 * Converts a date to ISO string
 */
export function toISOString(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return dateObj.toISOString()
}

/**
 * Parses an ISO date string
 */
export function fromISOString(isoString: string): Date {
  return parseISO(isoString)
}

/**
 * Gets the first day of the month
 */
export function getFirstDayOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1)
}

/**
 * Gets the last day of the month
 */
export function getLastDayOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0)
}

/**
 * Gets the first day of the year
 */
export function getFirstDayOfYear(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return new Date(dateObj.getFullYear(), 0, 1)
}

/**
 * Gets the last day of the year
 */
export function getLastDayOfYear(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return new Date(dateObj.getFullYear(), 11, 31)
}

/**
 * Checks if two dates are in the same month
 */
export function isSameMonthAndYear(date1: Date | string, date2: Date | string): boolean {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return isSameMonth(dateObj1, dateObj2)
}

/**
 * Checks if two dates are in the same year
 */
export function isSameYearCheck(date1: Date | string, date2: Date | string): boolean {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return isSameYear(dateObj1, dateObj2)
}

/**
 * Creates a date range array
 */
export function createDateRange(startDate: Date | string, endDate: Date | string): Date[] {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
  const dates: Date[] = []
  let currentDate = start
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate))
    currentDate = addDays(currentDate, 1)
  }
  
  return dates
}

/**
 * Gets timezone offset in hours
 */
export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset() / 60
}

/**
 * Converts date to specific timezone
 */
export function toTimezone(date: Date | string, timezone: string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return dateObj.toLocaleString('en-US', { timeZone: timezone })
}

/**
 * Gets current timestamp
 */
export function getCurrentTimestamp(): number {
  return Date.now()
}

/**
 * Converts timestamp to date
 */
export function fromTimestamp(timestamp: number): Date {
  return new Date(timestamp)
}

/**
 * Gets Unix timestamp (in seconds)
 */
export function getUnixTimestamp(date?: Date | string): number {
  const dateObj = date ? (typeof date === 'string' ? parseISO(date) : date) : new Date()
  return Math.floor(dateObj.getTime() / 1000)
}

/**
 * Converts Unix timestamp to date
 */
export function fromUnixTimestamp(timestamp: number): Date {
  return new Date(timestamp * 1000)
}
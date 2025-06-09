import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind CSS conflict resolution
 * This is a re-export of the cn function from @cvcraft/core for convenience
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Creates a class name builder with default classes
 */
export function createCN(defaultClasses: string) {
  return (...inputs: ClassValue[]) => cn(defaultClasses, ...inputs)
}

/**
 * Conditionally applies classes based on a condition
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : falseClass || ''
}

/**
 * Creates variant classes using class-variance-authority pattern
 */
export function createVariants<T extends Record<string, Record<string, string>>>(
  base: string,
  variants: T
) {
  return (options: {
    [K in keyof T]?: keyof T[K]
  } & { className?: string }) => {
    const { className, ...variantOptions } = options
    
    const variantClasses = Object.entries(variantOptions)
      .map(([key, value]) => {
        const variant = variants[key as keyof T]
        return variant?.[value as string] || ''
      })
      .filter(Boolean)
    
    return cn(base, ...variantClasses, className)
  }
}

/**
 * Utility for responsive classes
 */
export function responsive(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) {
  return cn(
    classes.base,
    classes.sm && `sm:${classes.sm}`,
    classes.md && `md:${classes.md}`,
    classes.lg && `lg:${classes.lg}`,
    classes.xl && `xl:${classes.xl}`,
    classes['2xl'] && `2xl:${classes['2xl']}`
  )
}

/**
 * Utility for dark mode classes
 */
export function darkMode(lightClass: string, darkClass?: string) {
  return cn(lightClass, darkClass && `dark:${darkClass}`)
}
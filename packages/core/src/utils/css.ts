import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind CSS conflict resolution
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

/**
 * Focus ring utility with modern styling
 */
export function focusRing(color: 'blue' | 'red' | 'green' | 'yellow' = 'blue') {
  const colors = {
    blue: 'focus:ring-blue-500 focus:border-blue-500',
    red: 'focus:ring-red-500 focus:border-red-500',
    green: 'focus:ring-green-500 focus:border-green-500',
    yellow: 'focus:ring-yellow-500 focus:border-yellow-500'
  }
  
  return cn(
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    colors[color]
  )
}

/**
 * Button variant utility
 */
export function buttonVariant(
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  }
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  }
  
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size]
  )
}

/**
 * Card utility with shadow variants
 */
export function cardVariant(variant: 'default' | 'outline' | 'ghost' = 'default') {
  const variants = {
    default: 'bg-card text-card-foreground shadow-md',
    outline: 'bg-card text-card-foreground border border-border',
    ghost: 'bg-transparent'
  }
  
  return cn('rounded-lg', variants[variant])
}

/**
 * Input utility with states
 */
export function inputVariant(
  state: 'default' | 'error' | 'success' = 'default',
  size: 'sm' | 'md' | 'lg' = 'md'
) {
  const states = {
    default: 'border-input focus:border-primary',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  }
  
  const sizes = {
    sm: 'h-8 px-2 text-sm',
    md: 'h-10 px-3',
    lg: 'h-12 px-4 text-lg'
  }
  
  return cn(
    'flex w-full rounded-md border bg-background text-foreground transition-colors',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    states[state],
    sizes[size]
  )
}

/**
 * Animate utility for common animations
 */
export function animate(animation: 'fadeIn' | 'slideUp' | 'slideDown' | 'scale' | 'spin') {
  const animations = {
    fadeIn: 'animate-in fade-in duration-200',
    slideUp: 'animate-in slide-in-from-bottom-2 duration-200',
    slideDown: 'animate-in slide-in-from-top-2 duration-200',
    scale: 'animate-in zoom-in-95 duration-200',
    spin: 'animate-spin'
  }
  
  return animations[animation]
}

/**
 * Layout utility for common layouts
 */
export function layout(type: 'center' | 'stack' | 'spread' | 'sidebar') {
  const layouts = {
    center: 'flex items-center justify-center',
    stack: 'flex flex-col space-y-4',
    spread: 'flex items-center justify-between',
    sidebar: 'flex gap-6'
  }
  
  return layouts[type]
}

/**
 * Truncate text utility
 */
export function truncate(lines: number = 1) {
  if (lines === 1) {
    return 'truncate'
  }
  
  return cn(
    'overflow-hidden',
    'display: -webkit-box',
    '-webkit-box-orient: vertical',
    `-webkit-line-clamp: ${lines}`
  )
}

/**
 * Grid utility for responsive grids
 */
export function grid(columns: {
  default: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}) {
  const { default: defaultCols, sm, md, lg, xl } = columns
  
  return cn(
    'grid',
    `grid-cols-${defaultCols}`,
    sm && `sm:grid-cols-${sm}`,
    md && `md:grid-cols-${md}`,
    lg && `lg:grid-cols-${lg}`,
    xl && `xl:grid-cols-${xl}`,
    'gap-4'
  )
}
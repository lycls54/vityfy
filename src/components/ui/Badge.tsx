// src/components/ui/Badge.tsx - Badge component for categories and status
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', rounded = true, dot = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'badge inline-flex items-center font-medium',
          {
            // Variants
            'badge-primary': variant === 'primary',
            'badge-secondary': variant === 'secondary',
            'badge-success': variant === 'success',
            'badge-warning': variant === 'warning',
            'badge-error': variant === 'error',
            'border border-gray-300 text-gray-700 bg-white': variant === 'outline',
            
            // Sizes
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-0.5 text-sm': size === 'md',
            'px-3 py-1 text-base': size === 'lg',
            
            // Shape
            'rounded-full': rounded,
            'rounded-md': !rounded,
          },
          className
        )}
        {...props}
      >
        {dot && (
          <div className="w-1.5 h-1.5 bg-current rounded-full mr-1.5" />
        )}
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
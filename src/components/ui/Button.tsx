// src/components/ui/Button.tsx - Enhanced button component
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      fullWidth,
      children,
      disabled,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'btn gpu',
      {
        // Variants
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary', 
        'btn-outline': variant === 'outline',
        'btn-ghost': variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500': variant === 'destructive',
        
        // Sizes
        'btn-sm': size === 'sm',
        'btn-md': size === 'md',
        'btn-lg': size === 'lg',
        'btn-xl': size === 'xl',
        
        // States
        'w-full': fullWidth,
        'opacity-50 cursor-not-allowed': loading || disabled,
      },
      className
    )

    return (
      <button
        className={baseClasses}
        disabled={loading || disabled}
        ref={ref}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
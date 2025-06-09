'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@cvcraft/core'

const floatingInputVariants = cva(
  'relative w-full',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-red-500',
        success: 'border-green-500',
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const inputVariants = cva(
  'peer w-full border rounded-lg bg-background px-4 pt-6 pb-2 text-foreground placeholder-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus:border-primary',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
      },
      size: {
        sm: 'h-12 text-sm',
        default: 'h-14 text-base',
        lg: 'h-16 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const labelVariants = cva(
  'absolute left-4 transition-all duration-200 cursor-text peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground peer-focus:text-primary',
        error: 'text-red-500',
        success: 'text-green-500',
      },
      size: {
        sm: 'text-xs peer-placeholder-shown:text-sm top-2',
        default: 'text-sm peer-placeholder-shown:text-base top-2',
        lg: 'text-base peer-placeholder-shown:text-lg top-3',
      },
      hasValue: {
        true: 'top-2 scale-75 -translate-y-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hasValue: false,
    },
  }
)

export interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof floatingInputVariants> {
  label: string
  error?: string
  success?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
  showClearButton?: boolean
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ 
    className,
    variant,
    size,
    label,
    error,
    success,
    leftIcon,
    rightIcon,
    onClear,
    showClearButton = false,
    value,
    ...props 
  }, ref) => {
    const [focused, setFocused] = React.useState(false)
    const hasValue = Boolean(value) || Boolean(props.defaultValue)
    const currentVariant = error ? 'error' : success ? 'success' : variant

    return (
      <div className={cn(floatingInputVariants({ variant: currentVariant, size }), className)}>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            value={value}
            placeholder={label}
            className={cn(
              inputVariants({ variant: currentVariant, size }),
              leftIcon && 'pl-10',
              (rightIcon || showClearButton) && 'pr-10'
            )}
            onFocus={(e) => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
          
          <motion.label
            className={cn(
              labelVariants({ 
                variant: currentVariant, 
                size, 
                hasValue: hasValue || focused 
              })
            )}
            animate={{
              scale: hasValue || focused ? 0.75 : 1,
              y: hasValue || focused ? (size === 'sm' ? -8 : size === 'lg' ? -12 : -10) : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {label}
          </motion.label>
          
          {(rightIcon || (showClearButton && hasValue)) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              {showClearButton && hasValue && onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {rightIcon && (
                <div className="text-muted-foreground">
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
          {success && !error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-1 text-sm text-green-600"
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

FloatingInput.displayName = 'FloatingInput'

export { FloatingInput, floatingInputVariants }
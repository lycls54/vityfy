// packages/ui/src/components/Input.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@cvcraft/core'

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      inputSize: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-sm',
        lg: 'h-12 px-4 py-3 text-lg',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
    },
    defaultVariants: {
      inputSize: 'default',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  success?: string
  label?: string
  description?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    inputSize, 
    state, 
    leftIcon, 
    rightIcon, 
    error, 
    success, 
    label, 
    description,
    id,
    ...props 
  }, ref) => {
    const inputId = id || React.useId()
    const descriptionId = description ? `${inputId}-description` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    
    const currentState = error ? 'error' : success ? 'success' : state || 'default'
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ inputSize, state: currentState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            aria-describedby={cn(descriptionId, errorId)}
            aria-invalid={!!error}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        
        {description && !error && !success && (
          <p id={descriptionId} className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
        
        {success && (
          <p className="text-sm text-green-600 mt-1">
            {success}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
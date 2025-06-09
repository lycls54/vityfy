'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@cvcraft/core'

const labelVariants = cva(
 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-all duration-200',
 {
   variants: {
     variant: {
       default: 'text-foreground',
       muted: 'text-muted-foreground',
       destructive: 'text-destructive',
       success: 'text-emerald-600',
       warning: 'text-yellow-600',
       gradient: 'text-gradient bg-gradient-primary bg-clip-text text-transparent',
     },
     size: {
       xs: 'text-xs',
       sm: 'text-sm',
       default: 'text-sm',
       lg: 'text-base',
       xl: 'text-lg',
     },
     weight: {
       normal: 'font-normal',
       medium: 'font-medium',
       semibold: 'font-semibold',
       bold: 'font-bold',
     },
   },
   defaultVariants: {
     variant: 'default',
     size: 'default',
     weight: 'medium',
   },
 }
)

// Interface'i export etmeden önce tanımla
interface LabelProps
 extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
   VariantProps<typeof labelVariants> {
 required?: boolean
 optional?: boolean
 tooltip?: string
 asMotion?: boolean
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ 
  className, 
  variant, 
  size, 
  weight,
  required, 
  optional,
  tooltip,
  asMotion = false,
  children, 
  ...props 
}, ref) => {
  const baseProps = {
    className: cn(labelVariants({ variant, size, weight }), className),
    ...props,
  }

  const content = (
    <>
      {children}
      {required && (
        <span className="ml-1 text-destructive" aria-label="required">
          *
        </span>
      )}
      {optional && (
        <span className="ml-1 text-xs text-muted-foreground font-normal">
          (optional)
        </span>
      )}
    </>
  )

  if (asMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <LabelPrimitive.Root ref={ref} {...baseProps}>
          {content}
        </LabelPrimitive.Root>
      </motion.div>
    )
  }

  return (
    <LabelPrimitive.Root ref={ref} {...baseProps}>
      {content}
    </LabelPrimitive.Root>
  )
})

Label.displayName = LabelPrimitive.Root.displayName

// Export - tip conflict'ini önlemek için ayrı satırlarda
export { Label, labelVariants }
export type { LabelProps }
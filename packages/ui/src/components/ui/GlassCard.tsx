'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@cvcraft/core'

const glassCardVariants = cva(
  'relative overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white/10 border-white/20 shadow-lg',
        subtle: 'bg-white/5 border-white/10 shadow-md',
        strong: 'bg-white/20 border-white/30 shadow-xl',
        colored: 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 shadow-lg',
      },
      blur: {
        sm: 'backdrop-blur-sm',
        default: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
      },
      glow: {
        none: '',
        subtle: 'shadow-lg shadow-primary/10',
        strong: 'shadow-xl shadow-primary/20',
      },
      hover: {
        none: '',
        subtle: 'hover:bg-white/15 hover:shadow-lg',
        strong: 'hover:bg-white/25 hover:shadow-xl hover:scale-105',
        glow: 'hover:shadow-2xl hover:shadow-primary/30',
      },
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      blur: 'default',
      glow: 'none',
      hover: 'none',
      padding: 'default',
    },
  }
)

// ✅ TÜM ÇAKIŞAN EVENT'LERİ EXCLUDE ET
interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 
    | 'onDrag' 
    | 'onDragStart' 
    | 'onDragEnd'
    | 'onDragEnter'
    | 'onDragExit'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDrop'
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onTransitionStart'
    | 'onTransitionEnd'
  >,
    VariantProps<typeof glassCardVariants> {
  asChild?: boolean
  animated?: boolean
  gradient?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({
    className,
    variant,
    blur,
    glow,
    hover,
    padding,
    animated = false,
    gradient = false,
    children,
    style,
    ...props
  }, ref) => {
    const safeStyle = style || {}
    
    if (animated) {
      const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' },
        style: safeStyle,
      }
      
      return (
        <motion.div
          ref={ref}
          className={cn(
            glassCardVariants({ variant, blur, glow, hover, padding }),
            gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/5 before:to-transparent before:pointer-events-none',
            className
          )}
          {...animationProps}
          {...props}
        >
          {variant === 'colored' && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
              <div className="h-full w-full rounded-xl bg-black/20 backdrop-blur-md" />
            </div>
          )}
          
          <div className="relative z-10">{children}</div>
          
          {gradient && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none rounded-xl" />
          )}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          glassCardVariants({ variant, blur, glow, hover, padding }),
          gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/5 before:to-transparent before:pointer-events-none',
          className
        )}
        style={safeStyle}
        {...props}
      >
        {variant === 'colored' && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
            <div className="h-full w-full rounded-xl bg-black/20 backdrop-blur-md" />
          </div>
        )}
        
        <div className="relative z-10">{children}</div>
        
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none rounded-xl" />
        )}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Header component
interface GlassCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const GlassCardHeader = React.forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

GlassCardHeader.displayName = 'GlassCardHeader'

// Title component
interface GlassCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const GlassCardTitle = React.forwardRef<HTMLHeadingElement, GlassCardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight text-white/90', className)}
      {...props}
    >
      {children}
    </h3>
  )
)

GlassCardTitle.displayName = 'GlassCardTitle'

// Description component
interface GlassCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const GlassCardDescription = React.forwardRef<HTMLParagraphElement, GlassCardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-white/70', className)}
      {...props}
    >
      {children}
    </p>
  )
)

GlassCardDescription.displayName = 'GlassCardDescription'

// Content component
interface GlassCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const GlassCardContent = React.forwardRef<HTMLDivElement, GlassCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

GlassCardContent.displayName = 'GlassCardContent'

// Footer component
interface GlassCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const GlassCardFooter = React.forwardRef<HTMLDivElement, GlassCardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

GlassCardFooter.displayName = 'GlassCardFooter'

export { GlassCard }
export { GlassCardHeader }
export { GlassCardTitle }
export { GlassCardDescription }
export { GlassCardContent }
export { GlassCardFooter }
export { glassCardVariants }
export type { GlassCardProps }
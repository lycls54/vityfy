'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@cvcraft/core'

const progressRingVariants = cva(
  'relative inline-flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        default: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
      },
      variant: {
        default: 'text-primary',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        destructive: 'text-red-500',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

const sizeMap = {
  sm: { size: 32, strokeWidth: 3 },
  default: { size: 48, strokeWidth: 4 },
  lg: { size: 64, strokeWidth: 5 },
  xl: { size: 80, strokeWidth: 6 },
} as const

// Size key tipini güvenli hale getir
type SizeKey = keyof typeof sizeMap

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressRingVariants> {
  value: number
  showValue?: boolean
  animated?: boolean
}

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ 
    className, 
    size = 'default', 
    variant, 
    value, 
    showValue = false,
    animated = true,
    ...props 
  }, ref) => {
    // Size'ı güvenli şekilde cast et
    const safeSize: SizeKey = (size as SizeKey) || 'default'
    const { size: svgSize, strokeWidth } = sizeMap[safeSize]
    
    const radius = (svgSize - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <div
        ref={ref}
        className={cn(progressRingVariants({ size, variant }), className)}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              "transition-all duration-300 ease-in-out",
              !animated && "transition-none"
            )}
          />
        </svg>
        {showValue && (
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {Math.round(value)}%
          </span>
        )}
      </div>
    )
  }
)

ProgressRing.displayName = 'ProgressRing'

export { ProgressRing, progressRingVariants }
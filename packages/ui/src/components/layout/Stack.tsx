'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@cvcraft/core'

const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
        verticalReverse: 'flex-col-reverse',
        horizontalReverse: 'flex-row-reverse',
      },
      spacing: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
        16: 'gap-16',
        20: 'gap-20',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
        stretch: 'justify-stretch',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
        reverse: 'flex-wrap-reverse',
      },
      responsive: {
        true: 'flex-col sm:flex-row',
        false: '',
      },
    },
    defaultVariants: {
      direction: 'vertical',
      spacing: 4,
      align: 'stretch',
      justify: 'start',
      wrap: false,
      responsive: false,
    },
  }
)

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  children: React.ReactNode
  // Custom spacing between specific items
  divider?: React.ReactNode
  // Responsive configuration
  sm?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>
  md?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>
  lg?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    direction, 
    spacing, 
    align, 
    justify, 
    wrap, 
    responsive,
    divider,
    children,
    ...props 
  }, ref) => {
    const childArray = React.Children.toArray(children)
    
    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ direction, spacing, align, justify, wrap, responsive }),
          className
        )}
        {...props}
      >
        {divider
          ? childArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childArray.length - 1 && (
                  <div className="flex-shrink-0">
                    {divider}
                  </div>
                )}
              </React.Fragment>
            ))
          : children
        }
      </div>
    )
  }
)

Stack.displayName = 'Stack'

// Vertical Stack (VStack) - shorthand for vertical stacks
export interface VStackProps extends Omit<StackProps, 'direction'> {}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  (props, ref) => (
    <Stack ref={ref} direction="vertical" {...props} />
  )
)

VStack.displayName = 'VStack'

// Horizontal Stack (HStack) - shorthand for horizontal stacks
export interface HStackProps extends Omit<StackProps, 'direction'> {}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  (props, ref) => (
    <Stack ref={ref} direction="horizontal" {...props} />
  )
)

HStack.displayName = 'HStack'

// Center component - centers content both horizontally and vertically
export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  inline?: boolean
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, children, inline = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        inline ? 'inline-flex' : 'flex',
        'items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

Center.displayName = 'Center'

// Spacer component - takes up available space in flex containers
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1', className)}
      {...props}
    />
  )
)

Spacer.displayName = 'Spacer'

// Divider component for stacks
export interface StackDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

const StackDivider = React.forwardRef<HTMLDivElement, StackDividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-border flex-shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
      {...props}
    />
  )
)

StackDivider.displayName = 'StackDivider'

// Wrap component - responsive flex wrap container
export interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  spacing?: VariantProps<typeof stackVariants>['spacing']
  align?: VariantProps<typeof stackVariants>['align']
  justify?: VariantProps<typeof stackVariants>['justify']
}

const Wrap = React.forwardRef<HTMLDivElement, WrapProps>(
  ({ className, children, spacing = 4, align = 'start', justify = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap',
        `gap-${spacing}`,
        align === 'start' && 'items-start',
        align === 'center' && 'items-center',
        align === 'end' && 'items-end',
        align === 'stretch' && 'items-stretch',
        align === 'baseline' && 'items-baseline',
        justify === 'start' && 'justify-start',
        justify === 'center' && 'justify-center',
        justify === 'end' && 'justify-end',
        justify === 'between' && 'justify-between',
        justify === 'around' && 'justify-around',
        justify === 'evenly' && 'justify-evenly',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

Wrap.displayName = 'Wrap'

// AspectRatio component - maintains aspect ratio
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
  children: React.ReactNode
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative w-full', className)}
      style={{
        paddingBottom: `${(1 / ratio) * 100}%`,
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
)

AspectRatio.displayName = 'AspectRatio'

export { 
  Stack, 
  VStack, 
  HStack, 
  Center, 
  Spacer, 
  StackDivider, 
  Wrap, 
  AspectRatio,
  stackVariants,
}
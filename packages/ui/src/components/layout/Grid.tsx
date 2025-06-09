'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@cvcraft/core'

const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        12: 'grid-cols-12',
        auto: 'grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
        autoFit: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
        autoFill: 'grid-cols-[repeat(auto-fill,minmax(250px,1fr))]',
      },
      gap: {
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
      },
      responsive: {
        true: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        false: '',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
      responsive: false,
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  children: React.ReactNode
  // Responsive breakpoint configurations
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
  // Custom column definitions
  template?: string
  areas?: string
  // Auto sizing
  autoRows?: string
  autoCols?: string
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className, 
    cols, 
    gap, 
    responsive,
    sm,
    md,
    lg,
    xl,
    xxl,
    template,
    areas,
    autoRows,
    autoCols,
    children,
    style,
    ...props 
  }, ref) => {
    // Build responsive classes
    const responsiveClasses = []
    if (sm) responsiveClasses.push(`sm:grid-cols-${sm}`)
    if (md) responsiveClasses.push(`md:grid-cols-${md}`)
    if (lg) responsiveClasses.push(`lg:grid-cols-${lg}`)
    if (xl) responsiveClasses.push(`xl:grid-cols-${xl}`)
    if (xxl) responsiveClasses.push(`2xl:grid-cols-${xxl}`)

    // Custom styles
    const customStyles = {
      ...style,
      ...(template && { gridTemplateColumns: template }),
      ...(areas && { gridTemplateAreas: areas }),
      ...(autoRows && { gridAutoRows: autoRows }),
      ...(autoCols && { gridAutoColumns: autoCols }),
    }

    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({ 
            cols: (sm || md || lg || xl || xxl) ? undefined : cols, 
            gap, 
            responsive 
          }),
          ...responsiveClasses,
          className
        )}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

// Grid Item Component
const gridItemVariants = cva(
  '',
  {
    variants: {
      colSpan: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
      },
      colStart: {
        1: 'col-start-1',
        2: 'col-start-2',
        3: 'col-start-3',
        4: 'col-start-4',
        5: 'col-start-5',
        6: 'col-start-6',
        7: 'col-start-7',
        8: 'col-start-8',
        9: 'col-start-9',
        10: 'col-start-10',
        11: 'col-start-11',
        12: 'col-start-12',
        13: 'col-start-13',
      },
      rowStart: {
        1: 'row-start-1',
        2: 'row-start-2',
        3: 'row-start-3',
        4: 'row-start-4',
        5: 'row-start-5',
        6: 'row-start-6',
        7: 'row-start-7',
      },
    },
  }
)

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  children: React.ReactNode
  area?: string
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ 
    className, 
    colSpan, 
    rowSpan, 
    colStart, 
    rowStart,
    area,
    children,
    style,
    ...props 
  }, ref) => {
    const customStyles = {
      ...style,
      ...(area && { gridArea: area }),
    }

    return (
      <div
        ref={ref}
        className={cn(
          gridItemVariants({ colSpan, rowSpan, colStart, rowStart }),
          className
        )}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GridItem.displayName = 'GridItem'

// Masonry Grid Component (CSS Grid approach)
export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number
  gap?: number
  children: React.ReactNode
}

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ className, columns = 3, gap = 4, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          `grid-cols-${columns}`,
          `gap-${gap}`,
          className
        )}
        style={{
          gridTemplateRows: 'masonry',
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MasonryGrid.displayName = 'MasonryGrid'

// Auto Grid Component (automatically sizes columns)
export interface AutoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  minItemWidth?: number
  gap?: number
  children: React.ReactNode
}

const AutoGrid = React.forwardRef<HTMLDivElement, AutoGridProps>(
  ({ className, minItemWidth = 250, gap = 4, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid', `gap-${gap}`, className)}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AutoGrid.displayName = 'AutoGrid'

export { 
  Grid, 
  GridItem, 
  MasonryGrid, 
  AutoGrid,
  gridVariants, 
  gridItemVariants,
}
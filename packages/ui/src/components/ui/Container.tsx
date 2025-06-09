// packages/ui/src/components/Container.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@cvcraft/core'

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      padding: {
        none: '',
        sm: 'px-4',
        default: 'px-6',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'default',
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, padding, className }))}
      {...props}
    />
  )
)

Container.displayName = 'Container'

export { Container, containerVariants }
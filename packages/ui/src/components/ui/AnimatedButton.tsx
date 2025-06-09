'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@cvcraft/core'

const animatedButtonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
        glow: 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40',
        shine: 'bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white hover:from-gray-800 hover:via-blue-800 hover:to-gray-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: 'hover:animate-bounce',
        wiggle: 'hover:animate-wiggle',
        scale: 'hover:scale-105 active:scale-95',
        slide: 'transform transition-transform hover:translate-x-1',
        glow: 'transition-shadow hover:shadow-lg',
        ripple: 'relative overflow-hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'scale',
    },
  }
)

// ✅ Düzeltilmiş interface - TÜM çakışan events exclude edildi
interface AnimatedButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onDrag' 
    | 'onDragStart' 
    | 'onDragEnd'
    | 'onDragEnter'
    | 'onDragExit'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDrop'
    | 'onAnimationStart'      // ← Bu eksikti!
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onTransitionStart'
    | 'onTransitionEnd'
  >,
    VariantProps<typeof animatedButtonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
  magnetic?: boolean
  particles?: boolean
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ripple = false,
      magnetic = false,
      particles = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<
      Array<{ id: number; x: number; y: number }>
    >([])
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const rippleId = React.useRef(0)

    const Comp = asChild ? Slot : motion.button

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !loading && !disabled) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const newRipple = {
          id: rippleId.current++,
          x,
          y,
        }

        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
        }, 600)
      }

      onClick?.(event)
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (magnetic) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2
        setMousePosition({ x: x * 0.1, y: y * 0.1 })
      }
    }

    const handleMouseLeave = () => {
      if (magnetic) {
        setMousePosition({ x: 0, y: 0 })
      }
    }

    const motionProps = {
      whileHover: animation === 'scale' ? { scale: 1.05 } : {},
      whileTap: animation === 'scale' ? { scale: 0.95 } : {},
      animate: magnetic ? { x: mousePosition.x, y: mousePosition.y } : {},
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    }

    return (
      <Comp
        ref={ref}
        className={cn(animatedButtonVariants({ variant, size, animation, className }))}
        disabled={disabled || loading}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
        {...props}
      >
        {variant === 'shine' && (
          <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
        )}

        {ripple && (
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence>
              {ripples.map((ripple) => (
                <motion.div
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full"
                  style={{ left: ripple.x, top: ripple.y }}
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{ width: 200, height: 200, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {particles && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-current rounded-full opacity-50"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{ y: [-10, -20, -10], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-current/10"
            >
              <motion.div
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex items-center justify-center gap-2 relative z-10"
          initial={false}
          animate={{ opacity: loading ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!loading && leftIcon && (
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center"
            >
              {leftIcon}
            </motion.span>
          )}

          <motion.span layout className="flex items-center" animate={{ scale: loading ? 0.9 : 1 }}>
            {loading && loadingText ? loadingText : children}
          </motion.span>

          {!loading && rightIcon && (
            <motion.span
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center"
            >
              {rightIcon}
            </motion.span>
          )}
        </motion.div>

        {variant === 'glow' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/20 rounded-md blur-md"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </Comp>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

export { AnimatedButton, animatedButtonVariants }
export type { AnimatedButtonProps }

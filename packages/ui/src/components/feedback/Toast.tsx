'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
// ✅ AnimatePresence kaldırıldı - kullanılmıyor
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@cvcraft/core'

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100',
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    {/* ✅ X component'i React.createElement ile sarmalandı */}
    {React.createElement(X, { className: "h-4 w-4" })}
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

// Toast Provider with custom positioning
const ToastProvider = ({ children, ...props }: React.ComponentProps<typeof ToastPrimitives.Provider>) => {
  return (
    <ToastPrimitives.Provider
      swipeDirection="right"
      duration={5000}
      {...props}
    >
      {children}
      <ToastViewport />
    </ToastPrimitives.Provider>
  )
}

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// Enhanced Toast Components with icons and animations
interface ToastWithIconProps extends React.ComponentProps<typeof Toast> {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
  title?: string
  description?: string
  action?: React.ReactNode
  onClose?: () => void
  duration?: number
  showIcon?: boolean
}

const ToastWithIcon = React.forwardRef<
  React.ElementRef<typeof Toast>,
  ToastWithIconProps
>(({ 
  variant = 'default', 
  title, 
  description, 
  action, 
  onClose,
  duration = 5000,
  showIcon = true,
  className,
  children,
  ...props 
}, ref) => {
  const icons = {
    success: CheckCircle,
    destructive: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    default: null,
  }

  const Icon = icons[variant]

  return (
    <Toast ref={ref} variant={variant} className={className} duration={duration} {...props}>
      <div className="flex items-start space-x-3">
        {showIcon && Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-shrink-0 mt-0.5"
          >
            {/* ✅ Icon component'i React.createElement ile sarmalandı */}
            {React.createElement(Icon, { className: "h-5 w-5" })}
          </motion.div>
        )}
        <div className="flex-1 space-y-1">
          {title && (
            <ToastTitle className="text-sm font-semibold leading-none">
              {title}
            </ToastTitle>
          )}
          {description && (
            <ToastDescription className="text-sm">
              {description}
            </ToastDescription>
          )}
          {children}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
      {onClose && (
        <ToastClose onClick={onClose} />
      )}
    </Toast>
  )
})

ToastWithIcon.displayName = 'ToastWithIcon'

// Toast Hook
interface ToastOptions extends Omit<ToastWithIconProps, 'ref'> {
  id?: string
}

interface ToastState {
  toasts: Array<ToastOptions & { id: string }>
}

type ToastAction = 
  | { type: 'ADD_TOAST'; toast: ToastOptions & { id: string } }
  | { type: 'UPDATE_TOAST'; id: string; toast: Partial<ToastOptions> }
  | { type: 'DISMISS_TOAST'; id: string }
  | { type: 'REMOVE_TOAST'; id: string }

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      }
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, ...action.toast } : t
        ),
      }
    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, open: false } : t
        ),
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      }
    default:
      return state
  }
}

const listeners: Array<(state: ToastState) => void> = []
let memoryState: ToastState = { toasts: [] }

function dispatch(action: ToastAction) {
  memoryState = toastReducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toast(props: ToastOptions) {
  const id = props.id || Math.random().toString(36).substr(2, 9)

  const update = (props: ToastOptions) =>
    dispatch({
      type: 'UPDATE_TOAST',
      id,
      toast: props,
    })

  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        dispatch({ type: 'DISMISS_TOAST', id: toastId })
      } else {
        state.toasts.forEach((toast) => {
          dispatch({ type: 'DISMISS_TOAST', id: toast.id })
        })
      }
    },
  }
}

// Toast shorthand functions
toast.success = (title: string, description?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'description'>) =>
  toast({ variant: 'success', title, description, ...options })

toast.error = (title: string, description?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'description'>) =>
  toast({ variant: 'destructive', title, description, ...options })

toast.warning = (title: string, description?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'description'>) =>
  toast({ variant: 'warning', title, description, ...options })

toast.info = (title: string, description?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'description'>) =>
  toast({ variant: 'info', title, description, ...options })

// Toaster component to render all toasts
function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, ...props }) => (
        <ToastWithIcon key={id} {...props} />
      ))}
    </ToastProvider>
  )
}

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastWithIcon,
  Toaster,
  toast,
  useToast,
}

export type { ToastWithIconProps }

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastAction>

export type { ToastProps, ToastActionProps }
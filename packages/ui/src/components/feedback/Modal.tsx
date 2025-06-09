'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
// ✅ AnimatePresence kaldırıldı - kullanılmıyor
import { X } from 'lucide-react'
import { cn } from '@cvcraft/core'

const modalVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh] m-4',
      },
      variant: {
        default: 'border-border',
        glass: 'backdrop-blur-md bg-background/80 border-border/50',
        centered: 'items-center justify-center text-center',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    blur?: boolean
  }
>(({ className, blur = false, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      blur && 'backdrop-blur-md',
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof modalVariants> & {
      showCloseButton?: boolean
      closeOnOverlayClick?: boolean
      animated?: boolean
    }
>(({ 
  className, 
  children, 
  size, 
  variant,
  showCloseButton = true,
  closeOnOverlayClick = true,
  animated = true,
  ...props 
}, ref) => {
  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
  }

  const Component = animated ? motion.div : 'div'
  const animationProps = animated ? {
    variants: contentVariants,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  } : {}

  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(modalVariants({ size, variant }), className)}
        onInteractOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
        {...props}
      >
        <Component {...animationProps}>
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              {/* ✅ X component'i React.createElement ile sarmalandı - tip uyumsuzluğunu çözer */}
              {React.createElement(X, { className: "h-4 w-4" })}
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </Component>
      </DialogPrimitive.Content>
    </ModalPortal>
  )
})
ModalContent.displayName = DialogPrimitive.Content.displayName

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
))
ModalHeader.displayName = 'ModalHeader'

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

// Enhanced Modal Components

// Confirmation Modal
interface ConfirmModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
  onCancel?: () => void
  loading?: boolean
}

const ConfirmModal = React.forwardRef<
  React.ElementRef<typeof ModalContent>,
  ConfirmModalProps
>(({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  loading = false,
  ...props 
}, ref) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange?.(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent ref={ref} size="sm" {...props}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter className="gap-2">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              'inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            {loading ? (
              <motion.div
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              confirmText
            )}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})

ConfirmModal.displayName = 'ConfirmModal'

// Alert Modal
interface AlertModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  buttonText?: string
  variant?: 'default' | 'destructive' | 'warning' | 'info'
}

const AlertModal = React.forwardRef<
  React.ElementRef<typeof ModalContent>,
  AlertModalProps
>(({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  buttonText = 'OK',
  variant = 'default',
  ...props 
}, ref) => {
  const handleClose = () => {
    onOpenChange?.(false)
  }

  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    info: 'bg-blue-500 text-white hover:bg-blue-600',
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent ref={ref} size="sm" variant="centered" {...props}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <button
            onClick={handleClose}
            className={cn(
              'inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              variantStyles[variant]
            )}
          >
            {buttonText}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})

AlertModal.displayName = 'AlertModal'

// Form Modal
interface FormModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  submitText?: string
  cancelText?: string
  onSubmit: (formData: FormData) => void | Promise<void>
  onCancel?: () => void
  loading?: boolean
  children: React.ReactNode
}

const FormModal = React.forwardRef<
  React.ElementRef<typeof ModalContent>,
  FormModalProps
>(({ 
  open, 
  onOpenChange, 
  title, 
  description,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onSubmit,
  onCancel,
  loading = false,
  children,
  ...props 
}, ref) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await onSubmit(formData)
      onOpenChange?.(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange?.(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent ref={ref} {...props}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>
          <div className="py-4">
            {children}
          </div>
          <ModalFooter className="gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading || isSubmitting}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {(loading || isSubmitting) ? (
                <motion.div
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : null}
              {submitText}
            </button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
})

FormModal.displayName = 'FormModal'

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ConfirmModal,
  AlertModal,
  FormModal,
}

export type { ConfirmModalProps, AlertModalProps, FormModalProps }
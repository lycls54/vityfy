import React from 'react'

/**
 * Common component prop types and interfaces
 */

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
  'data-testid'?: string
}

// Component size variants
export type ComponentSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl'

// Component variant types
export type ComponentVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'destructive' 
  | 'outline' 
  | 'ghost' 
  | 'link'

// Component state types
export type ComponentState = 'default' | 'loading' | 'success' | 'error' | 'warning'

// Animation types
export type AnimationType = 
  | 'none'
  | 'fade'
  | 'slide'
  | 'scale'
  | 'bounce'
  | 'rotate'
  | 'pulse'

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'center'

export interface AnimationProps {
  animated?: boolean
  animation?: AnimationType
  direction?: AnimationDirection
  duration?: number
  delay?: number
}

// Layout types
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface FlexProps {
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: boolean
  gap?: number | string
}

// Grid types
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | 'auto'

export interface GridProps {
  columns?: GridColumns
  rows?: GridRows
  gap?: number | string
  columnGap?: number | string
  rowGap?: number | string
}

// Spacing types
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24

export interface SpacingProps {
  padding?: Spacing
  paddingX?: Spacing
  paddingY?: Spacing
  paddingTop?: Spacing
  paddingRight?: Spacing
  paddingBottom?: Spacing
  paddingLeft?: Spacing
  margin?: Spacing
  marginX?: Spacing
  marginY?: Spacing
  marginTop?: Spacing
  marginRight?: Spacing
  marginBottom?: Spacing
  marginLeft?: Spacing
}

// Color types
export interface ColorProps {
  color?: string
  backgroundColor?: string
  borderColor?: string
}

// Interactive component props
export interface InteractiveProps {
  disabled?: boolean
  loading?: boolean
  readonly?: boolean
  required?: boolean
  tabIndex?: number
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onKeyUp?: (event: React.KeyboardEvent) => void
}

// Form component props
export interface FormComponentProps extends InteractiveProps {
  name?: string
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  onValueChange?: (value: any) => void
  error?: string
  success?: string
  description?: string
  label?: string
  placeholder?: string
  autoComplete?: string
  autoFocus?: boolean
}

// Button component types
export interface ButtonProps extends BaseComponentProps, InteractiveProps {
  variant?: ComponentVariant
  size?: ComponentSize
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loadingText?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// Input component types
export interface InputProps extends BaseComponentProps, FormComponentProps {
  type?: React.HTMLInputTypeAttribute
  size?: ComponentSize
  variant?: 'default' | 'outline' | 'filled' | 'ghost'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  min?: number | string
  max?: number | string
  step?: number | string
  pattern?: string
  minLength?: number
  maxLength?: number
}

// Card component types
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outline' | 'filled' | 'ghost' | 'glass'
  size?: ComponentSize
  padding?: Spacing
  shadow?: 'none' | 'sm' | 'default' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'default' | 'lg' | 'xl' | 'full'
  hover?: boolean
  clickable?: boolean
  onClick?: (event: React.MouseEvent) => void
}

// Modal component types
export interface ModalProps extends BaseComponentProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  size?: ComponentSize | 'full'
  centered?: boolean
  closeOnEscape?: boolean
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  persistent?: boolean
}

// Toast component types
export interface ToastProps extends BaseComponentProps {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  title?: string
  description?: string
  action?: React.ReactNode
  showIcon?: boolean
  closable?: boolean
  onClose?: () => void
}

// Progress component types
export interface ProgressProps extends BaseComponentProps {
  value: number
  max?: number
  size?: ComponentSize
  variant?: 'default' | 'success' | 'warning' | 'error'
  showValue?: boolean
  animated?: boolean
  striped?: boolean
}

// Avatar component types
export interface AvatarProps extends BaseComponentProps {
  src?: string
  alt?: string
  size?: ComponentSize
  rounded?: boolean
  fallback?: string
  loading?: boolean
  onError?: () => void
}

// Badge component types
export interface BadgeProps extends BaseComponentProps {
  variant?: ComponentVariant | 'success' | 'warning' | 'info'
  size?: ComponentSize
  rounded?: boolean
  dot?: boolean
  pulse?: boolean
  count?: number
  max?: number
  showZero?: boolean
}

// Skeleton component types
export interface SkeletonProps extends BaseComponentProps {
  width?: number | string
  height?: number | string
  rounded?: boolean
  animated?: boolean
  lines?: number
  lineHeight?: number | string
  lineSpacing?: number | string
}

// Spinner component types
export interface SpinnerProps extends BaseComponentProps {
  size?: ComponentSize
  variant?: 'default' | 'dots' | 'bars' | 'circle' | 'pulse'
  color?: string
  speed?: 'slow' | 'normal' | 'fast'
}

// Divider component types
export interface DividerProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  thickness?: number
  spacing?: Spacing
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
}

// Popover component types
export interface PopoverProps extends BaseComponentProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  content?: React.ReactNode
  placement?: 
    | 'top' 
    | 'top-start' 
    | 'top-end'
    | 'bottom' 
    | 'bottom-start' 
    | 'bottom-end'
    | 'left' 
    | 'left-start' 
    | 'left-end'
    | 'right' 
    | 'right-start' 
    | 'right-end'
  offset?: number
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
}

// Tooltip component types
export interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode
  placement?: PopoverProps['placement']
  delay?: number
  duration?: number
  disabled?: boolean
  arrow?: boolean
}

// Accordion component types
export interface AccordionProps extends BaseComponentProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export interface AccordionItemProps extends BaseComponentProps {
  value: string
  disabled?: boolean
  trigger?: React.ReactNode
  content?: React.ReactNode
}

// Tabs component types
export interface TabsProps extends BaseComponentProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'pills' | 'bordered' | 'underlined'
}

export interface TabProps extends BaseComponentProps {
  value: string
  disabled?: boolean
}

// Menu component types
export interface MenuProps extends BaseComponentProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: PopoverProps['placement']
}

export interface MenuItemProps extends BaseComponentProps {
  disabled?: boolean
  destructive?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  shortcut?: string
  onClick?: (event: React.MouseEvent) => void
}

// Select component types
export interface SelectProps extends BaseComponentProps, FormComponentProps {
  options: Array<{
    value: string
    label: string
    disabled?: boolean
    group?: string
  }>
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  placeholder?: string
  emptyMessage?: string
  maxItems?: number
  onSearch?: (query: string) => void
}

// Checkbox component types
export interface CheckboxProps extends BaseComponentProps, Omit<FormComponentProps, 'value' | 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
}

// Radio component types
export interface RadioGroupProps extends BaseComponentProps, Omit<FormComponentProps, 'onChange'> {
  orientation?: 'horizontal' | 'vertical'
  onChange?: (value: string) => void
}

export interface RadioProps extends BaseComponentProps {
  value: string
  disabled?: boolean
}

// Switch component types
export interface SwitchProps extends BaseComponentProps, Omit<FormComponentProps, 'value' | 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  size?: ComponentSize
  onChange?: (checked: boolean) => void
}

// Textarea component types
export interface TextareaProps extends BaseComponentProps, FormComponentProps {
  rows?: number
  cols?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}

// File input component types
export interface FileInputProps extends BaseComponentProps, Omit<FormComponentProps, 'value' | 'onChange'> {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  onFileSelect?: (files: File[]) => void
  onError?: (error: string) => void
  dragAndDrop?: boolean
  showPreview?: boolean
}

// Data table component types
export interface TableColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
  headerRender?: () => React.ReactNode
}

export interface TableProps<T = any> extends BaseComponentProps {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
  currentPage?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void
  onFilterChange?: (filters: Record<string, any>) => void
  selectable?: boolean
  selectedRows?: string[]
  onSelectionChange?: (selectedKeys: string[]) => void
  rowKey?: string | ((record: T) => string)
  expandable?: boolean
  onExpand?: (record: T) => React.ReactNode
}

// Responsive props helper
export interface ResponsiveProps<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

// Theme context types
export interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  resolvedTheme: 'light' | 'dark'
}

// Motion component props
export interface MotionComponentProps extends AnimationProps {
  whileHover?: any
  whileTap?: any
  whileFocus?: any
  whileInView?: any
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  variants?: any
  custom?: any
}

// Portal props
export interface PortalProps {
  children: React.ReactNode
  container?: Element | null
  disabled?: boolean
}

// Error boundary props
export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onReset?: () => void
}

// Virtual list props
export interface VirtualListProps<T> {
  items: T[]
  height: number
  itemHeight: number | ((index: number) => number)
  renderItem: (item: T, index: number) => React.ReactNode
  overscan?: number
  onScroll?: (scrollTop: number) => void
}

// Infinite scroll props
export interface InfiniteScrollProps {
  children: React.ReactNode
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  threshold?: number
  loader?: React.ReactNode
  endMessage?: React.ReactNode
}
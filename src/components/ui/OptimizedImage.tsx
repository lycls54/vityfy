import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string
  alt: string
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

/**
 * Performance-optimized Image component
 */
export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  loading = 'lazy',
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn('gpu', className)}
      priority={priority}
      loading={loading}
      quality={quality}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPg=="
      {...props}
    />
  )
}

'use client'

import { useState, useEffect } from 'react'

/**
 * Hook that tracks a CSS media query and returns whether it matches
 * @param query - The media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined; // ✅ Explicitly return undefined
    }

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Define the listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }

    return undefined; // ✅ Fallback for unexpected cases
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks for common screen sizes
 */

// Mobile first breakpoints (Tailwind CSS defaults)
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

// Specific breakpoints
export const useIsSmall = () => useMediaQuery('(min-width: 640px)')
export const useIsMedium = () => useMediaQuery('(min-width: 768px)')
export const useIsLarge = () => useMediaQuery('(min-width: 1024px)')
export const useIsExtraLarge = () => useMediaQuery('(min-width: 1280px)')
export const useIs2ExtraLarge = () => useMediaQuery('(min-width: 1536px)')

// Orientation
export const useIsPortrait = () => useMediaQuery('(orientation: portrait)')
export const useIsLandscape = () => useMediaQuery('(orientation: landscape)')

// Preference queries
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
export const usePrefersLightMode = () => useMediaQuery('(prefers-color-scheme: light)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const usePrefersHighContrast = () => useMediaQuery('(prefers-contrast: high)')

// Specific feature queries
export const useSupportsHover = () => useMediaQuery('(hover: hover)')
export const useSupportsPointerFine = () => useMediaQuery('(pointer: fine)')
export const useSupportsPointerCoarse = () => useMediaQuery('(pointer: coarse)')

/**
 * Hook that returns current breakpoint name based on screen size
 */
export function useBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const is2xl = useIs2ExtraLarge()
  const isXl = useIsExtraLarge()
  const isLg = useIsLarge()
  const isMd = useIsMedium()
  const isSm = useIsSmall()

  if (is2xl) return '2xl'
  if (isXl) return 'xl'
  if (isLg) return 'lg'
  if (isMd) return 'md'
  if (isSm) return 'sm'
  return 'xs'
}

/**
 * Hook that returns an object with all breakpoint states
 */
export function useBreakpoints() {
  return {
    xs: !useIsSmall(),
    sm: useIsSmall(),
    md: useIsMedium(),
    lg: useIsLarge(),
    xl: useIsExtraLarge(),
    '2xl': useIs2ExtraLarge(),
    isMobile: useIsMobile(),
    isTablet: useIsTablet(),
    isDesktop: useIsDesktop(),
    isPortrait: useIsPortrait(),
    isLandscape: useIsLandscape(),
    current: useBreakpoint(),
  }
}

/**
 * Hook for responsive values based on breakpoints
 */
export function useResponsiveValue<T>(values: {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}): T | undefined {
  const breakpoint = useBreakpoint()
  
  // Return the value for current breakpoint or fallback to smaller breakpoints
  if (values[breakpoint] !== undefined) {
    return values[breakpoint]
  }
  
  // Fallback chain
  if (breakpoint === '2xl' && values.xl !== undefined) return values.xl
  if ((['2xl', 'xl'].includes(breakpoint)) && values.lg !== undefined) return values.lg
  if ((['2xl', 'xl', 'lg'].includes(breakpoint)) && values.md !== undefined) return values.md
  if ((['2xl', 'xl', 'lg', 'md'].includes(breakpoint)) && values.sm !== undefined) return values.sm
  
  return values.xs
}

/**
 * Hook that tracks viewport dimensions
 */
export function useViewportSize() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    updateSize()

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

/**
 * Hook that tracks if the viewport is above a certain width
 */
export function useMinWidth(minWidth: number): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px)`)
}

/**
 * Hook that tracks if the viewport is below a certain width
 */
export function useMaxWidth(maxWidth: number): boolean {
  return useMediaQuery(`(max-width: ${maxWidth}px)`)
}

/**
 * Hook that tracks if the viewport is within a width range
 */
export function useWidthRange(minWidth: number, maxWidth: number): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`)
}

/**
 * Hook that tracks device pixel ratio for high-DPI displays
 */
export function useDevicePixelRatio(): number {
  const [pixelRatio, setPixelRatio] = useState<number>(1);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updatePixelRatio = () => {
      setPixelRatio(window.devicePixelRatio || 1);
    };

    updatePixelRatio();

    const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePixelRatio);
      return () => {
        mediaQuery.removeEventListener('change', updatePixelRatio);
      };
    }

    // ✅ Add fallback return for cases where addEventListener is not supported
    return undefined;
  }, []);

  return pixelRatio;
}

/**
 * Hook that detects if device is touch-capable
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      )
    }

    checkTouch()
  }, [])

  return isTouch
}

/**
 * Hook that combines multiple media queries with logical operators
 */
export function useCombinedMediaQuery(
  queries: string[],
  operator: 'and' | 'or' = 'and'
): boolean {
  const combinedQuery = operator === 'and' 
    ? queries.join(' and ')
    : queries.join(', ')
    
  return useMediaQuery(combinedQuery)
}

/**
 * Hook for container queries (experimental)
 */
export function useContainerQuery(
  containerRef: React.RefObject<HTMLElement>,
  query: string
): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') {
      return
    }

    // This is a simplified implementation
    // In practice, you'd need a container query polyfill or native support
    const checkQuery = () => {
      if (!containerRef.current) return

      const element = containerRef.current
      const rect = element.getBoundingClientRect()
      
      // Parse simple width-based queries with null safety
      const widthMatch = query.match(/min-width:\s*(\d+)px/)
      if (widthMatch?.[1]) {
        setMatches(rect.width >= parseInt(widthMatch[1], 10))
        return
      }

      const maxWidthMatch = query.match(/max-width:\s*(\d+)px/)
      if (maxWidthMatch?.[1]) {
        setMatches(rect.width <= parseInt(maxWidthMatch[1], 10))
        return
      }
    }

    checkQuery()

    // Use ResizeObserver if available
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(checkQuery)
      resizeObserver.observe(containerRef.current)
      return () => resizeObserver.disconnect()
    }

    // Fallback to window resize
    window.addEventListener('resize', checkQuery)
    return () => window.removeEventListener('resize', checkQuery)
  }, [containerRef, query])

  return matches
}
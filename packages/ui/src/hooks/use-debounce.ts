'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook that debounces a value
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook that debounces a callback function
 * @param callback - The callback function to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    }) as T,
    [delay]
  )

  return debouncedCallback
}

/**
 * Hook that provides immediate execution and debounced execution
 * @param callback - The callback function
 * @param delay - The debounce delay in milliseconds
 * @returns Object with immediate and debounced callback functions
 */
export function useImmediateDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const immediate = useCallback(
    ((...args: Parameters<T>) => {
      callbackRef.current(...args)
    }) as T,
    []
  )

  const debounced = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    }) as T,
    [delay]
  )

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return { immediate, debounced, cancel }
}

/**
 * Hook for debouncing search input
 * @param initialValue - Initial search value
 * @param delay - Debounce delay in milliseconds
 * @returns Object with search value, debounced value, and setter
 */
export function useDebouncedSearch(initialValue: string = '', delay: number = 300) {
  const [searchValue, setSearchValue] = useState(initialValue)
  const debouncedSearchValue = useDebounce(searchValue, delay)

  const clearSearch = useCallback(() => {
    setSearchValue('')
  }, [])

  return {
    searchValue,
    debouncedSearchValue,
    setSearchValue,
    clearSearch,
  }
}

/**
 * Hook for debounced state updates
 * @param initialValue - Initial state value
 * @param delay - Debounce delay in milliseconds
 * @returns Array with current value, debounced value, and setter
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue)
  const debouncedValue = useDebounce(value, delay)

  return [value, debouncedValue, setValue]
}

/**
 * Hook that tracks if a debounced value is pending
 * @param value - The value to track
 * @param delay - The debounce delay in milliseconds
 * @returns Object with debounced value and pending state
 */
export function useDebouncedWithPending<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      setIsPending(false)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return { debouncedValue, isPending }
}

/**
 * Hook for debounced API calls
 * @param apiCall - The API function to call
 * @param delay - Debounce delay in milliseconds
 * @returns Object with trigger function, loading state, data, and error
 */
export function useDebouncedApi<T, P extends any[]>(
  apiCall: (...args: P) => Promise<T>,
  delay: number = 300
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef<AbortController>()

  const debouncedApiCall = useDebouncedCallback(
    async (...args: P) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController()

      try {
        setLoading(true)
        setError(null)
        
        const result = await apiCall(...args)
        
        // Only update state if request wasn't aborted
        if (!abortControllerRef.current.signal.aborted) {
          setData(result)
        }
      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false)
        }
      }
    },
    delay
  )

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setLoading(false)
  }, [])

  const reset = useCallback(() => {
    cancel()
    setData(null)
    setError(null)
  }, [cancel])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    data,
    error,
    loading,
    trigger: debouncedApiCall,
    cancel,
    reset,
  }
}

/**
 * Hook for debounced form validation
 * @param values - Form values object
 * @param validator - Validation function
 * @param delay - Debounce delay in milliseconds
 * @returns Object with validation results
 */
export function useDebouncedValidation<T extends Record<string, any>>(
  values: T,
  validator: (values: T) => Record<string, string>,
  delay: number = 300
) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)
  const debouncedValues = useDebounce(values, delay)

  useEffect(() => {
    setIsValidating(true)
    
    const validationErrors = validator(debouncedValues)
    setErrors(validationErrors)
    setIsValidating(false)
  }, [debouncedValues, validator])

  const isValid = Object.keys(errors).length === 0

  return {
    errors,
    isValid,
    isValidating,
  }
}

/**
 * Hook for debounced auto-save functionality
 * @param data - Data to auto-save
 * @param saveFunction - Function to save the data
 * @param delay - Debounce delay in milliseconds
 * @returns Object with save status and manual save function
 */
export function useDebouncedAutoSave<T>(
  data: T,
  saveFunction: (data: T) => Promise<void>,
  delay: number = 2000
) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const save = useCallback(async (dataToSave: T) => {
    try {
      setIsSaving(true)
      setError(null)
      await saveFunction(dataToSave)
      setLastSaved(new Date())
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Save failed'))
    } finally {
      setIsSaving(false)
    }
  }, [saveFunction])

  const debouncedSave = useDebouncedCallback(save, delay)

  useEffect(() => {
    if (data && !isSaving) {
      debouncedSave(data)
    }
  }, [data, debouncedSave, isSaving])

  const manualSave = useCallback(() => {
    save(data)
  }, [save, data])

  return {
    isSaving,
    lastSaved,
    error,
    manualSave,
  }
}
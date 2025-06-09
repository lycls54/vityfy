'use client'

import { useState, useEffect, useCallback } from 'react'

type SetValue<T> = (value: T | ((val: T) => T)) => void

interface UseLocalStorageOptions<T> {
  defaultValue: T
  serializer?: {
    read: (value: string) => T
    write: (value: T) => string
  }
}

/**
 * A hook that syncs state with localStorage
 * @param key - The localStorage key
 * @param options - Configuration options
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T>
): [T, SetValue<T>, () => void] {
  const { defaultValue, serializer } = options

  // Get initial value from localStorage
  const getStoredValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }

      return serializer ? serializer.read(item) : JSON.parse(item)
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  }, [key, defaultValue, serializer])

  const [storedValue, setStoredValue] = useState<T>(getStoredValue)

  // Update localStorage when state changes
  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          const serializedValue = serializer
            ? serializer.write(valueToStore)
            : JSON.stringify(valueToStore)
          window.localStorage.setItem(key, serializedValue)
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue, serializer]
  )

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(defaultValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, defaultValue])

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) {
        return
      }

      if (e.newValue === null) {
        setStoredValue(defaultValue)
        return
      }

      try {
        const newValue = serializer ? serializer.read(e.newValue) : JSON.parse(e.newValue)
        setStoredValue(newValue)
      } catch (error) {
        console.warn(`Error parsing localStorage change for key "${key}":`, error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, defaultValue, serializer])

  // Sync with localStorage on mount (for SSR)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = getStoredValue()
      if (JSON.stringify(stored) !== JSON.stringify(storedValue)) {
        setStoredValue(stored)
      }
    }
  }, [getStoredValue, storedValue])

  return [storedValue, setValue, removeValue]
}

/**
 * A simplified version of useLocalStorage with JSON serialization
 */
export function useLocalStorageState<T>(key: string, defaultValue: T) {
  return useLocalStorage(key, { defaultValue })
}

/**
 * Hook for storing boolean values in localStorage
 */
export function useLocalStorageBoolean(key: string, defaultValue: boolean = false) {
  return useLocalStorage(key, { defaultValue })
}

/**
 * Hook for storing string values in localStorage
 */
export function useLocalStorageString(key: string, defaultValue: string = '') {
  return useLocalStorage(key, { defaultValue })
}

/**
 * Hook for storing number values in localStorage
 */
export function useLocalStorageNumber(key: string, defaultValue: number = 0) {
  return useLocalStorage(key, { defaultValue })
}

/**
 * Hook for storing array values in localStorage
 */
export function useLocalStorageArray<T>(key: string, defaultValue: T[] = []) {
  return useLocalStorage(key, { defaultValue })
}

/**
 * Hook for storing object values in localStorage with custom serializer
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  key: string, 
  defaultValue: T
) {
  return useLocalStorage(key, { 
    defaultValue,
    serializer: {
      read: (value: string) => {
        try {
          const parsed = JSON.parse(value)
          return { ...defaultValue, ...parsed }
        } catch {
          return defaultValue
        }
      },
      write: (value: T) => JSON.stringify(value)
    }
  })
}

/**
 * Hook for managing theme preference in localStorage
 */
export function useLocalStorageTheme() {
  return useLocalStorage<'light' | 'dark' | 'system'>('theme', {
    defaultValue: 'system'
  })
}

/**
 * Hook for managing user preferences in localStorage
 */
export interface UserPreferences {
  language: string
  notifications: boolean
  autoSave: boolean
  [key: string]: any
}

export function useLocalStoragePreferences(defaultPreferences: UserPreferences) {
  return useLocalStorageObject('user-preferences', defaultPreferences)
}

/**
 * Hook for managing recent items list in localStorage
 */
export function useLocalStorageRecent<T>(
  key: string,
  maxItems: number = 10,
  defaultValue: T[] = []
) {
  const [items, setItems, removeItems] = useLocalStorageArray(key, defaultValue)

  const addItem = useCallback((item: T) => {
    setItems(currentItems => {
      const filtered = currentItems.filter(i => JSON.stringify(i) !== JSON.stringify(item))
      return [item, ...filtered].slice(0, maxItems)
    })
  }, [setItems, maxItems])

  const removeItem = useCallback((item: T) => {
    setItems(currentItems => 
      currentItems.filter(i => JSON.stringify(i) !== JSON.stringify(item))
    )
  }, [setItems])

  const clearItems = useCallback(() => {
    removeItems()
  }, [removeItems])

  return {
    items,
    addItem,
    removeItem,
    clearItems,
    setItems
  }
}

/**
 * Hook for managing form data persistence in localStorage
 */
export function useLocalStorageForm<T extends Record<string, any>>(
  formKey: string,
  initialValues: T,
  options: {
    debounceMs?: number
    exclude?: (keyof T)[]
  } = {}
) {
  const { exclude = [] } = options
  // debounceMs kaldırıldı çünkü kullanılmıyordu
  
  const [formData, setFormData] = useLocalStorageObject(formKey, initialValues)

  const updateField = useCallback((field: keyof T, value: any) => {
    if (exclude.includes(field)) return
    
    setFormData(current => ({
      ...current,
      [field]: value
    }))
  }, [setFormData, exclude])

  const updateForm = useCallback((updates: Partial<T>) => {
    const filteredUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
      if (!exclude.includes(key as keyof T)) {
        acc[key as keyof T] = value
      }
      return acc
    }, {} as Partial<T>)

    setFormData(current => ({
      ...current,
      ...filteredUpdates
    }))
  }, [setFormData, exclude])

  const resetForm = useCallback(() => {
    setFormData(initialValues)
  }, [setFormData, initialValues])

  const clearForm = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(formKey)
    }
    setFormData(initialValues)
  }, [formKey, setFormData, initialValues])

  return {
    formData,
    updateField,
    updateForm,
    resetForm,
    clearForm
  }
}
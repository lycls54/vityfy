// src/hooks/usePricingStrategy.ts - Complete pricing strategy implementation
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface PricingState {
  showPricingModal: boolean
  userSegment: 'new' | 'returning' | 'engaged' | 'premium'
  timeSpent: number
  interactionCount: number
  triggerSource: string | null
  hasSeenPricing: boolean
  isPremium: boolean
}

interface PricingMetrics {
  modalShown: number
  conversions: number
  revenue: number
  averageTimeToConversion: number
}

export function usePricingStrategy() {
  const [state, setState] = useState<PricingState>({
    showPricingModal: false,
    userSegment: 'new',
    timeSpent: 0,
    interactionCount: 0,
    triggerSource: null,
    hasSeenPricing: false,
    isPremium: false
  })

  const [metrics, setMetrics] = useLocalStorage<PricingMetrics>('pricing_metrics', {
    modalShown: 0,
    conversions: 0,
    revenue: 0,
    averageTimeToConversion: 0
  })

  const [userBehavior, setUserBehavior] = useLocalStorage('user_behavior', {
    firstVisit: Date.now(),
    lastVisit: Date.now(),
    visitCount: 1,
    totalTimeSpent: 0,
    cvsCreated: 0,
    upgradeAttempts: 0
  })

  // Premium status persistence
  const [premiumStatus, setPremiumStatus] = useLocalStorage('premium_status', {
    isPremium: false,
    purchaseDate: null,
    transactionId: null
  })

  useEffect(() => {
    setState(prev => ({ ...prev, isPremium: premiumStatus.isPremium }))
  }, [premiumStatus.isPremium])

  // Time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }))
      setUserBehavior(prev => ({ ...prev, totalTimeSpent: prev.totalTimeSpent + 1 }))
    }, 1000)

    return () => clearInterval(timer)
  }, [setUserBehavior])

  // User segment detection
  useEffect(() => {
    const detectUserSegment = () => {
      if (premiumStatus.isPremium) {
        return 'premium'
      } else if (userBehavior.visitCount > 3) {
        return 'returning'
      } else if (state.timeSpent > 120 || state.interactionCount > 5) {
        return 'engaged'
      } else {
        return 'new'
      }
    }

    setState(prev => ({ ...prev, userSegment: detectUserSegment() }))
  }, [state.timeSpent, state.interactionCount, userBehavior.visitCount, premiumStatus.isPremium])

  // Optimal pricing calculation
  const getOptimalPrice = useCallback((): number => {
    const basePrice = 7.99
    const discountPrice = 5.99
    const currentHour = new Date().getHours()
    
    // Dynamic pricing logic
    if (state.userSegment === 'new' && state.timeSpent < 60) {
      // New users get initial discount to hook them
      return discountPrice
    } else if (state.userSegment === 'engaged' && currentHour >= 9 && currentHour <= 17) {
      // Engaged users during business hours see full value
      return basePrice
    } else if (state.userSegment === 'returning' && userBehavior.upgradeAttempts > 0) {
      // Returning users who tried before get small discount
      return 6.99
    } else if (currentHour < 9 || currentHour > 18) {
      // Off-hours pricing to capture casual browsers
      return discountPrice
    }
    
    return basePrice
  }, [state.userSegment, state.timeSpent, userBehavior.upgradeAttempts])

  // Trigger pricing modal based on user behavior
  const triggerPricingModal = useCallback((source: string) => {
    if (state.isPremium) return // Don't show if already premium
    
    setState(prev => ({
      ...prev,
      showPricingModal: true,
      triggerSource: source,
      hasSeenPricing: true
    }))

    // Track modal shown
    setMetrics(prev => ({
      ...prev,
      modalShown: prev.modalShown + 1
    }))

    // Track user behavior
    setUserBehavior(prev => ({
      ...prev,
      upgradeAttempts: prev.upgradeAttempts + 1
    }))

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pricing_modal_shown', {
        trigger_source: source,
        user_segment: state.userSegment,
        time_spent: state.timeSpent,
        interaction_count: state.interactionCount,
        optimal_price: getOptimalPrice()
      })
    }
  }, [state.isPremium, state.userSegment, state.timeSpent, state.interactionCount, getOptimalPrice, setMetrics, setUserBehavior])

  // Close pricing modal
  const closePricingModal = useCallback(() => {
    setState(prev => ({ ...prev, showPricingModal: false }))
  }, [])

  // Handle upgrade completion
  const handleUpgradeSuccess = useCallback((transactionId: string, amount: number) => {
    // Update premium status
    setPremiumStatus({
      isPremium: true,
      purchaseDate: Date.now(),
      transactionId
    })

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      conversions: prev.conversions + 1,
      revenue: prev.revenue + amount,
      averageTimeToConversion: prev.conversions > 0 
        ? (prev.averageTimeToConversion * prev.conversions + state.timeSpent) / (prev.conversions + 1)
        : state.timeSpent
    }))

    // Close modal
    setState(prev => ({
      ...prev,
      showPricingModal: false,
      isPremium: true
    }))

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: amount,
        currency: 'EUR',
        items: [{
          item_id: 'cv-premium',
          item_name: 'CVCraft Premium',
          category: 'digital_product',
          quantity: 1,
          price: amount
        }]
      })

      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion tracking
        value: amount,
        currency: 'EUR'
      })
    }

    console.log('Upgrade successful:', { transactionId, amount, timeSpent: state.timeSpent })
  }, [state.timeSpent, setPremiumStatus, setMetrics])

  // Auto-trigger logic based on user behavior
  useEffect(() => {
    if (state.isPremium || state.hasSeenPricing) return

    // Trigger after 2 minutes of engagement
    if (state.timeSpent >= 120 && state.interactionCount >= 3) {
      triggerPricingModal('auto_engagement')
    }
    // Trigger for returning users who didn't upgrade
    else if (state.userSegment === 'returning' && userBehavior.upgradeAttempts === 0 && state.timeSpent >= 30) {
      triggerPricingModal('auto_returning')
    }
  }, [state.timeSpent, state.interactionCount, state.userSegment, state.isPremium, state.hasSeenPricing, userBehavior.upgradeAttempts, triggerPricingModal])

  // Track user interactions
  const trackInteraction = useCallback(() => {
    setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }))
  }, [])

  // Get pricing message based on context
  const getPricingMessage = useCallback(() => {
    const price = getOptimalPrice()
    
    switch (state.triggerSource) {
      case 'download':
        return {
          headline: 'Ready to Download? 📄',
          subheadline: 'Remove watermark for a professional impression',
          cta: `Download Premium - €${price}`
        }
      case 'preview':
        return {
          headline: 'Looking Great! ✨',
          subheadline: 'Make it perfect with premium features',
          cta: `Upgrade Now - €${price}`
        }
      case 'auto_engagement':
        return {
          headline: 'You\'re Creating Something Amazing! 🚀',
          subheadline: 'Unlock the full potential of your CV',
          cta: `Get Premium - €${price}`
        }
      default:
        return {
          headline: 'Upgrade to Premium 👑',
          subheadline: 'Remove watermark and unlock all features',
          cta: `Upgrade - €${price}`
        }
    }
  }, [state.triggerSource, getOptimalPrice])

  // Get conversion metrics for analytics
  const getConversionMetrics = useCallback(() => {
    const conversionRate = metrics.modalShown > 0 ? (metrics.conversions / metrics.modalShown * 100) : 0
    const averageOrderValue = metrics.conversions > 0 ? (metrics.revenue / metrics.conversions) : 0
    
    return {
      conversionRate: conversionRate.toFixed(2),
      averageOrderValue: averageOrderValue.toFixed(2),
      totalRevenue: metrics.revenue.toFixed(2),
      totalConversions: metrics.conversions,
      modalShownCount: metrics.modalShown,
      averageTimeToConversion: Math.round(metrics.averageTimeToConversion)
    }
  }, [metrics])

  // Check if user should see discount
  const shouldShowDiscount = useCallback(() => {
    const price = getOptimalPrice()
    return price < 7.99
  }, [getOptimalPrice])

  // Get urgency timer (for limited-time discounts)
  const getUrgencyTimer = useCallback(() => {
    if (!shouldShowDiscount()) return null
    
    const endTime = Date.now() + (5 * 60 * 1000) // 5 minutes from now
    return endTime
  }, [shouldShowDiscount])

  return {
    // State
    showPricingModal: state.showPricingModal,
    userSegment: state.userSegment,
    timeSpent: state.timeSpent,
    interactionCount: state.interactionCount,
    isPremium: state.isPremium,
    hasSeenPricing: state.hasSeenPricing,
    triggerSource: state.triggerSource,

    // Actions
    triggerPricingModal,
    closePricingModal,
    handleUpgradeSuccess,
    trackInteraction,
    setShowPricingModal: (show: boolean) => setState(prev => ({ ...prev, showPricingModal: show })),

    // Computed values
    getOptimalPrice,
    getPricingMessage,
    getConversionMetrics,
    shouldShowDiscount,
    getUrgencyTimer,

    // Data
    userBehavior,
    metrics
  }
}

// Hook for tracking pricing events
export function usePricingAnalytics() {
  const trackPricingEvent = useCallback((event: string, data?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        event_category: 'pricing',
        ...data
      })
    }
    
    console.log('Pricing Event:', event, data)
  }, [])

  const trackModalInteraction = useCallback((action: string, price: number) => {
    trackPricingEvent('pricing_modal_interaction', {
      action,
      price,
      timestamp: Date.now()
    })
  }, [trackPricingEvent])

  const trackConversionFunnel = useCallback((step: string, metadata?: any) => {
    trackPricingEvent('conversion_funnel', {
      step,
      timestamp: Date.now(),
      ...metadata
    })
  }, [trackPricingEvent])

  return {
    trackPricingEvent,
    trackModalInteraction,
    trackConversionFunnel
  }
}
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

/**
 * Web Vitals reporting for performance monitoring
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return

  try {
    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  } catch (err) {
    console.error('Error reporting web vitals:', err)
  }
}

function sendToAnalytics(metric: any) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', metric.name, {
      custom_map: { metric_id: 'web_vitals' },
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // Send to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
    })
  }

  // You can also send to other analytics services here
  // Example: sendToDatadog(metric), sendToNewRelic(metric), etc.
}

/**
 * Performance observer for additional metrics
 */
export function initPerformanceObserver() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  try {
    // Observe navigation timing
    const navObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('Navigation Timing:', {
            domContentLoaded:
              navEntry.domContentLoadedEventEnd -
              navEntry.domContentLoadedEventStart,
            load: navEntry.loadEventEnd - navEntry.loadEventStart,
            ttfb: navEntry.responseStart - navEntry.requestStart,
          })
        }
      })
    })
    navObserver.observe({ entryTypes: ['navigation'] })

    // Observe resource timing
    const resourceObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming
          if (resourceEntry.duration > 1000) {
            // Log slow resources
            console.warn('Slow Resource:', {
              name: resourceEntry.name,
              duration: resourceEntry.duration,
              size: resourceEntry.transferSize,
            })
          }
        }
      })
    })
    resourceObserver.observe({ entryTypes: ['resource'] })
  } catch (err) {
    console.error('Error initializing performance observer:', err)
  }
}

"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  timeToInteractive: number
  domContentLoaded: number
  memoryUsage?: number
  networkRequests: number
}

export function usePerformanceMonitoring() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    const metrics: PerformanceMetrics = {
      pageLoadTime: performance.now(),
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      timeToInteractive: 0,
      domContentLoaded: 0,
      networkRequests: 0,
    }

    // Track First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime
        } else if (entry.name === 'largest-contentful-paint') {
          metrics.largestContentfulPaint = entry.startTime
        }
      }
    })

    paintObserver.observe({ entryTypes: ['paint'] })

    // Track Time to Interactive
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          metrics.timeToInteractive = entry.interactive || 0
          metrics.domContentLoaded = entry.domContentLoadedEventEnd || 0
        }
      }
    })

    navigationObserver.observe({ entryTypes: ['navigation'] })

    // Track Network Requests
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
          metrics.networkRequests++
        }
      }
    })

    resourceObserver.observe({ entryTypes: ['resource'] })

    // Track Memory Usage if available
    if (performance.memory) {
      metrics.memoryUsage = performance.memory.usedJSHeapSize
    }

    // Send metrics to monitoring service
    const sendMetrics = async () => {
      try {
        await fetch('/api/monitoring/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            query: Object.fromEntries(searchParams.entries()),
            metrics,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Failed to send performance metrics:', error)
      }
    }

    // Send metrics when page is unloaded
    window.addEventListener('beforeunload', sendMetrics)

    // Cleanup
    return () => {
      paintObserver.disconnect()
      navigationObserver.disconnect()
      resourceObserver.disconnect()
      window.removeEventListener('beforeunload', sendMetrics)
    }
  }, [pathname, searchParams])
} 
import { LRUCache } from 'lru-cache'

// Create a cache instance with a maximum of 500 items
const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 minutes
  updateAgeOnGet: true,
  updateAgeOnHas: true,
})

export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check if the data is in cache
  const cached = cache.get(key)
  if (cached) {
    return cached as T
  }

  // If not in cache, fetch the data
  const data = await fn()

  // Store in cache with optional custom TTL
  cache.set(key, data, { ttl })

  return data
}

export function invalidateCache(pattern: string | RegExp) {
  const keys = cache.keys()
  const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern)
  
  keys.forEach(key => {
    if (regex.test(key)) {
      cache.delete(key)
    }
  })
}

export function clearCache() {
  cache.clear()
}

// Cache middleware for API routes
export function withCacheMiddleware(
  handler: Function,
  ttl: number = 1000 * 60 * 5 // 5 minutes default
) {
  return async (request: Request) => {
    const url = new URL(request.url)
    const cacheKey = `api:${url.pathname}${url.search}`

    // Check cache for GET requests
    if (request.method === 'GET') {
      const cached = cache.get(cacheKey)
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${ttl / 1000}`,
          },
        })
      }
    }

    // Handle the request
    const response = await handler(request)

    // Cache successful GET responses
    if (request.method === 'GET' && response.ok) {
      const data = await response.json()
      cache.set(cacheKey, data, { ttl })
    }

    // Invalidate cache for mutation requests
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const pattern = new RegExp(`^api:${url.pathname}`)
      invalidateCache(pattern)
    }

    return response
  }
} 
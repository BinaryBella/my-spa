// Centralized API utility with rate limiting and caching

interface RateLimiter {
  lastRequest: number
  minDelay: number
  pendingRequests: Map<string, Promise<Response>>
}

const rateLimiter: RateLimiter = {
  lastRequest: 0,
  minDelay: 1000, // Minimum 1 second between API calls
  pendingRequests: new Map()
}

/**
 * Rate-limited fetch with request deduplication
 */
async function rateLimitedFetch(url: string): Promise<Response> {
  // Check if there's already a pending request for this URL (deduplication)
  const existing = rateLimiter.pendingRequests.get(url)
  if (existing) {
    console.log('[API] Reusing pending request for:', url)
    return existing
  }

  // Enforce minimum delay between requests
  const now = Date.now()
  const timeSinceLastRequest = now - rateLimiter.lastRequest
  if (timeSinceLastRequest < rateLimiter.minDelay) {
    const delay = rateLimiter.minDelay - timeSinceLastRequest
    console.log(`[API] Rate limiting: waiting ${delay}ms`)
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  // Make the request
  rateLimiter.lastRequest = Date.now()
  const requestPromise = fetch(url)
  
  // Store pending request for deduplication
  rateLimiter.pendingRequests.set(url, requestPromise)
  
  try {
    const response = await requestPromise
    return response
  } finally {
    // Clean up after request completes
    rateLimiter.pendingRequests.delete(url)
  }
}

/**
 * Fetch with retry logic and exponential backoff for 429 errors
 */
export async function fetchWithRetry(url: string, retries = 1, baseDelay = 5000): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await rateLimitedFetch(url)
      
      if (res.status === 429) {
        if (i === retries) {
          throw new Error('API rate limit exceeded. Please try again in a few minutes.')
        }
        // Exponential backoff: 5s, 10s, 20s...
        const delay = baseDelay * Math.pow(2, i)
        console.warn(`[API] Rate limited (429). Retrying in ${delay / 1000}s...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      
      return res
    } catch (e) {
      if (i === retries) throw e
      // Wait before retry on network errors
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }
  throw new Error('Failed to fetch data after retries')
}

/**
 * Generic cache helper for localStorage
 */
export function getCachedData<T>(key: string, maxAge: number): T | null {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < maxAge) {
      return data
    }
    localStorage.removeItem(key)
  } catch (e) {
    console.error('[Cache] Error reading cache:', e)
    return null
  }
  return null
}

/**
 * Generic cache setter for localStorage
 */
export function setCachedData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.error('[Cache] Error writing cache:', e)
  }
}

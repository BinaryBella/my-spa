import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

const cache = new Map<string, Product[]>()
const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes
const STORAGE_PREFIX = 'products_cache_'

// Load from localStorage on init
function loadFromStorage(key: string): Product[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key)
    if (!stored) return null
    
    const { data, timestamp } = JSON.parse(stored)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
    localStorage.removeItem(STORAGE_PREFIX + key)
  } catch (e) {
    return null
  }
  return null
}

function saveToStorage(key: string, data: Product[]) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    // Storage full or disabled
  }
}

async function fetchWithRetry(url: string, retries = 2, delay = 3000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url)
    if (res.status !== 429) return res
    // Wait before retrying with exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
  }
  throw new Error('Too many requests. Please wait a moment and try again.')
}

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async (category?: string, search?: string) => {
    const cacheKey = search ? `search:${search}` : `category:${category || 'all'}`

    // Check memory cache
    if (cache.has(cacheKey)) {
      products.value = cache.get(cacheKey)!
      return
    }

    // Check localStorage cache
    const storedProducts = loadFromStorage(cacheKey)
    if (storedProducts) {
      products.value = storedProducts
      cache.set(cacheKey, storedProducts)
      return
    }

    loading.value = true
    error.value = null

    try {
      let url = 'https://dummyjson.com/products?limit=30'
      if (search) url = `https://dummyjson.com/products/search?q=${search}`
      else if (category) url = `https://dummyjson.com/products/category/${category}`

      const res = await fetchWithRetry(url)
      const data: ProductsResponse = await res.json()
      products.value = data.products
      
      // Save to both caches
      cache.set(cacheKey, data.products)
      saveToStorage(cacheKey, data.products)
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
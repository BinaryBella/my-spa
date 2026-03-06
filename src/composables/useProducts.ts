import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'
import { fetchWithRetry, getCachedData, setCachedData } from '../utils/api'

const cache = new Map<string, Product[]>()
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes
const STORAGE_PREFIX = 'products_cache_'

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
    const storedProducts = getCachedData<Product[]>(STORAGE_PREFIX + cacheKey, CACHE_DURATION)
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
      setCachedData(STORAGE_PREFIX + cacheKey, data.products)
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
      console.error('[useProducts] Error:', e)
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
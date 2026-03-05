import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

// Cache for API responses
const cache = new Map<string, { data: Product[], timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async (category?: string, search?: string) => {
    loading.value = true
    error.value = null
    
    try {
      let url = 'https://dummyjson.com/products?limit=50'
      if (search) url = `https://dummyjson.com/products/search?q=${search}`
      else if (category) url = `https://dummyjson.com/products/category/${category}`

      // Check cache first
      const cached = cache.get(url)
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        products.value = cached.data
        loading.value = false
        return
      }

      const res = await fetch(url)
      
      // Handle rate limiting
      if (res.status === 429) {
        error.value = 'Too many requests. Please wait a moment and try again.'
        loading.value = false
        return
      }
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data: ProductsResponse = await res.json()
      products.value = data.products
      
      // Cache the result
      cache.set(url, { data: data.products, timestamp: Date.now() })
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
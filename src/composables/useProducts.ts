import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

const cache = new Map<string, Product[]>()

async function fetchWithRetry(url: string, retries = 3, delay = 2000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url)
    if (res.status !== 429) return res
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
  }
  throw new Error('Too many requests. Please wait and refresh the page.')
}

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async (category?: string, search?: string) => {
    const cacheKey = search ? `search:${search}` : `category:${category || 'all'}`

    if (cache.has(cacheKey)) {
      products.value = cache.get(cacheKey)!
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
      cache.set(cacheKey, data.products)
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
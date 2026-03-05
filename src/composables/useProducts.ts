import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async (category?: string, search?: string) => {
    loading.value = true
    error.value = null
    try {
      let url = 'https://dummyjson.com/products?limit=30'
      if (search) url = `https://dummyjson.com/products/search?q=${search}`
      else if (category) url = `https://dummyjson.com/products/category/${category}`

      const res = await fetch(url)
      const data: ProductsResponse = await res.json()
      products.value = data.products
    } catch (e) {
      error.value = 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
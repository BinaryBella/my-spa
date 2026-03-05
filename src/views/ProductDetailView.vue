<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumb -->
      <RouterLink 
        to="/" 
        class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-8 group transition-all"
      >
        <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Store
      </RouterLink>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div class="relative w-24 h-24">
          <div class="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full animate-ping" />
          <div class="absolute inset-0 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p class="mt-6 text-gray-600 dark:text-gray-400 font-medium text-lg">Loading product details...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-32">
        <svg class="w-32 h-32 mx-auto mb-6 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-2xl text-red-500 dark:text-red-400 font-bold mb-2">Oops!</p>
        <p class="text-lg text-gray-600 dark:text-gray-400">{{ error }}</p>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        
        <!-- Left: Image Section -->
        <div class="space-y-4">
          <div class="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden group">
            <!-- Main image -->
            <div class="aspect-square overflow-hidden">
              <img 
                :src="product.thumbnail" 
                :alt="product.title" 
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <!-- Floating badges -->
            <div class="absolute top-6 left-6 flex flex-col gap-3">
              <div class="px-4 py-2 rounded-lg text-sm font-bold bg-orange-500 dark:bg-orange-600 text-white shadow-md flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ product.rating }} Rating
              </div>
              <div v-if="product.stock < 20" class="px-4 py-2 rounded-lg text-sm font-bold bg-red-500 dark:bg-red-600 text-white shadow-md flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                </svg>
                Only {{ product.stock }} left!
              </div>
              <div v-else class="px-4 py-2 rounded-lg text-sm font-bold bg-green-500 dark:bg-green-600 text-white shadow-md flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                In Stock
              </div>
            </div>

            <!-- Category badge -->
            <div class="absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wider shadow-md border border-gray-200 dark:border-gray-700">
              {{ product.category }}
            </div>
          </div>

          <!-- Thumbnail gallery (placeholder for future enhancement) -->
          <div class="grid grid-cols-4 gap-3">
            <div v-for="i in 4" :key="i" class="aspect-square bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <img :src="product.thumbnail" :alt="`${product.title} view ${i}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="flex flex-col">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 lg:p-10 flex-1">
            
            <!-- Title -->
            <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {{ product.title }}
            </h1>

            <!-- Description -->
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Price Section -->
            <div class="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <div class="flex items-baseline gap-3">
                <span class="text-5xl font-extrabold text-blue-600 dark:text-blue-500">
                  ${{ product.price }}
                </span>
                <span class="text-lg text-gray-500 dark:text-gray-400 line-through">
                  ${{ (product.price * 1.3).toFixed(2) }}
                </span>
                <span class="ml-auto px-3 py-1 bg-green-500 dark:bg-green-600 text-white text-sm font-bold rounded-md">
                  SAVE 30%
                </span>
              </div>
            </div>

            <!-- Key Features -->
            <div class="grid grid-cols-3 gap-4 mb-8">
              <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <svg class="w-8 h-8 mx-auto mb-2 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ product.rating }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Rating</div>
              </div>
              <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <svg class="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ product.stock }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">In Stock</div>
              </div>
              <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <svg class="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">Free</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Delivery</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                @click="handleAddToCart"
                class="flex-1 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span class="flex items-center justify-center gap-3 text-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </span>
              </button>

              <button class="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <!-- Trust Signals -->
            <div class="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm">Free shipping on orders over $50</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm">30-day money-back guarantee</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm">Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const CACHE_KEY_PREFIX = 'product_detail_'
const CACHE_DURATION = 1000 * 60 * 10 // 10 minutes

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value)
    // Optional: Add a success toast/notification
  }
}

onMounted(async () => {
  const productId = route.params.id
  const cacheKey = CACHE_KEY_PREFIX + productId

  // Check localStorage cache
  try {
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        product.value = data
        loading.value = false
        return
      }
      localStorage.removeItem(cacheKey)
    }
  } catch (e) {
    // Continue to fetch
  }

  // Fetch from API
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`)
    
    if (res.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.')
    }
    
    if (!res.ok) {
      throw new Error('Product not found')
    }
    
    const data = await res.json()
    product.value = data

    // Save to cache
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load product'
  } finally {
    loading.value = false
  }
})
</script>
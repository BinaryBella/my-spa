<template>
  <div 
    class="group relative bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    @click="$router.push(`/product/${product.id}`)"
  >
    <!-- Image container with overlay -->
    <div class="relative overflow-hidden">
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" 
      />
      
      <!-- Subtle overlay on hover -->
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <!-- Category badge -->
      <div class="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wide shadow-sm">
        {{ product.category }}
      </div>
      
      <!-- Rating badge -->
      <div class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold bg-orange-500 dark:bg-orange-600 text-white shadow-sm flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {{ product.rating }}
      </div>

      <!-- Quick view button (appears on hover) -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span class="px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Quick View →
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="font-bold text-gray-800 dark:text-white text-base mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {{ product.title }}
      </h3>
      
      <!-- Price and stock info -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex flex-col">
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-500">
            ${{ product.price }}
          </span>
        </div>
        <div v-if="product.stock < 20" class="text-xs text-orange-600 dark:text-orange-500 font-semibold">
          Only {{ product.stock }} left!
        </div>
      </div>

      <!-- Add to cart button -->
      <button
        @click.stop="handleAddToCart"
        class="relative w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
      >
        <span class="relative z-10 flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Add to Cart</span>
        </span>
      </button>
    </div>

    <!-- Wishlist button (top corner) -->
    <button 
      @click.stop="toggleWishlist"
      class="absolute top-16 right-3 p-2 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
      :class="isInWishlist ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'"
    >
      <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()

// Wishlist feature (local state for demo)
const isInWishlist = ref(false)

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
}

const handleAddToCart = () => {
  cartStore.addItem(props.product)
  // Optional: Add a success toast/notification
}
</script>
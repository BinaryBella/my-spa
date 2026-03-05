<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative bg-gray-900 dark:bg-black overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
          alt="Shopping background" 
          class="w-full h-full object-cover"
        />
        <!-- Dark overlay for better text readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-blue-900/95 dark:from-gray-900/95 dark:via-black/90 dark:to-gray-900/95"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-up">
            Discover Amazing Products
            <span class="block text-blue-200 dark:text-gray-300 mt-2">at Unbeatable Prices</span>
          </h1>
          <p class="text-lg sm:text-xl text-gray-100 dark:text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Shop the latest trends in electronics, fashion, beauty, and more. Quality products delivered to your door.
          </p>
          
          <!-- Search bar in hero -->
          <div class="max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="onSearch"
                type="text"
                placeholder="Search for products, brands, and more..."
                class="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-xl text-lg border border-gray-200 dark:border-gray-700"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 animate-fade-in-up animation-delay-600">
            <div class="text-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg py-4 px-2">
              <div class="text-3xl sm:text-4xl font-bold text-white">1000+</div>
              <div class="text-sm text-gray-100 dark:text-gray-200 mt-1">Products</div>
            </div>
            <div class="text-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg py-4 px-2">
              <div class="text-3xl sm:text-4xl font-bold text-white">50+</div>
              <div class="text-sm text-gray-100 dark:text-gray-200 mt-1">Categories</div>
            </div>
            <div class="text-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg py-4 px-2">
              <div class="text-3xl sm:text-4xl font-bold text-white">24/7</div>
              <div class="text-sm text-gray-100 dark:text-gray-200 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave separator -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" class="fill-white dark:fill-gray-950" />
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-950">
      <!-- Filter Section -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <FilterBar :selected="selectedCategory" @filter="onFilter" />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full animate-ping" />
          <div class="absolute inset-0 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p class="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading amazing products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <svg class="w-24 h-24 mx-auto mb-4 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-xl text-red-500 dark:text-red-400 font-semibold">{{ error }}</p>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <!-- Results header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
            {{ selectedCategory ? 'Filtered Products' : 'All Products' }}
          </h2>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-semibold">{{ products.length }}</span> products found
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
            class="animate-fade-in-up"
          />
        </div>

        <!-- Empty state -->
        <div v-if="products.length === 0" class="text-center py-20">
          <svg class="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-xl text-gray-600 dark:text-gray-400 font-semibold">No products found</p>
          <p class="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const { products, loading, error, fetchProducts } = useProducts()
const searchQuery = ref('')
const selectedCategory = ref('')

let searchTimeout: number | undefined

onMounted(() => fetchProducts())

function onSearch() {
  selectedCategory.value = ''
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchProducts(undefined, searchQuery.value)
  }, 500) // waits 500ms after user stops typing
}

function onFilter(slug: string) {
  searchQuery.value = ''
  selectedCategory.value = slug
  fetchProducts(slug || undefined)
}
</script>
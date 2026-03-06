<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-blue-600 to-blue-700 dark:from-gray-900 dark:to-black overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
          alt="Shopping background" 
          class="w-full h-full object-cover"
        />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:py-24 lg:pb-32">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-up drop-shadow-lg">
            Discover Amazing Products
            <span class="block text-blue-100 dark:text-gray-400 mt-2">at Unbeatable Prices</span>
          </h1>
          <p class="text-lg sm:text-xl text-blue-50 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Shop the latest trends in electronics, fashion, beauty, and more. Quality products delivered to your door.
          </p>
          
          <!-- Search bar in hero -->
          <div class="max-w-2xl mx-auto animate-fade-in-up animation-delay-400 relative z-10">
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="onSearch"
                type="text"
                placeholder="Search for products, brands, and more..."
                class="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-xl text-lg border border-gray-300 dark:border-gray-700"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Stats -->
          <div class="relative z-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-12 animate-fade-in-up animation-delay-600">
            <div class="text-center bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg py-4 px-2 border border-white/30 dark:border-gray-700">
              <div class="text-3xl sm:text-4xl font-bold text-white">1000+</div>
              <div class="text-sm text-blue-50 dark:text-gray-300 mt-1">Products</div>
            </div>
            <div class="text-center bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg py-4 px-2 border border-white/30 dark:border-gray-700">
              <div class="text-3xl sm:text-4xl font-bold text-white">50+</div>
              <div class="text-sm text-blue-50 dark:text-gray-300 mt-1">Categories</div>
            </div>
            <div class="text-center bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg py-4 px-2 border border-white/30 dark:border-gray-700">
              <div class="text-3xl sm:text-4xl font-bold text-white">24/7</div>
              <div class="text-sm text-blue-50 dark:text-gray-300 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave separator -->
      <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-zero">
        <svg viewBox="0 0 1440 60" class="w-full h-8 sm:h-12 md:h-16 lg:h-20" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" class="fill-white dark:fill-gray-950" />
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-950">
      <!-- Filter Section -->
      <div class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-6 mb-8">
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
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
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
          <svg class="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-xl text-gray-700 dark:text-gray-300 font-semibold">No products found</p>
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
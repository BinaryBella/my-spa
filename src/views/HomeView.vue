<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <!-- Search -->
    <input
      v-model="searchQuery"
      @input="onSearch"
      type="text"
      placeholder="Search products..."
      class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"    />

    <!-- Filter -->
    <FilterBar :selected="selectedCategory" @filter="onFilter" />

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20 text-gray-400">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20 text-red-400">{{ error }}</div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
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
  
  // Debounce search to avoid excessive API calls
  clearTimeout(searchTimeout)
  searchTimeout = window.setTimeout(() => {
    fetchProducts(undefined, searchQuery.value)
  }, 500)
}

function onFilter(slug: string) {
  searchQuery.value = ''
  selectedCategory.value = slug
  fetchProducts(slug || undefined)
}
</script>
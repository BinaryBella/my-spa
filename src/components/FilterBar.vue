<template>
  <div class="py-6">
    <!-- Section title -->
    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Filter by Category
    </h3>

    <!-- Filter chips with improved design -->
    <div class="flex flex-wrap gap-2">
      <!-- All button -->
      <button
        @click="$emit('filter', '')"
        class="group relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        :class="selected === '' 
          ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          All Products
        </span>
      </button>

      <!-- Category buttons -->
      <button
        v-for="cat in categories"
        :key="cat.slug"
        @click="$emit('filter', cat.slug)"
        class="group relative px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        :class="selected === cat.slug 
          ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <!-- Category icon -->
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {{ cat.name }}
        </span>
      </button>
    </div>

    <!-- Results count indicator -->
    <div v-if="selected" class="mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
      <svg class="w-4 h-4 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Filtered by: <span class="font-semibold text-blue-600 dark:text-blue-400 capitalize">{{ selectedCategoryName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Category { slug: string; name: string }

const props = defineProps<{ selected: string }>()
defineEmits<{ filter: [slug: string] }>()

const categories = ref<Category[]>([])

// Cache categories in memory and localStorage
const CACHE_KEY = 'dummyjson_categories'
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

// Computed property for selected category name
const selectedCategoryName = computed(() => {
  const category = categories.value.find(cat => cat.slug === props.selected)
  return category ? category.name : ''
})

onMounted(async () => {
  // Check localStorage cache first
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        categories.value = data
        return
      }
    } catch (e) {
      localStorage.removeItem(CACHE_KEY)
    }
  }

  // Fetch from API with retry logic
  try {
    const res = await fetch('https://dummyjson.com/products/categories')
    if (res.status === 429) {
      console.warn('Rate limited. Using empty categories.')
      return
    }
    const data = await res.json()
    categories.value = data
    
    // Cache in localStorage
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.error('Failed to load categories:', e)
  }
})
</script>
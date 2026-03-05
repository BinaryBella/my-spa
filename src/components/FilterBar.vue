<template>
  <div class="flex flex-wrap gap-2 py-4">
    <button
      v-for="cat in categories"
      :key="cat.slug"
      @click="$emit('filter', cat.slug)"
      class="px-4 py-1.5 rounded-full text-sm border border-blue-300 hover:bg-blue-600 hover:text-white transition capitalize"
      :class="selected === cat.slug ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'">
      {{ cat.name }}
    </button>
    <button
      @click="$emit('filter', '')"
      class="px-4 py-1.5 rounded-full text-sm border border-gray-300 hover:bg-gray-200 transition"
      :class="selected === '' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'">
      All
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Category { slug: string; name: string }

defineProps<{ selected: string }>()
defineEmits<{ filter: [slug: string] }>()

const categories = ref<Category[]>([])

// Cache categories in memory and localStorage
const CACHE_KEY = 'dummyjson_categories'
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

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
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

// Cache categories since they rarely change
let cachedCategories: Category[] | null = null

onMounted(async () => {
  // Use cached categories if available
  if (cachedCategories) {
    categories.value = cachedCategories
    return
  }

  try {
    const res = await fetch('https://dummyjson.com/products/categories')
    
    if (res.status === 429) {
      console.warn('Rate limited: using fallback categories')
      // Fallback categories if rate limited
      categories.value = [
        { slug: 'beauty', name: 'beauty' },
        { slug: 'fragrances', name: 'fragrances' },
        { slug: 'furniture', name: 'furniture' },
        { slug: 'groceries', name: 'groceries' }
      ]
      return
    }
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    cachedCategories = await res.json()
    categories.value = cachedCategories
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
})
</script>
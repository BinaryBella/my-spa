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

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products/categories')
  categories.value = await res.json()
})
</script>
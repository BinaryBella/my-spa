<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <RouterLink to="/" class="text-blue-500 hover:underline text-sm mb-6 inline-block">← Back to Store</RouterLink>

    <div v-if="loading" class="text-center text-gray-400 py-20">Loading...</div>

    <div v-else-if="product" class="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
      <img :src="product.thumbnail" :alt="product.title" class="w-full md:w-80 object-cover" />
      <div class="p-8 flex flex-col gap-4">
        <p class="text-xs uppercase text-gray-400 tracking-widest">{{ product.category }}</p>
        <h1 class="text-2xl font-bold text-gray-800">{{ product.title }}</h1>
        <p class="text-gray-500 text-sm">{{ product.description }}</p>
        <div class="flex items-center gap-4">
          <span class="text-3xl font-bold text-blue-600">${{ product.price }}</span>
          <span class="text-yellow-500">⭐ {{ product.rating }}</span>
          <span class="text-green-500 text-sm">{{ product.stock }} in stock</span>
        </div>
        <button
          @click="cartStore.addItem(product)"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition w-fit">
          Add to Cart
        </button>
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

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
  loading.value = false
})
</script>
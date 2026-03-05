<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
       @click="$router.push(`/product/${product.id}`)">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <p class="text-xs text-gray-400 uppercase mb-1">{{ product.category }}</p>
      <h3 class="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{{ product.title }}</h3>
      <div class="flex justify-between items-center">
        <span class="text-blue-600 font-bold">${{ product.price }}</span>
        <span class="text-yellow-500 text-sm">⭐ {{ product.rating }}</span>
      </div>
      <button
        @click.stop="cartStore.addItem(product)"
        class="mt-3 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'

defineProps<{ product: Product }>()
const cartStore = useCartStore()
</script>
<template>
  <nav class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <RouterLink to="/" class="text-xl font-bold tracking-wide">🛒 MyStore</RouterLink>
    <button
      @click="cartStore.isOpen = true"
      class="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-50 transition"
    >
      Cart
      <span class="bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
        {{ cartStore.totalItems }}
      </span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
const cartStore = useCartStore()
</script>
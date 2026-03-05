<template>
  <!-- Backdrop -->
  <div
    v-if="cartStore.isOpen"
    class="fixed inset-0 bg-black bg-opacity-40 z-40"
    @click="cartStore.isOpen = false"
  />

  <!-- Sidebar -->
  <div
    class="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300"
    :class="cartStore.isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="flex justify-between items-center px-6 py-4 border-b">
      <h2 class="text-lg font-bold text-gray-800">🛒 Your Cart</h2>
      <button
        @click="cartStore.isOpen = false"
        class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
      >&times;</button>
    </div>

    <!-- Empty state -->
    <div v-if="cartStore.items.length === 0" class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      Your cart is empty
    </div>

    <!-- Items list -->
    <div v-else class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
      <div
        v-for="item in cartStore.items"
        :key="item.product.id"
        class="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
      >
        <img :src="item.product.thumbnail" class="w-14 h-14 object-cover rounded-lg" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-700 truncate">{{ item.product.title }}</p>
          <p class="text-blue-600 font-bold text-sm">${{ item.product.price }}</p>
          <p class="text-gray-400 text-xs">Qty: {{ item.quantity }}</p>
        </div>
        <button
          @click="cartStore.removeItem(item.product.id)"
          class="text-red-400 hover:text-red-600 text-lg font-bold"
        >🗑</button>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="cartStore.items.length > 0" class="border-t px-6 py-4 flex flex-col gap-3">
      <div class="flex justify-between text-gray-700 font-semibold">
        <span>Total</span>
        <span class="text-blue-600">${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <button
        @click="cartStore.clearCart()"
        class="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition text-sm font-semibold"
      >Clear Cart</button>
      <button
        class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition text-sm font-semibold"
      >Checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
const cartStore = useCartStore()
</script>
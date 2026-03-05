<template>
  <!-- Backdrop with blur -->
  <Transition name="fade">
    <div
      v-if="cartStore.isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      @click="cartStore.isOpen = false"
    />
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide">
    <div
      v-if="cartStore.isOpen"
      class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col border-l border-gray-300 dark:border-gray-700"
    >
      <!-- Header with solid color -->
      <div class="relative overflow-hidden bg-blue-600 dark:bg-blue-500 px-6 py-6">
        <div class="relative z-10 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white/20 dark:bg-white/10 rounded-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Shopping Cart</h2>
              <p class="text-sm text-blue-100 dark:text-blue-200">{{ cartStore.totalItems }} items</p>
            </div>
          </div>
          <button
            @click="cartStore.isOpen = false"
            class="p-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 rounded-lg text-white transition-all duration-300"
            aria-label="Close cart"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="cartStore.items.length === 0" class="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div class="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 border-2 border-gray-300 dark:border-gray-700">
          <svg class="w-16 h-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Add some products to get started!</p>
        <button
          @click="cartStore.isOpen = false"
          class="px-6 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        >
          Continue Shopping
        </button>
      </div>

      <!-- Items list -->
      <div v-else class="flex-1 overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar">
        <TransitionGroup name="list">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="group relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex gap-4">
              <!-- Product Image -->
              <div class="relative shrink-0">
                <div class="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border-2 border-gray-300 dark:border-gray-600">
                  <img 
                    :src="item.product.thumbnail" 
                    :alt="item.product.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <!-- Quantity badge -->
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {{ item.quantity }}
                </div>
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ item.product.title }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 capitalize">
                  {{ item.product.category }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-blue-600 dark:text-blue-500">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    ${{ item.product.price }} each
                  </span>
                </div>
              </div>

              <!-- Remove button -->
              <button
                @click="cartStore.removeItem(item.product.id)"
                class="shrink-0 self-start p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 border border-red-200 dark:border-red-800"
                aria-label="Remove item"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-6 space-y-4">
        
        <!-- Subtotal -->
        <div class="space-y-2">
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span class="text-green-600 dark:text-green-400 font-semibold">FREE</span>
          </div>
          <div class="h-px bg-gray-200 dark:bg-gray-700 my-2" />
          <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span class="text-2xl text-blue-600 dark:text-blue-500">
              ${{ cartStore.totalPrice.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="space-y-3">
          <button
            class="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Proceed to Checkout
            </span>
          </button>
          
          <button
            @click="cartStore.clearCart()"
            class="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 rounded-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
const cartStore = useCartStore()
</script>
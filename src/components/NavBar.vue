<template>
  <nav class="bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md transition-colors">
    
    <!-- Logo -->
    <RouterLink to="/" class="text-xl font-bold tracking-wide">🛒 MyStore</RouterLink>

    <!-- Right side controls -->
    <div class="flex items-center gap-3">

      <!-- Dark mode toggle -->
      <button
        @click="toggleDark()"
        class="text-xl bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-full transition"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>

      <!-- Auth: show name + logout if logged in -->
      <span v-if="authStore.isLoggedIn" class="text-sm hidden sm:block">
        Hi, {{ authStore.user?.firstName }}
      </span>
      <button
        v-if="authStore.isLoggedIn"
        @click="authStore.logout()"
        class="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-full transition"
      >
        Logout
      </button>
      <RouterLink
        v-else
        to="/login"
        class="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-full transition"
      >
        Login
      </RouterLink>

      <!-- Cart button -->
      <button
        @click="cartStore.isOpen = true"
        class="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-50 transition"
      >
        Cart
        <span class="bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
          {{ cartStore.totalItems }}
        </span>
      </button>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { useDarkMode } from '../composables/useDarkMode'

const cartStore = useCartStore()
const authStore = useAuthStore()
const { isDark, toggleDark } = useDarkMode()
</script>
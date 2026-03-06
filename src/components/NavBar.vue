<template>
  <nav class="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <!-- Logo with animation -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="transform group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            MyStore
          </span>
        </RouterLink>

        <!-- Right side controls -->
        <div class="flex items-center gap-2 sm:gap-4">

          <!-- Dark mode toggle with better styling -->
          <button
            @click="toggleDark()"
            class="relative group p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700"
            aria-label="Toggle dark mode"
          >
            <!-- Sun icon for dark mode, Moon icon for light mode -->
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Auth section with better design -->
          <div v-if="authStore.isLoggedIn" class="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div class="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-sm font-bold text-white">
              {{ authStore.user?.firstName?.charAt(0) || 'U' }}
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ authStore.user?.firstName }}
            </span>
          </div>
          
          <button
            v-if="authStore.isLoggedIn"
            @click="handleLogout"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 border border-gray-200 dark:border-gray-700"
          >
            <span class="hidden sm:inline">Logout</span>
            <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
          
          <RouterLink
            v-else-if="route.path !== '/login'"
            to="/login"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 border border-gray-200 dark:border-gray-700"
          >
            <span class="hidden sm:inline">Login</span>
            <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </RouterLink>

          <!-- Premium cart button -->
          <button
            v-if="route.path !== '/login'"
            @click="cartStore.isOpen = true"
            class="relative flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="hidden sm:inline">Cart</span>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-orange-500 dark:bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
              {{ cartStore.totalItems }}
            </span>
          </button>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { useDarkMode } from '../composables/useDarkMode'
import { useRouter, useRoute } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const { isDark, toggleDark } = useDarkMode()
const router = useRouter()
const route = useRoute()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
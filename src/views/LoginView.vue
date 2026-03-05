<template>
  <div class="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 py-12 relative overflow-hidden">
    
    <!-- Login Card -->
    <div class="relative w-full max-w-md">
      <div class="bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl p-8 sm:p-12">
        
        <!-- Logo/Icon -->
        <div class="flex justify-center mb-8">
          <div class="w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>

        <!-- Title -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Welcome Back
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Sign in to continue shopping
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <!-- Username Input -->
          <div class="relative">
            <label class="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Username
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                v-model="username"
                type="text"
                placeholder="Enter your username"
                class="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="relative">
            <label class="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="Enter your password"
                class="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <!-- Error Message -->
          <Transition name="shake">
            <div v-if="errorMsg" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm font-medium text-red-600 dark:text-red-400">{{ errorMsg }}</p>
            </div>
          </Transition>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full overflow-hidden bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-bold py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:cursor-not-allowed"
          >
            <span class="flex items-center justify-center gap-2">
              <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            </span>
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700">
          <p class="text-center text-sm text-gray-700 dark:text-gray-300 mb-3">
            Demo Credentials
          </p>
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Username:</span>
              <code class="bg-white dark:bg-gray-800 px-3 py-1 rounded-md font-mono text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-700">emilys</code>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Password:</span>
              <code class="bg-white dark:bg-gray-800 px-3 py-1 rounded-md font-mono text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-700">emilyspass</code>
            </div>
          </div>
        </div>

        <!-- Back to Store -->
        <div class="mt-6 text-center">
          <RouterLink 
            to="/" 
            class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
          >
            <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''
  const error = await authStore.login(username.value, password.value)
  loading.value = false
  if (error) {
    errorMsg.value = error
  } else {
    router.push('/')
  }
}
</script>
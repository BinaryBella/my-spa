<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
    <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Login</h2>

      <div class="flex flex-col gap-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <p v-if="errorMsg" class="text-red-500 text-sm text-center">{{ errorMsg }}</p>

        <button
          @click="handleLogin"
          :disabled="loading"
          class="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>

      <p class="text-center text-xs text-gray-400 mt-4">
        Try: <strong>emilys</strong> / <strong>emilyspass</strong>
      </p>
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
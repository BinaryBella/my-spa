import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginResponse } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<Omit<LoginResponse, 'token'> | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  const isLoggedIn = computed(() => !!token.value)

  async function login(username: string, password: string): Promise<string | null> {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 })
      })

      if (!res.ok) return 'Invalid username or password'

      const data: LoginResponse = await res.json()
      token.value = data.token
      user.value = { id: data.id, username: data.username, email: data.email, firstName: data.firstName, lastName: data.lastName }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(user.value))
      return null
    } catch {
      return 'Login failed. Try again.'
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isLoggedIn, login, logout }
})
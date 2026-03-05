import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem, Product } from '../types'

export const useCartStore = defineStore('cart', () => {
  // Load cart from localStorage on initialization
  const savedCart = localStorage.getItem('cart')
  const items = ref<CartItem[]>(savedCart ? JSON.parse(savedCart) : [])
  const isOpen = ref(false)

  // Persist cart to localStorage whenever it changes
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function addItem(product: Product) {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    isOpen.value = true // auto-open cart when item added
  }

  function removeItem(productId: number) {
    items.value = items.value.filter(i => i.product.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return { items, totalItems, totalPrice, isOpen, addItem, removeItem, clearCart }
})
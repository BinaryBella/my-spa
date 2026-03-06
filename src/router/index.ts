import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      component: HomeView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/product/:id', 
      component: ProductDetailView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/login', 
      component: LoginView,
      meta: { requiresGuest: true }
    }
  ]
})

// Navigation Guard
router.beforeEach((to, _from, next) => {
  // We can safely call useAuthStore here because pinia is installed before router in main.ts
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect unauthenticated users navigating to protected routes
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isLoggedIn) {
    // Redirect authenticated users navigating to login page
    next('/')
  } else {
    next()
  }
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/product/:id', component: ProductDetailView },
    { path: '/login', component: LoginView }
  ]
})

export default router
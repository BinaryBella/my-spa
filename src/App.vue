<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <RouterView />
    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import CartSidebar from './components/CartSidebar.vue'
</script>
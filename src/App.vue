<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <RouterView />
    <CardSidebar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import CardSidebar from './components/CardSidebar.vue'
</script>
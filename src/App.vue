<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
    <NavBar />
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
    <CardSidebar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import CardSidebar from './components/CardSidebar.vue'
</script>
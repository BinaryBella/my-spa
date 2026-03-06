import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import { initializeDarkMode } from './composables/useDarkMode'

// Initialize dark mode before mounting the app
initializeDarkMode()

createApp(App).use(createPinia()).use(router).mount('#app')
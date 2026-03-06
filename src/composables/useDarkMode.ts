import { ref, onMounted } from 'vue'

// Initialize from localStorage or default to light mode
const isDark = ref(false)

// Initialize dark mode on app startup
export function initializeDarkMode() {
  const savedTheme = localStorage.getItem('theme')
  // Default to light mode if no preference saved
  isDark.value = savedTheme === 'dark'
  applyTheme(isDark.value)
}

function applyTheme(dark: boolean) {
  if (typeof document !== 'undefined') {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
  }
}

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme(isDark.value)
}

export function useDarkMode() {
  onMounted(() => {
    // Ensure theme is applied on component mount
    applyTheme(isDark.value)
  })
  
  return { isDark, toggleDark }
}
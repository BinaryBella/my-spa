import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

// Apply on page load
document.documentElement.classList.toggle('dark', isDark.value)

export function useDarkMode() {
  return { isDark, toggleDark }
}
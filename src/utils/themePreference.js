export const themeStorageKey = 'rl-sim2sim-demo-theme'

export function getStoredTheme() {
  if (typeof localStorage === 'undefined') {
    return 'dark'
  }
  const saved = localStorage.getItem(themeStorageKey)
  return saved === 'light' ? 'light' : 'dark'
}

export function applyDocumentTheme(name) {
  if (typeof document === 'undefined') {
    return
  }
  const dark = name === 'dark'
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

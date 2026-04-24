<template>
  <v-app>
    <header class="site-header">
      <div class="header-inner">
        <div class="site-title" aria-label="Robotics RL Sim2Sim Demo | 机器人强化学习效果在线演示">
          🤖 Robotics RL Sim2Sim Demo | 机器人强化学习效果在线演示
        </div>
        <div class="header-spacer"></div>
        <div class="header-right">
          <a
            href="https://github.com/ImChong/RL_Sim2Sim_Demo_Website"
            class="github-link"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
          <button
            class="language-toggle"
            :aria-label="languageToggleLabel"
            :title="languageToggleLabel"
            type="button"
            @click="toggleLanguage"
          >
            {{ languageToggleText }}
          </button>
          <button
            id="themeToggle"
            class="theme-toggle"
            :aria-label="themeToggleLabel"
            :title="themeToggleLabel"
            type="button"
            @click="toggleTheme"
          >
            <span class="icon-sun">☀️</span>
            <span class="icon-moon">🌙</span>
          </button>
        </div>
      </div>
    </header>

    <v-main class="app-main">
      <Demo :visual-theme="currentThemeName" :language="currentLanguage" />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import Demo from '@/views/Demo.vue'

const theme = useTheme()
const themeStorageKey = 'rl-sim2sim-demo-theme'
const languageStorageKey = 'rl-sim2sim-demo-language'
const currentThemeName = computed(() => theme.global.name.value)
const isDark = computed(() => theme.global.current.value.dark)
const currentLanguage = ref('en')
const themeToggleLabel = computed(() => (isDark.value ? '切换到白天模式' : '切换到黑夜模式'))
const languageToggleText = computed(() => (currentLanguage.value === 'zh' ? 'English' : '中文'))
const languageToggleLabel = computed(() => (
  currentLanguage.value === 'zh' ? 'Switch control panel to English' : '将控制面板切换为中文'
))

function applyDocumentTheme(name) {
  const dark = name === 'dark'
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark'
  theme.change(next)
  localStorage.setItem(themeStorageKey, next)
  applyDocumentTheme(next)
}

function setLanguage(language) {
  currentLanguage.value = language === 'zh' ? 'zh' : 'en'
  document.documentElement.setAttribute('lang', currentLanguage.value === 'zh' ? 'zh-CN' : 'en')
  localStorage.setItem(languageStorageKey, currentLanguage.value)
}

function toggleLanguage() {
  setLanguage(currentLanguage.value === 'zh' ? 'en' : 'zh')
}

onMounted(() => {
  const saved = localStorage.getItem(themeStorageKey)
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initial = saved || (preferDark ? 'dark' : 'light')
  theme.change(initial)
  applyDocumentTheme(initial)
  setLanguage(localStorage.getItem(languageStorageKey) || 'en')
})

watch(
  () => theme.global.name.value,
  value => {
    applyDocumentTheme(value)
  }
)
</script>

<style>
:root {
  --bg: #fbfbfa;
  --bg-alt: #f3f2ef;
  --surface: rgba(255,255,255,.88);
  --surface-strong: #ffffff;
  --border: #e7e5e0;
  --border-strong: #ddd9d0;
  --text: #2f2d29;
  --text-muted: #6f6b64;
  --accent: #2d74da;
  --accent-hover: #1a5bb8;
  --header-bg: #faf9f6;
  --header-border: #ddd9d0;
  --shadow-sm: 0 8px 24px rgba(15, 23, 42, .05);
  --shadow-md: 0 16px 40px rgba(15, 23, 42, .10);
  --radius: 16px;
  --header-h: 58px;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
  --transition: .22s ease;
}

[data-theme="dark"] {
  --bg: #151515;
  --bg-alt: #1d1d1d;
  --surface: rgba(39,39,39,.88);
  --surface-strong: #2a2a2a;
  --border: #363636;
  --border-strong: #434343;
  --text: #eceae5;
  --text-muted: #a4a09a;
  --accent: #69a3ff;
  --accent-hover: #8db9ff;
  --header-bg: #252526;
  --header-border: #3c3c3c;
  --shadow-sm: 0 8px 24px rgba(0,0,0,.22);
  --shadow-md: 0 18px 44px rgba(0,0,0,.34);
}

body,
.v-application {
  font-family: 'Google Sans', 'Noto Sans SC', Arial, sans-serif !important;
}

html,
body {
  overflow-x: clip;
  width: 100%;
  position: relative;
}

body {
  background:
    radial-gradient(circle at top left, rgba(45,116,218,.06), transparent 28%),
    radial-gradient(circle at top right, rgba(120,119,198,.05), transparent 24%),
    var(--bg);
  color: var(--text);
  transition: background var(--transition), color var(--transition);
}

.v-application {
  overflow-x: clip;
  background: transparent !important;
  color: var(--text);
}

.v-main {
  padding-top: 0 !important;
}

.v-container {
  max-width: 100%;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-h);
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  backdrop-filter: blur(8px);
}

.header-inner {
  max-width: 1040px;
  margin: 0 auto;
  padding: 8px 24px;
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.site-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  line-height: 1.2;
  flex-shrink: 1;
  min-width: 0;
}

.header-spacer {
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  margin-left: auto;
}

.github-link {
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 2px;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
}

.github-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.theme-toggle,
.language-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 30px;
  padding: 0 8px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 1;
  text-align: center;
  color: var(--text);
}

.language-toggle {
  min-width: 48px;
  font-weight: 600;
}

.theme-toggle:hover,
.language-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.icon-sun { display: none; }
.icon-moon { display: inline; }
[data-theme="dark"] .icon-sun { display: inline; }
[data-theme="dark"] .icon-moon { display: none; }

.app-main {
  min-height: calc(100vh - var(--header-h));
}

@media (max-width: 768px) {
  .header-inner {
    gap: 12px;
    padding: 8px 16px;
  }

  .site-title {
    font-size: 0.94rem;
  }

  .header-right {
    gap: 0.75rem;
  }

  .github-link {
    font-size: 0.8rem;
  }

  .theme-toggle {
    min-width: 40px;
  }
}
</style>

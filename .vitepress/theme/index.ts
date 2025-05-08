// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import '@tabler/icons-webfont/dist/tabler-icons.scss'
import './style.scss'

export default {
  extends: DefaultTheme,
  Layout: () => h(CustomLayout),
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme

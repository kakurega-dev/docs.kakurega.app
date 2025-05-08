import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "隠れ家Wiki",
  description: "Misskeyサーバー「隠れ家」のドキュメントです",
  lang: 'ja-JP',
  srcDir: 'pages',
  outDir: 'dist',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ドキュメント', link: '/docs' },
      { text: 'リファレンス', link: '/references'}
    ],

    sidebar: {
      '/docs': [
        {
          text: 'ドキュメント',
          base: '/docs',
          items: [
            { text: '利用規約', link: '/terms-of-service' },
            { text: 'プライバシーポリシー', link: '/privacy-policy' },
            { text: '創作物に関するガイドライン', link: '/creation-guidelines' },
            { text: 'コミュニティガイドライン', link: '/community-guidelines' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./theme/components', import.meta.url)),
      },
    },
  }
})

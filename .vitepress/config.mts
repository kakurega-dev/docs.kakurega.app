import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import footnote from 'markdown-it-footnote'
import mark from 'markdown-it-mark'

export const pageParents = [{
  path: 'docs',
  text: 'ドキュメント',
  icon: 'book-2',
  exclude: 'news',
}, {
  path: 'docs/news',
  text: 'お知らせ',
  description: '隠れ家からの重要なお知らせです',
  icon: 'bell',
  reverse: true,
}, {
  path: 'references',
  text: 'リファレンス',
  description: '隠れ家フォークに関するリファレンスです',
  icon: 'brackets-angle',
  exclude: 'admin',
}, {
  path: 'references/admin',
  text: '運営者向け',
  description: '隠れ家フォーク版のMisskeyを使用して運営している方向けのドキュメントです',
  icon: 'shield',
}]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "隠れ家Wiki",
  description: "Misskeyサーバー「隠れ家」のドキュメントです",
  lang: 'ja-JP',
  srcDir: 'pages',
  outDir: 'dist',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/assets/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ドキュメント', link: '/docs' },
      { text: 'リファレンス', link: '/references'}
    ],

    sidebar: defineSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kakurega-dev/kakurega.app' }
    ]
  },
  transformPageData: (pageData, ctx) => {
    pageData.frontmatter.next = false
    pageData.frontmatter.prev = false
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
      md.use(mark)
    },
    theme: {
      light: 'one-light',
      dark: 'one-dark-pro'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./theme/components', import.meta.url)),
        '@@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  }
})

function defineSidebar() {
  const defaultOptions = {
    documentRootPath: 'pages',
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: 'sidebar',
    sortMenusByFrontmatterOrder: true,
    collapsed: null,
  }

  const sidebarOptions = pageParents.map((x) => {
    const generated = generateSidebar({
      ...defaultOptions,
      basePath: `/${x.path}`,
      scanStartPath: `/${x.path}`,
      rootGroupText: x.text,
      sortMenusOrderByDescending: x.reverse,
      ...(x.exclude ? { excludePattern: [x.exclude] } : {}),
    })

    if (!Array.isArray(generated) || generated.length === 0) throw new Error('invalid sidebar generated')

    return {
      root: `/${x.path.split('/').slice(0, 1).join('')}`,
      item: generated[0],
    }
  })

  const result = {} as { [path: string]: DefaultTheme.SidebarItem[] }
  sidebarOptions.forEach((x) => {
    if (!(x.root in result)) result[x.root] = []
    result[x.root].push(x.item)
  })

  return result
}
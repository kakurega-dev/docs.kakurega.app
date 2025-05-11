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
  icon: 'bell',
  reverse: true,
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
      { icon: 'github', link: 'https://github.com/hideki0403/kakurega.app' }
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
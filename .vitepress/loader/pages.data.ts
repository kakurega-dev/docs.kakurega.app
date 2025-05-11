import { createContentLoader } from 'vitepress'
import { pageParents } from '../config.mjs'

export type PageMetadata = {
    [root: string]: {
        title: string
        icon?: string
        description?: string
        contents: {
            title: string
            url: string
            description?: string
            icon?: string
        }[]
    }[]
}

declare const data: PageMetadata
export { data }

export async function getPageData() {
    const results = {} as PageMetadata

    for (const root of pageParents) {
        const contents = createContentLoader(`${root.path}/**/*.md`, {
            includeSrc: false,
            transform(rawData) {
                const data = rawData.sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0)).filter((x) => {
                    if (root.exclude && x.url.startsWith(`/${root.path}/${root.exclude}`)) {
                        return false
                    }

                    return x.url !== `/${root.path}/`
                })
                if (root.reverse) data.reverse()
                return data
            },
        })

        const parentPath = root.path.split('/').slice(0, 1).join('')
        if (!(parentPath in results)) results[parentPath] = []

        results[parentPath].push({
            title: root.text,
            icon: root.icon,
            description: root.description,
            contents: (await contents.load()).map((x) => {
                return {
                    title: x.frontmatter.title,
                    url: x.url,
                    description: x.frontmatter.description,
                    icon: x.frontmatter.icon,
                }
            }),
        })
    }

    return results
}

export default {
    load: getPageData,
}
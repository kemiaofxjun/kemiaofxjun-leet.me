import { dirname } from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'

const DOMAIN = 'https://blog.20050815.xyz'
const AUTHOR = {
  name: '克喵爱吃卤面',
  email: 'me@mail.kemeow.top',
  link: DOMAIN,
}
const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function run() {
  await buildBlogRSS()
}

async function buildBlogRSS() {
  const files = await fg('pages/posts/**/*.md')

  const options = {
    title: '克喵爱吃卤面',
    description: 'KeMiao\' Blog',
    id: 'https://blog.20050815.xyz',
    link: 'https://blog.20050815.xyz',
    copyright: 'CC BY-NC-SA 4.0 2023 © 克喵爱吃卤面',
    feedLinks: {
      json: 'https://blog.20050815.xyz/feed.json',
      atom: 'https://blog.20050815.xyz/feed.atom',
      rss: 'https://blog.20050815.xyz/feed.xml',
    },
  }
  const posts: any[] = (
    await Promise.all(
      files.filter(i => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)

          const html = markdown.render(content)
            .replace('src="/', `src="${DOMAIN}/`)

          if (data.image?.startsWith('/'))
            data.image = DOMAIN + data.image

          return {
            ...data,
            date: new Date(data.date),
            content: html,
            author: [AUTHOR],
            link: DOMAIN + i.replace(/^pages(.+)\.md$/, '$1'),
          }
        }),
    ))
    .filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  await writeFeed('feed', options, posts)
}

async function writeFeed(name: string, options: FeedOptions, items: Item[]) {
  options.author = AUTHOR
  options.image = 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp'
  options.favicon = 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp'

  const feed = new Feed(options)

  items.forEach(item => feed.addItem(item))
  // items.forEach(i=> console.log(i.title, i.date))

  await fs.ensureDir(dirname(`./dist/${name}`))
  await fs.writeFile(`./dist/${name}.xml`, feed.rss2(), 'utf-8')
  await fs.writeFile(`./dist/${name}.atom`, feed.atom1(), 'utf-8')
  await fs.writeFile(`./dist/${name}.json`, feed.json1(), 'utf-8')
}

run()

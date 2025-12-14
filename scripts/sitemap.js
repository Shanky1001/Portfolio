import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/#about', changefreq: 'monthly', priority: 0.8 },
  { url: '/#projects', changefreq: 'weekly', priority: 0.9 },
  { url: '/#experience', changefreq: 'monthly', priority: 0.9 },
  { url: '/#contact', changefreq: 'monthly', priority: 0.6 },
]

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: 'https://shashank-rai-dev.netlify.app',
  })

  const writeStream = createWriteStream('./public/sitemap.xml')
  sitemap.pipe(writeStream)

  links.forEach(link => sitemap.write(link))
  sitemap.end()

  await streamToPromise(sitemap)
  console.log('✅ Sitemap generated')
}

generateSitemap()

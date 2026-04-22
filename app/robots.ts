import type { MetadataRoute } from 'next';

const SITE_URL = 'https://shashank-rai-dev.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_redirects', '/_headers'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

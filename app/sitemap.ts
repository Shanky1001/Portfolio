import type { MetadataRoute } from 'next';

const SITE_URL = 'https://shashank-rai-dev.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/#about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#projects`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/#experience`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/#contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];
}

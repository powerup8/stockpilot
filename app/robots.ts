import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard', '/products/'],
    },
    sitemap: 'https://stockpilot-jade.vercel.app/sitemap.xml',
  }
}
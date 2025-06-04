/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  // SEO optimization
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude patterns
  exclude: ['/api/*', '/admin/*', '/private/*', '/_next/*', '/404', '/500'],

  // Additional paths
  additionalPaths: async config => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
  ],

  // Custom transformation
  transform: async (config, path) => {
    // Default priority and changefreq
    let priority = config.priority
    let changefreq = config.changefreq

    // Custom priorities for different page types
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/blog/')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.startsWith('/products/')) {
      priority = 0.9
      changefreq = 'daily'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: config.siteUrl + path,
          hreflang: 'en',
        },
      ],
    }
  },

  // Robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      (process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com') +
        '/sitemap.xml',
    ],
  },
}

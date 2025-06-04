// src/lib/seo.ts - SEO utilities for maximum search engine optimization
import { Metadata } from 'next'
import { SITE_CONFIG, SEO_CONFIG } from './constants'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
}

/**
 * Generate comprehensive SEO metadata optimized for Core Web Vitals
 */
export function generateSEO({
  title,
  description = SEO_CONFIG.DEFAULT_DESCRIPTION,
  keywords = [],
  image = SITE_CONFIG.ogImage,
  url = '',
  type = 'website',
  author = SITE_CONFIG.author,
  publishedTime,
  modifiedTime,
  noindex = false
}: SEOProps = {}): Metadata {
  const fullUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url
  const fullTitle = title 
    ? title.includes(SITE_CONFIG.name) 
      ? title 
      : `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`
  const allKeywords = [...SITE_CONFIG.keywords, ...keywords].join(', ')

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: SITE_CONFIG.creator,
    
    // Robots and indexing
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // Open Graph optimization
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      type,
      locale: 'en_US',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
          type: 'image/webp'
        }
      ],
      ...(type === 'article' && {
        authors: author ? [author] : undefined,
        publishedTime,
        modifiedTime
      })
    },

    // Twitter Card optimization
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: SITE_CONFIG.creator,
      site: SITE_CONFIG.twitter
    },

    // Canonical URL
    alternates: {
      canonical: fullUrl
    },

    // Additional meta tags for performance and UX
    other: {
      'theme-color': SITE_CONFIG.themeColor,
      'color-scheme': 'light',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'msapplication-TileColor': SITE_CONFIG.themeColor,
      'application-name': SITE_CONFIG.name
    }
  }
}

/**
 * Generate JSON-LD structured data for enhanced SEO
 */
export function generateStructuredData(type: string, data: Record<string, any>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }, null, 0)
}

/**
 * Website structured data for homepage
 */
export function generateWebsiteStructuredData() {
  return generateStructuredData('WebSite', {
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  })
}

/**
 * Organization structured data
 */
export function generateOrganizationStructuredData() {
  return generateStructuredData('Organization', SEO_CONFIG.JSONLD_ORGANIZATION)
}

/**
 * Software Application structured data for CV Builder
 */
export function generateSoftwareAppStructuredData() {
  return generateStructuredData('SoftwareApplication', {
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1250',
      bestRating: '5'
    },
    featureList: [
      'AI-powered content suggestions',
      'Professional CV templates', 
      'Drag & drop builder',
      'PDF export',
      'ATS-friendly formats',
      'Mobile responsive design'
    ]
  })
}

/**
 * FAQ structured data for FAQ section
 */
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return generateStructuredData('FAQPage', {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  })
}

/**
 * BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{name: string, url?: string}>) {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${SITE_CONFIG.url}${item.url}` })
    }))
  })
}

/**
 * Generate sitemap URLs for static generation
 */
export function generateSitemapUrls() {
  const baseUrls = [
    { url: '/', priority: 1.0, changeFreq: 'daily' },
    { url: '/templates', priority: 0.9, changeFreq: 'weekly' },
    { url: '/features', priority: 0.8, changeFreq: 'monthly' },
    { url: '/pricing', priority: 0.8, changeFreq: 'monthly' },
    { url: '/about', priority: 0.7, changeFreq: 'monthly' },
    { url: '/contact', priority: 0.6, changeFreq: 'monthly' },
    { url: '/builder', priority: 0.9, changeFreq: 'weekly' }
  ]

  return baseUrls.map(item => ({
    url: `${SITE_CONFIG.url}${item.url}`,
    lastModified: new Date(),
    changeFrequency: item.changeFreq as 'daily' | 'weekly' | 'monthly',
    priority: item.priority
  }))
}
# cv-designer

High-performance Next.js application optimized for SEO, Core Web Vitals, and maximum user experience.

## Features

- **Performance Optimized**: Built for 100/100 Lighthouse scores
- **SEO Ready**: Complete meta tags, structured data, and sitemap
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **TypeScript**: Full type safety and developer experience
- **Tailwind CSS**: Modern, utility-first styling
- **Component Library**: Pre-built, performance-optimized components

## Quick Start

1. **Install Dependencies**:
   `ash
npm install
`

2. **Configure Environment**:
   `ash
   cp .env.example .env.local

   # Edit .env.local with your site information

   `

3. **Start Development**:
   `ash
npm run dev
`

4. **Build for Production**:
   `ash
npm run build
npm start
`

## Scripts

- pm run dev - Start development server
- pm run build - Build for production (includes sitemap generation)
- pm run start - Start production server
- pm run lint - Run ESLint
- pm run format - Format code with Prettier
- pm run analyze - Analyze bundle size
- pm run sitemap - Generate sitemap

## SEO Configuration

### Required Environment Variables

`env
NEXT_PUBLIC_SITE_NAME=Your Site Name
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_DESCRIPTION=Your site description
`

### SEO Components

` sx
import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
title: 'Page Title',
description: 'Page description',
keywords: ['keyword1', 'keyword2'],
url: '/page-url'
})
`

## Performance Features

### Image Optimization

` sx
import { OptimizedImage } from '@/components/ui/OptimizedImage'

<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true}
/>
`

### Web Vitals Tracking

Web Vitals are automatically tracked and logged to console in development.

### Bundle Analysis

`ash
npm run analyze
`

## Project Structure

`src/
â”œâ”€â”€ app/                 # Next.js app directory
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ ui/             # Reusable UI components
â”‚   â”œâ”€â”€ layout/         # Layout components
â”‚   â””â”€â”€ seo/            # SEO components
â”œâ”€â”€ lib/                # Utility libraries
â”œâ”€â”€ hooks/              # Custom React hooks
â”œâ”€â”€ types/              # TypeScript type definitions
â””â”€â”€ config/             # Configuration files`

## Performance Optimizations

- **Image Optimization**: WebP/AVIF formats, lazy loading, blur placeholders
- **Font Optimization**: System fonts with fallbacks, font-display: swap
- **Bundle Splitting**: Automatic code splitting and tree shaking
- **Caching**: Optimized cache headers and static asset caching
- **Core Web Vitals**: Optimized for all Google Core Web Vitals metrics

## SEO Features

- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: JSON-LD for better search engine understanding
- **Sitemap**: Automatically generated XML sitemap
- **Robots.txt**: SEO-friendly robots.txt configuration
- **Canonical URLs**: Proper canonical URL handling

## Deployment

### Vercel (Recommended)

`ash
npm install -g vercel
vercel
`

### Other Platforms

This project is compatible with any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import '@cvcraft/ui/styles'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'CVCraft - Professional CV Builder',
    template: '%s | CVCraft'
  },
  description: 'Create stunning, ATS-friendly resumes with our modern CV builder. Choose from professional templates, get AI-powered suggestions, and land your dream job faster.',
  keywords: [
    'CV builder',
    'resume builder', 
    'professional CV',
    'ATS-friendly resume',
    'job application',
    'career tools',
    'resume templates',
    'AI-powered CV'
  ],
  authors: [{ name: 'CVCraft Team' }],
  creator: 'CVCraft',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cvcraft.com',
    siteName: 'CVCraft',
    title: 'CVCraft - Professional CV Builder',
    description: 'Create stunning, ATS-friendly resumes with our modern CV builder. Choose from professional templates, get AI-powered suggestions, and land your dream job faster.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CVCraft - Professional CV Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cvcraft',
    creator: '@cvcraft',
    title: 'CVCraft - Professional CV Builder',
    description: 'Create stunning, ATS-friendly resumes with our modern CV builder.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3B82F6',
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'CVCraft',
              description: 'Professional CV Builder with AI-powered suggestions',
              url: 'https://cvcraft.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              provider: {
                '@type': 'Organization',
                name: 'CVCraft',
                url: 'https://cvcraft.com',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
          
          {/* Main content wrapper */}
          <div className="min-h-screen flex flex-col">
            <main id="main-content" className="flex-1">
              {children}
            </main>
            
            {/* Global loading indicator */}
            <div id="loading-indicator" className="hidden fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            </div>
          </div>
          
          {/* Global toast container */}
          <div id="toast-container" className="fixed bottom-4 right-4 z-50 space-y-2"></div>
          
          {/* Service Worker Registration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
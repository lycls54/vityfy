// src/app/layout.tsx - Hydration Safe Final Version
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { generateSEO, generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import { SITE_CONFIG, PERFORMANCE_CONFIG } from '@/lib/constants'

// Components - direct import
import Header from '@/components/layout/Header'

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif']
})

export const metadata: Metadata = generateSEO({
  title: `${SITE_CONFIG.name} - Professional CV Builder`,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  url: '/'
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: SITE_CONFIG.themeColor,
  colorScheme: 'light'
}

// Hydration-safe inline Footer
function HydrationSafeFooter() {
  return (
    <footer className="bg-gray-900 text-white" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CV</span>
                </div>
                <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Create professional CVs that get you hired. Join thousands of job seekers 
                who landed their dream jobs with our AI-powered CV builder.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>📧 hello@cvcraft.pro</div>
                <div>📞 +1 (555) 123-4567</div>
                <div>📍 San Francisco, CA</div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="/builder" className="text-gray-300 hover:text-white transition-colors">CV Builder</a></li>
                <li><a href="/templates" className="text-gray-300 hover:text-white transition-colors">Templates</a></li>
                <li><a href="/features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-8 text-center">
          <p className="text-gray-400 text-sm" suppressHydrationWarning>
            © 2025 {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical images */}
        {PERFORMANCE_CONFIG.PRELOAD_IMAGES.map((src) => (
          <link
            key={src}
            rel="preload"
            href={src}
            as="image"
            type="image/webp"
          />
        ))}

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateWebsiteStructuredData()
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateOrganizationStructuredData()
          }}
        />

        {/* Hydration-safe client script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function initClientFeatures() {
                  // Mark as hydrated
                  document.body.classList.add('hydrated');
                  
                  // Initialize scroll animations
                  if (typeof IntersectionObserver !== 'undefined') {
                    try {
                      const observer = new IntersectionObserver(
                        function(entries) {
                          entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                              entry.target.classList.add('visible');
                            }
                          });
                        },
                        { 
                          threshold: 0.1,
                          rootMargin: '50px 0px -50px 0px'
                        }
                      );

                      // Observe scroll animation elements
                      setTimeout(function() {
                        const elements = document.querySelectorAll('.animate-on-scroll');
                        elements.forEach(function(el) {
                          observer.observe(el);
                        });
                      }, 100);
                    } catch (e) {
                      console.warn('Animation observer initialization failed:', e);
                    }
                  }
                }
                
                // Safe initialization
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    requestAnimationFrame(initClientFeatures);
                  });
                } else {
                  requestAnimationFrame(initClientFeatures);
                }
              })();
            `
          }}
        />
      </head>
      
      <body className={`${inter.className} antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main id="main-content" className="flex-1">
            {children}
          </main>
          
          <HydrationSafeFooter />
        </div>

        {/* Performance monitoring - production only */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                    requestIdleCallback(function() {
                      try {
                        import('web-vitals').then(function(webVitals) {
                          webVitals.getCLS(console.log);
                          webVitals.getFID(console.log);
                          webVitals.getFCP(console.log);
                          webVitals.getLCP(console.log);
                          webVitals.getTTFB(console.log);
                        });
                      } catch (e) {
                        // Silently fail if web vitals can't load
                      }
                    });
                  }
                })();
              `
            }}
          />
        )}
      </body>
    </html>
  )
}

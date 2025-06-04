// src/lib/constants.ts - SSR Güvenli Versiyon
export const SITE_CONFIG = {
  name: "CVCraft",
  description: "Professional CV Designer - Create stunning resumes with AI-powered templates. Build, customize, and export your perfect CV in minutes.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cvcraft.pro",
  ogImage: "/images/og/cv-designer-og.webp",
  keywords: [
    "cv designer", "resume builder", "professional cv", "resume template", 
    "cv maker", "online cv", "resume generator", "cv creator", "job application",
    "career tools", "resume download", "cv export", "ai resume", "modern cv",
    "free cv builder", "cv online", "curriculum vitae", "job search"
  ],
  author: "CVCraft Team",
  creator: "@cvcraft",
  themeColor: "#3B82F6",
  language: "en",
  twitter: "@cvcraft",
  // SSR güvenli statik değerler
  foundingYear: "2025",
  currentYear: "2025" // Client-side'da dinamik olarak güncellenecek
} as const;

// SSR güvenli yardımcı fonksiyonlar
export const getStaticYear = () => "2025"

export const getCurrentYear = () => {
  // Client-side kontrolü
  if (typeof window !== 'undefined') {
    return new Date().getFullYear().toString()
  }
  return "2025" // SSR fallback
}

export const FEATURES_DATA = [
  {
    id: "ai-powered",
    title: "AI-Powered Content Suggestions",
    description: "Get intelligent, personalized suggestions for your CV content with our advanced AI assistant that understands your industry and role.",
    icon: "/images/features/ai-powered.svg",
    benefits: [
      "Smart content recommendations based on your field",
      "Industry-specific keywords and phrases", 
      "Grammar and style optimization",
      "ATS-friendly content structuring"
    ],
    category: "ai"
  },
  {
    id: "drag-drop-builder",
    title: "Intuitive Drag & Drop Builder", 
    description: "Build your CV effortlessly with our user-friendly interface. Simply drag and drop sections to create the perfect layout.",
    icon: "/images/features/drag-drop.svg",
    benefits: [
      "Easy section reordering and customization",
      "Visual editing with real-time preview",
      "No technical skills required",
      "Mobile-friendly builder interface"
    ],
    category: "builder"
  },
  {
    id: "professional-templates",
    title: "Professional ATS-Friendly Templates",
    description: "Choose from our collection of expertly designed templates that pass applicant tracking systems and impress recruiters.",
    icon: "/images/features/templates.svg", 
    benefits: [
      "20+ professionally designed templates",
      "100% ATS-compatible formats",
      "Industry-specific design options",
      "Fully customizable colors and fonts"
    ],
    category: "templates"
  },
  {
    id: "instant-pdf-export",
    title: "High-Quality PDF Export",
    description: "Download your finished CV as a professional, print-ready PDF that maintains perfect formatting across all devices.",
    icon: "/images/features/export-pdf.svg",
    benefits: [
      "High-resolution PDF output",
      "Print-ready formatting",
      "Multiple download options",
      "Consistent formatting across devices"
    ],
    category: "export"
  },
  {
    id: "real-time-preview",
    title: "Live Preview & Editing",
    description: "See your changes instantly as you edit with our real-time preview feature. What you see is exactly what you get.",
    icon: "/images/features/real-time.svg",
    benefits: [
      "Instant visual feedback",
      "WYSIWYG editing experience",
      "Mobile and desktop preview modes",
      "Real-time formatting updates"
    ],
    category: "preview"
  },
  {
    id: "mobile-responsive", 
    title: "Mobile-First Design",
    description: "Create and edit your CV on any device with our fully responsive design that works perfectly on smartphones and tablets.",
    icon: "/images/features/mobile.svg",
    benefits: [
      "Works on all devices and screen sizes",
      "Touch-friendly interface",
      "Offline editing capability",
      "Cross-platform compatibility"
    ],
    category: "mobile"
  }
] as const;

export const CV_TEMPLATES = {
  modern: {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, contemporary design perfect for tech and creative roles",
    category: "professional" as const,
    colors: ["#3B82F6", "#1E40AF", "#60A5FA"],
    features: ["Two-column layout", "Modern typography", "Icon integration"],
    preview: "/images/templates/modern-thumb.webp"
  },
  classic: {
    id: "classic", 
    name: "Classic Business",
    description: "Traditional format ideal for corporate and executive positions",
    category: "traditional" as const,
    colors: ["#1F2937", "#374151", "#6B7280"],
    features: ["Single column", "Conservative styling", "Professional fonts"],
    preview: "/images/templates/classic-thumb.webp"
  },
  creative: {
    id: "creative",
    name: "Creative Designer", 
    description: "Bold, artistic layout for designers and creative professionals",
    category: "creative" as const,
    colors: ["#8B5CF6", "#A855F7", "#C084FC"],
    features: ["Unique layout", "Color accents", "Creative sections"],
    preview: "/images/templates/creative-thumb.webp"
  },
  minimal: {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple, elegant design focusing on content clarity",
    category: "minimal" as const, 
    colors: ["#000000", "#404040", "#808080"],
    features: ["Minimal design", "Focus on content", "Clean typography"],
    preview: "/images/templates/minimal-thumb.webp"
  }
} as const;

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Google",
    image: "/images/testimonials/sarah-chen.webp",
    rating: 5 as const,
    text: "CVCraft's AI suggestions helped me highlight my achievements in a way that really resonated with hiring managers. I landed my dream job at Google within 3 weeks of updating my CV. The modern template was exactly what I needed for the tech industry.",
    location: "San Francisco, CA",
    industry: "Technology"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Product Marketing Manager", 
    company: "Microsoft",
    image: "/images/testimonials/michael-rodriguez.webp",
    rating: 5 as const,
    text: "The drag-and-drop interface made it incredibly easy to reorganize my experience and showcase my marketing wins. I got more interview callbacks in a month than I had in the previous six months with my old CV.",
    location: "Seattle, WA",
    industry: "Technology"
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Senior UX Designer",
    company: "Apple",
    image: "/images/testimonials/emily-johnson.webp", 
    rating: 5 as const,
    text: "As a designer, I'm extremely picky about aesthetics and layout. CVCraft's templates are beautifully crafted and helped me create a CV that truly represents my design skills. The creative template was perfect for showcasing my portfolio.",
    location: "Cupertino, CA",
    industry: "Design"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Financial Analyst",
    company: "Goldman Sachs",
    image: "/images/testimonials/david-kim.webp",
    rating: 5 as const,
    text: "The ATS-friendly templates were a game-changer. My previous CV never made it past the initial screening, but with CVCraft's optimized format, I started getting calls immediately. The classic template gave me the professional look I needed for finance.",
    location: "New York, NY",
    industry: "Finance"
  }
] as const;

export const FAQ_DATA = [
  {
    id: 1,
    question: "Is CVCraft really completely free to use?",
    answer: "Yes! CVCraft is 100% free with no hidden costs, subscription fees, or premium upgrades. You get access to all templates, AI suggestions, and PDF export features without paying anything. We believe everyone deserves access to professional CV creation tools.",
    category: "pricing"
  },
  {
    id: 2, 
    question: "Are your CV templates compatible with Applicant Tracking Systems (ATS)?",
    answer: "Absolutely! All our templates are specifically designed to be ATS-friendly. They use standard formatting, proper heading structures, and avoid complex graphics that could confuse automated systems. This ensures your CV gets through initial screening and reaches human recruiters.",
    category: "templates"
  },
  {
    id: 3,
    question: "Can I edit my CV after downloading it?",
    answer: "Yes! Your CV data is automatically saved in your browser's local storage, so you can return anytime to make edits and download updated versions. You can also make minor edits to the PDF using standard PDF editors, though we recommend using our builder for major changes.",
    category: "editing"
  },
  {
    id: 4,
    question: "How does the AI content suggestion feature work?",
    answer: "Our AI analyzes your job title, industry, and experience level to suggest relevant skills, powerful action words, and achievement-focused descriptions. It helps you write compelling content that appeals to both ATS systems and human recruiters, increasing your chances of getting noticed.",
    category: "ai"
  },
  {
    id: 5,
    question: "Is my personal information secure and private?",
    answer: "Your privacy is our top priority. All CV data is stored locally in your browser and never transmitted to our servers unless you explicitly use AI features. When using AI, data is processed securely and immediately deleted after generating suggestions. We never store or share your personal information.",
    category: "privacy"
  },
  {
    id: 6,
    question: "Can I use CVCraft on my mobile phone or tablet?",
    answer: "Absolutely! CVCraft is fully responsive and works seamlessly on all devices. You can create, edit, and download your CV using your smartphone, tablet, or computer. The interface automatically adapts to your screen size for the best possible experience.",
    category: "mobile"
  }
] as const;

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Features" }, 
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const SOCIAL_LINKS = [
  { platform: "twitter", url: "https://twitter.com/cvcraft", icon: "Twitter" },
  { platform: "linkedin", url: "https://linkedin.com/company/cvcraft", icon: "Linkedin" },
  { platform: "github", url: "https://github.com/cvcraft", icon: "Github" }
] as const;

export const CV_SECTIONS = {
  PERSONAL: "personal",
  EXPERIENCE: "experience", 
  EDUCATION: "education",
  SKILLS: "skills",
  PROJECTS: "projects",
  LANGUAGES: "languages",
  CERTIFICATIONS: "certifications",
  REFERENCES: "references"
} as const;

// Performance and SEO constants
export const PERFORMANCE_CONFIG = {
  IMAGE_QUALITY: 85,
  IMAGE_SIZES: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  BLUR_DATA_URL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=",
  FONT_DISPLAY: "swap" as const,
  PRELOAD_IMAGES: [
    "/images/hero/cv-hero.webp",
    "/images/templates/modern-thumb.webp"
  ]
} as const;

export const SEO_CONFIG = {
  DEFAULT_TITLE_TEMPLATE: "%s | CVCraft - Professional CV Builder",
  DEFAULT_DESCRIPTION: SITE_CONFIG.description,
  DEFAULT_OG_TYPE: "website" as const,
  JSONLD_ORGANIZATION: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo/logo.svg`,
    description: SITE_CONFIG.description,
    foundingDate: SITE_CONFIG.foundingYear,
    sameAs: SOCIAL_LINKS.map(link => link.url)
  }
} as const;

// CV Builder specific constants
export const CV_LIMITS = {
  MAX_EXPERIENCE_ITEMS: 10,
  MAX_EDUCATION_ITEMS: 5, 
  MAX_SKILLS: 20,
  MAX_PROJECTS: 8,
  MAX_LANGUAGES: 8,
  MAX_CERTIFICATIONS: 10,
  MAX_TEXT_LENGTH: 500,
  MAX_TITLE_LENGTH: 100
} as const;

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner", percentage: 25 },
  { value: "intermediate", label: "Intermediate", percentage: 50 },
  { value: "advanced", label: "Advanced", percentage: 75 },
  { value: "expert", label: "Expert", percentage: 100 }
] as const;

export const LANGUAGE_LEVELS = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "professional", label: "Professional" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" }
] as const;

// SSR güvenli stats - dinamik değerler yerine statik değerler
export const STATS_DATA = {
  users: "50,000+",
  rating: "4.9/5",
  downloads: "25,000+",
  countries: "120+",
  successRate: "95%",
  averageTime: "5 min"
} as const;

// Client-side'da güncellenecek dinamik değerler için yardımcı fonksiyonlar
export const getDynamicStats = () => {
  if (typeof window === 'undefined') {
    return STATS_DATA // SSR fallback
  }
  
  // Client-side'da güncel verileri al (API çağrısı vs.)
  return {
    ...STATS_DATA,
    // Gerçek zamanlı veriler buraya eklenebilir
  }
}
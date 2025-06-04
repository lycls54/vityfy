// src/data/features.ts - Features data with enhanced descriptions
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
] as const
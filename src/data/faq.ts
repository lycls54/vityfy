// src/data/faq.ts - Comprehensive FAQ data
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
  },
  {
    id: 7,
    question: "What file formats can I download my CV in?",
    answer: "Currently, you can download your CV as a high-quality PDF, which is the standard format preferred by most employers and recruiters. PDF ensures your formatting stays consistent across all devices and operating systems. We're working on adding more formats like Word (.docx) in future updates.",
    category: "export"
  },
  {
    id: 8,
    question: "How long does it typically take to create a CV?",
    answer: "Most users complete their CV in 5-15 minutes, depending on their experience level and how detailed they want to be. Our streamlined interface and AI suggestions help speed up the process significantly compared to starting from scratch in a word processor.",
    category: "time"
  },
  {
    id: 9,
    question: "Do you offer customer support if I need help?",
    answer: "Yes! We provide comprehensive support through multiple channels including live chat, email support, and an extensive help center with tutorials and guides. Our team is available 24/7 to assist you with any questions or issues you might encounter.",
    category: "support"
  },
  {
    id: 10,
    question: "Can I create multiple CVs for different job applications?",
    answer: "While the current version saves one CV per browser, you can easily modify your existing CV for different applications. We recommend customizing your CV for each job by adjusting the summary, highlighting relevant experiences, and tailoring keywords to match job descriptions.",
    category: "multiple"
  }
] as const
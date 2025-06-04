// src/utils/pdfExport.ts - Pure CSS/Browser Print Version
import { CVData } from '@/types/cv'

export interface PDFExportOptions {
  filename?: string
}

export const usePDFExport = () => {
  const generatePDF = async (
    cv: CVData, 
    options: PDFExportOptions = {}
  ): Promise<void> => {
    // Use browser's native print functionality
    const originalTitle = document.title
    document.title = `${cv.personal.firstName}-${cv.personal.lastName}-CV`
    
    // Add print styles if not already present
    addPrintStyles()
    
    // Trigger print dialog
    window.print()
    
    // Restore original title
    document.title = originalTitle
  }

  const printCV = (): void => {
    addPrintStyles()
    window.print()
  }

  const shareCV = async (cv: CVData): Promise<void> => {
    const shareData = {
      title: `${cv.personal.firstName} ${cv.personal.lastName} - CV`,
      text: 'Check out my professional CV',
      url: window.location.href
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        showToast('CV shared successfully!', 'success')
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        showToast('Link copied to clipboard!', 'success')
      }
    } catch (error) {
      console.error('Share failed:', error)
      showToast('Sharing failed. Please copy the URL manually.', 'error')
    }
  }

  const exportAsJSON = (cv: CVData): void => {
    try {
      const dataStr = JSON.stringify(cv, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${cv.personal.firstName}-${cv.personal.lastName}-CV-data.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      showToast('CV data exported successfully!', 'success')
    } catch (error) {
      console.error('JSON export failed:', error)
      showToast('Export failed. Please try again.', 'error')
    }
  }

  const importFromJSON = (file: File): Promise<CVData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string
          const importedCV = JSON.parse(result)
          
          if (!importedCV.personal || !importedCV.experience) {
            throw new Error('Invalid CV file format')
          }
          
          resolve(importedCV)
          showToast('CV imported successfully!', 'success')
        } catch (error) {
          reject(new Error('Invalid CV file format'))
          showToast('Invalid file format. Please select a valid CV JSON file.', 'error')
        }
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
        showToast('Failed to read file. Please try again.', 'error')
      }
      
      reader.readAsText(file)
    })
  }

  return {
    generatePDF,
    printCV,
    shareCV,
    exportAsJSON,
    importFromJSON
  }
}

// Pure CSS Print Styles
const addPrintStyles = () => {
  // Check if print styles already exist
  if (document.getElementById('cv-print-styles')) return

  const style = document.createElement('style')
  style.id = 'cv-print-styles'
  style.textContent = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      @page {
        margin: 0;
        size: A4 portrait;
      }
      
      body {
        margin: 0 !important;
        padding: 0 !important;
        font-size: 12pt !important;
        line-height: 1.4 !important;
      }
      
      /* Hide everything except CV */
      body > *:not(#cv-template) {
        display: none !important;
      }
      
      /* Show only CV template */
      #cv-template {
        display: block !important;
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
        transform: none !important;
      }
      
      /* Print-specific utilities */
      .print-hidden {
        display: none !important;
      }
      
      .print-visible {
        display: block !important;
      }
      
      .page-break-before {
        page-break-before: always !important;
      }
      
      .page-break-after {
        page-break-after: always !important;
      }
      
      .no-break {
        page-break-inside: avoid !important;
      }
      
      /* Ensure text is readable */
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
      }
      
      /* Fix potential layout issues */
      .grid {
        display: block !important;
      }
      
      .flex {
        display: block !important;
      }
    }
  `
  
  document.head.appendChild(style)
}

// Simple toast notifications (Pure CSS)
let toastContainer: HTMLElement | null = null

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      pointer-events: none;
      font-family: system-ui, -apple-system, sans-serif;
    `
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  const container = createToastContainer()
  const toast = document.createElement('div')
  
  const bgColor = type === 'success' ? '#10B981' : '#EF4444'
  
  toast.style.cssText = `
    background: ${bgColor};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    font-weight: 500;
    pointer-events: auto;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `
  
  toast.textContent = message
  container.appendChild(toast)
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)'
  }, 10)
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 3000)
}
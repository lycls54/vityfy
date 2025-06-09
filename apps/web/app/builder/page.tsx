'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Container, Input, Label, Badge } from '@cvcraft/ui'
import { ArrowLeft, Save, Download, Eye, Plus, Check, User, Briefcase, GraduationCap, Star, Code, Languages, Award, Users, Settings, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'

const sectionIcons = {
  personalInfo: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Star,
  projects: Code,
  languages: Languages,
  certifications: Award,
  volunteer: Users,
  settings: Settings
}

const sections = [
  { id: 'personalInfo', label: 'Personal Info', required: true, completed: true },
  { id: 'experience', label: 'Experience', required: true, completed: false },
  { id: 'education', label: 'Education', required: true, completed: false },
  { id: 'skills', label: 'Skills', required: false, completed: false },
  { id: 'projects', label: 'Projects', required: false, completed: false },
  { id: 'languages', label: 'Languages', required: false, completed: false },
  { id: 'certifications', label: 'Certifications', required: false, completed: false },
  { id: 'volunteer', label: 'Volunteer', required: false, completed: false },
  { id: 'settings', label: 'Settings', required: false, completed: false }
]

export default function BuilderPage() {
  const [activeSection, setActiveSection] = useState('personalInfo')
  const [isPreviewOpen, setIsPreviewOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CV</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">CV Builder</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewOpen ? 'Hide' : 'Show'} Preview
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen sticky top-16">
          <div className="p-6">
            {/* Progress Overview */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  15% Complete
                </Badge>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Complete all required sections to unlock full features
              </p>
            </div>

            {/* Section Navigation */}
            <nav className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                CV Sections
              </h3>
              {sections.map((section) => {
                const Icon = sectionIcons[section.id as keyof typeof sectionIcons]
                const isActive = activeSection === section.id
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{section.label}</span>
                          {section.required && (
                            <span className="ml-2 text-xs text-red-500">*</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {section.completed && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </nav>

            {/* AI Assistant */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">AI Assistant</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Get smart suggestions</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Need help writing your experience? Our AI can suggest improvements based on your role.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Get AI Suggestions
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isPreviewOpen ? 'mr-96' : 'mr-0'}`}>
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  {(() => {
                    const Icon = sectionIcons[activeSection as keyof typeof sectionIcons]
                    return <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  })()}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sections.find(s => s.id === activeSection)?.label}
                  </h2>
                  {sections.find(s => s.id === activeSection)?.required && (
                    <Badge variant="destructive" className="ml-3">Required</Badge>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeSection === 'personalInfo' && "Let's start with your basic information. This will be prominently displayed at the top of your CV."}
                  {activeSection === 'experience' && "Add your work experience. Focus on achievements and quantifiable results."}
                  {activeSection === 'education' && "Include your educational background, starting with the most recent."}
                </p>
              </div>

              {/* Form Content */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  {activeSection === 'personalInfo' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" required>First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="John" 
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" required>Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe" 
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input 
                          id="title" 
                          placeholder="e.g., Senior Software Engineer, Marketing Manager" 
                          className="mt-2"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          This appears right under your name and should match the role you're applying for.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <textarea
                          id="summary"
                          rows={4}
                          placeholder="Write a compelling 2-3 sentence summary that highlights your key achievements and career goals..."
                          className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Keep it concise and impactful
                          </p>
                          <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                            <Sparkles className="h-4 w-4 mr-1" />
                            AI Help
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" required>Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            placeholder="San Francisco, CA" 
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website/Portfolio</Label>
                          <Input 
                            id="website" 
                            type="url" 
                            placeholder="https://johndoe.com" 
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input 
                            id="linkedin" 
                            type="url" 
                            placeholder="https://linkedin.com/in/johndoe" 
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input 
                            id="github" 
                            type="url" 
                            placeholder="https://github.com/johndoe" 
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Work Experience</h3>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      
                      <Card className="border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label htmlFor="company">Company</Label>
                              <Input id="company" placeholder="Company Name" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="position">Position</Label>
                              <Input id="position" placeholder="Job Title" className="mt-1" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <Label htmlFor="startDate">Start Date</Label>
                              <Input id="startDate" type="month" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="endDate">End Date</Label>
                              <Input id="endDate" type="month" className="mt-1" />
                            </div>
                            <div className="flex items-end">
                              <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm">Currently working here</span>
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description & Achievements</Label>
                            <textarea
                              id="description"
                              rows={4}
                              placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 5 engineers and improved deployment efficiency by 40%&#10;• Implemented automated testing that reduced bugs by 60%"
                              className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Use bullet points and focus on quantifiable achievements
                              </p>
                              <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                                <Sparkles className="h-4 w-4 mr-1" />
                                Improve with AI
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline">
                      Previous Section
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save Progress
                      </Button>
                      <Button>
                        Next Section
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Preview Panel */}
        {isPreviewOpen && (
          <aside className="w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 fixed right-0 top-16 h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* CV Preview */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-sm transform scale-75 origin-top">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-lg text-blue-600 font-medium">Senior Software Engineer</p>
                  <div className="mt-3 text-gray-600 space-y-1">
                    <p>john@example.com</p>
                    <p>+1 (555) 123-4567</p>
                    <p>San Francisco, CA</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-blue-600">linkedin.com/in/johndoe</span>
                      <span className="text-blue-600">github.com/johndoe</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Experienced software engineer with 8+ years building scalable web applications. 
                    Led cross-functional teams and delivered products used by millions of users.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-medium text-gray-900">Senior Software Engineer</h4>
                          <p className="text-blue-600 font-medium">Tech Company Inc.</p>
                        </div>
                        <span className="text-gray-500 text-sm">2020 - Present</span>
                      </div>
                      <ul className="text-gray-700 text-sm space-y-1 ml-4">
                        <li>• Led development of microservices architecture</li>
                        <li>• Improved system performance by 40%</li>
                        <li>• Mentored 5 junior developers</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-700">Add your education details...</p>
                </div>
              </div>
              
              {/* Template Options */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Template Style</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-blue-500 rounded-lg p-3 bg-blue-50 dark:bg-blue-950">
                    <div className="w-full h-16 bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded mb-2"></div>
                    <p className="text-xs font-medium text-center">Modern</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-gray-300 cursor-pointer">
                    <div className="w-full h-16 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded mb-2"></div>
                    <p className="text-xs font-medium text-center">Classic</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
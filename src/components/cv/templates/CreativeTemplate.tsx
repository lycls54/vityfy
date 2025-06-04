// src/components/cv/templates/CreativeTemplate.tsx - Creative Designer Template
import React from 'react'
import { CVData } from '@/types/cv'
import { cvHelpers } from '@/utils/cvHelpers'

interface CreativeTemplateProps {
  cv: CVData
  className?: string
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ cv, className = '' }) => {
  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`} style={{ minHeight: '297mm' }}>
      <div className="grid md:grid-cols-3 min-h-full">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-800 text-white p-8 space-y-8">
          {/* Profile Section */}
          <div className="text-center no-break">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold">
                {cv.personal.firstName[0]}{cv.personal.lastName[0]}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {cv.personal.firstName}<br/>{cv.personal.lastName}
            </h1>
            {cv.experience[0] && (
              <p className="text-purple-200 font-medium">{cv.experience[0].position}</p>
            )}
            {cv.personal.summary && (
              <p className="text-purple-100 text-sm mt-4 leading-relaxed">{cv.personal.summary}</p>
            )}
          </div>

          {/* Contact */}
          <div className="no-break">
            <h3 className="text-lg font-bold mb-4 text-purple-100 relative">
              Contact
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/50"></div>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="break-all">{cv.personal.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span>{cv.personal.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span>{cv.personal.location}</span>
              </div>
              {cv.personal.linkedin && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="break-all text-xs">{cv.personal.linkedin}</span>
                </div>
              )}
              {cv.personal.website && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span className="break-all text-xs">{cv.personal.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {cv.skills.length > 0 && (
            <div className="no-break">
              <h3 className="text-lg font-bold mb-4 text-purple-100 relative">
                Skills
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/50"></div>
              </h3>
              <div className="space-y-3">
                {cv.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-purple-200 capitalize">{skill.level}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: skill.level === 'expert' ? '100%' : 
                                 skill.level === 'advanced' ? '80%' : 
                                 skill.level === 'intermediate' ? '60%' : '40%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {cv.languages && cv.languages.length > 0 && (
            <div className="no-break">
              <h3 className="text-lg font-bold mb-4 text-purple-100 relative">
                Languages
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/50"></div>
              </h3>
              <div className="space-y-2">
                {cv.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-purple-200 capitalize">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {cv.certifications && cv.certifications.length > 0 && (
            <div className="no-break">
              <h3 className="text-lg font-bold mb-4 text-purple-100 relative">
                Certifications
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/50"></div>
              </h3>
              <div className="space-y-3">
                {cv.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="text-sm font-medium">{cert.name}</h4>
                    <p className="text-xs text-purple-200">{cert.issuer}</p>
                    <p className="text-xs text-purple-300">{cvHelpers.formatDate(cert.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Creative Elements */}
          <div className="flex justify-center space-x-2 opacity-30">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 p-8 space-y-8">
          {/* Experience */}
          {cv.experience.length > 0 && (
            <section className="no-break">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                Experience
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600"></div>
              </h2>
              <div className="space-y-6">
                {cv.experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-8 no-break">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-purple-600 rounded-full"></div>
                    {index < cv.experience.length - 1 && (
                      <div className="absolute left-2 top-6 w-0.5 h-full bg-purple-200"></div>
                    )}
                    
                    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                          {cvHelpers.formatDate(exp.startDate)} - {exp.current ? 'Present' : cvHelpers.formatDate(exp.endDate)}
                        </span>
                      </div>
                      
                      {exp.location && (
                        <p className="text-sm text-gray-600 mb-3">{exp.location}</p>
                      )}
                      
                      {exp.description && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                      )}
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm leading-relaxed">{achievement}</li>
                          ))}
                        </ul>
                      )}
                      
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <section className="no-break">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                Education
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600"></div>
              </h2>
              <div className="space-y-4">
                {cv.education.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 no-break">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-purple-600 font-medium">{edu.institution}</p>
                        {edu.field && <p className="text-gray-600">{edu.field}</p>}
                        {edu.description && (
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                          {cvHelpers.formatDate(edu.startDate)} - {edu.current ? 'Present' : cvHelpers.formatDate(edu.endDate)}
                        </span>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600 mt-2">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    </div>
                    
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-600 text-sm mt-3 space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {cv.projects && cv.projects.length > 0 && (
            <section className="no-break">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                Featured Projects
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600"></div>
              </h2>
              <div className="grid gap-6">
                {cv.projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 no-break">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} className="text-purple-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                            {project.url}
                          </a>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                        {cvHelpers.formatDate(project.startDate)} - {project.current ? 'Present' : cvHelpers.formatDate(project.endDate || '')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.achievements && project.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        {project.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Creative Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-0.5 bg-purple-300"></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-0.5 bg-purple-300"></div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Portfolio available upon request</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreativeTemplate
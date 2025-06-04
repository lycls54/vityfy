// src/components/cv/templates/ModernTemplate.tsx - Modern Professional Template
import React from 'react'
import { CVData } from '@/types/cv'
import { cvHelpers } from '@/utils/cvHelpers'

interface ModernTemplateProps {
  cv: CVData
  className?: string
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ cv, className = '' }) => {
  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`} style={{ minHeight: '297mm' }}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2">
              {cv.personal.firstName} {cv.personal.lastName}
            </h1>
            {cv.experience[0] && (
              <h2 className="text-xl text-blue-100 mb-4">{cv.experience[0].position}</h2>
            )}
            {cv.personal.summary && (
              <p className="text-blue-50 leading-relaxed">{cv.personal.summary}</p>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-blue-300 rounded-full flex-shrink-0"></span>
              <span className="break-all">{cv.personal.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-blue-300 rounded-full flex-shrink-0"></span>
              <span>{cv.personal.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-blue-300 rounded-full flex-shrink-0"></span>
              <span>{cv.personal.location}</span>
            </div>
            {cv.personal.linkedin && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-300 rounded-full flex-shrink-0"></span>
                <span className="break-all text-xs">{cv.personal.linkedin}</span>
              </div>
            )}
            {cv.personal.website && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-300 rounded-full flex-shrink-0"></span>
                <span className="break-all text-xs">{cv.personal.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 p-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Professional Experience */}
          {cv.experience.length > 0 && (
            <section className="no-break">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Professional Experience
              </h3>
              <div className="space-y-6">
                {cv.experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6 no-break">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    {index < cv.experience.length - 1 && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-200"></div>
                    )}
                    
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>
                          {cvHelpers.formatDate(exp.startDate)} - {exp.current ? 'Present' : cvHelpers.formatDate(exp.endDate)}
                        </p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    
                    {exp.description && (
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                    )}
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm">{achievement}</li>
                        ))}
                      </ul>
                    )}
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <section className="no-break">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Education
              </h3>
              <div className="space-y-4">
                {cv.education.map((edu, index) => (
                  <div key={edu.id} className="relative pl-6 no-break">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    {index < cv.education.length - 1 && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-200"></div>
                    )}
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        {edu.field && <p className="text-gray-600">{edu.field}</p>}
                        {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>
                          {cvHelpers.formatDate(edu.startDate)} - {edu.current ? 'Present' : cvHelpers.formatDate(edu.endDate)}
                        </p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                        {edu.location && <p>{edu.location}</p>}
                      </div>
                    </div>
                    
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Projects
              </h3>
              <div className="space-y-4">
                {cv.projects.map((project) => (
                  <div key={project.id} className="no-break">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                        {project.url && (
                          <p className="text-blue-600 text-sm">{project.url}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>
                          {cvHelpers.formatDate(project.startDate)} - {project.current ? 'Present' : cvHelpers.formatDate(project.endDate || '')}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {cv.skills.length > 0 && (
            <section className="no-break">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Skills
              </h3>
              <div className="space-y-3">
                {cv.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className="text-xs text-gray-600 capitalize">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
            </section>
          )}

          {/* Languages */}
          {cv.languages && cv.languages.length > 0 && (
            <section className="no-break">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Languages
              </h3>
              <div className="space-y-2">
                {cv.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-medium text-gray-800">{lang.name}</span>
                    <span className="text-sm text-gray-600 capitalize">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cv.certifications && cv.certifications.length > 0 && (
            <section className="no-break">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Certifications
              </h3>
              <div className="space-y-3">
                {cv.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">{cvHelpers.formatDate(cert.date)}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500">ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Additional Information */}
          <section className="no-break">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Additional Info
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Available for relocation</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Open to remote work</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Full-time availability</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ModernTemplate
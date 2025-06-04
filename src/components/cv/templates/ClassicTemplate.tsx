// src/components/cv/templates/ClassicTemplate.tsx - Classic Business Template
import React from 'react'
import { CVData } from '@/types/cv'
import { cvHelpers } from '@/utils/cvHelpers'

interface ClassicTemplateProps {
  cv: CVData
  className?: string
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ cv, className = '' }) => {
  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`} style={{ minHeight: '297mm' }}>
      <div className="p-8 space-y-8">
        {/* Header */}
        <header className="text-center border-b-2 border-gray-800 pb-6 no-break">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {cv.personal.firstName} {cv.personal.lastName}
          </h1>
          
          {/* Contact Information */}
          <div className="flex justify-center items-center space-x-4 text-gray-600 mb-4 flex-wrap">
            <span>{cv.personal.email}</span>
            <span className="hidden sm:inline">•</span>
            <span>{cv.personal.phone}</span>
            <span className="hidden sm:inline">•</span>
            <span>{cv.personal.location}</span>
          </div>
          
          {/* Additional Contact */}
          {(cv.personal.linkedin || cv.personal.website) && (
            <div className="flex justify-center items-center space-x-4 text-gray-600 text-sm flex-wrap">
              {cv.personal.linkedin && (
                <>
                  <span>{cv.personal.linkedin}</span>
                  {cv.personal.website && <span>•</span>}
                </>
              )}
              {cv.personal.website && <span>{cv.personal.website}</span>}
            </div>
          )}
          
          {/* Professional Summary */}
          {cv.personal.summary && (
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Professional Summary
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {cv.personal.summary}
              </p>
            </div>
          )}
        </header>

        {/* Professional Experience */}
        {cv.experience.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {cv.experience.map((exp) => (
                <div key={exp.id} className="no-break">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p className="font-medium">
                        {cvHelpers.formatDate(exp.startDate)} - {exp.current ? 'Present' : cvHelpers.formatDate(exp.endDate)}
                      </p>
                      {exp.location && <p className="text-sm">{exp.location}</p>}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc ml-6 text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="leading-relaxed">{achievement}</li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Technologies: </span>
                        {exp.technologies.join(', ')}
                      </p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {cv.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start no-break">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{edu.description}</p>
                    )}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc ml-6 text-gray-600 text-sm mt-2 space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="text-right text-gray-600 ml-4">
                    <p className="font-medium">
                      {cvHelpers.formatDate(edu.startDate)} - {edu.current ? 'Present' : cvHelpers.formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                    {edu.location && <p className="text-sm">{edu.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies / Skills */}
        {cv.skills.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Core Competencies
            </h2>
            
            {/* Group skills by category */}
            {(() => {
              const skillsByCategory = cv.skills.reduce((acc, skill) => {
                const category = skill.category || 'General'
                if (!acc[category]) acc[category] = []
                acc[category].push(skill)
                return acc
              }, {} as Record<string, typeof cv.skills>)

              return Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500 capitalize">({skill.level})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </section>
        )}

        {/* Projects */}
        {cv.projects && cv.projects.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Notable Projects
            </h2>
            <div className="space-y-6">
              {cv.projects.map((project) => (
                <div key={project.id} className="no-break">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                      {project.url && (
                        <p className="text-blue-600 text-sm font-medium">{project.url}</p>
                      )}
                    </div>
                    <div className="text-right text-gray-600">
                      <p className="font-medium">
                        {cvHelpers.formatDate(project.startDate)} - {project.current ? 'Present' : cvHelpers.formatDate(project.endDate || '')}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Technologies: </span>
                      {project.technologies.join(', ')}
                    </p>
                  )}
                  
                  {project.achievements && project.achievements.length > 0 && (
                    <ul className="list-disc ml-6 text-gray-700 space-y-1">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="leading-relaxed">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Sections Row */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Languages */}
          {cv.languages && cv.languages.length > 0 && (
            <section className="no-break">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
                Languages
              </h2>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {cv.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-medium text-gray-800">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">
                      {cvHelpers.formatDate(cert.date)}
                      {cert.expiryDate && ` - Expires: ${cvHelpers.formatDate(cert.expiryDate)}`}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* References */}
        {cv.references && cv.references.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional References
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cv.references.map((ref) => (
                <div key={ref.id} className="no-break">
                  <h3 className="font-bold text-gray-900">{ref.name}</h3>
                  <p className="text-gray-700 font-medium">{ref.position}</p>
                  <p className="text-gray-600">{ref.company}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{ref.email}</p>
                    {ref.phone && <p>{ref.phone}</p>}
                    <p className="text-xs text-gray-500 mt-1">Relationship: {ref.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer note */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4 mt-8">
          <p>References available upon request</p>
        </div>
      </div>
    </div>
  )
}

export default ClassicTemplate
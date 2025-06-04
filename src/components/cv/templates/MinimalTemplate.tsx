// src/components/cv/templates/MinimalTemplate.tsx - Minimal Clean Template
import React from 'react'
import { CVData } from '@/types/cv'
import { cvHelpers } from '@/utils/cvHelpers'

interface MinimalTemplateProps {
  cv: CVData
  className?: string
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ cv, className = '' }) => {
  return (
    <div className={`bg-white max-w-4xl mx-auto ${className}`} style={{ minHeight: '297mm' }}>
      <div className="p-12 space-y-12">
        {/* Header */}
        <header className="text-center no-break">
          <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
            {cv.personal.firstName} {cv.personal.lastName}
          </h1>
          
          {/* Contact Information */}
          <div className="flex justify-center items-center space-x-6 text-gray-600 mb-6 flex-wrap">
            <span className="font-light">{cv.personal.email}</span>
            <span className="text-gray-300">|</span>
            <span className="font-light">{cv.personal.phone}</span>
            <span className="text-gray-300">|</span>
            <span className="font-light">{cv.personal.location}</span>
          </div>
          
          {/* Additional Contact */}
          {(cv.personal.linkedin || cv.personal.website) && (
            <div className="flex justify-center items-center space-x-6 text-gray-500 text-sm mb-8 flex-wrap">
              {cv.personal.linkedin && (
                <span className="font-light">{cv.personal.linkedin}</span>
              )}
              {cv.personal.linkedin && cv.personal.website && (
                <span className="text-gray-300">|</span>
              )}
              {cv.personal.website && (
                <span className="font-light">{cv.personal.website}</span>
              )}
            </div>
          )}
          
          {/* Professional Summary */}
          {cv.personal.summary && (
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-lg font-light">
              {cv.personal.summary}
            </p>
          )}
        </header>

        {/* Experience */}
        {cv.experience.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
              Experience
            </h2>
            <div className="space-y-8">
              {cv.experience.map((exp) => (
                <div key={exp.id} className="text-center no-break">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.position}</h3>
                  <p className="text-gray-600 mb-2 font-light">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-4 font-light">
                    {cvHelpers.formatDate(exp.startDate)} - {exp.current ? 'Present' : cvHelpers.formatDate(exp.endDate)}
                  </p>
                  
                  {exp.description && (
                    <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4 font-light">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="max-w-3xl mx-auto space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <p key={idx} className="text-gray-700 font-light">
                          • {achievement}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 font-light">
                        {exp.technologies.join(' • ')}
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
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
              Education
            </h2>
            <div className="space-y-6">
              {cv.education.map((edu) => (
                <div key={edu.id} className="text-center no-break">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{edu.degree}</h3>
                  <p className="text-gray-600 mb-2 font-light">{edu.institution}</p>
                  {edu.field && (
                    <p className="text-gray-600 mb-2 font-light">{edu.field}</p>
                  )}
                  <p className="text-sm text-gray-500 font-light">
                    {cvHelpers.formatDate(edu.startDate)} - {edu.current ? 'Present' : cvHelpers.formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500 mt-1 font-light">GPA: {edu.gpa}</p>
                  )}
                  
                  {edu.description && (
                    <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed mt-3 font-light">
                      {edu.description}
                    </p>
                  )}
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="max-w-2xl mx-auto mt-3 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <p key={idx} className="text-sm text-gray-600 font-light">
                          • {achievement}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {cv.projects && cv.projects.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
              Notable Projects
            </h2>
            <div className="space-y-8">
              {cv.projects.map((project) => (
                <div key={project.id} className="text-center no-break">
                  <h3 className="text-xl font-medium text-gray-900 mb-1">{project.name}</h3>
                  {project.url && (
                    <p className="text-gray-600 text-sm mb-2 font-light">{project.url}</p>
                  )}
                  <p className="text-sm text-gray-500 mb-4 font-light">
                    {cvHelpers.formatDate(project.startDate)} - {project.current ? 'Present' : cvHelpers.formatDate(project.endDate || '')}
                  </p>
                  
                  <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4 font-light">
                    {project.description}
                  </p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-sm text-gray-500 mb-4 font-light">
                      {project.technologies.join(' • ')}
                    </p>
                  )}
                  
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="max-w-3xl mx-auto space-y-2">
                      {project.achievements.map((achievement, idx) => (
                        <p key={idx} className="text-gray-700 font-light">
                          • {achievement}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {cv.skills.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
              Skills
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
                <div key={category} className="mb-8 text-center">
                  <h3 className="text-lg font-light text-gray-800 mb-4 tracking-wide">{category}</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.map((skill) => (
                      <span 
                        key={skill.id} 
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none text-sm font-light hover:bg-gray-50 transition-colors duration-200"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </section>
        )}

        {/* Languages & Certifications Row */}
        {((cv.languages && cv.languages.length > 0) || (cv.certifications && cv.certifications.length > 0)) && (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Languages */}
            {cv.languages && cv.languages.length > 0 && (
              <section className="text-center no-break">
                <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                  Languages
                </h2>
                <div className="space-y-3">
                  {cv.languages.map((lang) => (
                    <div key={lang.id} className="flex justify-center items-center space-x-4">
                      <span className="font-light text-gray-800">{lang.name}</span>
                      <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                      <span className="text-sm text-gray-600 font-light capitalize">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {cv.certifications && cv.certifications.length > 0 && (
              <section className="text-center no-break">
                <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {cv.certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 className="font-light text-gray-800">{cert.name}</h3>
                      <p className="text-sm text-gray-600 font-light">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 font-light">{cvHelpers.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* References */}
        {cv.references && cv.references.length > 0 && (
          <section className="text-center no-break">
            <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
              References
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {cv.references.map((ref) => (
                <div key={ref.id} className="no-break">
                  <h3 className="font-light text-gray-900">{ref.name}</h3>
                  <p className="text-gray-700 font-light">{ref.position}</p>
                  <p className="text-gray-600 font-light">{ref.company}</p>
                  <div className="mt-2 text-sm text-gray-500 font-light">
                    <p>{ref.email}</p>
                    {ref.phone && <p>{ref.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Minimal Footer */}
        <div className="text-center pt-8">
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-xs text-gray-400 font-light tracking-wide">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MinimalTemplate
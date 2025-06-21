
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResumeData } from '@/pages/Index';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ResumePreviewProps {
  resumeData: ResumeData;
  fullWidth?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, fullWidth = false }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <Card className={`${fullWidth ? 'w-full' : 'sticky top-4'} shadow-lg print:shadow-none print:border-none`}>
      <CardContent className="p-8 print:p-6 bg-white">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span>{resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
            </section>
          </>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.graduationDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Skills
            </h2>
            {resumeData.skills.technical.length > 0 && (
              <div className="mb-3">
                <h3 className="font-semibold text-gray-700 mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {resumeData.skills.soft.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Empty State */}
        {!resumeData.personalInfo.fullName && 
         resumeData.experience.length === 0 && 
         resumeData.education.length === 0 && 
         resumeData.skills.technical.length === 0 && 
         resumeData.skills.soft.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Your resume preview will appear here</p>
            <p className="text-sm">Start filling out your information to see a live preview</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

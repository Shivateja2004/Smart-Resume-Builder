
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ResumeData } from '@/pages/Index';
import { Plus, X } from 'lucide-react';

interface ExperienceProps {
  data: ResumeData;
  onUpdate: (section: keyof ResumeData, data: any) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ data, onUpdate }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdate('experience', [...data.experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    onUpdate('experience', data.experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    onUpdate('experience', data.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {data.experience.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        data.experience.map((exp, index) => (
          <Card key={exp.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                />
                <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="• Developed web applications using React and TypeScript&#10;• Collaborated with cross-functional teams to deliver features&#10;• Improved application performance by 40%"
                  rows={4}
                />
                <p className="text-sm text-gray-500">
                  Use bullet points to highlight your achievements and responsibilities.
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

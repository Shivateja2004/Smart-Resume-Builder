
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResumeData } from '@/pages/Index';
import { Plus, X } from 'lucide-react';

interface EducationProps {
  data: ResumeData;
  onUpdate: (section: keyof ResumeData, data: any) => void;
}

export const Education: React.FC<EducationProps> = ({ data, onUpdate }) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    };
    onUpdate('education', [...data.education, newEducation]);
  };

  const removeEducation = (id: string) => {
    onUpdate('education', data.education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onUpdate('education', data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.education.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">No education added yet</p>
            <Button onClick={addEducation} variant="outline">
              Add Your Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        data.education.map((edu, index) => (
          <Card key={edu.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
                <Button
                  onClick={() => removeEducation(edu.id)}
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
                  <Label>Institution Name *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University of Example"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Date</Label>
                  <Input
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="max-w-32"
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

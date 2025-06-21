
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResumeData } from '@/pages/Index';
import { Plus, X } from 'lucide-react';

interface SkillsProps {
  data: ResumeData;
  onUpdate: (section: keyof ResumeData, data: any) => void;
}

export const Skills: React.FC<SkillsProps> = ({ data, onUpdate }) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onUpdate('skills', {
        ...data.skills,
        technical: [...data.skills.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onUpdate('skills', {
        ...data.skills,
        soft: [...data.skills.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onUpdate('skills', {
      ...data.skills,
      technical: data.skills.technical.filter((_, i) => i !== index)
    });
  };

  const removeSoftSkill = (index: number) => {
    onUpdate('skills', {
      ...data.skills,
      soft: data.skills.soft.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'technical' | 'soft') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'technical') {
        addTechnicalSkill();
      } else {
        addSoftSkill();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Skills</CardTitle>
          <p className="text-sm text-gray-600">
            Add programming languages, frameworks, tools, and technologies you know
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'technical')}
              placeholder="e.g., React, Python, AWS"
              className="flex-1"
            />
            <Button onClick={addTechnicalSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <Button
                  onClick={() => removeTechnicalSkill(index)}
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          {data.skills.technical.length === 0 && (
            <p className="text-gray-500 text-sm italic">No technical skills added yet</p>
          )}
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Soft Skills</CardTitle>
          <p className="text-sm text-gray-600">
            Add interpersonal skills, personality traits, and professional abilities
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'soft')}
              placeholder="e.g., Leadership, Communication, Problem Solving"
              className="flex-1"
            />
            <Button onClick={addSoftSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.skills.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {skill}
                <Button
                  onClick={() => removeSoftSkill(index)}
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          {data.skills.soft.length === 0 && (
            <p className="text-gray-500 text-sm italic">No soft skills added yet</p>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include 6-12 relevant technical skills for your target role</li>
          <li>• Balance hard skills with soft skills employers value</li>
          <li>• Use specific technology names rather than general terms</li>
          <li>• Consider the job description when selecting skills to highlight</li>
        </ul>
      </div>
    </div>
  );
};

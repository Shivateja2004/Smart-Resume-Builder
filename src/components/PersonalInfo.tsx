
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData } from '@/pages/Index';

interface PersonalInfoProps {
  data: ResumeData;
  onUpdate: (section: keyof ResumeData, data: any) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate('personalInfo', {
      ...data.personalInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@email.com"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State, Country"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
          rows={4}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500">
          Tip: Keep it concise (2-3 sentences) and highlight your most relevant achievements.
        </p>
      </div>
    </div>
  );
};

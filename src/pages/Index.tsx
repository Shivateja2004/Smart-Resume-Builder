
import React, { useState } from 'react';
import { PersonalInfo } from '@/components/PersonalInfo';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Skills } from '@/components/Skills';
import { ResumePreview } from '@/components/ResumePreview';
import { AISuggestions } from '@/components/AISuggestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, Sparkles } from 'lucide-react';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: []
  }
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [showPreview, setShowPreview] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const steps = [
    { title: 'Personal Info', component: PersonalInfo },
    { title: 'Experience', component: Experience },
    { title: 'Education', component: Education },
    { title: 'Skills', component: Skills }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  const handleExportPDF = () => {
    // PDF export functionality
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Smart Resume Builder</h1>
          </div>
          <p className="text-xl text-gray-600">Create a professional resume with AI-powered suggestions</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant={showPreview ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            {showPreview ? 'Edit Resume' : 'Preview Resume'}
          </Button>
          <Button
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            variant={showAISuggestions ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Suggestions
          </Button>
          <Button
            onClick={handleExportPDF}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          {!showPreview && (
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                    <span className="text-sm text-gray-500">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                  <Progress value={progress} className="mt-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <CurrentStepComponent
                    data={resumeData}
                    onUpdate={handleDataUpdate}
                  />
                  
                  <div className="flex justify-between pt-6">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentStep === steps.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preview Panel */}
          <div className={showPreview ? 'lg:col-span-3' : 'lg:col-span-1'}>
            {showAISuggestions ? (
              <AISuggestions
                resumeData={resumeData}
                onApplySuggestion={(section, suggestion) => {
                  // Handle AI suggestion application
                  console.log('Applying suggestion:', section, suggestion);
                }}
              />
            ) : (
              <ResumePreview resumeData={resumeData} fullWidth={showPreview} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

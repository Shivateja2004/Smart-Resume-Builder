
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ResumeData } from '@/pages/Index';
import { Sparkles, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AISuggestionsProps {
  resumeData: ResumeData;
  onApplySuggestion: (section: string, suggestion: string) => void;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ resumeData, onApplySuggestion }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { toast } = useToast();

  const generateSuggestions = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to get AI suggestions.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate AI suggestions for now (replace with actual OpenAI API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSuggestions = [
        {
          section: 'Professional Summary',
          type: 'improvement',
          title: 'Quantify Your Impact',
          suggestion: 'Add specific metrics and numbers to demonstrate your achievements. For example: "Improved team efficiency by 30%" instead of "Improved team efficiency".',
          priority: 'high'
        },
        {
          section: 'Experience',
          type: 'enhancement',
          title: 'Use Action Verbs',
          suggestion: 'Start each bullet point with strong action verbs like "Led", "Developed", "Implemented", "Optimized" to make your accomplishments more impactful.',
          priority: 'medium'
        },
        {
          section: 'Skills',
          type: 'addition',
          title: 'Industry-Relevant Skills',
          suggestion: 'Consider adding trending skills in your field such as "Machine Learning", "Cloud Computing", or "Agile Methodology" if applicable to your experience.',
          priority: 'medium'
        },
        {
          section: 'Overall',
          type: 'formatting',
          title: 'Resume Length',
          suggestion: 'Your resume looks well-structured! Consider keeping it to 1-2 pages for optimal readability by hiring managers.',
          priority: 'low'
        }
      ];

      setSuggestions(mockSuggestions);
      toast({
        title: "AI Suggestions Generated!",
        description: "Review the suggestions below to improve your resume.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <TrendingUp className="h-4 w-4" />;
      case 'enhancement': return <Sparkles className="h-4 w-4" />;
      case 'addition': return <Lightbulb className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          AI Resume Suggestions
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get personalized suggestions to improve your resume using AI
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length === 0 ? (
          <>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">🔑 API Key Required</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Enter your OpenAI API key to get personalized suggestions for your resume.
                </p>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mb-3"
                />
                <p className="text-xs text-blue-700">
                  Your API key is only used for this session and is not stored.
                </p>
              </div>
              
              <Button 
                onClick={generateSuggestions}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Suggestions
                  </>
                )}
              </Button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">What You'll Get:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Content improvement suggestions</li>
                <li>• Keyword optimization tips</li>
                <li>• Formatting recommendations</li>
                <li>• Industry-specific advice</li>
                <li>• ATS optimization tips</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Suggestions for Your Resume</h3>
              <Button 
                onClick={generateSuggestions}
                size="sm"
                variant="outline"
                disabled={isLoading}
              >
                Refresh
              </Button>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(suggestion.type)}
                        <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                        <Badge variant="outline">
                          {suggestion.section}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {suggestion.suggestion}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onApplySuggestion(suggestion.section, suggestion.suggestion)}
                    >
                      Apply Suggestion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-green-800">
                Review each suggestion carefully and apply the ones that best fit your experience and target role.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

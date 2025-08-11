/**
 * @fileoverview Individual Lesson Preview - Direct file reading for preview
 * TODO: Remove this after Contentlayer lesson processing is fixed
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, BookOpen, Target, AlertTriangle } from 'lucide-react';

const lessons = [
  {
    slug: '01-visual-inspection-mastery',
    title: 'Visual Inspection Mastery',
    description: 'Learn to spot mold like a professional - identify color, texture, and warning signs',
    duration: '10 minutes',
    type: 'reading',
    file: '01-visual-inspection-mastery.mdx'
  },
  {
    slug: '02-room-by-room-audit',
    title: 'Room-by-Room Home Audit',
    description: 'Systematic approach to checking every space in your home for mold exposure',
    duration: '15 minutes',
    type: 'exercise',
    file: '02-room-by-room-audit.mdx'
  },
  {
    slug: '03-hidden-mold-detection',
    title: 'Hidden Mold Detection',
    description: 'Finding mold without destructive testing - advanced techniques for detection',
    duration: '12 minutes',
    type: 'reading',
    file: '03-hidden-mold-detection.mdx'
  },
  {
    slug: '04-vehicle-contamination',
    title: 'Vehicle Contamination Assessment',
    description: 'Cars are often overlooked mold sources that travel with you everywhere',
    duration: '10 minutes',
    type: 'exercise',
    file: '04-vehicle-contamination.mdx'
  },
  {
    slug: '05-workplace-other-spaces',
    title: 'Workplace & Other Spaces',
    description: 'Evaluate all environments you frequent - office buildings, gyms, hotels, and social spaces',
    duration: '10 minutes',
    type: 'reading',
    file: '05-workplace-other-spaces.mdx'
  },
  {
    slug: '06-mold-food-supply',
    title: 'Mold in Food Supply',
    description: 'Dietary sources of mycotoxins - the hidden exposure source affecting your recovery',
    duration: '5 minutes',
    type: 'reading',
    file: '06-mold-food-supply.mdx'
  }
];

interface LessonPreviewPageProps {
  params: {
    slug: string;
  };
}

function stripMDXImports(content: string): string {
  // Remove import statements and just show the content
  const lines = content.split('\n');
  const contentStart = lines.findIndex(line => line.includes('# '));
  if (contentStart === -1) return content;
  
  return lines.slice(contentStart).join('\n');
}

function formatMDXForDisplay(content: string): string {
  // Basic formatting for display (not full MDX parsing)
  return content
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^([^<\n].*$)/gm, '<p class="mb-4">$1</p>');
}

export default function LessonPreviewPage({ params }: LessonPreviewPageProps) {
  const lesson = lessons.find(l => l.slug === params.slug);
  
  if (!lesson) {
    notFound();
  }

  let content = '';
  let error = false;
  
  try {
    const filePath = join(process.cwd(), 'content', 'lessons', '01-identify-exposure', lesson.file);
    const rawContent = readFileSync(filePath, 'utf8');
    
    // Extract content after frontmatter
    const parts = rawContent.split('---');
    const mdxContent = parts.length >= 3 ? parts.slice(2).join('---') : rawContent;
    
    content = stripMDXImports(mdxContent);
  } catch (err) {
    error = true;
    console.error('Error reading lesson file:', err);
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link href="/lessons-preview" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Lessons Overview
        </Link>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Preview Mode</h3>
          </div>
          <p className="text-yellow-800 text-sm">
            This is a raw preview of the lesson content. Interactive components and proper formatting 
            will be available once the lesson processing is complete.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
            {getTypeIcon(lesson.type)}
            <span className="capitalize">{lesson.type}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {lesson.title}
        </h1>
        <p className="text-xl text-gray-600">
          {lesson.description}
        </p>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Not Available</h3>
              <p className="text-gray-600">Unable to load lesson content. Please check the file path.</p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-6 rounded-lg overflow-auto max-h-96">
                {content}
              </pre>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Full Implementation Features</h4>
                <p className="text-blue-800 text-sm mb-3">
                  When fully implemented, this lesson will include:
                </p>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Interactive components and visual elements</li>
                  <li>• Progress tracking and completion marking</li>
                  <li>• Navigation between lessons</li>
                  <li>• Downloadable resources and checklists</li>
                  <li>• Proper MDX rendering with custom components</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Link href="/lessons-preview">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
        </Link>
        
        <div className="text-sm text-gray-500">
          Lesson preview • Full version coming soon
        </div>
      </div>
    </div>
  );
}

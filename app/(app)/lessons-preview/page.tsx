/**
 * @fileoverview Temporary Lessons Preview - Direct access to lesson files
 * TODO: Remove this after Contentlayer lesson processing is fixed
 */

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Eye, Target, Clock } from 'lucide-react';

const lessons = [
  {
    slug: '01-visual-inspection-mastery',
    title: 'Visual Inspection Mastery',
    description: 'Learn to spot mold like a professional - identify color, texture, and warning signs',
    duration: '10 minutes',
    type: 'reading',
    moduleSlug: '01-identify-exposure'
  },
  {
    slug: '02-room-by-room-audit',
    title: 'Room-by-Room Home Audit',
    description: 'Systematic approach to checking every space in your home for mold exposure',
    duration: '15 minutes',
    type: 'exercise',
    moduleSlug: '01-identify-exposure'
  },
  {
    slug: '03-hidden-mold-detection',
    title: 'Hidden Mold Detection',
    description: 'Finding mold without destructive testing - advanced techniques for detection',
    duration: '12 minutes',
    type: 'reading',
    moduleSlug: '01-identify-exposure'
  },
  {
    slug: '04-vehicle-contamination',
    title: 'Vehicle Contamination Assessment',
    description: 'Cars are often overlooked mold sources that travel with you everywhere',
    duration: '10 minutes',
    type: 'exercise',
    moduleSlug: '01-identify-exposure'
  },
  {
    slug: '05-workplace-other-spaces',
    title: 'Workplace & Other Spaces',
    description: 'Evaluate all environments you frequent - office buildings, gyms, hotels, and social spaces',
    duration: '10 minutes',
    type: 'reading',
    moduleSlug: '01-identify-exposure'
  },
  {
    slug: '06-mold-food-supply',
    title: 'Mold in Food Supply',
    description: 'Dietary sources of mycotoxins - the hidden exposure source affecting your recovery',
    duration: '5 minutes',
    type: 'reading',
    moduleSlug: '01-identify-exposure'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'reading': return <BookOpen className="w-4 h-4" />;
    case 'exercise': return <Target className="w-4 h-4" />;
    case 'video': return <Eye className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'reading': return 'bg-green-100 text-green-800';
    case 'exercise': return 'bg-purple-100 text-purple-800';
    case 'video': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LessonsPreviewPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">
            🚧 Temporary Preview Mode
          </h2>
          <p className="text-yellow-800 text-sm">
            This is a temporary preview page for lesson content. The lessons are being processed by Contentlayer 
            and will be available at their proper URLs once the MDX processing is complete.
          </p>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Module 01: Identify Your Exposure
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Preview of all lesson content created for the structured learning experience.
        </p>
      </div>

      <div className="grid gap-6">
        {lessons.map((lesson, index) => (
          <Card key={lesson.slug} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    <CardDescription className="mt-1">{lesson.description}</CardDescription>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(lesson.type)}`}>
                  {getTypeIcon(lesson.type)}
                  <span className="ml-1">{lesson.type}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </div>
                  <span>Lesson {index + 1} of {lessons.length}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/lessons-preview/${lesson.slug}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview Content
                    </Button>
                  </Link>
                  <Link href={`/modules/${lesson.moduleSlug}/lessons/${lesson.slug}`}>
                    <Button size="sm" disabled>
                      Full Version (Soon)
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation Status</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-700 mb-2">✅ Completed</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 6 comprehensive lesson files created</li>
              <li>• Lesson navigation component built</li>
              <li>• Interactive visual components ready</li>
              <li>• Page infrastructure in place</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">🚧 In Progress</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• MDX component imports (fixing)</li>
              <li>• Contentlayer lesson processing</li>
              <li>• Lesson gating system</li>
              <li>• Progress tracking integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

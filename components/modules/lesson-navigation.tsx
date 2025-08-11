/**
 * @fileoverview Lesson Navigation Component - Sequential learning progression
 * Provides navigation between lessons within a module with progress tracking
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Clock,
  BookOpen,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  slug: string;
  title: string;
  duration: string;
  type: 'reading' | 'exercise' | 'video' | 'quiz' | 'resource';
  completed?: boolean;
  current?: boolean;
}

interface LessonNavigationProps {
  moduleSlug: string;
  currentLessonSlug: string;
  lessons: Lesson[];
  moduleName: string;
  onLessonComplete?: (lessonSlug: string) => void;
}

export function LessonNavigation({ 
  moduleSlug, 
  currentLessonSlug, 
  lessons, 
  moduleName,
  onLessonComplete 
}: LessonNavigationProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    // Load completed lessons from localStorage
    const completed = localStorage.getItem(`lessons-completed-${moduleSlug}`);
    if (completed) {
      setCompletedLessons(new Set(JSON.parse(completed)));
    }

    // Find current lesson index
    const index = lessons.findIndex(lesson => lesson.slug === currentLessonSlug);
    setCurrentLessonIndex(index >= 0 ? index : 0);
  }, [moduleSlug, currentLessonSlug, lessons]);

  const markLessonComplete = (lessonSlug: string) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonSlug);
    setCompletedLessons(newCompleted);
    
    // Save to localStorage
    localStorage.setItem(`lessons-completed-${moduleSlug}`, JSON.stringify([...newCompleted]));
    
    // Call callback if provided
    onLessonComplete?.(lessonSlug);
  };

  const previousLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;
  const currentLesson = lessons[currentLessonIndex];

  const completedCount = Array.from(completedLessons).filter(slug => 
    lessons.some(lesson => lesson.slug === slug)
  ).length;

  const progressPercentage = (completedCount / lessons.length) * 100;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      case 'video': return <Circle className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
      {/* Module Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{moduleName}</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Lesson {currentLessonIndex + 1} of {lessons.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <motion.div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Current Lesson Info */}
      {currentLesson && (
        <motion.div 
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getTypeIcon(currentLesson.type)}
              <span className="font-semibold text-blue-900">
                Current: {currentLesson.title}
              </span>
            </div>
            <div className="flex items-center gap-1 text-blue-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{currentLesson.duration}</span>
            </div>
          </div>
          
          {!completedLessons.has(currentLesson.slug) && (
            <button
              onClick={() => markLessonComplete(currentLesson.slug)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Mark as Complete
            </button>
          )}
          
          {completedLessons.has(currentLesson.slug) && (
            <div className="mt-2 flex items-center gap-2 text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Lesson List */}
      <div className="space-y-2 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">All Lessons</h3>
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.slug);
          const isCurrent = lesson.slug === currentLessonSlug;
          const isAccessible = index === 0 || completedLessons.has(lessons[index - 1].slug);
          
          return (
            <motion.div
              key={lesson.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isAccessible ? (
                <Link
                  href={`/modules/${moduleSlug}/lessons/${lesson.slug}`}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border transition-all duration-200',
                    isCurrent 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      isCompleted 
                        ? 'bg-green-100 text-green-600' 
                        : isCurrent 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    
                    <div>
                      <div className={cn(
                        'font-medium',
                        isCurrent ? 'text-blue-900' : 'text-gray-900'
                      )}>
                        {lesson.title}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getTypeIcon(lesson.type)}
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isCurrent && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </Link>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-500">
                        {lesson.title}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {getTypeIcon(lesson.type)}
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    Locked
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          {previousLesson ? (
            <Link
              href={`/modules/${moduleSlug}/lessons/${previousLesson.slug}`}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous: {previousLesson.title}
            </Link>
          ) : (
            <Link
              href={`/modules/${moduleSlug}`}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Module
            </Link>
          )}
        </div>

        <div>
          {nextLesson ? (
            <Link
              href={`/modules/${moduleSlug}/lessons/${nextLesson.slug}`}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium"
            >
              Next: {nextLesson.title}
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/modules`}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors font-medium"
            >
              Complete Module
              <CheckCircle className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

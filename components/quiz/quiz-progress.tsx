/**
 * @fileoverview Quiz Progress Bar - Visual progress indicator
 */

'use client';

import { cn } from '@/lib/utils';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function QuizProgress({ currentStep, totalSteps, className }: QuizProgressProps) {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {currentStep} of {totalSteps - 1}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps - 1 }, (_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-200',
              i < currentStep 
                ? 'bg-blue-600' 
                : i === currentStep 
                ? 'bg-blue-400 ring-2 ring-blue-200' 
                : 'bg-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  );
}

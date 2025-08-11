/**
 * @fileoverview Quiz Question Component - Handles different question types and validation
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuiz } from './quiz-provider';
import { QUIZ_QUESTIONS } from './types';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  questionNumber: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

export function QuizQuestion({ 
  questionNumber, 
  onNext, 
  onPrevious, 
  canGoBack 
}: QuizQuestionProps) {
  const { quizData, handleAnswerUpdate } = useQuiz();
  const question = QUIZ_QUESTIONS[questionNumber - 1];
  
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(() => {
    const existing = quizData.answers[question.id];
    if (Array.isArray(existing)) return existing;
    if (typeof existing === 'string') return [existing];
    return [];
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(selectedAnswers.length > 0);
  }, [selectedAnswers]);

  const handleOptionSelect = (optionValue: string) => {
    if (question.type === 'multi-select') {
      const newAnswers = selectedAnswers.includes(optionValue)
        ? selectedAnswers.filter(a => a !== optionValue)
        : [...selectedAnswers, optionValue];
      
      setSelectedAnswers(newAnswers);
      handleAnswerUpdate(question.id, newAnswers);
    } else {
      const newAnswers = [optionValue];
      setSelectedAnswers(newAnswers);
      handleAnswerUpdate(question.id, optionValue);
    }
  };

  const handleNext = () => {
    if (isValid) {
      onNext();
    }
  };

  if (!question) return null;

  return (
    <div className="px-8 py-12 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Question Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {question.title}
          </h2>
          {question.description && (
            <p className="text-lg text-gray-600">
              {question.description}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-4 mb-12">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers.includes(option.value);
            
            return (
              <motion.button
                key={option.id}
                onClick={() => handleOptionSelect(option.value)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full p-6 text-left border-2 rounded-xl transition-all duration-200 hover:shadow-lg relative overflow-hidden',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300'
                )}
              >
                {/* Selection background animation */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <div className="flex items-center relative z-10">
                  <motion.div 
                    className={cn(
                      'w-6 h-6 border-2 mr-4 flex-shrink-0 transition-all duration-200',
                      question.type === 'multi-select' ? 'rounded-md' : 'rounded-full',
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    )}
                    animate={{
                      scale: isSelected ? [1, 1.2, 1] : 1,
                      backgroundColor: isSelected ? '#3B82F6' : 'transparent'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSelected && (
                      <motion.div 
                        className="w-full h-full flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {question.type === 'multi-select' ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                  <span className={cn(
                    'text-lg transition-colors duration-200',
                    isSelected ? 'text-blue-900 font-medium' : 'text-gray-700'
                  )}>
                    {option.label}
                  </span>
                </div>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-50 opacity-0"
                  whileHover={{ opacity: isSelected ? 0 : 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.button
            onClick={onPrevious}
            disabled={!canGoBack}
            whileHover={canGoBack ? { scale: 1.05 } : {}}
            whileTap={canGoBack ? { scale: 0.95 } : {}}
            className={cn(
              'flex items-center px-6 py-3 rounded-lg transition-all duration-200',
              canGoBack
                ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:shadow-md'
                : 'text-gray-400 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-2">
              {question.type === 'multi-select' 
                ? 'Select all that apply' 
                : 'Choose one option'
              }
            </p>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: !isValid ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {!isValid && (
                <motion.p 
                  className="text-sm text-red-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Please select at least one option to continue
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          <motion.button
            onClick={handleNext}
            disabled={!isValid}
            whileHover={isValid ? { scale: 1.05 } : {}}
            whileTap={isValid ? { scale: 0.95 } : {}}
            className={cn(
              'flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 relative overflow-hidden',
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            {isValid && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="relative flex items-center">
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

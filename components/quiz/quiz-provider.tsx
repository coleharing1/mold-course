/**
 * @fileoverview Quiz Context Provider - Manages quiz state across components
 */

'use client';

import { createContext, useContext } from 'react';
import { type QuizContextType } from './types';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ 
  children, 
  value 
}: { 
  children: React.ReactNode;
  value: QuizContextType;
}) {
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

/**
 * @fileoverview Main Mold Quiz Component - Orchestrates the entire quiz experience
 * Manages state, progress, and navigation between quiz screens
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizProvider } from './quiz-provider';
import { QuizIntro } from './quiz-intro';
import { QuizQuestion } from './quiz-question';
import { QuizResults } from './quiz-results';
import { QuizProgress } from './quiz-progress';
import { type QuizState } from './types';

const TOTAL_STEPS = 7; // 1 intro + 5 questions + 1 email capture

export function MoldQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizState>({
    answers: {},
    email: '',
    name: '',
    score: 0,
    profile: '',
    completed: false,
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerUpdate = (questionId: string, answer: string | string[]) => {
    setQuizData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const handleEmailCapture = (email: string, name: string) => {
    setQuizData(prev => ({
      ...prev,
      email,
      name,
    }));
    // Calculate final score and profile
    calculateResults();
    handleNext();
  };

  const calculateResults = () => {
    // TODO: Implement scoring logic
    const score = calculateScore(quizData.answers);
    const profile = getProfile(score);
    
    setQuizData(prev => ({
      ...prev,
      score,
      profile,
      completed: true,
    }));
  };

  const calculateScore = (answers: Record<string, any>): number => {
    // Scoring logic - will implement detailed algorithm
    let score = 0;
    
    // Question 1: Neurological symptoms (each symptom = 1 point, max 6)
    const q1 = answers['symptoms-neuro'] || [];
    score += Array.isArray(q1) ? Math.min(q1.length, 6) : 0;
    
    // Question 2: Physical symptoms (each symptom = 1 point, max 5)
    const q2 = answers['symptoms-physical'] || [];
    score += Array.isArray(q2) ? Math.min(q2.length, 5) : 0;
    
    // Question 3: Environmental factors (each factor = 2 points, max 8)
    const q3 = answers['environmental'] || [];
    score += Array.isArray(q3) ? Math.min(q3.length * 2, 8) : 0;
    
    // Question 4: Timeline triggers (specific events = higher points)
    const q4 = answers['timeline'] || '';
    if (q4 === 'after-move' || q4 === 'after-water') score += 3;
    else if (q4 === 'gradual-decline') score += 2;
    else if (q4 === 'not-sure') score += 1;
    
    // Question 5: Doctor experience (normal tests but symptoms persist = higher points)
    const q5 = answers['doctor-experience'] || '';
    if (q5 === 'normal-labs') score += 4;
    else if (q5 === 'other-diagnosis') score += 3;
    else if (q5 === 'no-doctor') score += 1;
    
    return Math.min(score, 10); // Cap at 10
  };

  const getProfile = (score: number): string => {
    if (score >= 7) return 'investigator';
    if (score >= 4) return 'seeker';
    return 'learner';
  };

  return (
    <QuizProvider value={{ quizData, handleAnswerUpdate, handleEmailCapture }}>
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <QuizProgress
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            className="mb-8"
          />
        )}

        {/* Quiz Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuizIntro onStart={handleNext} />
              </motion.div>
            )}
            
            {currentStep >= 1 && currentStep <= 5 && (
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuizQuestion
                  questionNumber={currentStep}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  canGoBack={currentStep > 1}
                />
              </motion.div>
            )}
            
            {currentStep === 6 && !quizData.completed && (
              <motion.div
                key="email-capture"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="p-8"
              >
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Your results are being calculated!
                  </h2>
                  <p className="text-lg text-gray-600">
                    Enter your details below to see your personalized score and receive your free 'First Steps to Recovery' action plan.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <EmailCaptureForm 
                    onSubmit={handleEmailCapture}
                    onBack={handlePrevious}
                  />
                </motion.div>
              </motion.div>
            )}
            
            {quizData.completed && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <QuizResults quizData={quizData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </QuizProvider>
  );
}

// Email capture component
function EmailCaptureForm({ 
  onSubmit, 
  onBack 
}: { 
  onSubmit: (email: string, name: string) => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setIsSubmitting(true);
    // TODO: Add email to mailing list
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setShowSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Show success state
    onSubmit(email, name);
    setIsSubmitting(false);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600">Calculating your personalized results...</p>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
          placeholder="Enter your first name"
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
          placeholder="Enter your email address"
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div 
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
        >
          Back
        </button>
        <motion.button
          type="submit"
          disabled={!email || !name || isSubmitting}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg relative overflow-hidden"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting && (
            <motion.div
              className="absolute inset-0 bg-blue-700"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "linear" }}
            />
          )}
          <span className="relative flex items-center justify-center">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Processing...
              </>
            ) : (
              'See My Results'
            )}
          </span>
        </motion.button>
      </motion.div>
      
      <motion.p 
        className="text-xs text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        🔒 Your information is secure and will never be shared
      </motion.p>
    </motion.form>
  );
}

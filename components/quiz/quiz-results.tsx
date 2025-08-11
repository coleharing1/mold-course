/**
 * @fileoverview Quiz Results Component - Displays personalized score and recommendations
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  Play, 
  ArrowRight, 
  AlertTriangle,
  Target,
  TrendingUp,
  BookOpen 
} from 'lucide-react';
import { type QuizState, QUIZ_PROFILES } from './types';
import { cn } from '@/lib/utils';

interface QuizResultsProps {
  quizData: QuizState;
}

export function QuizResults({ quizData }: QuizResultsProps) {
  const [emailSent, setEmailSent] = useState(false);
  const profile = QUIZ_PROFILES[quizData.profile];
  
  if (!profile) return null;

  const handleDownloadGuide = async () => {
    // TODO: Trigger PDF download and email
    setEmailSent(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-red-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 7) return 'bg-red-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="px-8 py-12 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Results Are In, {quizData.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Based on your answers, here's your personalized assessment
          </p>
        </div>

        {/* Score Display */}
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Mold Symptom & Exposure Score
            </h2>
            <motion.div 
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <motion.span 
                className={cn('text-6xl font-bold', getScoreColor(quizData.score))}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
              >
                {quizData.score}
              </motion.span>
              <span className="text-3xl text-gray-400 ml-2">/10</span>
            </motion.div>
            
            {/* Score Bar */}
            <motion.div 
              className="w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    getScoreBarColor(quizData.score)
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${(quizData.score / 10) * 100}%` }}
                  transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Low Risk</span>
                <span>Moderate Risk</span>
                <span>High Risk</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
              <Target className="w-4 h-4 mr-2" />
              Your Profile: {profile.title}
            </div>
            <p className="text-lg text-gray-700">
              {profile.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
              <h3 className="font-semibold text-gray-900">Symptom Severity</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your symptoms strongly overlap with those commonly reported in cases of biotoxin illness.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-gray-900">Environmental Risk</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your environment shows several key risk factors for hidden mold exposure.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="font-semibold text-gray-900">Diagnostic Gap</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your experience with "normal" lab tests is common and suggests a root cause may have been missed.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Personalized Action Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your Next Steps
          </h2>
          
          <div className="space-y-6">
            {/* Step 1: Video */}
            <div className="flex items-center p-6 bg-blue-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                1
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {profile.nextSteps.primary}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Watch this free 7-minute masterclass that explains why "drainage first" is crucial for safe recovery.
                </p>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now (7 min)
                </button>
              </div>
            </div>

            {/* Step 2: Guide */}
            <div className="flex items-center p-6 bg-green-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                2
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {profile.nextSteps.secondary}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Get your free "First Steps to Recovery" PDF guide with immediate action steps you can take today.
                </p>
                <button 
                  onClick={handleDownloadGuide}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {emailSent ? 'Sent to Your Email!' : 'Download Free Guide'}
                </button>
              </div>
            </div>

            {/* Step 3: Program */}
            <div className="flex items-center p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                3
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {profile.nextSteps.cta}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Ready to take control of your recovery? Get the complete system that has helped thousands reclaim their health.
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  See the Full Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Confirmation */}
        {emailSent && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">
              Your Results Have Been Sent!
            </h3>
            <p className="text-green-700 text-sm">
              Check your email ({quizData.email}) for your complete results and free guide. 
              Don't forget to check your spam folder!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

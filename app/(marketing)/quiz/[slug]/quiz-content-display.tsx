/**
 * @fileoverview Client-side Quiz Content Display Component
 * Contains all the interactive elements and animations for quiz results
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  ArrowRight, 
  Target,
  Clock,
  BookOpen,
  Shield,
  AlertTriangle,
  Star
} from 'lucide-react';
import { MDXContent } from '@/components/mdx-content';

interface QuizContentDisplayProps {
  quiz: {
    title: string;
    description: string;
    category: string;
    body: {
      code: string;
    };
  };
}

export function QuizContentDisplay({ quiz }: QuizContentDisplayProps) {
  const [emailSent, setEmailSent] = useState(false);

  const handleDownloadGuide = async () => {
    // TODO: Trigger PDF download and email
    setEmailSent(true);
  };

  const getCategoryIcon = () => {
    switch (quiz.category) {
      case 'guide': return <Target className="w-6 h-6" />;
      case 'assessment': return <CheckCircle className="w-6 h-6" />;
      case 'email': return <BookOpen className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const getCategoryColors = () => {
    switch (quiz.category) {
      case 'guide': return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        accent: 'text-green-600'
      };
      case 'assessment': return {
        bg: 'bg-blue-50',
        border: 'border-blue-200', 
        text: 'text-blue-800',
        accent: 'text-blue-600'
      };
      case 'email': return {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800', 
        accent: 'text-purple-600'
      };
      default: return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-800',
        accent: 'text-gray-600'
      };
    }
  };

  const colors = getCategoryColors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {getCategoryIcon()}
              {quiz.category === 'guide' && 'Personalized Action Guide'}
              {quiz.category === 'assessment' && 'Health Assessment Results'}
              {quiz.category === 'email' && 'Follow-up Content'}
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {quiz.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {quiz.description}
          </p>
        </motion.div>

        {/* Success Banner for Guide Category */}
        {quiz.category === 'guide' && (
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  🎉 Congratulations on Taking the First Step!
                </h3>
                <p className="text-green-800">
                  You've completed the assessment and now have a personalized roadmap to guide your recovery journey. 
                  This action plan is based on your specific symptoms and situation.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div 
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Reading Time</div>
              <div className="text-sm text-gray-600">~8 minutes</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <Download className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Save for Later</div>
              <div className="text-sm text-gray-600">Download PDF</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <Shield className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">Safety First</div>
              <div className="text-sm text-gray-600">Evidence-based</div>
            </div>
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="prose prose-lg max-w-none">
            <MDXContent code={quiz.body.code} />
          </div>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
              This personalized action guide is just the beginning. Get the complete, step-by-step system 
              that has safely guided thousands through mold recovery.
            </p>
            
            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Complete Protocol</div>
                <div className="text-sm text-blue-200">11 comprehensive modules</div>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Interactive Tools</div>
                <div className="text-sm text-blue-200">11 assessment & planning tools</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Safety Gates</div>
                <div className="text-sm text-blue-200">Prevent dangerous reactions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/checkout"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Start Your Recovery Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More About the Course
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="/quiz"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Health Assessment
          </a>
          
          <button
            onClick={handleDownloadGuide}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            {emailSent ? 'Guide Sent to Email!' : 'Download PDF Guide'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

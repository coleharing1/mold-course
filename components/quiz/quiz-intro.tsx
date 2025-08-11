/**
 * @fileoverview Quiz Introduction Screen - The hook and value proposition
 */

'use client';

import { CheckCircle, Clock, Target } from 'lucide-react';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="px-8 py-12 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Is Hidden Mold Affecting Your Health?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take our <strong>2-minute Recovery Readiness Assessment</strong> to find out if your mysterious symptoms could be connected to environmental exposure.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Quick & Simple</h3>
            <p className="text-sm text-gray-600">Just 5 easy questions based on your symptoms and living environment</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl">
            <Target className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Score</h3>
            <p className="text-sm text-gray-600">Get your risk level and a customized profile based on your answers</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-purple-50 rounded-xl">
            <CheckCircle className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Free Action Plan</h3>
            <p className="text-sm text-gray-600">Receive immediate next steps and a detailed recovery guide</p>
          </div>
        </div>

        {/* What You'll Discover */}
        <div className="bg-gray-50 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Discover:</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">If your symptoms match common patterns of mold illness</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Your environmental risk factors and exposure level</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Why standard medical tests might miss this condition</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Specific next steps tailored to your situation</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-4">Trusted by thousands who've taken control of their health</p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="text-center">
              <div className="font-bold text-2xl text-blue-600">15,000+</div>
              <div>Assessments Completed</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-green-600">89%</div>
              <div>Found Helpful</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-purple-600">2 min</div>
              <div>Average Time</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start the Assessment
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          No spam, ever. Unsubscribe anytime. Your privacy is protected.
        </p>
      </div>
    </div>
  );
}

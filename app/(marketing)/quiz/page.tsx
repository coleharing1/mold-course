/**
 * @fileoverview Mold Symptom & Exposure Score Quiz - Main landing page for cold traffic
 * This quiz helps users assess their risk level and guides them toward personalized next steps
 */

import { Metadata } from 'next';
import { MoldQuiz } from '@/components/quiz/mold-quiz';

export const metadata: Metadata = {
  title: 'Mold Health Assessment Quiz | Find Out Your Risk Level',
  description: 'Take our 2-minute assessment to discover if hidden mold might be affecting your health. Get a personalized score and free action plan.',
  keywords: 'mold exposure, health assessment, mycotoxin symptoms, environmental illness',
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <MoldQuiz />
      </div>
    </div>
  );
}

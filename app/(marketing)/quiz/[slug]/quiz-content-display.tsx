/**
 * @fileoverview Client-side Quiz Content Display Component
 * Contains all the interactive elements and animations for quiz results
 */

'use client'

import { useState } from 'react'
import {
  CheckCircle,
  Download,
  ArrowRight,
  Target,
  Clock,
  BookOpen,
  Shield,
  Star,
} from 'lucide-react'
import { MDXContent } from '@/components/mdx-content'

interface QuizContentDisplayProps {
  quiz: {
    title: string
    description: string
    category: string
    body: {
      code: string
    }
  }
}

export function QuizContentDisplay({ quiz }: QuizContentDisplayProps) {
  const [emailSent, setEmailSent] = useState(false)

  const handleDownloadGuide = async () => {
    // TODO: Trigger PDF download and email
    setEmailSent(true)
  }

  const getCategoryIcon = () => {
    switch (quiz.category) {
      case 'guide':
        return <Target className="h-6 w-6" />
      case 'assessment':
        return <CheckCircle className="h-6 w-6" />
      case 'email':
        return <BookOpen className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const getCategoryColors = () => {
    switch (quiz.category) {
      case 'guide':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          accent: 'text-green-600',
        }
      case 'assessment':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          accent: 'text-blue-600',
        }
      case 'email':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          accent: 'text-purple-600',
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          accent: 'text-gray-600',
        }
    }
  }

  const colors = getCategoryColors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-8">
            <div
              className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold ${colors.bg} ${colors.text} ${colors.border} border shadow-sm`}
            >
              {getCategoryIcon()}
              {quiz.category === 'guide' && 'Personalized Action Guide'}
              {quiz.category === 'assessment' && 'Health Assessment Results'}
              {quiz.category === 'email' && 'Follow-up Content'}
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            {quiz.title}
          </h1>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
            {quiz.description}
          </p>
        </div>

        {/* Success Banner for Guide Category */}
        {quiz.category === 'guide' && (
          <div className="mb-12 rounded-3xl border-2 border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 p-8 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold text-green-900">
                  🎉 Congratulations on Taking the First Step!
                </h3>
                <p className="text-lg leading-relaxed text-green-800">
                  You&apos;ve completed the assessment and now have a personalized roadmap to guide
                  your recovery journey. This action plan is based on your specific symptoms and
                  situation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">Reading Time</div>
              <div className="text-gray-600">~8 minutes</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">Save for Later</div>
              <div className="text-gray-600">Download PDF</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">Safety First</div>
              <div className="text-gray-600">Evidence-based</div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="mb-12 rounded-3xl border border-gray-200 bg-white p-12 shadow-xl">
          <div className="prose prose-xl max-w-none prose-headings:text-gray-900 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700">
            <MDXContent code={quiz.body.code} />
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mx-auto mb-10 max-w-4xl text-xl leading-relaxed text-blue-100">
              This personalized action guide is just the beginning. Get the complete, step-by-step
              system that has safely guided thousands through mold recovery.
            </p>

            {/* Value Props */}
            <div className="mb-10 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="mb-2 text-xl font-bold">Complete Protocol</div>
                <div className="text-blue-200">11 comprehensive modules</div>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <div className="mb-2 text-xl font-bold">Interactive Tools</div>
                <div className="text-blue-200">11 assessment & planning tools</div>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="mb-2 text-xl font-bold">Safety Gates</div>
                <div className="text-blue-200">Prevent dangerous reactions</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <a
                href="/checkout"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-10 py-5 text-lg font-bold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-2xl"
              >
                Start Your Recovery Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-white px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                Learn More About the Course
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          <a
            href="/quiz"
            className="inline-flex items-center text-lg font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            <ArrowRight className="mr-3 h-5 w-5 rotate-180" />
            Back to Health Assessment
          </a>

          <button
            onClick={handleDownloadGuide}
            className="inline-flex items-center rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-200 hover:shadow-xl"
          >
            <Download className="mr-2 h-5 w-5" />
            {emailSent ? 'Guide Sent to Email!' : 'Download PDF Guide'}
          </button>
        </div>
      </div>
    </div>
  )
}

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
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
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              {quiz.title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              {quiz.description}
            </p>
          </div>
        </div>
      </section>

      {/* Success Banner Section */}
      {quiz.category === 'guide' && (
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="rounded-2xl border border-green-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-green-900 md:text-3xl">
                    🎉 Congratulations on Taking the First Step!
                  </h2>
                  <p className="text-lg leading-relaxed text-green-800">
                    You&apos;ve completed the assessment and now have a personalized roadmap to
                    guide your recovery journey. This action plan is based on your specific symptoms
                    and situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Overview Section */}
      <section className="border-b border-gray-200 bg-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Quick Overview</h2>
            <p className="text-gray-600">
              Everything you need to know about this personalized guide
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">Reading Time</div>
                  <div className="text-sm text-gray-600">Estimated duration</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">~8 minutes</div>
            </div>

            <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">Save for Later</div>
                  <div className="text-sm text-gray-600">Download option</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">PDF Available</div>
            </div>

            <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 transition-colors group-hover:bg-purple-200">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">Safety First</div>
                  <div className="text-sm text-gray-600">Evidence-based approach</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600">Physician Reviewed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg md:p-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:mb-6 prose-h1:text-3xl prose-h1:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-h2:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-xl prose-h3:font-semibold prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-700 prose-strong:text-gray-900 prose-ol:space-y-2 prose-ul:space-y-2 prose-li:text-gray-700">
              <MDXContent code={quiz.body.code} />
            </div>
          </div>
        </div>
      </section>

      {/* Course Benefits Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-blue-100 md:text-xl">
              This personalized action guide is just the beginning. Get the complete, step-by-step
              system that has safely guided thousands through mold recovery.
            </p>

            {/* Value Props Grid */}
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Complete Protocol</h3>
                <p className="text-blue-200">
                  11 comprehensive modules covering every aspect of mold recovery
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Interactive Tools</h3>
                <p className="text-blue-200">
                  11 assessment & planning tools for personalized guidance
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Safety Gates</h3>
                <p className="text-blue-200">Built-in safeguards to prevent dangerous reactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mb-12">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Take the Next Step
            </h3>
            <p className="text-lg text-gray-600">
              Join thousands who have transformed their health with our evidence-based approach
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <a
              href="/checkout"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
            >
              Start Your Recovery Journey
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
            >
              Learn More About the Course
            </a>
          </div>
        </div>
      </section>

      {/* Navigation & Download Section */}
      <section className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a
              href="/quiz"
              className="inline-flex items-center rounded-lg px-4 py-2 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <ArrowRight className="mr-3 h-5 w-5 rotate-180" />
              Back to Health Assessment
            </a>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <button
                onClick={handleDownloadGuide}
                className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {emailSent ? 'Guide Sent to Email!' : 'Download PDF Guide'}
              </button>

              <div className="text-sm text-gray-500">
                {emailSent ? '✅ Check your email' : 'Save this guide for offline reading'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

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

      {/* Introduction Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <h1 className="mb-4 text-3xl font-bold text-gray-900">First Steps to Recovery</h1>
              <h2 className="mb-6 text-xl font-semibold text-gray-700">
                Your Personalized Action Guide
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Congratulations on taking the first step toward understanding your health
                challenges! This guide provides immediate, actionable steps you can take today based
                on your quiz results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High Risk Section */}
      <section className="bg-red-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-xl border-2 border-red-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl">🚨</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-900">
                  High Risk - &quot;The Investigator&quot;
                </h2>
                <p className="text-red-700">If You Scored 7-10</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-red-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-red-900">
                  Immediate Actions (24-48 Hours)
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">1. Stop Further Exposure</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Document your environment with photos/videos</li>
                      <li>• If you suspect active mold, consider temporary relocation</li>
                      <li>• Avoid the most contaminated areas of your home</li>
                      <li>• Use a high-quality HEPA air purifier in your bedroom</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">
                      2. Begin Gentle Drainage Support
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Start magnesium citrate: 200mg at bedtime</li>
                      <li>• Increase water intake: ½ your body weight in ounces daily</li>
                      <li>• Add lemon to your water for gentle liver support</li>
                      <li>• Ensure 1-3 bowel movements daily</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-yellow-900">This Week</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">Environmental Assessment</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Hire a certified mold inspector OR</li>
                      <li>• Do a thorough DIY inspection using our checklist</li>
                      <li>• Check for water damage, leaks, musty odors</li>
                      <li>• Inspect HVAC system and change filters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">Medical Preparation</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Gather your medical records</li>
                      <li>• List all current symptoms with dates</li>
                      <li>• Research mold-literate doctors in your area</li>
                      <li>• Consider basic testing (VCS test online: $15)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border-l-4 border-red-500 bg-red-100 p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg font-bold text-red-600">⚠️</span>
                <div>
                  <h4 className="mb-2 font-bold text-red-900">Critical Warning</h4>
                  <p className="text-sm text-red-800">
                    <strong>DO NOT start binders (charcoal, chlorella, etc.) yet!</strong> This is
                    the #1 mistake people make. Without open drainage pathways, binders can make you
                    feel much worse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moderate Risk Section */}
      <section className="bg-orange-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-xl border-2 border-orange-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-orange-900">
                  Moderate Risk - &quot;The Seeker&quot;
                </h2>
                <p className="text-orange-700">If You Scored 4-6</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-orange-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-orange-900">1. Home Inspection</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use our room-by-room checklist</li>
                  <li>• Check moisture levels (&lt; 50% humidity)</li>
                  <li>• Look for hidden mold sources</li>
                  <li>• Assess air quality and ventilation</li>
                </ul>
              </div>

              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-blue-900">2. Symptom Tracking</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Begin daily symptom journaling</li>
                  <li>• Note environmental triggers</li>
                  <li>• Track sleep quality and energy levels</li>
                  <li>• Monitor digestive health</li>
                </ul>
              </div>

              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-green-900">3. Gentle Support</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Optimize sleep (8+ hours nightly)</li>
                  <li>• Reduce inflammatory foods</li>
                  <li>• Support basic detox with hydration</li>
                  <li>• Consider sauna or sweating exercises</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Risk Section */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-xl border-2 border-green-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-900">
                  Lower Risk - &quot;The Learner&quot;
                </h2>
                <p className="text-green-700">If You Scored 1-3</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-green-900">Environmental Health</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Maintain home humidity &lt; 50%</li>
                  <li>• Use quality air filtration</li>
                  <li>• Regular HVAC maintenance</li>
                  <li>• Proper ventilation in bathrooms</li>
                </ul>
              </div>

              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-blue-900">Natural Detox Support</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Stay well-hydrated</li>
                  <li>• Eat antioxidant-rich foods</li>
                  <li>• Regular exercise and sweating</li>
                  <li>• Prioritize quality sleep</li>
                </ul>
              </div>

              <div className="rounded-lg bg-purple-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-purple-900">Stay Informed</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Learn about environmental toxins</li>
                  <li>• Understand early warning signs</li>
                  <li>• Build a foundation of health resilience</li>
                </ul>
              </div>
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

      {/* Universal Actions Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">🎯 Universal Action Items</h2>
            <p className="text-gray-600">Essential steps for all quiz takers</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Nutrition Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-gray-900">🥗 Nutrition Guidelines</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-red-50 p-4">
                  <h4 className="mb-3 font-semibold text-red-900">❌ Avoid (High Mycotoxins)</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Peanuts and peanut butter</li>
                    <li>• Corn and corn products</li>
                    <li>• Conventional coffee</li>
                    <li>• Aged cheeses</li>
                    <li>• Dried fruits</li>
                    <li>• Cashews and pistachios</li>
                    <li>• Alcohol (especially beer and wine)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-3 font-semibold text-green-900">✅ Emphasize</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Fresh organic vegetables</li>
                    <li>• Wild-caught fish</li>
                    <li>• Grass-fed meat</li>
                    <li>• Pasture-raised eggs</li>
                    <li>• Coconut products</li>
                    <li>• Fresh herbs and spices</li>
                    <li>• Clean water</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-gray-900">🌟 Lifestyle Modifications</h3>

              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-3 font-semibold text-blue-900">😴 Sleep Optimization</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 8+ hours nightly</li>
                    <li>• Cool, dark room</li>
                    <li>• Consistent bedtime</li>
                    <li>• Blue light reduction 2 hours before bed</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-purple-50 p-4">
                  <h4 className="mb-3 font-semibold text-purple-900">🧘 Stress Management</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Daily meditation or deep breathing</li>
                    <li>• Regular gentle exercise</li>
                    <li>• Time in nature</li>
                    <li>• Adequate social support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Warnings Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-red-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-red-900">🚫 What NOT to Do</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-red-600">1.</span>
                  <p className="text-sm text-gray-700">
                    <strong>Don&apos;t start binders without drainage prep</strong> - This can cause
                    severe reactions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-red-600">2.</span>
                  <p className="text-sm text-gray-700">
                    <strong>Don&apos;t panic</strong> - Mold illness is treatable with the right
                    approach
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-red-600">3.</span>
                  <p className="text-sm text-gray-700">
                    <strong>Don&apos;t go it alone</strong> - Find knowledgeable practitioners
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-red-600">4.</span>
                  <p className="text-sm text-gray-700">
                    <strong>Don&apos;t expect overnight results</strong> - Recovery takes time and
                    patience
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-red-600">5.</span>
                  <p className="text-sm text-gray-700">
                    <strong>Don&apos;t ignore your gut</strong> - If you feel worse in certain
                    environments, trust that instinct
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-yellow-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-yellow-900">
                📞 Seek Medical Attention For
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-gray-700">Severe respiratory distress</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-gray-700">Chest pain or heart palpitations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-gray-700">Extreme mental health changes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-gray-700">Signs of severe allergic reaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-gray-700">
                    Any symptom that feels life-threatening
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">🎓 Your Next Learning Steps</h2>
            <p className="text-gray-600">Continue your recovery journey with these resources</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-blue-900">📚 Free Resources</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📺</span>
                  <span className="text-sm text-gray-700">
                    &quot;The Drainage First Method&quot; masterclass (7 minutes)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📖</span>
                  <span className="text-sm text-gray-700">
                    Kajsa&apos;s personal recovery story
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📋</span>
                  <span className="text-sm text-gray-700">
                    Room-by-room mold inspection checklist
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">🔍</span>
                  <span className="text-sm text-gray-700">
                    Free VCS (Visual Contrast Sensitivity) test
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-green-900">🚀 Ready for More?</h3>
              <p className="mb-4 text-sm text-gray-700">
                The <strong>Mold Detox Mastery</strong> course provides the complete, step-by-step
                system that has helped thousands recover their health safely and effectively.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• 10+ hours of in-depth training</div>
                <div>• Interactive tools and calculators</div>
                <div>• Safety-gated progression system</div>
                <div>• Prescription protocols with telehealth scripts</div>
                <div>• Ongoing support and updates</div>
              </div>
              <div className="mt-4 rounded-lg bg-green-100 p-3">
                <p className="text-sm font-semibold text-green-900">
                  Special offer: Use code{' '}
                  <span className="rounded bg-green-200 px-2 py-1">QUIZ20</span> for 20% off your
                  first month.
                </p>
              </div>
            </div>
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

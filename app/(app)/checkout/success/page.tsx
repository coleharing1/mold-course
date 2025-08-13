'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2, ArrowRight, BookOpen, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Trigger confetti animation
    const triggerConfetti = async () => {
      try {
        const confetti = (await import('canvas-confetti')).default
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6'],
        })
      } catch (error) {
        console.log('Confetti animation not available')
      }
    }

    // Verify the session (optional - can check with API)
    const verifySession = async () => {
      if (sessionId) {
        // Could verify with backend here
        setIsLoading(false)
        triggerConfetti()
      } else {
        setIsLoading(false)
      }
    }

    verifySession()
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="mt-2 text-lg text-gray-600">Welcome to Mold Detox Mastery</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🎉 You&apos;re All Set!</CardTitle>
            <CardDescription>
              Your payment has been processed successfully. Here&apos;s what happens next:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Check Your Email</h3>
                  <p className="text-sm text-gray-600">
                    We&apos;ve sent a welcome email with your login details and getting started
                    guide.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Complete Your Profile</h3>
                  <p className="text-sm text-gray-600">
                    Take 5 minutes to complete the onboarding questionnaire for personalized
                    recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Start with Module 00</h3>
                  <p className="text-sm text-gray-600">
                    Begin your recovery journey with our Quick Start Guide - 5 essential first
                    steps.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-3 font-semibold">Quick Actions</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/onboarding">
                  <Button variant="outline" className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Onboarding
                  </Button>
                </Link>
                <Link href="/modules">
                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Modules
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="min-w-[200px]">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="mt-4 text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a
              href="mailto:support@molddetoxmastery.com"
              className="text-primary-600 hover:text-primary-700"
            >
              support@molddetoxmastery.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}

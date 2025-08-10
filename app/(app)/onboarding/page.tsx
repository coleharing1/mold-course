'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ProfileStep } from '@/components/onboarding/profile-step'
import { SymptomsStep } from '@/components/onboarding/symptoms-step'
import { ExposureStep } from '@/components/onboarding/exposure-step'
import { ConstraintsStep } from '@/components/onboarding/constraints-step'
import { ReviewStep } from '@/components/onboarding/review-step'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const STEPS = [
  { id: 'profile', title: 'Your Profile', component: ProfileStep },
  { id: 'symptoms', title: 'Current Symptoms', component: SymptomsStep },
  { id: 'exposure', title: 'Exposure History', component: ExposureStep },
  { id: 'constraints', title: 'Budget & Equipment', component: ConstraintsStep },
  { id: 'review', title: 'Review & Confirm', component: ReviewStep },
]

export interface OnboardingData {
  profile: {
    name?: string
    age?: string
    livingSituation?: string
    timezone?: string
  }
  symptoms: {
    severity?: string
    primary?: string[]
    duration?: string
    triggers?: string[]
  }
  exposure: {
    location?: string
    duration?: string
    visible?: boolean
    tests?: string[]
  }
  constraints: {
    budget?: string
    equipment?: string[]
    diet?: string[]
    pace?: string
  }
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    profile: {},
    symptoms: {},
    exposure: {},
    constraints: {},
  })

  const CurrentStepComponent = STEPS[currentStep].component
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    
    try {
      // Save onboarding data
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save onboarding data')
      }

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Mold Detox Mastery</h1>
          <p className="mt-2 text-lg text-gray-600">
            Let&apos;s personalize your recovery journey (5-7 minutes)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm text-gray-500">
              {STEPS[currentStep].title}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  index < currentStep
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : index === currentStep
                    ? 'border-primary-600 bg-white text-primary-600'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-full ${
                    index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="p-6">
          <CurrentStepComponent
            data={data}
            updateData={updateData}
            onNext={handleNext}
          />
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button
              onClick={handleComplete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Complete Onboarding'}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Skip Option */}
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip for now (you can complete this later)
          </button>
        </div>
      </div>
    </div>
  )
}
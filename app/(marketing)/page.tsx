import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react'

export default function MarketingHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Recover from Mold Illness
              <span className="block text-primary-600">With Evidence-Based Protocols</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              The comprehensive, step-by-step program that guides you through safe mold
              detoxification with personalized tracking tools and gated sequencing for your safety.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg">Start Your Recovery</Button>
              </Link>
              <Link href="/preview">
                <Button variant="outline" size="lg">
                  Free Preview
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              30-day money-back guarantee • No questions asked
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="mt-1 text-sm text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10</div>
              <div className="mt-1 text-sm text-gray-600">Comprehensive Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">9</div>
              <div className="mt-1 text-sm text-gray-600">Interactive Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="mt-1 text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Your Journey to Recovery</h2>
            <p className="mt-4 text-lg text-gray-600">
              Follow our proven step-by-step approach with built-in safety gates
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-600" />
                <CardTitle>Identify & Test</CardTitle>
                <CardDescription>
                  Learn to identify mold exposure sources and understand testing options
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600" />
                <CardTitle>Open Drainage</CardTitle>
                <CardDescription>
                  Safely prepare your body&apos;s detox pathways before starting binders
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600" />
                <CardTitle>Detox & Prevent</CardTitle>
                <CardDescription>
                  Use binders and antifungals safely, then learn prevention strategies
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Evidence System */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Evidence-Based Content</h2>
            <p className="mt-4 text-lg text-gray-600">
              Every recommendation is clearly labeled with its evidence level
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
              <div className="text-lg font-semibold text-green-900">Solid Evidence</div>
              <p className="mt-2 text-sm text-green-700">
                Well-established protocols backed by multiple studies and clinical practice
              </p>
            </div>
            <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
              <div className="text-lg font-semibold text-yellow-900">Emerging Evidence</div>
              <p className="mt-2 text-sm text-yellow-700">
                Promising approaches with growing research support
              </p>
            </div>
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6">
              <div className="text-lg font-semibold text-red-900">Controversial</div>
              <p className="mt-2 text-sm text-red-700">
                Debated methods presented with full transparency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Snapshot */}
      <section id="curriculum" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Curriculum</h2>
            <p className="mt-4 text-lg text-gray-600">
              10 modules with gated progression for your safety
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Quick Start Guide', description: '5 essential first steps' },
              { title: 'Identify Exposure', description: 'Home, work, and car assessment' },
              { title: 'Testing & Diagnosis', description: 'Environmental vs medical testing' },
              { title: 'Open Drainage Pathways', description: 'Prepare your detox systems' },
              { title: 'Detox I: Binders', description: 'Safe binder protocols' },
              { title: 'Detox II: Antifungals', description: 'When and how to use' },
              { title: 'Managing Herx', description: 'Handle detox reactions' },
              { title: 'Supportive Modalities', description: 'Sauna, exercise, and more' },
              { title: 'Diet & Pantry', description: 'Low-mold nutrition plan' },
              { title: 'Retesting & Prevention', description: 'Long-term recovery' },
            ].map((module, index) => (
              <div key={index} className="flex items-start rounded-lg bg-white p-4 shadow">
                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section id="tools" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Interactive Tools</h2>
            <p className="mt-4 text-lg text-gray-600">
              9 powerful tools to track and optimize your recovery
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Exposure Checklist</CardTitle>
                <CardDescription>Room-by-room assessment with fix-first priorities</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Drainage Readiness</CardTitle>
                <CardDescription>Track your readiness with our 7-day rolling score</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Binder Planner</CardTitle>
                <CardDescription>Optimize timing between meals and supplements</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-yellow-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <AlertCircle className="mr-3 h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-900">Medical Disclaimer</h3>
              <p className="mt-2 text-sm text-yellow-700">
                This program provides educational information only and is not medical advice. Always
                consult with qualified healthcare providers before making changes to your health
                regimen. The content includes safety flags and prompts to seek professional guidance
                when appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to Start Your Recovery?</h2>
          <p className="mt-4 text-lg text-primary-100">
            Join hundreds of students who are successfully recovering from mold illness
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Get Started Today
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

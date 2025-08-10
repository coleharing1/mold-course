import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Shield, Clock, Map } from 'lucide-react'

export function Hero() {
  const benefits = [
    { icon: Shield, text: 'Safe, gated progression' },
    { icon: CheckCircle2, text: 'Evidence-based protocols' },
    { icon: Clock, text: 'Self-paced learning' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/20 to-white py-24 sm:py-32">
      {/* Dev Sitemap Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-2 px-4 text-center">
        <Link href="/sitemap-dev" className="inline-flex items-center gap-2 hover:underline">
          <Map className="h-4 w-4" />
          <span className="text-sm font-medium">🚀 Developer Mode: View All Pages & Routes</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-primary-100/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
            <Shield className="mr-2 h-3.5 w-3.5" />
            Medically-informed recovery program
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Your Complete Guide to{' '}
            <span className="text-primary-600">Mold Illness Recovery</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            The only step-by-step program that safely guides you through mold detoxification 
            with personalized protocols, interactive tools, and built-in safety gates.
          </p>

          {/* Benefits */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex items-center">
                <benefit.icon className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm font-medium text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="min-w-[200px]">
                Start Your Recovery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/preview">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Free Module Preview
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-col items-center space-y-2">
            <p className="text-sm text-gray-500">
              Join 500+ students already recovering
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>✓ 30-day money-back guarantee</span>
              <span>•</span>
              <span>✓ No questions asked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
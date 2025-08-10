'use client'

import { useState } from 'react'
import { Check, X, Shield, Zap, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Core',
    id: 'core',
    href: '/checkout?plan=core',
    priceMonthly: 199,
    priceAnnual: 149,
    description: 'Everything you need for complete mold recovery',
    features: [
      { name: 'All 10 educational modules', included: true },
      { name: '9 interactive recovery tools', included: true },
      { name: 'Downloadable resources & PDFs', included: true },
      { name: 'Progress tracking dashboard', included: true },
      { name: 'Mobile app access', included: true },
      { name: '1 year of content updates', included: true },
      { name: 'Email support (48hr response)', included: true },
      { name: 'Community forum access', included: false },
      { name: 'Live Q&A sessions', included: false },
      { name: 'Advanced practitioner tools', included: false },
      { name: '1-on-1 consultation discount', included: false },
    ],
    highlighted: false,
  },
  {
    name: 'Plus',
    id: 'plus',
    href: '/checkout?plan=plus',
    priceMonthly: 59,
    priceAnnual: 47,
    description: 'Core + community support & advanced features',
    features: [
      { name: 'All 10 educational modules', included: true },
      { name: '9 interactive recovery tools', included: true },
      { name: 'Downloadable resources & PDFs', included: true },
      { name: 'Progress tracking dashboard', included: true },
      { name: 'Mobile app access', included: true },
      { name: 'Lifetime content updates', included: true },
      { name: 'Priority email support (24hr)', included: true },
      { name: 'Community forum access', included: true },
      { name: 'Monthly live Q&A sessions', included: true },
      { name: 'Advanced practitioner tools', included: true },
      { name: '20% consultation discount', included: true },
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
]

const guarantees = [
  { icon: Shield, text: '30-day money-back guarantee' },
  { icon: Zap, text: 'Instant access upon purchase' },
  { icon: FileText, text: 'Lifetime access to core content' },
]

export function PricingTable() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual')

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that fits your recovery journey. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative flex rounded-lg bg-gray-100 p-0.5">
            <button
              type="button"
              className={cn(
                'relative rounded-md py-2 px-6 text-sm font-medium transition-all focus:outline-none',
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={cn(
                'relative ml-0.5 rounded-md py-2 px-6 text-sm font-medium transition-all focus:outline-none',
                billingPeriod === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual
              <span className="ml-1.5 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200',
                tier.highlighted && 'ring-2 ring-primary-600 shadow-lg'
              )}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                {tier.id === 'plus' && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Recurring
                  </span>
                )}
                {tier.id === 'core' && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    One-time
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-gray-600">{tier.description}</p>

              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${billingPeriod === 'annual' ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="ml-1 text-lg text-gray-600">
                    {tier.id === 'plus' ? '/month' : ''}
                  </span>
                </div>
                {tier.id === 'plus' && billingPeriod === 'annual' && (
                  <p className="mt-1 text-sm text-gray-500">
                    Billed annually at ${tier.priceAnnual * 12}
                  </p>
                )}
                {tier.id === 'core' && (
                  <p className="mt-1 text-sm text-gray-500">
                    One-time payment, lifetime access
                  </p>
                )}
              </div>

              <a href={`${tier.href}&billing=${billingPeriod}`} className="block mt-6">
                <Button
                  className={cn(
                    'w-full',
                    tier.highlighted
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  )}
                >
                  Get Started
                </Button>
              </a>

              {/* Features list */}
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    )}
                    <span
                      className={cn(
                        'ml-3 text-sm',
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      )}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment plan note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need a payment plan? The Core package is available in 3 monthly installments of $69.
          </p>
        </div>

        {/* Guarantees */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {guarantees.map((guarantee) => (
            <div key={guarantee.text} className="flex items-center text-sm text-gray-600">
              <guarantee.icon className="mr-2 h-4 w-4 text-gray-400" />
              {guarantee.text}
            </div>
          ))}
        </div>

        {/* FAQs link */}
        <div className="mt-12 text-center">
          <a href="#faq" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Questions about pricing? See our FAQ →
          </a>
        </div>
      </div>
    </section>
  )
}
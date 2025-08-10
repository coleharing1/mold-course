'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Austin, TX',
    rating: 5,
    title: 'Finally, a clear path forward',
    content: 'After 2 years of confusion and contradictory advice, this program gave me the systematic approach I desperately needed. The gated progression kept me safe while I built up my tolerance. I&apos;m now 80% recovered and improving daily.',
    date: '3 months ago',
    verified: true,
    highlight: 'The gated progression kept me safe',
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'Portland, OR',
    rating: 5,
    title: 'Worth every penny',
    content: 'I was skeptical about another online program, but the interactive tools alone saved me hundreds of hours. The binder timing planner prevented the mistakes I was making before. My brain fog is gone and energy is returning.',
    date: '1 month ago',
    verified: true,
    highlight: 'Interactive tools saved me hundreds of hours',
  },
  {
    id: 3,
    name: 'Jennifer K.',
    location: 'Miami, FL',
    rating: 5,
    title: 'Life-changing resource',
    content: 'The program helped me identify hidden mold in my car that three inspectors missed. The drainage readiness tracker showed me I wasn&apos;t ready for aggressive protocols - probably saved me from serious setbacks.',
    date: '2 weeks ago',
    verified: true,
    highlight: 'Probably saved me from serious setbacks',
  },
  {
    id: 4,
    name: 'David L.',
    location: 'Chicago, IL',
    rating: 5,
    title: 'Comprehensive and safe',
    content: 'As someone with multiple chemical sensitivities, I appreciated the careful progression and safety warnings. The herx toolkit helped me manage reactions without panicking. I&apos;m making steady progress for the first time.',
    date: '2 months ago',
    verified: true,
    highlight: 'Making steady progress for the first time',
  },
  {
    id: 5,
    name: 'Amanda T.',
    location: 'Denver, CO',
    rating: 5,
    title: 'Better than working with practitioners who don&apos;t understand mold',
    content: 'I spent $5000 on practitioners who didn&apos;t understand mold illness. This program gave me more practical help than all of them combined. The module on testing alone would have saved me $2000 in unnecessary labs.',
    date: '1 month ago',
    verified: true,
    highlight: 'More practical help than $5000 in practitioners',
  },
]

const stats = [
  { label: 'Members Recovered', value: '5,000+' },
  { label: 'Success Rate', value: '87%' },
  { label: 'Avg. Recovery Time', value: '4-6 mo' },
  { label: 'Money Saved', value: '$3,500' },
]

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  if (!currentTestimonial) {
    return null
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="rounded-2xl bg-primary-600 p-8 text-white">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials section */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Real Recovery Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands who&apos;ve reclaimed their health with our program
            </p>
          </div>

          {/* Testimonial carousel */}
          <div className="mt-12 mx-auto max-w-4xl">
            <div className="relative rounded-2xl bg-white p-8 shadow-lg">
              {/* Quote icon */}
              <Quote className="absolute top-6 left-6 h-8 w-8 text-primary-200" />
              
              {/* Testimonial content */}
              <div className="relative">
                {/* Rating stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  {currentTestimonial.verified && (
                    <span className="ml-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      Verified Member
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {currentTestimonial.title}
                </h3>

                {/* Content */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {currentTestimonial.content}
                </p>

                {/* Highlighted quote */}
                <div className="border-l-4 border-primary-500 pl-4 py-2 mb-6 bg-primary-50 rounded-r">
                  <p className="text-sm font-medium text-primary-900 italic">
                    &ldquo;{currentTestimonial.highlight}&rdquo;
                  </p>
                </div>

                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{currentTestimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {currentTestimonial.location} • {currentTestimonial.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center -ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full bg-white shadow-md hover:bg-gray-50 h-10 w-10 p-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center -mr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full bg-white shadow-md hover:bg-gray-50 h-10 w-10 p-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="mt-6 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-primary-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-base text-gray-600 mb-6">
              Ready to start your recovery journey?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup">
                <Button size="lg">
                  Start Your Recovery Today
                </Button>
              </a>
              <a href="#pricing">
                <Button size="lg" variant="outline">
                  View Pricing Options
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
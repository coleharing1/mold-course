'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'Who is this program for?',
        answer: 'This program is designed for anyone dealing with mold exposure or suspected mold illness, from those with mild symptoms to chronic cases. It&apos;s especially helpful if you&apos;re overwhelmed by conflicting information and want a clear, systematic approach to recovery.',
      },
      {
        question: 'Do I need to see a doctor first?',
        answer: 'While our program provides educational content, we strongly recommend working with a healthcare provider, especially for severe symptoms. The program complements medical care and helps you be a more informed patient.',
      },
      {
        question: 'How long does the program take?',
        answer: 'The average completion time is 3-6 months, but it&apos;s entirely self-paced. You have lifetime access, so you can move through the content at your own speed and revisit modules as needed.',
      },
    ],
  },
  {
    category: 'Program Content',
    questions: [
      {
        question: 'What makes this different from free information online?',
        answer: 'We&apos;ve organized scattered information into a systematic, step-by-step approach with built-in safety gates. Our interactive tools, personalized protocols, and progress tracking save you hundreds of hours of research and reduce the risk of mistakes.',
      },
      {
        question: 'Are the protocols safe?',
        answer: 'Safety is our top priority. We use a gated progression system that ensures you complete prerequisites before advancing to potentially challenging protocols. All recommendations include safety flags and prompts to consult healthcare providers when appropriate.',
      },
      {
        question: 'How current is the information?',
        answer: 'We review and update our content quarterly based on the latest research. All information includes citations and last-verified dates. You&apos;ll receive notifications when significant updates are made.',
      },
    ],
  },
  {
    category: 'Technical & Access',
    questions: [
      {
        question: 'What devices can I use?',
        answer: 'The platform works on any device with a web browser - desktop, laptop, tablet, or smartphone. Your progress syncs automatically across all devices.',
      },
      {
        question: 'Can I download the content?',
        answer: 'Yes! You can download PDF summaries, audio files, and tool templates for offline use. The interactive tools require an internet connection to save your progress.',
      },
      {
        question: 'What if I need help?',
        answer: 'We offer email support, a comprehensive help center, and an optional community forum (Plus tier). Most questions are answered within 24 hours.',
      },
    ],
  },
  {
    category: 'Pricing & Guarantee',
    questions: [
      {
        question: 'What&apos;s included in the price?',
        answer: 'The Core package ($149-199) includes all 10 modules, 9 interactive tools, resource library, and one year of updates. Plus tier ($47-59/month) adds community access, advanced tools, and live Q&A sessions.',
      },
      {
        question: 'Is there a refund policy?',
        answer: 'Yes! We offer a 30-day money-back guarantee, no questions asked. If you&apos;re not satisfied for any reason, simply email us within 30 days for a full refund.',
      },
      {
        question: 'Are there payment plans?',
        answer: 'Yes, we offer a 3-payment plan for the Core package. The Plus tier is billed monthly and can be canceled anytime.',
      },
    ],
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about the Mold Detox Mastery program
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {faqs.map((category) => (
            <div key={category.category}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const id = `${category.category}-${index}`
                  const isOpen = openItems.includes(id)
                  
                  return (
                    <div
                      key={id}
                      className="rounded-lg bg-white shadow-sm"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-primary-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            We&apos;re here to help! Reach out to our support team anytime.
          </p>
          <a
            href="mailto:support@molddetoxmastery.com"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  )
}
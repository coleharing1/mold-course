'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, HelpCircle, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function CancelledPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Cancelled</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your payment was not completed
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What happened?</CardTitle>
            <CardDescription>
              You cancelled the checkout process or the payment could not be processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2">Common reasons for cancellation:</h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>You changed your mind during checkout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Card verification failed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Insufficient funds or credit limit reached</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Technical issue during payment processing</span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">What would you like to do?</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link href="/pricing">
                    <Button className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return Home
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Need help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <HelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                    <span>
                      Having trouble with payment? Check our{' '}
                      <Link href="/faq" className="text-primary-600 hover:text-primary-700">
                        FAQ section
                      </Link>
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="mr-3 h-5 w-5 text-gray-400" />
                    <span>
                      Contact support at{' '}
                      <a href="mailto:support@molddetoxmastery.com" className="text-primary-600 hover:text-primary-700">
                        support@molddetoxmastery.com
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-sm text-gray-600 text-center">
                <strong>Remember:</strong> We offer a 30-day money-back guarantee, so you can try the program risk-free!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Your cart has been saved and you can complete your purchase anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
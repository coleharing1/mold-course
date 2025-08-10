'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getStripe } from '@/lib/stripe/client-browser'
import { STRIPE_CONFIG } from '@/lib/stripe/config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Loader2, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function CheckoutForm() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Get plan details from URL params
  const plan = searchParams.get('plan') || 'core'
  const billing = searchParams.get('billing') || 'onetime'
  
  // Determine price ID based on selection
  const getPriceId = () => {
    if (plan === 'core') {
      return billing === 'annual' 
        ? STRIPE_CONFIG.priceIds.core.discounted 
        : STRIPE_CONFIG.priceIds.core.oneTime
    } else if (plan === 'plus') {
      return billing === 'annual'
        ? STRIPE_CONFIG.priceIds.plus.annual
        : STRIPE_CONFIG.priceIds.plus.monthly
    } else if (plan === 'vip') {
      return STRIPE_CONFIG.priceIds.vip.oneTime
    }
    return ''
  }

  // Get product details
  const getProductDetails = () => {
    const products = STRIPE_CONFIG.products as any
    return products[plan] || products.core
  }

  // Get display price
  const getDisplayPrice = () => {
    if (plan === 'core') {
      return billing === 'annual' ? '$149' : '$199'
    } else if (plan === 'plus') {
      return billing === 'annual' ? '$47/month' : '$59/month'
    } else if (plan === 'vip') {
      return '$997'
    }
    return '$199'
  }

  const product = getProductDetails()
  const priceId = getPriceId()
  const displayPrice = getDisplayPrice()

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Call our checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planType: plan,
          billingPeriod: billing,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      setError((err as Error).message)
      setIsLoading(false)
    }
  }

  // Set up test mode for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !priceId) {
      console.log('Note: Configure Stripe price IDs in environment variables')
    }
  }, [priceId])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link 
          href="/pricing"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to pricing
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your selection before proceeding to payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium capitalize">{plan}</span>
                  </div>
                  {plan === 'plus' && (
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Billing</span>
                      <span className="font-medium capitalize">
                        {billing === 'annual' ? 'Annual (Save 20%)' : 'Monthly'}
                      </span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {displayPrice}
                </div>
                {plan === 'plus' && billing === 'annual' && (
                  <p className="text-sm text-gray-600 mb-4">
                    Billed annually at ${47 * 12}
                  </p>
                )}
                {plan === 'core' && billing === 'annual' && (
                  <p className="text-sm text-green-600 mb-4">
                    You save $50 with annual billing!
                  </p>
                )}
                
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || !priceId}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-xs text-gray-600">
                    <Shield className="mr-2 h-4 w-4 text-gray-400" />
                    Secure payment via Stripe
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Test Mode Notice */}
            {process.env.NODE_ENV === 'development' && (
              <Card className="mt-4 border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-amber-900 mb-2">Test Mode</h4>
                  <p className="text-xs text-amber-700">
                    Use card number: 4242 4242 4242 4242
                    <br />
                    Any future expiry and any CVC
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  )
}
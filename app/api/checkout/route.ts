import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getStripe } from '@/lib/stripe/client'
import { STRIPE_CONFIG } from '@/lib/stripe/config'
import { authOptions } from '@/lib/auth/auth-options'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'You must be logged in to purchase' }, { status: 401 })
    }

    const { priceId, planType, billingPeriod } = await req.json()

    // If missing Stripe config (preview builds), short-circuit gracefully
    if (!process.env['STRIPE_SECRET_KEY']) {
      return NextResponse.json({ error: 'Checkout temporarily unavailable' }, { status: 503 })
    }

    // Validate the price ID
    const validPriceIds = [
      STRIPE_CONFIG.priceIds.core.oneTime,
      STRIPE_CONFIG.priceIds.core.discounted,
      STRIPE_CONFIG.priceIds.plus.monthly,
      STRIPE_CONFIG.priceIds.plus.annual,
      STRIPE_CONFIG.priceIds.vip.oneTime,
    ]

    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json({ error: 'Invalid price selection' }, { status: 400 })
    }

    // Get or create Stripe customer
    let customer
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { purchases: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user already has a Stripe customer ID
    const existingPurchase = user.purchases.find((p) => p.stripeCustomerId)

    const stripe = getStripe()
    if (existingPurchase?.stripeCustomerId) {
      customer = await stripe.customers.retrieve(existingPurchase.stripeCustomerId)
    } else {
      // Create new Stripe customer
      customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          userId: user.id,
        },
      })
    }

    // Determine success and cancel URLs
    const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'
    const successUrl = `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/checkout/cancelled`

    // Create checkout session based on plan type
    interface SessionConfig {
      customer: string
      payment_method_types: string[]
      line_items: { price: string; quantity: number }[]
      mode: 'payment' | 'subscription'
      success_url: string
      cancel_url: string
      metadata: Record<string, string>
      subscription_data?: { metadata: Record<string, string> }
      payment_intent_data?: { metadata: Record<string, string> }
    }
    const sessionConfig: SessionConfig = {
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: planType === 'plus' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user.id,
        planType,
        billingPeriod: billingPeriod || 'one-time',
      },
    }

    // Add subscription-specific settings
    if (planType === 'plus') {
      sessionConfig.subscription_data = {
        metadata: {
          userId: user.id,
        },
      }
    }

    // Add one-time payment settings
    if (planType === 'core' || planType === 'vip') {
      sessionConfig.payment_intent_data = {
        metadata: {
          userId: user.id,
          planType,
        },
      }
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create(sessionConfig)

    // Create pending purchase record
    await prisma.purchase.create({
      data: {
        userId: user.id,
        sku: `${planType}-${billingPeriod || 'onetime'}`,
        amount:
          planType === 'core'
            ? billingPeriod === 'annual'
              ? STRIPE_CONFIG.prices.core.discounted
              : STRIPE_CONFIG.prices.core.oneTime
            : planType === 'plus'
              ? billingPeriod === 'annual'
                ? STRIPE_CONFIG.prices.plus.annual * 12
                : STRIPE_CONFIG.prices.plus.monthly
              : STRIPE_CONFIG.prices.vip.oneTime,
        currency: 'usd',
        status: 'pending',
        stripeCustomerId: customer.id,
      },
    })

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

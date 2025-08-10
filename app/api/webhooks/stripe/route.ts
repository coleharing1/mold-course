import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe/client'
import { STRIPE_CONFIG } from '@/lib/stripe/config'
import { prisma } from '@/lib/db/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_CONFIG.webhookSecret
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Handle successful payment
        await handleCheckoutComplete(session)
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Handle new subscription
        await handleSubscriptionCreated(subscription)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Handle subscription update
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Handle subscription cancellation
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Handle failed payment
        await handlePaymentFailed(paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.['userId']
  
  if (!userId) {
    console.error('No userId in session metadata')
    return
  }

  // Update purchase record
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      stripeCustomerId: session.customer as string,
      status: 'pending',
    },
  })

  if (purchase) {
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: 'completed',
        stripePaymentId: session.payment_intent as string,
        completedAt: new Date(),
      },
    })
  }

  // Update user's last active timestamp
  await prisma.user.update({
    where: { id: userId },
    data: { lastActive: new Date() },
  })

  // TODO: Send welcome email
  // await sendWelcomeEmail(user.email)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.['userId']
  
  if (!userId) {
    console.error('No userId in subscription metadata')
    return
  }

  // Create or update subscription record
  await prisma.subscription.upsert({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    create: {
      userId,
      tier: 'plus',
      status: 'active',
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      startedAt: new Date(subscription.created * 1000),
      expiresAt: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : undefined,
    },
    update: {
      status: 'active',
      renewedAt: new Date(),
      expiresAt: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : undefined,
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const existingSub = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!existingSub) {
    console.error('Subscription not found:', subscription.id)
    return
  }

  // Map Stripe status to our status
  let status: string
  switch (subscription.status) {
    case 'active':
      status = 'active'
      break
    case 'canceled':
    case 'unpaid':
      status = 'cancelled'
      break
    case 'past_due':
      status = 'expired'
      break
    default:
      status = 'active'
  }

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status,
      expiresAt: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : undefined,
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'cancelled',
      cancelledAt: new Date(),
    },
  })
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata?.['userId']
  
  if (!userId) {
    console.error('No userId in payment intent metadata')
    return
  }

  // Update purchase record
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      stripePaymentId: paymentIntent.id,
    },
  })

  if (purchase) {
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: 'failed',
        cancelReason: paymentIntent.last_payment_error?.message || 'Payment failed',
      },
    })
  }

  // TODO: Send payment failed email
  // await sendPaymentFailedEmail(user.email)
}
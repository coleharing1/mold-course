/**
 * @fileoverview Lazy Stripe client factory to avoid build-time failures when env
 * vars are not present (e.g., on Vercel preview builds). The client is created
 * only when needed during a request, not at module import time.
 */
import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export const getStripe = (): Stripe => {
  const secretKey = process.env['STRIPE_SECRET_KEY']
  if (!secretKey) {
    throw new Error('Stripe secret key is not configured')
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
      typescript: true,
    })
  }
  return stripeClient
}

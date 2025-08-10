import Stripe from 'stripe'
import { STRIPE_CONFIG } from './config'

// Server-side Stripe client
export const stripe = new Stripe(STRIPE_CONFIG.secretKey, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
})
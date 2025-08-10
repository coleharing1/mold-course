export const STRIPE_CONFIG = {
  publishableKey: process.env['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY']!,
  secretKey: process.env['STRIPE_SECRET_KEY']!,
  webhookSecret: process.env['STRIPE_WEBHOOK_SECRET']!,
  
  // Pricing (in cents)
  prices: {
    core: {
      oneTime: 19900, // $199
      discounted: 14900, // $149 (annual)
    },
    plus: {
      monthly: 5900, // $59/month
      annual: 4700, // $47/month (billed annually)
    },
    vip: {
      oneTime: 99700, // $997
    },
  },
  
  // Stripe Price IDs (to be configured in Stripe Dashboard)
  priceIds: {
    core: {
      oneTime: process.env['STRIPE_PRICE_CORE_ONETIME'] || '',
      discounted: process.env['STRIPE_PRICE_CORE_DISCOUNTED'] || '',
    },
    plus: {
      monthly: process.env['STRIPE_PRICE_PLUS_MONTHLY'] || '',
      annual: process.env['STRIPE_PRICE_PLUS_ANNUAL'] || '',
    },
    vip: {
      oneTime: process.env['STRIPE_PRICE_VIP_ONETIME'] || '',
    },
  },
  
  // Product metadata
  products: {
    core: {
      name: 'Mold Detox Mastery - Core',
      description: 'Complete mold recovery program with all 10 modules and 9 interactive tools',
      features: [
        'All 10 educational modules',
        '9 interactive recovery tools',
        'Downloadable resources & PDFs',
        'Progress tracking dashboard',
        'Mobile app access',
        '1 year of content updates',
        'Email support (48hr response)',
      ],
    },
    plus: {
      name: 'Mold Detox Mastery - Plus',
      description: 'Core + community support & advanced features',
      features: [
        'Everything in Core',
        'Community forum access',
        'Monthly live Q&A sessions',
        'Advanced practitioner tools',
        'Priority email support (24hr)',
        'Lifetime content updates',
        '20% consultation discount',
      ],
    },
    vip: {
      name: 'Mold Detox Mastery - VIP',
      description: 'Premium package with 1-on-1 support',
      features: [
        'Everything in Plus',
        '3 x 1-on-1 consultations',
        'Personalized protocol review',
        'Direct messaging access',
        'Custom supplement recommendations',
        'Priority support',
      ],
    },
  },
}
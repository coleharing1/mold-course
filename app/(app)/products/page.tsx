'use client'

import { useState } from 'react'
import { ExternalLink, ShoppingCart, Star, Search } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  category: string
  url: string
  price?: string
  priority: 'essential' | 'recommended' | 'optional'
  featured?: boolean
}

const products: Product[] = [
  // Air Purifiers & Home Protection
  {
    id: 'levoit-large',
    name: 'Levoit Air Purifier - Large Spaces',
    description:
      'High-capacity HEPA air purifier for bedrooms, living rooms, and larger areas. Essential for creating mold-free zones.',
    category: 'air-purifiers',
    url: 'https://amzn.to/40QYaHu',
    priority: 'essential',
    featured: true,
  },
  {
    id: 'levoit-small',
    name: 'Levoit Air Purifier - Small Spaces',
    description: 'Compact HEPA air purifier perfect for bathrooms, closets, and smaller rooms.',
    category: 'air-purifiers',
    url: 'https://amzn.to/4gmodL7',
    priority: 'essential',
  },
  {
    id: 'winix-carbon',
    name: 'Winix Carbon Filter',
    description:
      'Advanced carbon filtration system for removing mold spores and odors from the air.',
    category: 'air-purifiers',
    url: 'https://amzn.to/3PWNuRu',
    priority: 'recommended',
  },
  {
    id: 'ozone-machine',
    name: 'Ozone Home Machine',
    description:
      'Professional ozone generator for deep air sanitization. Use only when not home - makes environment unstable for mold & bacteria.',
    category: 'air-purifiers',
    url: 'https://amzn.to/40EC9KN',
    priority: 'optional',
  },

  // Mold Cleaning & Household Products
  {
    id: 'home-biotic',
    name: 'Home Biotic Cleaning System',
    description:
      'Complete natural cleaning system designed specifically for mold-contaminated environments.',
    category: 'cleaning',
    url: 'https://fas.st/t/qyRnWQZ1',
    priority: 'essential',
    featured: true,
  },
  {
    id: 'mold-wipes',
    name: 'Mold-Safe Cleaning Wipes',
    description: 'Pre-moistened wipes safe for cleaning moldy surfaces without spreading spores.',
    category: 'cleaning',
    url: 'https://fas.st/t/qyRnWQZ1',
    priority: 'recommended',
  },
  {
    id: 'household-cleaner',
    name: 'Mold-Safe Household Cleaner',
    description: 'All-purpose cleaner formulated to be safe for mold-sensitive individuals.',
    category: 'cleaning',
    url: 'https://fas.st/t/qyRnWQZ1',
    priority: 'recommended',
  },
  {
    id: 'mold-laundry-detergent',
    name: 'Mold-Safe Laundry Detergent',
    description:
      'Specially formulated detergent that removes mold spores and mycotoxins from clothing and bedding.',
    category: 'cleaning',
    url: 'https://amzn.to/4heCH0V',
    priority: 'essential',
  },
  {
    id: 'pillow-protectors',
    name: 'Mold-Resistant Pillow Protectors',
    description: 'Protective covers that prevent mold growth on pillows and block allergens.',
    category: 'cleaning',
    url: 'https://amzn.to/3EcJ1HJ',
    priority: 'recommended',
  },
  {
    id: 'grounding-sheet',
    name: 'Grounding Sheet',
    description:
      'Supports detox and reduces inflammation during sleep through natural grounding connection.',
    category: 'cleaning',
    url: 'https://amzn.to/42Enn9v',
    priority: 'optional',
  },
  {
    id: 'shower-filter',
    name: 'Shower Water Filter',
    description: 'Removes chlorine, chemicals, and potential mold spores from shower water.',
    category: 'cleaning',
    url: 'https://amzn.to/413kvBT',
    priority: 'recommended',
  },
  {
    id: 'sink-filter',
    name: 'Kitchen Sink Water Filter',
    description: 'Point-of-use filtration for drinking and cooking water to remove contaminants.',
    category: 'cleaning',
    url: 'https://amzn.to/40UdPFU',
    priority: 'recommended',
  },

  // Mold Testing Supplies
  {
    id: 'petri-dish-test',
    name: 'DIY Petri Dish Mold Test',
    description: 'At-home mold detection kit using petri dishes for air and surface sampling.',
    category: 'testing',
    url: 'https://go.shopmy.us/p-12742306',
    priority: 'essential',
    featured: true,
  },
  {
    id: 'diy-lab-test',
    name: 'DIY Lab Test Kit',
    description:
      'Professional-grade test kit you can use at home and send to certified lab for analysis.',
    category: 'testing',
    url: 'https://go.shopmy.us/p-9216116',
    priority: 'recommended',
  },
  {
    id: 'realtime-mycotoxin',
    name: 'RealTime Labs Mycotoxin Test',
    description:
      'Professional urine mycotoxin testing to measure toxic mold exposure in your body.',
    category: 'testing',
    url: 'https://amzn.to/40QzmPP',
    priority: 'essential',
  },
  {
    id: 'mosaic-mycotoxin',
    name: 'Mosaic Diagnostics Mycotoxin Test',
    description: 'Comprehensive mycotoxin panel - the exact test Kajsa used for her recovery.',
    category: 'testing',
    url: 'https://amzn.to/4hAXPOM',
    priority: 'essential',
  },
  {
    id: 'mymedlab',
    name: 'MyMedLab Direct Testing',
    description: 'Order professional lab tests directly without needing a practitioner referral.',
    category: 'testing',
    url: 'https://www.mymedlab.com/',
    priority: 'recommended',
  },

  // Nasal & Respiratory Support
  {
    id: 'xlear-nasal',
    name: 'Xlear Nasal Spray',
    description:
      'Xylitol-based nasal spray that breaks down biofilm and clears mold spores from sinuses.',
    category: 'respiratory',
    url: 'https://amzn.to/4hdKfB7',
    priority: 'essential',
  },
  {
    id: 'neti-pot',
    name: 'Neti Pot for Sinus Rinse',
    description:
      'Traditional nasal irrigation system for thorough sinus cleaning and mold spore removal.',
    category: 'respiratory',
    url: 'https://amzn.to/4hdKfB7',
    priority: 'recommended',
  },

  // Supplements for Detox Support
  {
    id: 'cellcore-protocol',
    name: 'Cellcore Advanced MYC Support Kit',
    description:
      'Complete mold detox protocol kit with comprehensive supplement system and detailed instructions.',
    category: 'supplements',
    url: 'https://cellcore.com/products/advanced-myc-support-kit',
    priority: 'essential',
    featured: true,
  },
  {
    id: 'neem-powder',
    name: 'Neem Powder - Natural Antifungal',
    description: 'Powerful natural antifungal supplement for combating mold and yeast overgrowth.',
    category: 'supplements',
    url: 'https://amzn.to/4hhLlvv',
    priority: 'recommended',
  },
  {
    id: 'biopure-o3',
    name: 'Biopure O3 Ozone Supplement',
    description:
      'Ozone-based supplement that helps eliminate mold and supports cellular detoxification.',
    category: 'supplements',
    url: 'https://biopureus.com/collections/binders',
    priority: 'recommended',
  },
  {
    id: 'activated-charcoal',
    name: 'Activated Charcoal Binder',
    description:
      'High-quality activated charcoal for binding and removing mycotoxins from the digestive tract.',
    category: 'supplements',
    url: 'https://amzn.to/4gl74kM',
    priority: 'essential',
  },
  {
    id: 'chlorella',
    name: 'Chlorella Binder',
    description:
      'Natural algae-based binder effective for mycotoxin removal and heavy metal detox.',
    category: 'supplements',
    url: 'https://amzn.to/4gfYqUJ',
    priority: 'essential',
  },
  {
    id: 'probiotic',
    name: 'High-Quality Probiotic',
    description: 'Multi-strain probiotic to restore gut health during and after mold detox.',
    category: 'supplements',
    url: 'https://amzn.to/4aGlXxb',
    priority: 'essential',
  },
  {
    id: 'quicksilver-ultra',
    name: 'QuickSilver Ultra Binder',
    description:
      'Advanced broad-spectrum binder for mycotoxins, heavy metals, and other biotoxins.',
    category: 'supplements',
    url: 'https://amzn.to/3CqwBeJ',
    priority: 'recommended',
  },
  {
    id: 'quicksilver-sensitive',
    name: 'QuickSilver Sensitive Binder',
    description: 'Gentle binder formula for sensitive individuals who react to stronger binders.',
    category: 'supplements',
    url: 'https://amzn.to/4gqtgdj',
    priority: 'optional',
  },
  {
    id: 'nac',
    name: 'NAC (N-Acetyl Cysteine)',
    description: 'Powerful antioxidant that supports liver detox and glutathione production.',
    category: 'supplements',
    url: 'https://amzn.to/4hhCOsq',
    priority: 'essential',
  },
  {
    id: 'omega-3',
    name: 'High-Quality Omega-3',
    description: 'Pure omega-3 fatty acids to reduce inflammation and support brain health.',
    category: 'supplements',
    url: 'https://amzn.to/3Q3YgoO',
    priority: 'essential',
  },
  {
    id: 'liposomal-glutathione',
    name: 'Liposomal Glutathione',
    description: 'Advanced absorption glutathione for enhanced cellular detoxification.',
    category: 'supplements',
    url: 'https://amzn.to/4aDMKdf',
    priority: 'recommended',
  },
  {
    id: 'melatonin',
    name: 'Melatonin for Brain Detox',
    description:
      'Supports glymphatic system drainage to remove mold toxins from the brain during sleep.',
    category: 'supplements',
    url: 'https://amzn.to/40CQbfL',
    priority: 'recommended',
  },
  {
    id: 'milk-thistle',
    name: 'Milk Thistle Liver Support',
    description: 'Protects and supports liver function during intensive detoxification.',
    category: 'supplements',
    url: 'https://amzn.to/3Eiku41',
    priority: 'essential',
  },
  {
    id: 'sulforaphane',
    name: 'Broccoli Sprouts (Sulforaphane)',
    description: 'Activates detox pathways and supports Phase II liver detoxification.',
    category: 'supplements',
    url: 'https://amzn.to/40RK7RZ',
    priority: 'recommended',
  },
  {
    id: 'dandelion-tea',
    name: 'Dandelion Tea for Kidney Support',
    description: 'Natural diuretic tea that supports kidney detox and toxin elimination.',
    category: 'supplements',
    url: 'https://amzn.to/4hlw7G4',
    priority: 'recommended',
  },
  {
    id: 'nettle-tea',
    name: 'Nettle Tea for Kidney Support',
    description: 'Herbal tea that supports kidney function and natural detoxification.',
    category: 'supplements',
    url: 'https://amzn.to/3Cys5e5',
    priority: 'recommended',
  },
  {
    id: 'calcium-d-glucarate',
    name: 'Calcium D-Glucarate',
    description:
      'Specialized supplement for detoxing estrogenic mycotoxins and supporting Phase II detox.',
    category: 'supplements',
    url: 'https://amzn.to/3ChzcHW',
    priority: 'recommended',
  },
  {
    id: 'dim',
    name: 'DIM (Diindolylmethane)',
    description: 'Balances hormones during detox and supports healthy estrogen metabolism.',
    category: 'supplements',
    url: 'https://amzn.to/42BaPzx',
    priority: 'optional',
  },
  {
    id: 'mold-tested-coffee',
    name: 'Mold-Tested Coffee',
    description: 'High-quality coffee that has been tested and certified to be free of mycotoxins.',
    category: 'supplements',
    url: 'https://fas.st/t/WVpaeofM',
    priority: 'optional',
  },
]

const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'air-purifiers', name: 'Air Purifiers & Home Protection', icon: '🏠' },
  { id: 'cleaning', name: 'Cleaning & Household Products', icon: '🧼' },
  { id: 'testing', name: 'Mold Testing Supplies', icon: '🧪' },
  { id: 'respiratory', name: 'Nasal & Respiratory Support', icon: '🫁' },
  { id: 'supplements', name: 'Supplements for Detox Support', icon: '💊' },
]

const priorities = [
  { id: 'all', name: 'All Priorities', color: 'gray' },
  { id: 'essential', name: 'Essential', color: 'red' },
  { id: 'recommended', name: 'Recommended', color: 'yellow' },
  { id: 'optional', name: 'Optional', color: 'green' },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPriority = selectedPriority === 'all' || product.priority === selectedPriority
    const matchesSearch =
      searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesPriority && matchesSearch
  })

  const featuredProducts = products.filter((product) => product.featured)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'recommended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'optional':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              🛍️ Recommended Products & Resources
            </h1>
            <p className="mx-auto mb-6 max-w-3xl text-xl text-gray-600">
              Carefully curated products from Kajsa&apos;s proven mold detox protocol. These are the
              exact items that helped thousands recover from mold toxicity.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-800">
              <Star className="h-4 w-4" />
              <span>All products are personally tested and recommended by Kajsa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <p className="text-center text-sm text-amber-800">
            <strong>Affiliate Disclosure:</strong> Some links below are affiliate links. We may earn
            a commission if you purchase through these links, at no additional cost to you. This
            helps support our mission to provide quality mold recovery education.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">⭐ Most Essential Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="relative rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg"
              >
                <div className="absolute -right-2 -top-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                  FEATURED
                </div>
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="flex-1 text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-medium ${getPriorityColor(product.priority)}`}
                  >
                    {product.priority.toUpperCase()}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{product.description}</p>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Product
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="lg:w-48">
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="flex-1 text-lg font-semibold leading-tight text-gray-900">
                  {product.name}
                </h3>
                <span
                  className={`ml-2 rounded-full border px-2 py-1 text-xs font-medium ${getPriorityColor(product.priority)}`}
                >
                  {product.priority === 'essential' ? 'MUST HAVE' : product.priority.toUpperCase()}
                </span>
              </div>

              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-800"
              >
                <ShoppingCart className="h-4 w-4" />
                View Product
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Bottom Disclaimer */}
        <div className="mt-12 rounded-xl bg-gray-100 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">⚖️ Important Disclaimers</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Educational Purposes Only:</strong> These product recommendations are for
              educational purposes only and are not medical advice. Always consult with qualified
              healthcare providers before starting any new supplements or treatments.
            </p>
            <p>
              <strong>Individual Results May Vary:</strong> What worked for Kajsa and others may not
              work for everyone. Mold illness requires individualized treatment approaches.
            </p>
            <p>
              <strong>Quality Matters:</strong> Always purchase supplements and products from
              reputable sources. Check expiration dates and storage requirements.
            </p>
            <p>
              <strong>Start Slowly:</strong> When beginning any detox protocol, start with small
              amounts and gradually increase as tolerated. Monitor your symptoms closely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

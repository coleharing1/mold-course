'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  ExternalLink,
  ShoppingCart,
  Star,
  Search,
  Grid3x3,
  List,
  Filter,
  Info,
  TrendingUp,
  Award,
  Shield,
  Sparkles,
  Package,
  ChevronRight,
  Heart,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  description: string
  category: string
  url: string
  price?: string
  originalPrice?: string
  priority: 'essential' | 'helpful' | 'optional'
  featured?: boolean
  rating?: number
  reviews?: number
  badge?: string
  highlights?: string[]
  discount?: number
  image?: string
}

// Category-based placeholder images (fallback only)
const getCategoryImage = (category: string) => {
  const categoryImages: Record<string, string> = {
    environmental: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    testing: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop',
    drainage: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    binders: 'https://images.unsplash.com/photo-1629321048873-e7f5e7261e0f?w=400&h=400&fit=crop',
    antifungals:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    supplements:
      'https://images.unsplash.com/photo-1596116762424-01639b22c9f0?w=400&h=400&fit=crop',
    diet: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    tools: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop',
  }
  return categoryImages[category] || categoryImages.supplements
}

const products: Product[] = [
  // Air Purifiers & Home Protection
  {
    id: '1',
    name: 'Levoit Air Purifier - Large Spaces',
    category: 'environmental',
    price: '$199.99',
    originalPrice: '$249.99',
    url: 'https://amzn.to/40QYaHu',
    description:
      'Professional-grade HEPA filter for larger rooms, removes 99.97% of mold spores and mycotoxins',
    priority: 'essential',
    rating: 4.6,
    reviews: 1842,
    badge: 'Kajsa Recommends',
    highlights: ['Covers 400+ sq ft', 'Medical-grade filtration', 'Smart sensor technology'],
    discount: 20,
    featured: true,
  },
  {
    id: '2',
    name: 'Levoit Air Purifier - Small Spaces',
    category: 'environmental',
    price: '$89.99',
    originalPrice: '$119.99',
    url: 'https://amzn.to/4gmodL7',
    description: 'Compact HEPA filter perfect for bedrooms and offices',
    priority: 'essential',
    rating: 4.5,
    reviews: 982,
    badge: 'Best Value',
    highlights: ['Covers 200 sq ft', 'Ultra-quiet sleep mode', 'Night light feature'],
    discount: 25,
  },
  {
    id: '3',
    name: 'Winix Carbon Filter',
    category: 'environmental',
    price: '$39.99',
    originalPrice: '$49.99',
    url: 'https://amzn.to/3PWNuRu',
    description: 'Advanced carbon filtration for VOCs and odor removal',
    priority: 'helpful',
    rating: 4.4,
    reviews: 523,
    highlights: ['Activated carbon layer', 'Reduces chemical odors', '6-month lifespan'],
    discount: 20,
  },
  {
    id: '4',
    name: 'Ozone Generator Machine',
    category: 'environmental',
    price: '$79.99',
    originalPrice: '$99.99',
    url: 'https://amzn.to/40EC9KN',
    description: 'Professional ozone generator for deep mold remediation',
    priority: 'optional',
    rating: 4.2,
    reviews: 189,
    badge: 'Professional',
    highlights: ['10,000mg/h output', 'Timer function', 'Use when away only'],
    discount: 20,
  },

  // Mold Cleaning & Household
  {
    id: '5',
    name: 'HomeBiotic Probiotic Spray',
    category: 'environmental',
    price: '$34.99',
    url: 'https://fas.st/t/qyRnWQZ1',
    description: 'Probiotic spray that creates protective microbiome in your home',
    priority: 'helpful',
    rating: 4.3,
    reviews: 412,
    badge: 'Innovative',
    highlights: ['Natural protection', 'Safe for pets', 'Monthly application'],
  },
  {
    id: '6',
    name: 'EC3 Mold Solution Wipes',
    category: 'environmental',
    price: '$19.99',
    url: 'https://fas.st/t/qyRnWQZ1',
    description: 'Professional-grade mold removal wipes for surfaces',
    priority: 'essential',
    rating: 4.5,
    reviews: 673,
    highlights: ['Kills mold on contact', 'Non-toxic formula', '50 wipes per pack'],
  },
  {
    id: '7',
    name: 'EC3 Laundry Additive',
    category: 'environmental',
    price: '$31.99',
    originalPrice: '$39.99',
    url: 'https://amzn.to/4heCH0V',
    description: 'Removes mold spores and mycotoxins from clothing and fabrics',
    priority: 'essential',
    rating: 4.6,
    reviews: 892,
    badge: 'Must Have',
    highlights: ['Safe for all fabrics', 'Unscented', 'HE washer compatible'],
    discount: 20,
    featured: true,
  },

  // Testing Supplies
  {
    id: '8',
    name: 'DIY Petri Dish Mold Test',
    category: 'testing',
    price: '$29.99',
    url: 'https://go.shopmy.us/p-12742306',
    description: 'At-home mold testing kit with petri dishes',
    priority: 'helpful',
    rating: 4.1,
    reviews: 234,
    highlights: ['5 test plates', 'Easy interpretation', 'No lab fees'],
  },
  {
    id: '9',
    name: 'Professional Lab Mold Test',
    category: 'testing',
    price: '$149.99',
    originalPrice: '$199.99',
    url: 'https://go.shopmy.us/p-9216116',
    description: 'Comprehensive lab analysis of home mold samples',
    priority: 'essential',
    rating: 4.7,
    reviews: 178,
    badge: 'Most Accurate',
    highlights: ['Lab analysis included', 'Species identification', 'Professional report'],
    discount: 25,
  },
  {
    id: '10',
    name: 'RealTime Labs Mycotoxin Test',
    category: 'testing',
    price: '$299.00',
    originalPrice: '$399.00',
    url: 'https://amzn.to/40QzmPP',
    description: 'Clinical-grade urine mycotoxin testing',
    priority: 'essential',
    rating: 4.8,
    reviews: 412,
    badge: 'Clinical Grade',
    highlights: ['15 mycotoxins tested', 'Doctor consultation', 'Treatment guidance'],
    discount: 25,
  },
  {
    id: '11',
    name: 'Mosaic Diagnostics MycoTOX',
    category: 'testing',
    price: '$339.00',
    url: 'https://amzn.to/4hAXPOM',
    description: 'Most comprehensive mycotoxin panel available',
    priority: 'essential',
    rating: 4.9,
    reviews: 523,
    badge: 'Gold Standard',
    highlights: ['40+ mycotoxins', 'LC-MS/MS technology', 'Practitioner support'],
    featured: true,
  },

  // Nasal & Respiratory Support
  {
    id: '12',
    name: 'Xlear Nasal Spray',
    category: 'drainage',
    price: '$11.99',
    originalPrice: '$14.99',
    url: 'https://amzn.to/4hdKfB7',
    description: 'Xylitol nasal spray for sinus mold clearance',
    priority: 'essential',
    rating: 4.5,
    reviews: 1923,
    badge: 'Top Rated',
    highlights: ['Natural xylitol', 'Drug-free', 'Daily use safe'],
    discount: 20,
  },
  {
    id: '13',
    name: 'Ceramic Neti Pot',
    category: 'drainage',
    price: '$19.99',
    url: 'https://amzn.to/4hdKfB7',
    description: 'Traditional neti pot for nasal irrigation',
    priority: 'helpful',
    rating: 4.3,
    reviews: 673,
    highlights: ['Lead-free ceramic', 'Comfortable design', 'Salt packets included'],
  },

  // Binders & Detox Supplements
  {
    id: '14',
    name: 'CellCore Advanced Myc Support Kit',
    category: 'binders',
    price: '$389.95',
    originalPrice: '$449.95',
    url: 'https://cellcore.com/products/advanced-myc-support-kit',
    description: 'Complete professional mold detox protocol',
    priority: 'essential',
    rating: 4.7,
    reviews: 234,
    badge: 'Professional',
    highlights: ['Full protocol', '4-month supply', 'Practitioner grade'],
    discount: 13,
    featured: true,
  },
  {
    id: '15',
    name: 'Organic Neem Powder',
    category: 'antifungals',
    price: '$16.99',
    url: 'https://amzn.to/4hhLlvv',
    description: 'Natural antifungal and antimicrobial support',
    priority: 'helpful',
    rating: 4.2,
    reviews: 156,
    highlights: ['Organic certified', 'Traditional remedy', 'Multi-purpose'],
  },
  {
    id: '16',
    name: 'BioPure O3 Binder',
    category: 'binders',
    price: '$89.95',
    url: 'https://biopureus.com/collections/binders',
    description: 'Advanced ozonated oil binder for mycotoxins',
    priority: 'helpful',
    rating: 4.6,
    reviews: 89,
    badge: 'Innovative',
    highlights: ['Ozonated oils', 'Enhanced binding', 'Gentle formula'],
  },
  {
    id: '17',
    name: 'Activated Charcoal',
    category: 'binders',
    price: '$19.99',
    originalPrice: '$24.99',
    url: 'https://amzn.to/4gl74kM',
    description: 'Premium coconut shell activated charcoal for mycotoxin binding',
    priority: 'essential',
    rating: 4.4,
    reviews: 782,
    badge: 'Best Seller',
    highlights: ['Ultra-fine powder', 'Food grade', 'High absorption'],
    discount: 20,
  },
  {
    id: '18',
    name: 'Organic Chlorella',
    category: 'binders',
    price: '$29.99',
    url: 'https://amzn.to/4gfYqUJ',
    description: 'Broken cell wall chlorella for optimal absorption',
    priority: 'helpful',
    rating: 4.5,
    reviews: 523,
    highlights: ['Organic certified', 'Broken cell wall', 'Heavy metal binding'],
  },
  {
    id: '19',
    name: 'Professional Probiotic',
    category: 'diet',
    price: '$49.99',
    originalPrice: '$59.99',
    url: 'https://amzn.to/4aGlXxb',
    description: '100 billion CFU professional-grade probiotic',
    priority: 'essential',
    rating: 4.7,
    reviews: 892,
    badge: 'Practitioner Grade',
    highlights: ['100 billion CFU', '24 strains', 'Acid-resistant'],
    discount: 17,
  },
  {
    id: '20',
    name: 'Quicksilver Ultra Binder',
    category: 'binders',
    price: '$94.99',
    originalPrice: '$119.99',
    url: 'https://amzn.to/3CqwBeJ',
    description: 'Universal toxin binder with multiple binding agents',
    priority: 'essential',
    rating: 4.8,
    reviews: 423,
    badge: 'Premium',
    highlights: ['9 binding agents', 'Broad spectrum', 'No constipation'],
    discount: 21,
    featured: true,
  },
  {
    id: '21',
    name: 'Quicksilver Binder Sensitive',
    category: 'binders',
    price: '$69.99',
    url: 'https://amzn.to/4gqtgdj',
    description: 'Gentle binder formula for sensitive individuals',
    priority: 'helpful',
    rating: 4.6,
    reviews: 234,
    badge: 'Gentle Formula',
    highlights: ['For sensitive systems', 'Low histamine', 'Gradual detox'],
  },
  {
    id: '22',
    name: 'NAC N-Acetylcysteine',
    category: 'antifungals',
    price: '$22.99',
    originalPrice: '$29.99',
    url: 'https://amzn.to/4hhCOsq',
    description: 'Glutathione precursor for liver support',
    priority: 'essential',
    rating: 4.5,
    reviews: 1234,
    highlights: ['600mg per capsule', 'Biofilm breaker', 'Antioxidant'],
    discount: 23,
  },
  {
    id: '23',
    name: 'Omega-3 Fish Oil',
    category: 'diet',
    price: '$34.99',
    originalPrice: '$44.99',
    url: 'https://amzn.to/3Q3YgoO',
    description: 'High-potency omega-3 for inflammation support',
    priority: 'helpful',
    rating: 4.6,
    reviews: 2341,
    badge: 'Top Quality',
    highlights: ['Molecularly distilled', 'No fishy taste', 'Third-party tested'],
    discount: 22,
  },
  {
    id: '24',
    name: 'Liposomal Glutathione',
    category: 'antifungals',
    price: '$54.99',
    originalPrice: '$69.99',
    url: 'https://amzn.to/4aDMKdf',
    description: 'Enhanced absorption glutathione for detox support',
    priority: 'helpful',
    rating: 4.7,
    reviews: 673,
    badge: 'Premium',
    highlights: ['Liposomal delivery', '500mg per serving', 'Lemon flavor'],
    discount: 21,
  },
  {
    id: '25',
    name: 'Melatonin 10mg',
    category: 'diet',
    price: '$12.99',
    url: 'https://amzn.to/40CQbfL',
    description: 'High-dose melatonin for immune and detox support',
    priority: 'optional',
    rating: 4.4,
    reviews: 892,
    highlights: ['10mg dose', 'Sustained release', 'Non-habit forming'],
  },
  {
    id: '26',
    name: 'Milk Thistle Extract',
    category: 'drainage',
    price: '$18.99',
    originalPrice: '$24.99',
    url: 'https://amzn.to/3Eiku41',
    description: 'Standardized silymarin for liver protection',
    priority: 'essential',
    rating: 4.5,
    reviews: 1567,
    highlights: ['80% silymarin', 'Liver support', 'Regenerative'],
    discount: 24,
  },
  {
    id: '27',
    name: 'Broccoli Sprout Extract',
    category: 'diet',
    price: '$32.99',
    url: 'https://amzn.to/40RK7RZ',
    description: 'Sulforaphane for detox pathway support',
    priority: 'helpful',
    rating: 4.6,
    reviews: 423,
    badge: 'Science-Backed',
    highlights: ['High sulforaphane', 'NRF2 activator', 'Antioxidant'],
  },
  {
    id: '28',
    name: 'Dandelion Tea',
    category: 'drainage',
    price: '$9.99',
    url: 'https://amzn.to/4hlw7G4',
    description: 'Organic dandelion tea for liver and kidney support',
    priority: 'helpful',
    rating: 4.3,
    reviews: 234,
    highlights: ['Organic', 'Caffeine-free', '30 tea bags'],
  },
  {
    id: '29',
    name: 'Nettle Leaf Tea',
    category: 'drainage',
    price: '$11.99',
    url: 'https://amzn.to/3Cys5e5',
    description: 'Mineral-rich nettle tea for kidney support',
    priority: 'helpful',
    rating: 4.4,
    reviews: 178,
    highlights: ['Wild-harvested', 'Mineral rich', 'Antihistamine'],
  },
  {
    id: '30',
    name: 'Calcium D-Glucarate',
    category: 'drainage',
    price: '$27.99',
    originalPrice: '$34.99',
    url: 'https://amzn.to/3ChzcHW',
    description: 'Supports Phase II liver detoxification',
    priority: 'helpful',
    rating: 4.5,
    reviews: 312,
    highlights: ['500mg per capsule', 'Hormone balance', 'Toxin elimination'],
    discount: 20,
  },
  {
    id: '31',
    name: 'DIM Supplement',
    category: 'drainage',
    price: '$29.99',
    url: 'https://amzn.to/42BaPzx',
    description: 'Diindolylmethane for estrogen metabolism',
    priority: 'optional',
    rating: 4.4,
    reviews: 523,
    highlights: ['200mg DIM', 'Hormone support', 'Cruciferous extract'],
  },
  {
    id: '32',
    name: 'Mold-Tested Coffee',
    category: 'diet',
    price: '$24.99',
    originalPrice: '$29.99',
    url: 'https://fas.st/t/WVpaeofM',
    description: 'Lab-tested coffee free from mold and mycotoxins',
    priority: 'helpful',
    rating: 4.7,
    reviews: 892,
    badge: 'Mold-Free',
    highlights: ['Lab tested', 'Organic', 'Low acidity'],
    discount: 17,
  },
  {
    id: '33',
    name: 'Pillow Protectors',
    category: 'environmental',
    price: '$22.99',
    originalPrice: '$29.99',
    url: 'https://amzn.to/3EcJ1HJ',
    description: 'Hypoallergenic pillow protectors block mold and allergens',
    priority: 'helpful',
    rating: 4.4,
    reviews: 1234,
    highlights: ['Waterproof', 'Breathable', 'Machine washable'],
    discount: 23,
  },
  {
    id: '34',
    name: 'Grounding Sheet',
    category: 'environmental',
    price: '$89.99',
    originalPrice: '$119.99',
    url: 'https://amzn.to/42Enn9v',
    description: 'Conductive grounding sheet for EMF protection and better sleep',
    priority: 'optional',
    rating: 4.2,
    reviews: 423,
    badge: 'Innovative',
    highlights: ['95% cotton', 'Conductive silver', 'Queen size'],
    discount: 25,
  },
  {
    id: '35',
    name: 'Shower Filter',
    category: 'environmental',
    price: '$34.99',
    originalPrice: '$44.99',
    url: 'https://amzn.to/413kvBT',
    description: 'Removes chlorine and mold from shower water',
    priority: 'helpful',
    rating: 4.5,
    reviews: 2341,
    highlights: ['15-stage filtration', 'Easy install', '6-month filter life'],
    discount: 22,
  },
  {
    id: '36',
    name: 'Under-Sink Water Filter',
    category: 'environmental',
    price: '$149.99',
    originalPrice: '$199.99',
    url: 'https://amzn.to/40UdPFU',
    description: 'Professional water filtration system removes mold and toxins',
    priority: 'essential',
    rating: 4.7,
    reviews: 673,
    badge: 'Professional',
    highlights: ['5-stage filtration', 'Removes 99% contaminants', '12-month filters'],
    discount: 25,
  },
]

const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️', count: products.length },
  {
    id: 'environmental',
    name: 'Air Purifiers & Home',
    icon: '🏠',
    count: products.filter((p) => p.category === 'environmental').length,
  },
  {
    id: 'testing',
    name: 'Mold Testing',
    icon: '🧪',
    count: products.filter((p) => p.category === 'testing').length,
  },
  {
    id: 'drainage',
    name: 'Drainage Support',
    icon: '🫁',
    count: products.filter((p) => p.category === 'drainage').length,
  },
  {
    id: 'binders',
    name: 'Binders',
    icon: '🧲',
    count: products.filter((p) => p.category === 'binders').length,
  },
  {
    id: 'antifungals',
    name: 'Antifungals',
    icon: '💊',
    count: products.filter((p) => p.category === 'antifungals').length,
  },
  {
    id: 'diet',
    name: 'Diet & Nutrition',
    icon: '🥗',
    count: products.filter((p) => p.category === 'diet').length,
  },
]

const priorities = [
  { id: 'all', name: 'All Priorities', color: 'gray' },
  { id: 'essential', name: 'Essential', color: 'red' },
  { id: 'helpful', name: 'Helpful', color: 'yellow' },
  { id: 'optional', name: 'Optional', color: 'green' },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [savedProducts, setSavedProducts] = useState<string[]>([])

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

  const resolveImage = (product: Product) => {
    // Direct mapping to enhanced images - bypass problematic URL-based system
    const enhancedImageMap: Record<string, string> = {
      '1': '/product-images-enhanced/1f3df07f5b60b244.png', // Levoit Air Purifier - Large
      '2': '/product-images-enhanced/15ebc89c8cb7767a.png', // Levoit Air Purifier - Small
      '3': '/product-images-enhanced/1ff0ec1aac74706c.png', // Winix Carbon Filter
      '4': '/product-images-enhanced/2841569d3f7cd42b.png', // Ozone Generator
      '5': '/product-images-enhanced/fa08ab7bd657b541.png', // HomeBiotic Spray
      '6': '/product-images-enhanced/fa08ab7bd657b541.png', // EC3 Wipes
      '7': '/product-images-enhanced/2e59b90cf221dab3.png', // EC3 Laundry
      '8': '/product-images-enhanced/4c53056fdaf1b113.png', // DIY Petri Dish (use different image)
      '9': '/product-images-enhanced/67c3dca86b4a24a1.png', // Professional Lab Test (use different image)
      '10': '/product-images-enhanced/62f33f6d1126f777.png', // RealTime Labs (use different image)
      '11': '/product-images-enhanced/7015d5de332f17a7.png', // Mosaic Diagnostics (use different image)
      '12': '/product-images-enhanced/5919d63dc3231679.png', // Xlear Nasal Spray
      '13': '/product-images-enhanced/6b29eaa9fdc81f06.png', // Neti Pot
      '14': '/product-images-enhanced/4c53056fdaf1b113.png', // CellCore Kit
      '15': '/product-images-enhanced/67c3dca86b4a24a1.png', // Neem Powder
      '16': '/product-images-enhanced/7015d5de332f17a7.png', // BioPure Binder
      '17': '/product-images-enhanced/b210955f357c81b3.png', // Activated Charcoal
      '18': '/product-images-enhanced/5b469160f9fa5def.png', // Organic Chlorella
      '19': '/product-images-enhanced/fa08ab7bd657b541.png', // Professional Probiotic
      '20': '/product-images-enhanced/ec5d3bbe7abe7c3c.png', // Quicksilver Ultra
      '21': '/product-images-enhanced/6b29eaa9fdc81f06.png', // Quicksilver Sensitive
      '22': '/product-images-enhanced/8bf79904bfd2e4a8.png', // NAC
      '23': '/product-images-enhanced/8573a3a2e100e958.png', // Omega-3
      '24': '/product-images-enhanced/ef8ba7972dffafed.png', // Liposomal Glutathione
      '25': '/product-images-enhanced/cd5c382150883b7e.png', // Melatonin
      '26': '/product-images-enhanced/cf43cd3fc4a9f375.png', // Milk Thistle
      '27': '/product-images-enhanced/cff48f6918a3658c.png', // Broccoli Sprout
      '28': '/product-images-enhanced/e971b65730143c51.png', // Dandelion Tea
      '29': '/product-images-enhanced/e971b65730143c51.png', // Nettle Tea
      '30': '/product-images-enhanced/62f33f6d1126f777.png', // Calcium D-Glucarate
      '31': '/product-images-enhanced/b93c0136f984b9df.png', // DIM Supplement
      '32': '/product-images-enhanced/babc777dde2bd085.png', // Mold-Tested Coffee
      '33': '/product-images-enhanced/9b81c02122b8c5f1.png', // Pillow Protectors
      '34': '/product-images-enhanced/9b81c02122b8c5f1.png', // Grounding Sheet
      '35': '/product-images-enhanced/0a758545c80653ad.png', // Shower Filter
      '36': '/product-images-enhanced/f8f4f8bc405cec63.png', // Under-Sink Filter
    }

    // Use enhanced images first, fallback to category placeholders
    return enhancedImageMap[product.id] || getCategoryImage(product.category)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'helpful':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'optional':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const toggleSaved = (productId: string) => {
    setSavedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent">
                  Kajsa&apos;s Recommended Products
                </h1>
              </div>
              <p className="text-gray-600">
                Carefully curated products from my proven mold detox protocol
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{featuredProducts.length}</div>
                <div className="text-xs text-gray-500">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{savedProducts.length}</div>
                <div className="text-xs text-gray-500">Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Badge variant="secondary" className="gap-1">
              <Award className="h-3 w-3" />
              Personally Tested
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Shield className="h-3 w-3" />
              Quality Verified
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Proven Results
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Updated Monthly
            </Badge>
          </div>
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="container mx-auto max-w-7xl px-4 py-2">
          <p className="text-center text-xs text-amber-800 lg:text-sm">
            <Info className="mr-1 inline h-3 w-3" />
            <strong>Affiliate Disclosure:</strong> Some links are affiliate links. Purchases support
            our mission at no extra cost to you.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Featured Products Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                Most Essential Products
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Start your recovery journey with these must-haves
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All Featured
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-2 border-blue-200 shadow-xl transition-all hover:shadow-2xl">
                  <div className="absolute right-2 top-2 z-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    FEATURED
                  </div>

                  {/* Standardized Product Image */}
                  <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <Image
                      src={resolveImage(product)}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.discount && (
                      <div className="absolute bottom-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base font-semibold leading-tight transition-colors group-hover:text-blue-600">
                        {product.name}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 flex-shrink-0 p-0"
                        onClick={() => toggleSaved(product.id)}
                      >
                        <Heart
                          className={cn(
                            'h-4 w-4',
                            savedProducts.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          )}
                        />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      {product.rating && renderStars(product.rating)}
                      {product.reviews && (
                        <span className="text-xs text-gray-500">
                          {product.reviews.toLocaleString()} reviews
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">{product.description}</p>

                    {product.highlights && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {product.highlights.slice(0, 3).map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="px-2 py-0.5 text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="mb-3 flex items-center justify-between">
                      {product.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">{product.price}</span>
                          {product.discount && (
                            <Badge className="bg-red-500 text-xs text-white">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                      )}
                      <Badge className={cn('text-xs', getPriorityColor(product.priority))}>
                        {product.priority === 'essential'
                          ? 'MUST HAVE'
                          : product.priority.toUpperCase()}
                      </Badge>
                    </div>

                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      View Product
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Filters & Search Bar */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                {/* Category Filter - Desktop */}
                <select
                  className="hidden rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:block"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name} ({category.count})
                    </option>
                  ))}
                </select>

                {/* Priority Filter - Desktop */}
                <select
                  className="hidden rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:block"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex rounded-lg bg-gray-100 p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-3 lg:hidden"
                >
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                    {priorities.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
          {savedProducts.length > 0 && (
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
              View Saved ({savedProducts.length})
            </Button>
          )}
        </div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group flex h-[420px] flex-col overflow-hidden transition-all hover:shadow-lg">
                    {/* Standardized Product Image */}
                    <div className="relative h-48 w-full border-b border-gray-200 bg-white">
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={resolveImage(product)}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      {product.discount && (
                        <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                          -{product.discount}%
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-2 h-7 w-7 bg-white/80 p-0 backdrop-blur-sm hover:bg-white"
                        onClick={() => toggleSaved(product.id)}
                      >
                        <Heart
                          className={cn(
                            'h-3.5 w-3.5',
                            savedProducts.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600'
                          )}
                        />
                      </Button>
                    </div>

                    <CardHeader className="px-4 pb-2 pt-4">
                      <CardTitle className="min-h-[2.5rem] text-sm font-semibold leading-tight transition-colors group-hover:text-blue-600">
                        {product.name}
                      </CardTitle>

                      {product.badge && (
                        <Badge variant="secondary" className="mb-1 mt-2 text-xs">
                          {product.badge}
                        </Badge>
                      )}

                      {product.rating && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-4 w-4',
                                  i < Math.floor(product.rating!)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col px-4 pb-4 pt-0">
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                        {product.description}
                      </p>

                      {product.highlights && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {product.highlights.slice(0, 3).map((highlight, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                          {product.highlights.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.highlights.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="mt-auto space-y-3">
                        <div className="flex items-center justify-between">
                          {product.price && (
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-gray-900">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                          )}
                          <Badge className={cn('text-xs', getPriorityColor(product.priority))}>
                            {product.priority}
                          </Badge>
                        </div>

                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md"
                        >
                          <Package className="h-4 w-4" />
                          View Product
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="transition-all hover:shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        {/* List View Image */}
                        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white md:h-32 md:w-32">
                          <Image
                            src={resolveImage(product)}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 112px, 128px"
                          />
                          {product.discount && (
                            <div className="absolute right-1 top-1 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                              -{product.discount}%
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => toggleSaved(product.id)}
                              >
                                <Heart
                                  className={cn(
                                    'h-4 w-4',
                                    savedProducts.includes(product.id)
                                      ? 'fill-red-500 text-red-500'
                                      : 'text-gray-400'
                                  )}
                                />
                              </Button>
                            </div>
                          </div>

                          <p className="mb-3 text-gray-600">{product.description}</p>

                          <div className="flex flex-wrap items-center gap-4">
                            {product.rating && renderStars(product.rating)}
                            {product.reviews && (
                              <span className="text-sm text-gray-500">
                                {product.reviews.toLocaleString()} reviews
                              </span>
                            )}
                            <Badge className={getPriorityColor(product.priority)}>
                              {product.priority === 'essential'
                                ? 'MUST HAVE'
                                : product.priority.toUpperCase()}
                            </Badge>
                            {product.highlights && (
                              <div className="flex gap-2">
                                {product.highlights.map((highlight, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between lg:w-48">
                          {product.price && (
                            <div className="mb-3 text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {product.price}
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  {product.originalPrice}
                                </div>
                              )}
                              {product.discount && (
                                <Badge className="mt-1 bg-red-500 text-white">
                                  Save {product.discount}%
                                </Badge>
                              )}
                            </div>
                          )}
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md lg:w-auto"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            View Product
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No products found</h3>
            <p className="mb-4 text-gray-600">Try adjusting your filters or search terms.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedPriority('all')
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <Card className="mt-12 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Need Personalized Recommendations?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              Take our comprehensive assessment to get product recommendations tailored to your
              specific symptoms and recovery stage.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Take Assessment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Shield className="h-5 w-5" />
              Important Disclaimers
            </h3>
            <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
              <div>
                <h4 className="mb-1 font-medium">Educational Purposes Only</h4>
                <p className="text-gray-600">
                  These product recommendations are for educational purposes only and are not
                  medical advice. Always consult with qualified healthcare providers.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-medium">Individual Results May Vary</h4>
                <p className="text-gray-600">
                  What worked for me and others may not work for everyone. Mold illness requires
                  individualized treatment approaches.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-medium">Quality Matters</h4>
                <p className="text-gray-600">
                  Always purchase supplements and products from reputable sources. Check expiration
                  dates and storage requirements.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-medium">Start Slowly</h4>
                <p className="text-gray-600">
                  When beginning any detox protocol, start with small amounts and gradually increase
                  as tolerated. Monitor your symptoms closely.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

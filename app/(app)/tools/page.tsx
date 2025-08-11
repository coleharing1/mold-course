/**
 * @fileoverview Interactive Tools Library - Main tools page showcasing all interactive tools
 * for mold detox protocols including assessment, tracking, planning, and management tools
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search,
  CheckSquare,
  Activity,
  Calculator,
  AlertTriangle,
  Utensils,
  Calendar,
  Home,
  TestTube,
  Shield,
  Lock,
  Unlock,
  Clock,
  TrendingUp,
  Heart,
  Brain,
  Pill,
  Sparkles
} from 'lucide-react'

interface Tool {
  id: string
  title: string
  description: string
  category: 'assessment' | 'tracking' | 'planning' | 'management'
  status: 'available' | 'locked' | 'coming-soon'
  href: string
  icon: React.ElementType
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites?: string[]
  features: string[]
  gating?: {
    required: string
    description: string
  }
}

const tools: Tool[] = [
  {
    id: 'exposure-checklist',
    title: 'Exposure & Dampness Checklist',
    description: 'Comprehensive room-by-room assessment to identify all sources of mold exposure in your environment',
    category: 'assessment',
    status: 'available',
    href: '/tools/exposure-checklist',
    icon: Home,
    duration: '15-30 min',
    difficulty: 'beginner',
    features: [
      'Room-by-room evaluation',
      'Photo documentation',
      'Risk scoring',
      'Fix-first recommendations',
      'Cost estimation'
    ]
  },
  {
    id: 'testing-decision-helper',
    title: 'Testing Decision Helper',
    description: 'Navigate complex testing options and choose the right environmental and medical tests for your situation',
    category: 'planning',
    status: 'available',
    href: '/tools/testing-decision-helper',
    icon: TestTube,
    duration: '10-15 min',
    difficulty: 'beginner',
    features: [
      'Personalized test recommendations',
      'Cost-benefit analysis',
      'Lab comparison',
      'Insurance navigation',
      'Timeline planning'
    ]
  },
  {
    id: 'drainage-readiness',
    title: 'Drainage Readiness Score',
    description: 'Critical safety tool that gates access to binders - track your drainage pathways until 80% ready',
    category: 'tracking',
    status: 'available',
    href: '/tools/drainage-readiness',
    icon: Activity,
    duration: '5 min daily',
    difficulty: 'intermediate',
    gating: {
      required: '80% for 7 consecutive days',
      description: 'Required before accessing Module 04: Binders'
    },
    features: [
      'Daily pathway tracking',
      '7-day rolling average',
      'Visual progress charts',
      'Safety gate enforcement',
      'Personalized suggestions'
    ]
  },
  {
    id: 'binder-timing-planner',
    title: 'Binder Timing Planner',
    description: 'Master complex medication and supplement timing to avoid interactions and maximize effectiveness',
    category: 'planning',
    status: 'available',
    href: '/tools/binder-timing-planner',
    icon: Clock,
    duration: '10-20 min',
    difficulty: 'intermediate',
    prerequisites: ['Module 04: Binders completed'],
    features: [
      'Medication conflict detection',
      'Visual daily schedule',
      'Push notifications',
      'Calendar integration',
      'Welchol combinations'
    ]
  },
  {
    id: 'herx-toolkit',
    title: 'Herx Reaction Toolkit',
    description: 'Comprehensive management system for tracking and treating Herxheimer reactions safely',
    category: 'management',
    status: 'available',
    href: '/tools/herx-toolkit',
    icon: AlertTriangle,
    duration: '5-15 min',
    difficulty: 'intermediate',
    features: [
      'Severity assessment (1-10 scale)',
      'Symptom pattern tracking',
      'Personalized relief protocols',
      'Emergency action plans',
      'Intervention tracking'
    ]
  },
  {
    id: 'sauna-ramp-up',
    title: 'Sauna Ramp-Up Protocol',
    description: 'Progressive heat therapy protocol to safely build tolerance and maximize mycotoxin elimination',
    category: 'planning',
    status: 'available',
    href: '/tools/sauna-ramp-up',
    icon: TrendingUp,
    duration: '5 min setup',
    difficulty: 'intermediate',
    features: [
      'Progressive temperature increases',
      'Time duration building',
      'Safety monitoring',
      'Heart rate tracking',
      'Hydration reminders'
    ]
  },
  {
    id: 'diet-builder',
    title: 'Anti-Inflammatory Diet Builder',
    description: 'Create personalized 7-day meal plans that eliminate mycotoxins and support detoxification',
    category: 'planning',
    status: 'available',
    href: '/tools/diet-builder',
    icon: Utensils,
    duration: '15-25 min',
    difficulty: 'beginner',
    features: [
      'Low-mold meal planning',
      'Anti-inflammatory recipes',
      'Shopping list generation',
      'Macro nutrient tracking',
      'Prep time estimation'
    ]
  },
  {
    id: 'retesting-scheduler',
    title: 'Retesting Scheduler',
    description: 'Track progress with optimal timing for follow-up tests and result interpretation',
    category: 'tracking',
    status: 'available',
    href: '/tools/retesting-scheduler',
    icon: Calendar,
    duration: '10 min',
    difficulty: 'intermediate',
    features: [
      'Optimal timing calculation',
      'Progress comparison',
      'Result interpretation',
      'Cost tracking',
      'Lab scheduling'
    ]
  },
  {
    id: 'protocol-builder',
    title: 'Protocol Builder',
    description: 'Create personalized mold detox protocols with drag-and-drop interface and conflict detection',
    category: 'planning',
    status: 'available',
    href: '/tools/protocol-builder',
    icon: Sparkles,
    duration: '20-30 min',
    difficulty: 'advanced',
    features: [
      'Drag-and-drop interface',
      'Conflict detection',
      'Timeline visualization',
      'Cost calculation',
      'Export to calendar'
    ]
  },
  {
    id: 're-exposure-triage',
    title: 'Re-exposure Emergency Triage',
    description: 'Immediate assessment and action plan for acute mold re-exposure situations',
    category: 'management',
    status: 'coming-soon',
    href: '/tools/re-exposure-triage',
    icon: Shield,
    duration: '5-10 min',
    difficulty: 'beginner',
    features: [
      'Rapid exposure assessment',
      'Immediate action protocols',
      'Symptom monitoring',
      'Recovery timeline',
      'Prevention strategies'
    ]
  },
  {
    id: 'supplement-scheduler',
    title: 'Supplement Scheduler',
    description: 'Optimize supplement timing and track mold detox support protocols with evidence-based recommendations',
    category: 'planning',
    status: 'available',
    href: '/tools/supplement-scheduler',
    icon: Pill,
    duration: '15-20 min',
    difficulty: 'intermediate',
    features: [
      'Phase-based protocols',
      'Interaction checking',
      'Cost optimization',
      'Evidence-based dosing',
      'Daily scheduling'
    ]
  },
  {
    id: 'progress-dashboard',
    title: 'Progress Dashboard',
    description: 'Comprehensive tracking of symptoms, biomarkers, and overall mold detox progress with analytics',
    category: 'tracking',
    status: 'available',
    href: '/tools/progress-dashboard',
    icon: TrendingUp,
    duration: '5-10 min daily',
    difficulty: 'beginner',
    features: [
      'Symptom tracking',
      'Biomarker trends',
      'Progress analytics',
      'Milestone tracking',
      'Export reports'
    ]
  }
]

const categories = [
  { id: 'all', label: 'All Tools', icon: Search },
  { id: 'assessment', label: 'Assessment', icon: CheckSquare },
  { id: 'tracking', label: 'Tracking', icon: Activity },
  { id: 'planning', label: 'Planning', icon: Calculator },
  { id: 'management', label: 'Management', icon: AlertTriangle }
]

const statusColors = {
  available: 'bg-green-100 text-green-800',
  locked: 'bg-yellow-100 text-yellow-800',
  'coming-soon': 'bg-gray-100 text-gray-800'
}

const difficultyColors = {
  beginner: 'bg-blue-100 text-blue-800',
  intermediate: 'bg-orange-100 text-orange-800',
  advanced: 'bg-red-100 text-red-800'
}

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTools, setFilteredTools] = useState(tools)

  useEffect(() => {
    let filtered = tools

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTools(filtered)
  }, [selectedCategory, searchTerm])

  const getStatusIcon = (status: Tool['status']) => {
    switch (status) {
      case 'available':
        return <Unlock className="h-4 w-4" />
      case 'locked':
        return <Lock className="h-4 w-4" />
      case 'coming-soon':
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: Tool['status']) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'locked':
        return 'Locked'
      case 'coming-soon':
        return 'Coming Soon'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Interactive Tools</h1>
        <p className="text-gray-600 text-lg mb-6">
          Powerful tools to guide your mold detox journey safely and effectively. Each tool provides personalized recommendations based on your unique situation.
        </p>
        
        {/* Critical Safety Notice */}
        <Card className="bg-red-50 border-red-200 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900">Critical Safety Notice</h3>
                <p className="text-red-800 text-sm mt-1">
                  Some tools are gated for your safety. The Drainage Readiness Score must reach 80% for 7 consecutive days before accessing binder protocols. This prevents dangerous Herxheimer reactions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">10</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">1</div>
            <div className="text-sm text-gray-600">Coming Soon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">11</div>
            <div className="text-sm text-gray-600">Total Tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon
          const isAvailable = tool.status === 'available'
          
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full transition-all duration-200 ${
                isAvailable 
                  ? 'hover:shadow-lg cursor-pointer hover:-translate-y-1' 
                  : 'opacity-75'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isAvailable ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className={statusColors[tool.status]}>
                          {getStatusIcon(tool.status)}
                          <span className="ml-1">{getStatusText(tool.status)}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Gating Info */}
                    {tool.gating && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">Gated Access</span>
                        </div>
                        <p className="text-xs text-yellow-700">{tool.gating.description}</p>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className={difficultyColors[tool.difficulty]}>
                        {tool.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {tool.duration}
                      </Badge>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {tool.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                        {tool.features.length > 3 && (
                          <li className="text-gray-500">+{tool.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {isAvailable ? (
                        <Link href={tool.href}>
                          <Button className="w-full">
                            Open Tool
                          </Button>
                        </Link>
                      ) : tool.status === 'locked' ? (
                        <Button variant="outline" disabled className="w-full">
                          <Lock className="h-4 w-4 mr-2" />
                          Complete Prerequisites
                        </Button>
                      ) : (
                        <Button variant="outline" disabled className="w-full">
                          <Clock className="h-4 w-4 mr-2" />
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help Choosing?</h3>
              <p className="text-blue-800 text-sm mb-3">
                Start with the Exposure Checklist to identify all mold sources, then use the Drainage Readiness Score to prepare for detox protocols safely.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/tools/exposure-checklist">
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Start with Exposure Assessment
                  </Button>
                </Link>
                <Link href="/help">
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Get Help
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

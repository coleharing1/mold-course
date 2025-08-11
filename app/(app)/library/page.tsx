/**
 * @fileoverview Resource Library Page - Comprehensive downloadable resource center
 */

'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Download, 
  FileText, 
  CheckSquare, 
  Calculator,
  ClipboardList,
  BookOpen,
  Shield,
  AlertTriangle,
  Clock,
  Filter,
  Grid,
  List,
  Star,
  Eye,
  Package
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Resource {
  id: string
  title: string
  description: string
  category: 'checklist' | 'guide' | 'template' | 'calculator' | 'reference' | 'emergency'
  module?: string
  tags: string[]
  featured: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  size: string
  downloadCount: number
  lastUpdated: string
  filename: string
  preview?: boolean
}

// Comprehensive resource library data
const resourceLibrary: Resource[] = [
  // Featured Resources
  {
    id: 'exposure-checklist',
    title: 'Ultimate Exposure Assessment',
    description: 'Comprehensive room-by-room checklist covering all potential mold sources including hidden areas, HVAC systems, and vehicles',
    category: 'checklist',
    module: 'Module 01',
    tags: ['inspection', 'assessment', 'mold-detection', 'home'],
    featured: true,
    difficulty: 'beginner',
    size: '12 pages',
    downloadCount: 2847,
    lastUpdated: '2024-01-15',
    filename: 'ultimate-exposure-checklist.pdf',
    preview: true
  },
  {
    id: 'drainage-protocol',
    title: 'Complete Drainage Protocol Guide',
    description: 'Step-by-step protocols for optimizing all 5 drainage pathways with specific supplements, dosages, and timing',
    category: 'guide',
    module: 'Module 03',
    tags: ['drainage', 'detox', 'supplements', 'protocol'],
    featured: true,
    difficulty: 'intermediate',
    size: '28 pages',
    downloadCount: 3421,
    lastUpdated: '2024-01-12',
    filename: 'complete-drainage-protocol.pdf',
    preview: true
  },
  {
    id: 'emergency-herx-kit',
    title: 'Emergency Herx Response Kit',
    description: 'Critical protocols for managing severe Herxheimer reactions including when to seek emergency care',
    category: 'emergency',
    module: 'Module 06',
    tags: ['herx', 'emergency', 'crisis', 'safety'],
    featured: true,
    difficulty: 'advanced',
    size: '8 pages',
    downloadCount: 1923,
    lastUpdated: '2024-01-10',
    filename: 'emergency-herx-kit.pdf',
    preview: true
  },

  // Checklists
  {
    id: 'daily-tracker',
    title: 'Daily Symptom & Progress Tracker',
    description: 'Printable daily tracker for symptoms, supplements, and drainage metrics with trend analysis',
    category: 'checklist',
    tags: ['tracking', 'symptoms', 'daily', 'progress'],
    featured: false,
    difficulty: 'beginner',
    size: '4 pages',
    downloadCount: 1876,
    lastUpdated: '2024-01-08',
    filename: 'daily-tracker.pdf'
  },
  {
    id: 'supplement-timing',
    title: 'Supplement Timing Checklist',
    description: 'Optimized timing chart for all supplements to avoid interactions and maximize absorption',
    category: 'checklist',
    module: 'Module 04',
    tags: ['supplements', 'timing', 'binders', 'schedule'],
    featured: false,
    difficulty: 'intermediate',
    size: '6 pages',
    downloadCount: 2156,
    lastUpdated: '2024-01-05',
    filename: 'supplement-timing-checklist.pdf'
  },
  {
    id: 'doctor-visit-prep',
    title: 'Doctor Visit Preparation Checklist',
    description: 'Comprehensive checklist to prepare for medical appointments with test results, symptoms, and questions',
    category: 'checklist',
    tags: ['medical', 'doctor', 'preparation', 'advocacy'],
    featured: false,
    difficulty: 'beginner',
    size: '3 pages',
    downloadCount: 987,
    lastUpdated: '2024-01-03',
    filename: 'doctor-visit-prep.pdf'
  },

  // Guides
  {
    id: 'mold-identification',
    title: 'Visual Mold Identification Guide',
    description: 'Detailed visual guide with photos showing different mold types, colors, and growth patterns',
    category: 'guide',
    module: 'Module 01',
    tags: ['identification', 'visual', 'mold-types', 'photos'],
    featured: false,
    difficulty: 'beginner',
    size: '20 pages',
    downloadCount: 3245,
    lastUpdated: '2024-01-14',
    filename: 'mold-identification-guide.pdf',
    preview: true
  },
  {
    id: 'low-mold-diet',
    title: 'Complete Low-Mold Diet Guide',
    description: 'Comprehensive guide to eliminating dietary mycotoxins with meal plans, recipes, and shopping lists',
    category: 'guide',
    module: 'Module 08',
    tags: ['diet', 'nutrition', 'meal-plans', 'recipes'],
    featured: false,
    difficulty: 'intermediate',
    size: '35 pages',
    downloadCount: 2987,
    lastUpdated: '2024-01-11',
    filename: 'low-mold-diet-guide.pdf',
    preview: true
  },
  {
    id: 'testing-interpretation',
    title: 'Lab Results Interpretation Guide',
    description: 'How to read and understand mycotoxin tests, VCS results, and other mold-related lab work',
    category: 'guide',
    module: 'Module 02',
    tags: ['testing', 'lab-results', 'interpretation', 'medical'],
    featured: false,
    difficulty: 'advanced',
    size: '18 pages',
    downloadCount: 1654,
    lastUpdated: '2024-01-09',
    filename: 'testing-interpretation-guide.pdf'
  },

  // Templates
  {
    id: 'landlord-letter',
    title: 'Landlord Mold Notification Template',
    description: 'Legal template for notifying landlords about mold issues with proper documentation requirements',
    category: 'template',
    tags: ['legal', 'landlord', 'notification', 'documentation'],
    featured: false,
    difficulty: 'beginner',
    size: '2 pages',
    downloadCount: 654,
    lastUpdated: '2024-01-07',
    filename: 'landlord-notification-template.pdf'
  },
  {
    id: 'insurance-appeal',
    title: 'Insurance Appeal Template',
    description: 'Template for appealing insurance denials for mold-related testing and treatment',
    category: 'template',
    tags: ['insurance', 'appeal', 'medical', 'advocacy'],
    featured: false,
    difficulty: 'intermediate',
    size: '4 pages',
    downloadCount: 432,
    lastUpdated: '2024-01-06',
    filename: 'insurance-appeal-template.pdf'
  },
  {
    id: 'inspector-brief',
    title: 'Professional Inspector Brief',
    description: 'Template to brief environmental inspectors on mold-specific concerns and testing priorities',
    category: 'template',
    tags: ['inspector', 'professional', 'briefing', 'testing'],
    featured: false,
    difficulty: 'intermediate',
    size: '3 pages',
    downloadCount: 543,
    lastUpdated: '2024-01-04',
    filename: 'inspector-brief-template.pdf'
  },

  // Calculators & Tools
  {
    id: 'dose-calculator',
    title: 'Supplement Dose Calculator',
    description: 'Interactive calculator for determining optimal supplement doses based on body weight and severity',
    category: 'calculator',
    module: 'Module 04',
    tags: ['calculator', 'dosing', 'supplements', 'personalization'],
    featured: false,
    difficulty: 'intermediate',
    size: '1 page',
    downloadCount: 1234,
    lastUpdated: '2024-01-13',
    filename: 'dose-calculator.pdf'
  },
  {
    id: 'cost-estimator',
    title: 'Treatment Cost Estimator',
    description: 'Comprehensive cost calculator for supplements, testing, and professional services',
    category: 'calculator',
    tags: ['cost', 'budget', 'planning', 'calculator'],
    featured: false,
    difficulty: 'beginner',
    size: '2 pages',
    downloadCount: 876,
    lastUpdated: '2024-01-02',
    filename: 'cost-estimator.pdf'
  },

  // Reference Materials
  {
    id: 'quick-reference',
    title: 'Quick Reference Card',
    description: 'Wallet-sized reference card with emergency contacts, key dosages, and warning signs',
    category: 'reference',
    tags: ['reference', 'emergency', 'quick', 'portable'],
    featured: false,
    difficulty: 'beginner',
    size: '1 page',
    downloadCount: 2134,
    lastUpdated: '2024-01-01',
    filename: 'quick-reference-card.pdf'
  },
  {
    id: 'supplement-interactions',
    title: 'Supplement Interaction Reference',
    description: 'Comprehensive reference of supplement interactions, contraindications, and timing requirements',
    category: 'reference',
    module: 'Module 04',
    tags: ['supplements', 'interactions', 'contraindications', 'safety'],
    featured: false,
    difficulty: 'advanced',
    size: '14 pages',
    downloadCount: 1456,
    lastUpdated: '2024-01-15',
    filename: 'supplement-interactions.pdf'
  },
  
  // Additional Template Resources
  {
    id: 'insurance-appeal',
    title: 'Insurance Appeal Template',
    description: 'Template for appealing insurance denials for mold-related testing and treatment',
    category: 'template',
    tags: ['insurance', 'appeal', 'medical', 'advocacy'],
    featured: false,
    difficulty: 'intermediate',
    size: '4 pages',
    downloadCount: 432,
    lastUpdated: '2024-01-06',
    filename: 'insurance-appeal-template.pdf'
  },
  {
    id: 'inspector-brief',
    title: 'Professional Inspector Brief',
    description: 'Template to brief environmental inspectors on mold-specific concerns and testing priorities',
    category: 'template',
    tags: ['inspector', 'professional', 'briefing', 'testing'],
    featured: false,
    difficulty: 'intermediate',
    size: '3 pages',
    downloadCount: 543,
    lastUpdated: '2024-01-04',
    filename: 'inspector-brief-template.pdf'
  },
  
  // Additional Reference Materials
  {
    id: 'testing-interpretation',
    title: 'Lab Results Interpretation Guide',
    description: 'How to read and understand mycotoxin tests, VCS results, and other mold-related lab work',
    category: 'guide',
    module: 'Module 02',
    tags: ['testing', 'lab-results', 'interpretation', 'medical'],
    featured: false,
    difficulty: 'advanced',
    size: '18 pages',
    downloadCount: 1654,
    lastUpdated: '2024-01-09',
    filename: 'testing-interpretation-guide.pdf'
  },
  
  // Expanded Calculator Resources
  {
    id: 'drainage-score-tracker',
    title: 'Drainage Readiness Score Tracker',
    description: 'Daily tracking calculator for achieving 80% drainage readiness with automated scoring',
    category: 'calculator',
    module: 'Module 03',
    tags: ['drainage', 'tracking', 'readiness', 'calculator'],
    featured: false,
    difficulty: 'intermediate',
    size: '3 pages',
    downloadCount: 2156,
    lastUpdated: '2024-01-12',
    filename: 'drainage-score-tracker.pdf'
  },
  {
    id: 'herx-severity-calculator',
    title: 'Herx Severity Assessment Tool',
    description: 'Systematic calculator for assessing Herxheimer reaction severity and determining response protocol',
    category: 'calculator',
    module: 'Module 06',
    tags: ['herx', 'assessment', 'severity', 'protocol'],
    featured: false,
    difficulty: 'advanced',
    size: '2 pages',
    downloadCount: 987,
    lastUpdated: '2024-01-08',
    filename: 'herx-severity-calculator.pdf'
  },
  
  // Advanced Guide Resources
  {
    id: 'vcs-test-guide',
    title: 'VCS Test Complete Guide',
    description: 'Comprehensive guide to Visual Contrast Sensitivity testing, interpretation, and tracking',
    category: 'guide',
    module: 'Module 02',
    tags: ['vcs', 'testing', 'neurological', 'tracking'],
    featured: false,
    difficulty: 'intermediate',
    size: '12 pages',
    downloadCount: 1234,
    lastUpdated: '2024-01-11',
    filename: 'vcs-test-guide.pdf'
  },
  {
    id: 'binder-selection-guide',
    title: 'Binder Selection & Optimization Guide',
    description: 'Advanced guide for choosing the right binders based on mycotoxin type and individual factors',
    category: 'guide',
    module: 'Module 04',
    tags: ['binders', 'selection', 'optimization', 'personalization'],
    featured: false,
    difficulty: 'advanced',
    size: '16 pages',
    downloadCount: 1876,
    lastUpdated: '2024-01-13',
    filename: 'binder-selection-guide.pdf'
  },
  
  // Specialized Checklists
  {
    id: 'workplace-assessment',
    title: 'Workplace Mold Assessment Checklist',
    description: 'Comprehensive checklist for identifying mold exposure risks in office and work environments',
    category: 'checklist',
    module: 'Module 01',
    tags: ['workplace', 'assessment', 'office', 'environment'],
    featured: false,
    difficulty: 'beginner',
    size: '7 pages',
    downloadCount: 765,
    lastUpdated: '2024-01-07',
    filename: 'workplace-assessment-checklist.pdf'
  },
  {
    id: 'travel-protocol',
    title: 'Travel & Hotel Safety Checklist',
    description: 'Essential checklist for avoiding mold exposure while traveling and staying in hotels',
    category: 'checklist',
    tags: ['travel', 'hotels', 'safety', 'prevention'],
    featured: false,
    difficulty: 'beginner',
    size: '4 pages',
    downloadCount: 892,
    lastUpdated: '2024-01-05',
    filename: 'travel-protocol-checklist.pdf'
  }
]

const categories = [
  { id: 'all', label: 'All Resources', icon: Grid },
  { id: 'checklist', label: 'Checklists', icon: CheckSquare },
  { id: 'guide', label: 'Guides', icon: BookOpen },
  { id: 'template', label: 'Templates', icon: FileText },
  { id: 'calculator', label: 'Calculators', icon: Calculator },
  { id: 'reference', label: 'Reference', icon: ClipboardList },
  { id: 'emergency', label: 'Emergency', icon: AlertTriangle }
]

const difficulties = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' }
]

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'alphabetical'>('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = resourceLibrary.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    // Sort resources
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.downloadCount - a.downloadCount)
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    } else {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const featuredResources = resourceLibrary.filter(resource => resource.featured)

  const handleDownload = async (resource: Resource) => {
    // Placeholder download functionality
    console.log('Downloading:', resource.filename)
    // In real implementation, this would trigger actual download
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category)
    return categoryData?.icon || FileText
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
            <p className="text-gray-600">
              Comprehensive collection of downloadable guides, checklists, and tools for your mold detox journey
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{resourceLibrary.length}</div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{featuredResources.length}</div>
            <div className="text-sm text-gray-600">Featured</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {resourceLibrary.reduce((sum, r) => sum + r.downloadCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-600">Module Coverage</div>
          </Card>
        </div>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => {
              const CategoryIcon = getCategoryIcon(resource.category)
              return (
                <Card key={resource.id} className="border-2 border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5 text-yellow-600" />
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                        <Badge className={cn('text-xs', getDifficultyColor(resource.difficulty))}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{resource.size}</span>
                      <span>{resource.downloadCount.toLocaleString()} downloads</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {resource.preview && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(resource)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse All</TabsTrigger>
          <TabsTrigger value="by-module">By Module</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Bar */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Filter by:</span>
                </div>

                {/* Category Filter */}
                <div className="flex gap-1">
                  {categories.map((category) => {
                    const CategoryIcon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          'flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors',
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                      >
                        <CategoryIcon className="w-3 h-3" />
                        {category.label}
                      </button>
                    )
                  })}
                </div>

                {/* Difficulty Filter */}
                <div className="flex gap-1">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={cn(
                        'px-3 py-1.5 text-sm rounded-md transition-colors',
                        selectedDifficulty === difficulty.id
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      {difficulty.label}
                    </button>
                  ))}
                </div>

                {/* Sort Options */}
                <div className="flex gap-1 ml-auto">
                  <button
                    onClick={() => setSortBy('popular')}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-md transition-colors',
                      sortBy === 'popular' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    Popular
                  </button>
                  <button
                    onClick={() => setSortBy('recent')}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-md transition-colors',
                      sortBy === 'recent' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    Recent
                  </button>
                  <button
                    onClick={() => setSortBy('alphabetical')}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-md transition-colors',
                      sortBy === 'alphabetical' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    A-Z
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-l-md transition-colors',
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded-r-md transition-colors',
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredResources.length} of {resourceLibrary.length} resources
            </p>
          </div>

          {/* Resource Grid/List */}
          <div className={cn(
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          )}>
            {filteredResources.map((resource) => {
              const CategoryIcon = getCategoryIcon(resource.category)
              
              if (viewMode === 'list') {
                return (
                  <Card key={resource.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{resource.title}</h3>
                          {resource.module && (
                            <Badge variant="outline" className="text-xs">
                              {resource.module}
                            </Badge>
                          )}
                          <Badge className={cn('text-xs', getDifficultyColor(resource.difficulty))}>
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{resource.size}</span>
                          <span>{resource.downloadCount.toLocaleString()} downloads</span>
                          <span>Updated {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        {resource.preview && (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" onClick={() => handleDownload(resource)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              }

              return (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5 text-gray-600" />
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                      <Badge className={cn('text-xs', getDifficultyColor(resource.difficulty))}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{resource.size}</span>
                      <span>{resource.downloadCount.toLocaleString()} downloads</span>
                    </div>
                    
                    {resource.module && (
                      <Badge variant="outline" className="mb-4 text-xs">
                        {resource.module}
                      </Badge>
                    )}
                    
                    <div className="flex gap-2">
                      {resource.preview && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(resource)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredResources.length === 0 && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                }}
              >
                Clear all filters
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="by-module" className="space-y-6">
          {Array.from(new Set(resourceLibrary.filter(r => r.module).map(r => r.module))).map(module => {
            const moduleResources = resourceLibrary.filter(r => r.module === module)
            return (
              <Card key={module} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{module}</h3>
                  <Badge variant="outline">{moduleResources.length} resources</Badge>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moduleResources.map((resource) => {
                    const CategoryIcon = getCategoryIcon(resource.category)
                    return (
                      <Card key={resource.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="w-4 h-4 text-gray-600" />
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                          </div>
                          <Badge className={cn('text-xs', getDifficultyColor(resource.difficulty))}>
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">{resource.title}</h4>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{resource.size}</span>
                          <span>{resource.downloadCount.toLocaleString()} downloads</span>
                        </div>
                        <div className="flex gap-2">
                          {resource.preview && (
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          )}
                          <Button size="sm" className="flex-1 text-xs" onClick={() => handleDownload(resource)}>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceLibrary
              .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
              .slice(0, 12)
              .map((resource) => {
                const CategoryIcon = getCategoryIcon(resource.category)
                const daysSinceUpdate = Math.floor((new Date().getTime() - new Date(resource.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
                
                return (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-5 h-5 text-gray-600" />
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                          {daysSinceUpdate <= 7 && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              New!
                            </Badge>
                          )}
                        </div>
                        <Badge className={cn('text-xs', getDifficultyColor(resource.difficulty))}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{resource.size}</span>
                        <span>{resource.downloadCount.toLocaleString()} downloads</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>Updated {daysSinceUpdate} days ago</span>
                        {resource.module && (
                          <Badge variant="outline" className="text-xs">
                            {resource.module}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {resource.preview && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

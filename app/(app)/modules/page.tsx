'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  BookOpen, 
  Lock, 
  CheckCircle, 
  PlayCircle,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// This will eventually come from Contentlayer
const modules = [
  {
    id: '00-quick-start',
    title: 'Quick Start Guide',
    description: 'Your first 5 essential steps to begin mold detoxification safely and effectively',
    moduleNumber: 0,
    duration: '30 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 100,
    status: 'completed',
    lessons: 5,
    completedLessons: 5,
  },
  {
    id: '01-identify-exposure',
    title: 'Identify Exposure',
    description: 'Find and eliminate all mold sources in your home, workplace, and vehicle',
    moduleNumber: 1,
    duration: '45 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 60,
    status: 'in-progress',
    lessons: 8,
    completedLessons: 5,
  },
  {
    id: '02-testing-diagnosis',
    title: 'Testing & Diagnosis',
    description: 'Understand environmental and medical testing options for mold exposure',
    moduleNumber: 2,
    duration: '60 minutes',
    difficulty: 'intermediate',
    category: 'assessment',
    progress: 0,
    status: 'locked',
    lessons: 10,
    completedLessons: 0,
  },
  {
    id: '03-drainage-pathways',
    title: 'Open Drainage Pathways',
    description: 'Prepare your body for safe detoxification by optimizing elimination routes',
    moduleNumber: 3,
    duration: '90 minutes',
    difficulty: 'intermediate',
    category: 'detox',
    progress: 0,
    status: 'locked',
    lessons: 7,
    completedLessons: 0,
  },
  {
    id: '04-mycotoxin-binders',
    title: 'Mycotoxin Binders',
    description: 'Master the use of binding agents to safely remove mycotoxins from your body',
    moduleNumber: 4,
    duration: '90 minutes',
    difficulty: 'intermediate',
    category: 'detox',
    progress: 0,
    status: 'locked',
    lessons: 9,
    completedLessons: 0,
  },
  {
    id: '05-antifungals',
    title: 'Antifungals',
    description: 'Learn when and how to use antifungal treatments for fungal colonization',
    moduleNumber: 5,
    duration: '75 minutes',
    difficulty: 'advanced',
    category: 'treatment',
    progress: 0,
    status: 'locked',
    lessons: 8,
    completedLessons: 0,
  },
  {
    id: '06-herx-management',
    title: 'Herx Management',
    description: 'Safely manage die-off reactions during your detox protocol',
    moduleNumber: 6,
    duration: '60 minutes',
    difficulty: 'intermediate',
    category: 'treatment',
    progress: 0,
    status: 'locked',
    lessons: 6,
    completedLessons: 0,
  },
  {
    id: '07-supportive-modalities',
    title: 'Supportive Modalities',
    description: 'Accelerate healing with sauna, HBOT, peptides, and other therapies',
    moduleNumber: 7,
    duration: '90 minutes',
    difficulty: 'intermediate',
    category: 'lifestyle',
    progress: 0,
    status: 'locked',
    lessons: 10,
    completedLessons: 0,
  },
  {
    id: '08-diet-nutrition',
    title: 'Diet & Nutrition',
    description: 'Stop feeding mold and support detox with an anti-inflammatory diet',
    moduleNumber: 8,
    duration: '75 minutes',
    difficulty: 'beginner',
    category: 'lifestyle',
    progress: 0,
    status: 'locked',
    lessons: 8,
    completedLessons: 0,
  },
  {
    id: '09-retesting-prevention',
    title: 'Retesting & Prevention',
    description: 'Verify recovery and prevent relapse with testing and prevention strategies',
    moduleNumber: 9,
    duration: '60 minutes',
    difficulty: 'intermediate',
    category: 'maintenance',
    progress: 0,
    status: 'locked',
    lessons: 7,
    completedLessons: 0,
  },
  {
    id: '10-advanced-protocols',
    title: 'Advanced Protocols',
    description: 'Advanced therapies for complex cases including IV treatments and peptides',
    moduleNumber: 10,
    duration: '90 minutes',
    difficulty: 'advanced',
    category: 'treatment',
    progress: 0,
    status: 'locked',
    lessons: 12,
    completedLessons: 0,
  },
]

const categories = [
  { id: 'all', label: 'All Modules', count: modules.length },
  { id: 'foundation', label: 'Foundation', count: 2 },
  { id: 'assessment', label: 'Assessment', count: 1 },
  { id: 'detox', label: 'Detoxification', count: 2 },
  { id: 'treatment', label: 'Treatment', count: 3 },
  { id: 'lifestyle', label: 'Lifestyle', count: 2 },
  { id: 'maintenance', label: 'Maintenance', count: 1 },
]

export default function ModulesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  // Filter modules based on search and filters
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          module.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Calculate overall progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0)
  const completedLessons = modules.reduce((sum, m) => sum + m.completedLessons, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress': return <PlayCircle className="h-5 w-5 text-blue-600" />
      case 'locked': return <Lock className="h-5 w-5 text-gray-400" />
      default: return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Recovery Modules
        </h1>
        <p className="text-gray-600">
          Structured lessons to guide you through mold illness recovery
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 bg-gradient-to-r from-primary-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Your Progress</CardTitle>
              <CardDescription>
                {completedLessons} of {totalLessons} lessons completed
              </CardDescription>
            </div>
            <div className="text-3xl font-bold text-primary-600">
              {overallProgress}%
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3" />
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>1 Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <PlayCircle className="h-4 w-4 text-blue-600" />
                <span>1 In Progress</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-4 w-4 text-gray-400" />
                <span>9 Locked</span>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <TrendingUp className="h-4 w-4 mr-1" />
              View Detailed Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <Card 
            key={module.id} 
            className={`relative overflow-hidden transition-all hover:shadow-lg ${
              module.status === 'locked' ? 'opacity-75' : ''
            }`}
          >
            {/* Progress bar at top */}
            {module.progress > 0 && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                <div 
                  className="h-full bg-primary-600 transition-all"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            )}

            <CardHeader className="pt-6">
              <div className="flex items-start justify-between mb-2">
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
                {getStatusIcon(module.status)}
              </div>
              <CardTitle className="text-xl">
                Module {String(module.moduleNumber).padStart(2, '0')}: {module.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {module.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {module.lessons} lessons
                </div>
                {module.completedLessons > 0 && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {module.completedLessons} completed
                  </div>
                )}
              </div>

              {module.status === 'locked' ? (
                <Button variant="outline" disabled className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Complete previous module to unlock
                </Button>
              ) : module.status === 'in-progress' ? (
                <Link href={`/modules/${module.id}`}>
                  <Button className="w-full">
                    Continue Learning
                  </Button>
                </Link>
              ) : module.status === 'completed' ? (
                <Link href={`/modules/${module.id}`}>
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Review Module
                  </Button>
                </Link>
              ) : (
                <Link href={`/modules/${module.id}`}>
                  <Button className="w-full">
                    Start Module
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No modules found matching your criteria</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedDifficulty('all')
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
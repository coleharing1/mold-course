'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  Clock,
  Award,
  Target
} from 'lucide-react'
import Link from 'next/link'
import { useProgress } from '@/hooks/use-progress'

interface ModuleProgress {
  id: string
  title: string
  completed: boolean
  progress: number
  lessonsCompleted: number
  totalLessons: number
}

export function ProgressWidget() {
  const { progress: userProgress, loading } = useProgress()
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([])
  const [overallStats, setOverallStats] = useState({
    totalModules: 11,
    completedModules: 0,
    inProgressModules: 0,
    totalLessons: 0,
    completedLessons: 0,
    overallPercentage: 0,
    currentStreak: 7,
    longestStreak: 7,
    totalPoints: 0,
    level: 1,
    nextLevelPoints: 100
  })

  // Mock module data - will be replaced with real data from Contentlayer
  const modules = [
    { id: '00-quick-start', title: 'Quick Start Guide', totalLessons: 5 },
    { id: '01-identify-exposure', title: 'Identify Exposure', totalLessons: 8 },
    { id: '02-testing-diagnosis', title: 'Testing & Diagnosis', totalLessons: 10 },
    { id: '03-drainage-pathways', title: 'Open Drainage Pathways', totalLessons: 7 },
    { id: '04-mycotoxin-binders', title: 'Mycotoxin Binders', totalLessons: 9 },
    { id: '05-antifungals', title: 'Antifungals', totalLessons: 8 },
    { id: '06-herx-management', title: 'Herx Management', totalLessons: 6 },
    { id: '07-supportive-modalities', title: 'Supportive Modalities', totalLessons: 10 },
    { id: '08-diet-nutrition', title: 'Diet & Nutrition', totalLessons: 8 },
    { id: '09-retesting-prevention', title: 'Retesting & Prevention', totalLessons: 7 },
    { id: '10-advanced-protocols', title: 'Advanced Protocols', totalLessons: 12 }
  ]

  useEffect(() => {
    // Calculate module progress based on user data
    const calculatedProgress = modules.map(module => {
      const moduleData = userProgress?.progress?.[module.id]
      const completedLessons = moduleData?.completedLessons?.length || 0
      const progress = Math.round((completedLessons / module.totalLessons) * 100)
      
      return {
        id: module.id,
        title: module.title,
        completed: moduleData?.isCompleted || false,
        progress,
        lessonsCompleted: completedLessons,
        totalLessons: module.totalLessons
      }
    })

    setModuleProgress(calculatedProgress)

    // Calculate overall stats
    const completedModules = calculatedProgress.filter(m => m.completed).length
    const inProgressModules = calculatedProgress.filter(m => m.progress > 0 && !m.completed).length
    const totalLessons = modules.reduce((sum, m) => sum + m.totalLessons, 0)
    const completedLessons = calculatedProgress.reduce((sum, m) => sum + m.lessonsCompleted, 0)
    const overallPercentage = Math.round((completedLessons / totalLessons) * 100)

    // Calculate points and level (10 points per lesson, 50 bonus per module)
    const totalPoints = completedLessons * 10 + completedModules * 50
    const level = Math.floor(totalPoints / 100) + 1
    const nextLevelPoints = level * 100

    setOverallStats({
      totalModules: modules.length,
      completedModules,
      inProgressModules,
      totalLessons,
      completedLessons,
      overallPercentage,
      currentStreak: 7, // This would come from the database
      longestStreak: 7,
      totalPoints,
      level,
      nextLevelPoints
    })
  }, [userProgress])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Progress...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gray-100 animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-600'
    if (percentage >= 75) return 'text-blue-600'
    if (percentage >= 50) return 'text-yellow-600'
    if (percentage >= 25) return 'text-orange-600'
    return 'text-gray-600'
  }

  const getProgressBadge = (percentage: number) => {
    if (percentage === 100) return { text: 'Complete', variant: 'default' as const }
    if (percentage >= 75) return { text: 'Almost Done', variant: 'secondary' as const }
    if (percentage >= 50) return { text: 'Halfway', variant: 'secondary' as const }
    if (percentage >= 25) return { text: 'Getting Started', variant: 'outline' as const }
    if (percentage > 0) return { text: 'Just Started', variant: 'outline' as const }
    return { text: 'Not Started', variant: 'outline' as const }
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Your Progress Overview</CardTitle>
              <CardDescription>
                Track your journey through the Mold Detox Mastery program
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-semibold">Level {overallStats.level}</span>
              </div>
              <p className="text-sm text-gray-500">
                {overallStats.totalPoints} / {overallStats.nextLevelPoints} XP
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Progress Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className={`text-2xl font-bold ${getProgressColor(overallStats.overallPercentage)}`}>
                {overallStats.overallPercentage}%
              </span>
            </div>
            <Progress value={overallStats.overallPercentage} className="h-3" />
            <p className="text-sm text-gray-500 mt-2">
              {overallStats.completedLessons} of {overallStats.totalLessons} lessons completed
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold">{overallStats.completedModules}</div>
              <p className="text-xs text-gray-600">Modules Complete</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-bold">{overallStats.inProgressModules}</div>
              <p className="text-xs text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-bold">{overallStats.currentStreak}</div>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Target className="h-8 w-8 text-orange-600 mx-auto mb-1" />
              <div className="text-2xl font-bold">{overallStats.totalPoints}</div>
              <p className="text-xs text-gray-600">Total Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Progress List */}
      <Card>
        <CardHeader>
          <CardTitle>Module Progress</CardTitle>
          <CardDescription>Detailed progress for each module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moduleProgress.map((module) => {
              const badge = getProgressBadge(module.progress)
              return (
                <Link 
                  key={module.id} 
                  href={`/modules/${module.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        {module.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <BookOpen className={`h-6 w-6 ${module.progress > 0 ? 'text-blue-600' : 'text-gray-400'}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {module.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={module.progress} className="h-2 flex-1 max-w-[200px]" />
                          <span className="text-sm text-gray-500">
                            {module.lessonsCompleted}/{module.totalLessons}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={badge.variant}>
                      {badge.text}
                    </Badge>
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Preview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-xs">First Steps</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-xs">Quick Learner</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-xs">7 Day Streak</p>
            </div>
            <div className="flex-shrink-0 text-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-xs">Module Master</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
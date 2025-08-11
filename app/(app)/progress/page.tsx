/**
 * @fileoverview My Progress Page - Comprehensive overview of user's mold detox journey
 * including module completion, symptom tracking, biomarker trends, and milestone achievements
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useProgress } from '@/hooks/use-progress'
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Award,
  Target,
  Activity,
  Brain,
  Heart,
  Zap,
  Shield,
  BookOpen,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Eye,
  ArrowRight,
  Star,
  Trophy,
  Flame,
  Timer
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModuleProgress {
  id: string
  title: string
  completed: boolean
  progress: number
  lessonsCompleted: number
  totalLessons: number
}

interface StreakData {
  current: number
  longest: number
  lastActivity: Date | null
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  earnedAt?: Date
  progress?: number
  target?: number
}

const achievements: Achievement[] = [
  {
    id: 'first-module',
    title: 'First Steps',
    description: 'Complete your first module',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  {
    id: 'drainage-ready',
    title: 'Drainage Master',
    description: 'Achieve 80% drainage readiness for 7 days',
    icon: Flame,
    color: 'text-orange-600',
  },
  {
    id: 'symptom-tracker',
    title: 'Health Detective',
    description: 'Track symptoms for 14 consecutive days',
    icon: Heart,
    color: 'text-red-600',
  },
  {
    id: 'five-modules',
    title: 'Halfway Hero',
    description: 'Complete 5 modules',
    icon: Target,
    color: 'text-green-600',
  },
  {
    id: 'complete-course',
    title: 'Detox Master',
    description: 'Complete all 11 modules',
    icon: Trophy,
    color: 'text-purple-600',
  },
  {
    id: 'streak-30',
    title: 'Consistency Champion',
    description: 'Maintain a 30-day learning streak',
    icon: Timer,
    color: 'text-yellow-600',
  }
]

export default function ProgressPage() {
  const { progress: userProgress, loading } = useProgress()
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([])
  const [overallStats, setOverallStats] = useState({
    totalModules: 11,
    completedModules: 0,
    inProgressModules: 0,
    totalLessons: 90,
    completedLessons: 0,
    overallPercentage: 0,
    totalPoints: 0,
    level: 1,
    nextLevelPoints: 100
  })
  const [streakData, setStreakData] = useState<StreakData>({
    current: 7,
    longest: 7,
    lastActivity: new Date()
  })

  // Module data - matches the existing data from ProgressWidget
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
      totalPoints,
      level,
      nextLevelPoints
    })
  }, [userProgress])

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    if (percentage >= 25) return 'bg-orange-500'
    return 'bg-gray-300'
  }

  const getEarnedAchievements = () => {
    const earned: Achievement[] = []
    
    if (overallStats.completedModules >= 1) {
      earned.push({ ...achievements[0], earnedAt: new Date() })
    }
    if (overallStats.completedModules >= 5) {
      earned.push({ ...achievements[3], earnedAt: new Date() })
    }
    if (overallStats.completedModules >= 11) {
      earned.push({ ...achievements[4], earnedAt: new Date() })
    }
    if (streakData.current >= 30) {
      earned.push({ ...achievements[5], earnedAt: new Date() })
    }
    
    return earned
  }

  const getUpcomingAchievements = () => {
    const upcoming: Achievement[] = []
    
    if (overallStats.completedModules < 1) {
      upcoming.push({ 
        ...achievements[0], 
        progress: overallStats.completedModules, 
        target: 1 
      })
    }
    if (overallStats.completedModules < 5 && overallStats.completedModules >= 1) {
      upcoming.push({ 
        ...achievements[3], 
        progress: overallStats.completedModules, 
        target: 5 
      })
    }
    if (overallStats.completedModules < 11 && overallStats.completedModules >= 5) {
      upcoming.push({ 
        ...achievements[4], 
        progress: overallStats.completedModules, 
        target: 11 
      })
    }
    if (streakData.current < 30) {
      upcoming.push({ 
        ...achievements[5], 
        progress: streakData.current, 
        target: 30 
      })
    }
    
    return upcoming.slice(0, 3) // Show max 3 upcoming
  }

  const earnedAchievements = getEarnedAchievements()
  const upcomingAchievements = getUpcomingAchievements()

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">My Progress</h1>
        <p className="text-gray-600">
          Track your mold detox journey with comprehensive progress monitoring and achievement milestones.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-primary-600">{overallStats.overallPercentage}%</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <Progress value={overallStats.overallPercentage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Modules Complete</p>
                <p className="text-2xl font-bold text-green-600">
                  {overallStats.completedModules}/{overallStats.totalModules}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {overallStats.inProgressModules} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-purple-600">Level {overallStats.level}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {overallStats.totalPoints} / {overallStats.nextLevelPoints} XP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-orange-600">{streakData.current} days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Best: {streakData.longest} days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="modules">Module Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tools">Tools & Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Module Completion</CardTitle>
              <CardDescription>
                Your progress through the 11-module mold detox protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {moduleProgress.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                        {String(index).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{module.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress 
                            value={module.progress} 
                            className="flex-1 max-w-xs"
                          />
                          <span className="text-sm text-gray-600">
                            {module.lessonsCompleted}/{module.totalLessons} lessons
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {module.completed && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                      {module.progress > 0 && !module.completed && (
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          In Progress
                        </Badge>
                      )}
                      <Link href={`/modules/${module.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Module Statistics */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {overallStats.completedLessons}
                  </div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                  <div className="text-xs text-gray-500 mt-1">
                    of {overallStats.totalLessons} total
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {overallStats.totalPoints}
                  </div>
                  <div className="text-sm text-gray-600">Experience Points</div>
                  <div className="text-xs text-gray-500 mt-1">
                    10 XP per lesson, 50 XP per module
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.round((overallStats.completedModules / overallStats.totalModules) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Course Completion</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {overallStats.totalModules - overallStats.completedModules} modules remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Earned Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Earned Achievements ({earnedAchievements.length})
              </CardTitle>
              <CardDescription>
                Congratulations on your accomplishments!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {earnedAchievements.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No achievements earned yet</p>
                  <p className="text-sm">Complete your first module to get started!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedAchievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            "bg-yellow-100"
                          )}>
                            <Icon className={cn("w-5 h-5", achievement.color)} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        {achievement.earnedAt && (
                          <p className="text-xs text-gray-500">
                            Earned {achievement.earnedAt.toLocaleDateString()}
                          </p>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Upcoming Achievements
              </CardTitle>
              <CardDescription>
                Your next goals to unlock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingAchievements.map((achievement) => {
                  const Icon = achievement.icon
                  const progressPercentage = achievement.progress && achievement.target 
                    ? (achievement.progress / achievement.target) * 100 
                    : 0
                  
                  return (
                    <div
                      key={achievement.id}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Icon className={cn("w-5 h-5", achievement.color)} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.progress !== undefined && achievement.target && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-900 font-medium">
                              {achievement.progress}/{achievement.target}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
              <CardDescription>
                Insights into your learning patterns and progress trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics coming soon</h3>
                <p className="text-gray-600">
                  Track your learning velocity, completion patterns, and progress trends over time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking Tools</CardTitle>
                <CardDescription>
                  Advanced tools for monitoring your detox journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/tools/progress-dashboard">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Progress Dashboard</h4>
                        <p className="text-sm text-gray-600">Comprehensive symptom and biomarker tracking</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>

                <Link href="/tools/drainage-readiness">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Drainage Readiness Score</h4>
                        <p className="text-sm text-gray-600">Track your pathway readiness for binders</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>

                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Symptom Tracker</h4>
                      <p className="text-sm text-gray-500">Coming soon - Daily symptom monitoring</p>
                    </div>
                  </div>
                  <Badge variant="outline">Soon</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export & Share</CardTitle>
                <CardDescription>
                  Download your progress data and share with healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Progress Report
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Export Calendar Events
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Share with Provider</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Generate a summary report for your healthcare provider
                  </p>
                  <Button size="sm" className="w-full">
                    Generate Provider Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{overallStats.completedLessons}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{streakData.current}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{overallStats.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{earnedAchievements.length}</div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Motivational Message */}
      <Alert className="mt-8">
        <Target className="h-4 w-4" />
        <AlertTitle>Keep Going! 🎉</AlertTitle>
        <AlertDescription>
          {overallStats.overallPercentage === 0 
            ? "You're just getting started on your mold detox journey. Take it one lesson at a time!"
            : overallStats.overallPercentage < 25
            ? "Great start! You're building momentum. Consistency is key to successful detox."
            : overallStats.overallPercentage < 50 
            ? "You're making solid progress! You're well on your way to mastering mold detox."
            : overallStats.overallPercentage < 75
            ? "Excellent progress! You're more than halfway through your detox education."
            : overallStats.overallPercentage < 100
            ? "Outstanding! You're in the final stretch. Keep up the amazing work!"
            : "Congratulations! You've completed the entire course. You're now a mold detox expert!"
          }
        </AlertDescription>
      </Alert>
    </div>
  )
}

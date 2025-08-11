'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useProgress } from '@/hooks/use-progress'

interface NextAction {
  type: 'module' | 'tool' | 'assessment' | 'milestone'
  title: string
  description: string
  link: string
  priority: 'high' | 'medium' | 'low'
  timeEstimate?: string
  moduleId?: string
  lessonId?: string
  isBlocked?: boolean
  blockReason?: string
  daysUntilAvailable?: number
  prerequisite?: string
}

export function NextActionCard() {
  const { progress: userProgress, loading } = useProgress()
  const [nextAction, setNextAction] = useState<NextAction | null>(null)
  const [alternativeActions, setAlternativeActions] = useState<NextAction[]>([])

  useEffect(() => {
    // Determine the next action based on user progress
    if (!userProgress) return

    // Check module progress to find the next incomplete lesson
    const modules = [
      { id: '00-quick-start', title: 'Quick Start Guide', totalLessons: 5 },
      { id: '01-identify-exposure', title: 'Identify Exposure', totalLessons: 8 },
      { id: '02-testing-diagnosis', title: 'Testing & Diagnosis', totalLessons: 10, requires: '01-identify-exposure' },
      { id: '03-drainage-pathways', title: 'Open Drainage Pathways', totalLessons: 7, requires: '02-testing-diagnosis' },
      { id: '04-mycotoxin-binders', title: 'Mycotoxin Binders', totalLessons: 9, requiresDrainage: true },
      { id: '05-antifungals', title: 'Antifungals', totalLessons: 8, requires: '04-mycotoxin-binders' },
      { id: '06-herx-management', title: 'Herx Management', totalLessons: 6, requires: '04-mycotoxin-binders' },
      { id: '07-supportive-modalities', title: 'Supportive Modalities', totalLessons: 10, requires: '04-mycotoxin-binders' },
      { id: '08-diet-nutrition', title: 'Diet & Nutrition', totalLessons: 8 },
      { id: '09-retesting-prevention', title: 'Retesting & Prevention', totalLessons: 7, requiresCompletion: 50 },
      { id: '10-advanced-protocols', title: 'Advanced Protocols', totalLessons: 12, requires: '05-antifungals' },
    ]

    // Find the next action
    let primaryAction: NextAction | null = null
    const alternatives: NextAction[] = []

    for (const module of modules) {
      const moduleProgress = userProgress.progress?.[module.id]
      const completedLessons = moduleProgress?.completedLessons || []
      
      // Check if module is blocked
      if (module.requires) {
        const requiredProgress = userProgress.progress?.[module.requires]
        if (!requiredProgress?.isCompleted) {
          if (!primaryAction && completedLessons.length > 0 && completedLessons.length < module.totalLessons) {
            // Module is in progress but blocked
            primaryAction = {
              type: 'module',
              title: `Complete ${modules.find(m => m.id === module.requires)?.title}`,
              description: `You need to complete this module before continuing with ${module.title}`,
              link: `/modules/${module.requires}`,
              priority: 'high',
              moduleId: module.requires,
              isBlocked: true,
              blockReason: 'Prerequisites not met',
              prerequisite: modules.find(m => m.id === module.requires)?.title
            }
          }
          continue
        }
      }

      if (module.requiresDrainage) {
        // Check drainage readiness (mock for now)
        const drainageScore = 65 // This would come from actual data
        if (drainageScore < 80) {
          alternatives.push({
            type: 'tool',
            title: 'Improve Drainage Readiness',
            description: `Your drainage score is ${drainageScore}%. Reach 80% to unlock ${module.title}`,
            link: '/tools/drainage-readiness',
            priority: 'high',
            timeEstimate: '5 min daily',
            isBlocked: true,
            blockReason: 'Drainage readiness too low',
            daysUntilAvailable: Math.ceil((80 - drainageScore) / 2) // Rough estimate
          })
          continue
        }
      }

      // Find next incomplete lesson
      if (completedLessons.length < module.totalLessons) {
        const nextLessonNumber = completedLessons.length + 1
        
        if (!primaryAction) {
          primaryAction = {
            type: 'module',
            title: `Continue ${module.title}`,
            description: `Lesson ${nextLessonNumber}: ${getNextLessonTitle(module.id, nextLessonNumber)}`,
            link: `/modules/${module.id}/lessons/${nextLessonNumber}`,
            priority: completedLessons.length === 0 ? 'high' : 'medium',
            timeEstimate: '15-20 min',
            moduleId: module.id,
            lessonId: nextLessonNumber.toString()
          }
        } else if (alternatives.length < 2) {
          alternatives.push({
            type: 'module',
            title: `Start ${module.title}`,
            description: `Begin learning about ${module.title.toLowerCase()}`,
            link: `/modules/${module.id}`,
            priority: 'low',
            timeEstimate: '15-20 min',
            moduleId: module.id
          })
        }
        
        if (primaryAction && alternatives.length >= 2) break
      }
    }

    // Add tool recommendations based on progress
    if (!primaryAction) {
      primaryAction = {
        type: 'assessment',
        title: 'Complete Daily Check-in',
        description: 'Track your symptoms and progress for today',
        link: '/tools/symptom-tracker',
        priority: 'medium',
        timeEstimate: '2 min'
      }
    }

    // Add milestone if close to one
    const totalProgress = Object.values(userProgress.progress || {}).reduce((acc, mod) => {
      return acc + (mod.completedLessons?.length || 0)
    }, 0)

    if (totalProgress === 9) {
      alternatives.unshift({
        type: 'milestone',
        title: '🎯 One lesson away from 10!',
        description: 'Complete one more lesson to unlock your "Quick Learner" badge',
        link: '/dashboard',
        priority: 'low',
        timeEstimate: '15-20 min'
      })
    }

    setNextAction(primaryAction)
    setAlternativeActions(alternatives.slice(0, 2))
  }, [userProgress])

  const getNextLessonTitle = (moduleId: string, lessonNumber: number): string => {
    // Mock lesson titles - would come from actual content
    const lessonTitles: Record<string, string[]> = {
      '00-quick-start': [
        'Stop Mold Exposure Immediately',
        'Support Drainage Pathways',
        'Choose Your Testing Strategy',
        'Start Basic Binders',
        'Track Your Progress'
      ],
      '01-understanding-mold': [
        'What is Mold Illness?',
        'How Mold Affects Your Body',
        'Common Symptoms',
        'The Shoemaker Protocol',
        'CIRS Explained',
        'Genetic Factors',
        'Environmental vs Medical Testing',
        'Creating Your Recovery Timeline'
      ],
      '02-exposure-assessment': [
        'Visual Inspection Basics',
        'Hidden Mold Locations',
        'Testing Your Home',
        'Testing Your Workplace',
        'Car Mold Assessment',
        'Interpreting Test Results',
        'When to Call a Professional',
        'Remediation Planning',
        'Temporary Housing Options',
        'Post-Remediation Verification'
      ]
    }

    return lessonTitles[moduleId]?.[lessonNumber - 1] || `Lesson ${lessonNumber}`
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'outline'
    }
  }

  const getActionIcon = (type: string) => {
    switch(type) {
      case 'module': return BookOpen
      case 'tool': return Target
      case 'assessment': return CheckCircle
      case 'milestone': return TrendingUp
      default: return ArrowRight
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Next Action...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-gray-100 animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!nextAction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Actions Available</CardTitle>
          <CardDescription>
            Check back later for new recommendations
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const ActionIcon = getActionIcon(nextAction.type)

  return (
    <div className="space-y-4">
      {/* Primary Action Card */}
      <Card className={nextAction.isBlocked ? 'border-orange-200' : 'border-primary-200 bg-primary-50'}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${nextAction.isBlocked ? 'bg-orange-100' : 'bg-primary-100'}`}>
                <ActionIcon className={`h-5 w-5 ${nextAction.isBlocked ? 'text-orange-600' : 'text-primary-600'}`} />
              </div>
              <div>
                <CardTitle className="text-xl">Your Next Step</CardTitle>
                <CardDescription className="mt-1">
                  {nextAction.isBlocked ? 'Action Required First' : 'Recommended based on your progress'}
                </CardDescription>
              </div>
            </div>
            <Badge variant={getPriorityColor(nextAction.priority)}>
              {nextAction.priority} priority
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {nextAction.isBlocked && (
            <div className="flex items-start gap-2 p-3 bg-orange-50 text-orange-800 rounded-lg">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">{nextAction.blockReason}</p>
                {nextAction.prerequisite && (
                  <p className="mt-1">Complete "{nextAction.prerequisite}" to unlock this content</p>
                )}
                {nextAction.daysUntilAvailable && (
                  <p className="mt-1">Estimated time: {nextAction.daysUntilAvailable} days</p>
                )}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{nextAction.title}</h3>
            <p className="mt-1 text-gray-600">{nextAction.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {nextAction.timeEstimate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{nextAction.timeEstimate}</span>
                </div>
              )}
              {nextAction.type === 'module' && (
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Interactive lesson</span>
                </div>
              )}
            </div>
            
            <Link href={nextAction.link}>
              <Button className={nextAction.isBlocked ? '' : ''}>
                {nextAction.isBlocked ? 'View Requirements' : 'Start Now'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Actions */}
      {alternativeActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Also Consider</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alternativeActions.map((action, index) => {
                const Icon = getActionIcon(action.type)
                return (
                  <Link 
                    key={index}
                    href={action.link}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-sm text-gray-900">{action.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {action.timeEstimate && (
                          <span className="text-xs text-gray-500">{action.timeEstimate}</span>
                        )}
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Daily Goal</p>
                <p className="text-xs text-gray-600">Complete 1 lesson per day</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-pink-600" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">On Track</p>
                <p className="text-xs text-gray-600">7 day streak 🔥</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
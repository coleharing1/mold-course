'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Flame,
  TrendingUp,
  Calendar,
  Trophy,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
  Zap
} from 'lucide-react'

interface StreakData {
  currentStreak: number
  longestStreak: number
  totalDaysActive: number
  lastCheckIn: Date | null
  todayComplete: boolean
  weeklyProgress: boolean[]
  monthlyActivity: number[]
  milestones: {
    days: number
    title: string
    achieved: boolean
    achievedDate?: Date
  }[]
}

export function StreakCounter() {
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch streak data (mock for now)
    const fetchStreakData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockData: StreakData = {
        currentStreak: 7,
        longestStreak: 7,
        totalDaysActive: 12,
        lastCheckIn: new Date(),
        todayComplete: true,
        weeklyProgress: [true, true, true, true, true, true, true], // Last 7 days
        monthlyActivity: [
          0, 1, 1, 0, 1, 1, 1, // Week 1
          1, 1, 1, 1, 1, 1, 1, // Week 2
          1, 1, 0, 0, 0, 0, 0, // Week 3
          0, 0, 0, 0, 0, 0, 0, // Week 4
        ], // 1 = active, 0 = inactive
        milestones: [
          { days: 3, title: 'Getting Started', achieved: true, achievedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
          { days: 7, title: 'Week Warrior', achieved: true, achievedDate: new Date() },
          { days: 14, title: 'Fortnight Fighter', achieved: false },
          { days: 30, title: 'Monthly Master', achieved: false },
          { days: 60, title: 'Commitment Champion', achieved: false },
          { days: 90, title: 'Recovery Rockstar', achieved: false },
        ]
      }
      
      setStreakData(mockData)
      setLoading(false)

      // Check if we just hit a milestone
      if (mockData.currentStreak === 7) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }
    }

    fetchStreakData()
  }, [])

  const getStreakColor = (streak: number) => {
    if (streak === 0) return 'text-gray-400'
    if (streak < 3) return 'text-orange-500'
    if (streak < 7) return 'text-yellow-500'
    if (streak < 14) return 'text-green-500'
    if (streak < 30) return 'text-blue-500'
    return 'text-purple-500'
  }

  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return '💤'
    if (streak < 3) return '🌱'
    if (streak < 7) return '🔥'
    if (streak < 14) return '⚡'
    if (streak < 30) return '🚀'
    if (streak < 60) return '⭐'
    return '👑'
  }

  const getDayOfWeek = (index: number) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const today = new Date().getDay()
    const dayIndex = (today - (6 - index) + 7) % 7
    return days[dayIndex]
  }

  const getMotivationalMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today!"
    if (streak === 1) return "Great start! Keep it going!"
    if (streak < 3) return "Building momentum!"
    if (streak < 7) return "You're on fire! Don't stop now!"
    if (streak < 14) return "One week down! Amazing consistency!"
    if (streak < 30) return "Two weeks strong! You're unstoppable!"
    return "Incredible dedication! You're a recovery champion!"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Streak...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gray-100 animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!streakData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Streak Counter</CardTitle>
          <CardDescription>Unable to load streak data</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const nextMilestone = streakData.milestones.find(m => !m.achieved)
  const daysToNextMilestone = nextMilestone ? nextMilestone.days - streakData.currentStreak : 0

  return (
    <div className="space-y-4">
      {/* Main Streak Card */}
      <Card className="relative overflow-hidden">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 opacity-90 flex items-center justify-center z-10 animate-pulse">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-800">Week Warrior Unlocked!</p>
              <p className="text-yellow-700">7 Day Streak Achievement</p>
            </div>
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Daily Streak</CardTitle>
              <CardDescription>
                {getMotivationalMessage(streakData.currentStreak)}
              </CardDescription>
            </div>
            {streakData.currentStreak === streakData.longestStreak && streakData.currentStreak > 0 && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                Personal Best!
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Streak Display */}
          <div className="text-center py-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-6xl">{getStreakEmoji(streakData.currentStreak)}</span>
              <div>
                <p className={`text-5xl font-bold ${getStreakColor(streakData.currentStreak)}`}>
                  {streakData.currentStreak}
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  {streakData.currentStreak === 1 ? 'day' : 'days'}
                </p>
              </div>
            </div>
            {streakData.currentStreak > 0 && (
              <div className="flex items-center justify-center gap-1 mt-3">
                <Flame className="h-4 w-4 text-orange-500" />
                <p className="text-sm text-gray-700">
                  Keep your streak alive!
                </p>
              </div>
            )}
          </div>

          {/* Weekly Progress */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">This Week</p>
            <div className="flex gap-2">
              {streakData.weeklyProgress.map((completed, index) => (
                <div key={index} className="flex-1">
                  <div className="text-center">
                    <div 
                      className={`h-10 w-10 mx-auto rounded-lg flex items-center justify-center ${
                        completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span className="text-xs font-medium">{getDayOfWeek(index)}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{getDayOfWeek(index)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{streakData.longestStreak}</p>
              <p className="text-xs text-gray-600">Best Streak</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{streakData.totalDaysActive}</p>
              <p className="text-xs text-gray-600">Total Days</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">
                {Math.round((streakData.totalDaysActive / 30) * 100)}%
              </p>
              <p className="text-xs text-gray-600">This Month</p>
            </div>
          </div>

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Next: {nextMilestone.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {daysToNextMilestone} more {daysToNextMilestone === 1 ? 'day' : 'days'} to go
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  {nextMilestone.days} days
                </Badge>
              </div>
            </div>
          )}

          {/* Check-in Status */}
          {!streakData.todayComplete && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Don't break your streak!</p>
                    <p className="text-xs text-gray-600">Complete today's lesson to continue</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700 hover:bg-yellow-100">
                  Check In
                </Button>
              </div>
            </div>
          )}

          {streakData.todayComplete && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Today's check-in complete!</p>
                  <p className="text-xs text-green-700">Great job maintaining your streak</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Streak Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {streakData.milestones.slice(0, 4).map((milestone) => (
              <div 
                key={milestone.days}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  milestone.achieved ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {milestone.achieved ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${
                      milestone.achieved ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {milestone.title}
                    </p>
                    {milestone.achievedDate && (
                      <p className="text-xs text-gray-500">
                        Achieved {new Date(milestone.achievedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={milestone.achieved ? 'default' : 'outline'}
                  className={milestone.achieved ? 'bg-green-600' : ''}
                >
                  {milestone.days} days
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
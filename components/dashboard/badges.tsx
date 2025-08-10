'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy,
  Star,
  Award,
  Target,
  Zap,
  BookOpen,
  Heart,
  Brain,
  Shield,
  Flame,
  TrendingUp,
  Medal,
  Crown,
  Gem,
  Lock,
  CheckCircle
} from 'lucide-react'

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: 'progress' | 'streak' | 'knowledge' | 'health' | 'special'
  earned: boolean
  earnedDate?: Date
  progress?: number
  requirement?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface BadgeStats {
  totalEarned: number
  totalAvailable: number
  recentBadge?: BadgeItem
  nextClosest?: BadgeItem
  categories: {
    name: string
    earned: number
    total: number
  }[]
}

export function BadgesDisplay() {
  const [badges, setBadges] = useState<BadgeItem[]>([])
  const [stats, setStats] = useState<BadgeStats | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch badges data (mock for now)
    const fetchBadges = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockBadges: BadgeItem[] = [
        // Progress Badges
        {
          id: 'first-step',
          name: 'First Steps',
          description: 'Complete your first lesson',
          icon: Target,
          category: 'progress',
          earned: true,
          earnedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          rarity: 'common'
        },
        {
          id: 'module-complete',
          name: 'Module Master',
          description: 'Complete your first module',
          icon: BookOpen,
          category: 'progress',
          earned: true,
          earnedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          rarity: 'common'
        },
        {
          id: 'halfway',
          name: 'Halfway Hero',
          description: 'Complete 50% of all content',
          icon: TrendingUp,
          category: 'progress',
          earned: false,
          progress: 23,
          requirement: '50% completion',
          rarity: 'rare'
        },
        {
          id: 'graduate',
          name: 'Recovery Graduate',
          description: 'Complete all core modules',
          icon: Crown,
          category: 'progress',
          earned: false,
          progress: 20,
          requirement: 'All 10 modules',
          rarity: 'legendary'
        },
        
        // Streak Badges
        {
          id: 'streak-3',
          name: 'Consistent Starter',
          description: '3 day streak',
          icon: Flame,
          category: 'streak',
          earned: true,
          earnedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          rarity: 'common'
        },
        {
          id: 'streak-7',
          name: 'Week Warrior',
          description: '7 day streak',
          icon: Zap,
          category: 'streak',
          earned: true,
          earnedDate: new Date(),
          rarity: 'common'
        },
        {
          id: 'streak-14',
          name: 'Fortnight Fighter',
          description: '14 day streak',
          icon: Star,
          category: 'streak',
          earned: false,
          progress: 50,
          requirement: '7 more days',
          rarity: 'rare'
        },
        {
          id: 'streak-30',
          name: 'Monthly Master',
          description: '30 day streak',
          icon: Trophy,
          category: 'streak',
          earned: false,
          progress: 23,
          requirement: '23 more days',
          rarity: 'epic'
        },
        
        // Knowledge Badges
        {
          id: 'quick-learner',
          name: 'Quick Learner',
          description: 'Complete 10 lessons',
          icon: Brain,
          category: 'knowledge',
          earned: false,
          progress: 80,
          requirement: '2 more lessons',
          rarity: 'common'
        },
        {
          id: 'note-taker',
          name: 'Note Taker',
          description: 'Take notes on 20 lessons',
          icon: BookOpen,
          category: 'knowledge',
          earned: false,
          progress: 35,
          requirement: '13 more notes',
          rarity: 'rare'
        },
        
        // Health Badges
        {
          id: 'drainage-ready',
          name: 'Drainage Champion',
          description: 'Achieve 80% drainage readiness',
          icon: Heart,
          category: 'health',
          earned: false,
          progress: 85,
          requirement: '68% → 80%',
          rarity: 'rare'
        },
        {
          id: 'symptom-tracker',
          name: 'Health Monitor',
          description: 'Track symptoms for 7 days',
          icon: Shield,
          category: 'health',
          earned: false,
          progress: 42,
          requirement: '4 more days',
          rarity: 'common'
        },
        
        // Special Badges
        {
          id: 'early-bird',
          name: 'Early Bird',
          description: 'Complete lessons before 8 AM',
          icon: Award,
          category: 'special',
          earned: true,
          earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          rarity: 'rare'
        },
        {
          id: 'weekend-warrior',
          name: 'Weekend Warrior',
          description: 'Study on 4 consecutive weekends',
          icon: Medal,
          category: 'special',
          earned: false,
          progress: 25,
          requirement: '3 more weekends',
          rarity: 'epic'
        },
        {
          id: 'perfect-week',
          name: 'Perfect Week',
          description: 'Complete all daily goals for a week',
          icon: Gem,
          category: 'special',
          earned: false,
          progress: 0,
          requirement: 'Not started',
          rarity: 'legendary'
        }
      ]

      const earned = mockBadges.filter(b => b.earned)
      const categories = [
        { name: 'progress', earned: earned.filter(b => b.category === 'progress').length, total: mockBadges.filter(b => b.category === 'progress').length },
        { name: 'streak', earned: earned.filter(b => b.category === 'streak').length, total: mockBadges.filter(b => b.category === 'streak').length },
        { name: 'knowledge', earned: earned.filter(b => b.category === 'knowledge').length, total: mockBadges.filter(b => b.category === 'knowledge').length },
        { name: 'health', earned: earned.filter(b => b.category === 'health').length, total: mockBadges.filter(b => b.category === 'health').length },
        { name: 'special', earned: earned.filter(b => b.category === 'special').length, total: mockBadges.filter(b => b.category === 'special').length },
      ]

      const nextClosest = mockBadges
        .filter(b => !b.earned && b.progress)
        .sort((a, b) => (b.progress || 0) - (a.progress || 0))[0]

      setStats({
        totalEarned: earned.length,
        totalAvailable: mockBadges.length,
        recentBadge: earned.sort((a, b) => (b.earnedDate?.getTime() || 0) - (a.earnedDate?.getTime() || 0))[0],
        nextClosest,
        categories
      })
      
      setBadges(mockBadges)
      setLoading(false)
    }

    fetchBadges()
  }, [])

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'border-gray-300 bg-gray-50'
      case 'rare': return 'border-blue-300 bg-blue-50'
      case 'epic': return 'border-purple-300 bg-purple-50'
      case 'legendary': return 'border-yellow-300 bg-yellow-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'bg-gray-200 text-gray-700'
      case 'rare': return 'bg-blue-200 text-blue-700'
      case 'epic': return 'bg-purple-200 text-purple-700'
      case 'legendary': return 'bg-yellow-200 text-yellow-700'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'progress': return 'text-green-600'
      case 'streak': return 'text-orange-600'
      case 'knowledge': return 'text-blue-600'
      case 'health': return 'text-red-600'
      case 'special': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(b => b.category === selectedCategory)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Badges...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
          <CardDescription>Unable to load badges</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Achievements & Badges</CardTitle>
              <CardDescription>
                Track your progress and unlock rewards
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalEarned}/{stats.totalAvailable}
              </p>
              <p className="text-xs text-gray-500">Badges Earned</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Collection</span>
              <span className="text-sm text-gray-500">
                {Math.round((stats.totalEarned / stats.totalAvailable) * 100)}%
              </span>
            </div>
            <Progress 
              value={(stats.totalEarned / stats.totalAvailable) * 100} 
              className="h-2"
            />
          </div>

          {/* Recent & Next Badge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentBadge && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <stats.recentBadge.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">Recently Earned</p>
                    <p className="text-xs text-green-700">{stats.recentBadge.name}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            )}

            {stats.nextClosest && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <stats.nextClosest.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Next Closest</p>
                    <p className="text-xs text-blue-700">{stats.nextClosest.name}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {stats.nextClosest.progress}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Category Filters */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All ({stats.totalEarned})
              </Button>
              {stats.categories.map((cat) => (
                <Button
                  key={cat.name}
                  size="sm"
                  variant={selectedCategory === cat.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.name)}
                  className="capitalize"
                >
                  {cat.name} ({cat.earned}/{cat.total})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {selectedCategory === 'all' ? 'All Badges' : `${selectedCategory} Badges`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className={`relative p-3 rounded-lg border-2 transition-all ${
                    badge.earned 
                      ? getRarityColor(badge.rarity) 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  {/* Lock Overlay for Unearned */}
                  {!badge.earned && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-gray-400 opacity-30" />
                    </div>
                  )}

                  {/* Badge Content */}
                  <div className={!badge.earned ? 'opacity-50' : ''}>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`h-8 w-8 ${getCategoryColor(badge.category)}`} />
                      {badge.earned && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {badge.description}
                    </p>

                    {/* Rarity Badge */}
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${getRarityBadgeColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                    </div>

                    {/* Progress for Unearned */}
                    {!badge.earned && badge.progress !== undefined && (
                      <div className="mt-2">
                        <Progress value={badge.progress} className="h-1" />
                        <p className="text-xs text-gray-500 mt-1">
                          {badge.requirement}
                        </p>
                      </div>
                    )}

                    {/* Earned Date */}
                    {badge.earned && badge.earnedDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(badge.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Keep Going!</p>
              <p className="text-sm text-gray-700">
                You're {Math.round((stats.totalEarned / stats.totalAvailable) * 100)}% of the way to collecting all badges. 
                {stats.nextClosest && ` Your next badge "${stats.nextClosest.name}" is ${stats.nextClosest.progress}% complete!`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
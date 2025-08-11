'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  RefreshCw, 
  BookOpen,
  Heart,
  Brain,
  Droplets,
  Shield,
  Sparkles,
  ChevronRight
} from 'lucide-react'

interface DailyTip {
  id: string
  category: 'detox' | 'nutrition' | 'lifestyle' | 'mindset' | 'safety'
  title: string
  content: string
  actionable: string
  relatedModule?: string
  icon: React.ReactNode
  priority: 'high' | 'medium' | 'low'
}

const tipCategories = {
  detox: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Droplets className="h-4 w-4" /> },
  nutrition: { color: 'text-orange-600', bg: 'bg-orange-50', icon: <Heart className="h-4 w-4" /> },
  lifestyle: { color: 'text-blue-600', bg: 'bg-blue-50', icon: <Sparkles className="h-4 w-4" /> },
  mindset: { color: 'text-purple-600', bg: 'bg-purple-50', icon: <Brain className="h-4 w-4" /> },
  safety: { color: 'text-red-600', bg: 'bg-red-50', icon: <Shield className="h-4 w-4" /> }
}

const dailyTips: DailyTip[] = [
  {
    id: '1',
    category: 'detox',
    title: 'Hydration is Key',
    content: 'Drinking half your body weight in ounces of filtered water daily helps flush mycotoxins through your kidneys.',
    actionable: 'Add a pinch of sea salt to your water for better mineral absorption.',
    relatedModule: 'drainage',
    icon: <Droplets className="h-5 w-5" />,
    priority: 'high'
  },
  {
    id: '2',
    category: 'safety',
    title: 'Never Skip Drainage Prep',
    content: 'Starting binders before your drainage pathways are open can cause severe detox reactions.',
    actionable: 'Check your drainage readiness score before advancing to binders.',
    relatedModule: 'drainage',
    icon: <Shield className="h-5 w-5" />,
    priority: 'high'
  },
  {
    id: '3',
    category: 'nutrition',
    title: 'Low-Mold Diet Tip',
    content: 'Avoid peanuts, corn, and aged cheeses - these commonly contain mold and mycotoxins.',
    actionable: 'Replace peanut butter with almond or sunflower seed butter.',
    relatedModule: 'diet',
    icon: <Heart className="h-5 w-5" />,
    priority: 'medium'
  },
  {
    id: '4',
    category: 'lifestyle',
    title: 'Morning Sunlight',
    content: 'Getting 10-15 minutes of morning sunlight helps regulate circadian rhythm and supports detox.',
    actionable: 'Step outside within 30 minutes of waking, even on cloudy days.',
    icon: <Sparkles className="h-5 w-5" />,
    priority: 'medium'
  },
  {
    id: '5',
    category: 'mindset',
    title: 'Progress Over Perfection',
    content: 'Healing from mold is not linear. Some days will be harder than others, and that\'s okay.',
    actionable: 'Keep a symptom journal to track your overall trend, not daily fluctuations.',
    icon: <Brain className="h-5 w-5" />,
    priority: 'low'
  },
  {
    id: '6',
    category: 'detox',
    title: 'Sauna Strategy',
    content: 'Start with just 5-10 minutes in the sauna and gradually increase. Your body needs time to adapt.',
    actionable: 'Always shower immediately after sauna to rinse toxins off your skin.',
    relatedModule: 'modalities',
    icon: <Droplets className="h-5 w-5" />,
    priority: 'medium'
  },
  {
    id: '7',
    category: 'safety',
    title: 'Binder Timing Matters',
    content: 'Take binders at least 2 hours away from food, supplements, and medications to avoid nutrient depletion.',
    actionable: 'Set phone reminders for optimal binder timing windows.',
    relatedModule: 'binders',
    icon: <Shield className="h-5 w-5" />,
    priority: 'high'
  }
]

export function DailyTip() {
  const [currentTip, setCurrentTip] = useState<DailyTip | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastTipDate, setLastTipDate] = useState<string>('')

  useEffect(() => {
    // Get today's tip based on date (ensures same tip all day)
    const getTodaysTip = () => {
      const today = new Date().toDateString()
      const storedDate = localStorage.getItem('lastTipDate')
      const storedTipId = localStorage.getItem('lastTipId')
      
      if (storedDate === today && storedTipId) {
        // Show the same tip for the whole day
        const tip = dailyTips.find(t => t.id === storedTipId)
        if (tip) {
          setCurrentTip(tip)
          setLastTipDate(today)
          setIsLoading(false)
          return
        }
      }
      
      // Select a new tip for today
      const dayIndex = new Date().getDate() % dailyTips.length
      const todaysTip = dailyTips[dayIndex]
      
      setCurrentTip(todaysTip)
      setLastTipDate(today)
      localStorage.setItem('lastTipDate', today)
      localStorage.setItem('lastTipId', todaysTip.id)
      setIsLoading(false)
    }

    getTodaysTip()
  }, [])

  const refreshTip = () => {
    // Get a random different tip
    const otherTips = dailyTips.filter(t => t.id !== currentTip?.id)
    const randomTip = otherTips[Math.floor(Math.random() * otherTips.length)]
    setCurrentTip(randomTip)
    
    // Update storage for new tip
    const today = new Date().toDateString()
    localStorage.setItem('lastTipDate', today)
    localStorage.setItem('lastTipId', randomTip.id)
  }

  if (isLoading || !currentTip) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Daily Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const categoryStyle = tipCategories[currentTip.category]

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${categoryStyle.bg}`} />
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Daily Tip
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshTip}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Your daily dose of mold recovery wisdom
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.color}`}>
            {categoryStyle.icon}
            <span className="capitalize">{currentTip.category}</span>
          </div>
          {currentTip.priority === 'high' && (
            <Badge variant="destructive" className="text-xs">
              Important
            </Badge>
          )}
        </div>

        {/* Tip Content */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            {currentTip.icon}
            {currentTip.title}
          </h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentTip.content}
          </p>

          {/* Actionable Step */}
          <div className="p-3 bg-muted/50 rounded-lg border border-muted">
            <p className="text-sm font-medium mb-1">Take Action:</p>
            <p className="text-sm text-muted-foreground">
              {currentTip.actionable}
            </p>
          </div>
        </div>

        {/* Related Module Link */}
        {currentTip.relatedModule && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            asChild
          >
            <a href={`/modules/${currentTip.relatedModule}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              Learn More in Module
              <ChevronRight className="h-4 w-4 ml-auto" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
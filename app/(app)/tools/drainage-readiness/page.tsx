'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Droplets,
  Heart,
  Brain,
  Activity,
  Moon,
  AlertCircle,
  Lock,
  Unlock
} from 'lucide-react'
import { DrainageForm } from '@/components/tools/drainage/daily-form'
import { TrendChart } from '@/components/tools/drainage/trend-chart'
import { DrainageSuggestions } from '@/components/tools/drainage/suggestions'
import { calculateDrainageScore, type DrainageMetrics } from '@/lib/calculations/drainage-score'
import { calculateRollingAverage } from '@/lib/calculations/rolling-average'

interface DrainageEntry {
  date: string
  metrics: DrainageMetrics
  score: number
  notes?: string
}

export default function DrainageReadinessPage() {
  const [entries, setEntries] = useState<DrainageEntry[]>([])
  const [todayEntry, setTodayEntry] = useState<DrainageMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [binderUnlocked, setBinderUnlocked] = useState(false)

  useEffect(() => {
    loadDrainageData()
  }, [])

  const loadDrainageData = async () => {
    try {
      // Load from localStorage first
      const savedEntries = localStorage.getItem('drainageEntries')
      if (savedEntries) {
        const parsed = JSON.parse(savedEntries)
        setEntries(parsed)
        checkBinderUnlock(parsed)
      }

      // Try to load from API if authenticated
      try {
        const response = await fetch('/api/tools/drainage')
        if (response.ok) {
          const data = await response.json()
          if (data.data) {
            setEntries(data.data.entries || [])
            checkBinderUnlock(data.data.entries || [])
          }
        }
      } catch (error) {
        console.log('Using local data only')
      }
    } catch (error) {
      console.error('Failed to load drainage data:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkBinderUnlock = (allEntries: DrainageEntry[]) => {
    // Check if user has 7 consecutive days of 80%+ drainage readiness
    if (allEntries.length < 7) {
      setBinderUnlocked(false)
      return
    }

    const last7Days = allEntries.slice(-7)
    const allAbove80 = last7Days.every(entry => entry.score >= 80)
    setBinderUnlocked(allAbove80)
  }

  const saveDrainageEntry = async (metrics: DrainageMetrics) => {
    setSaving(true)
    const today = new Date().toISOString().split('T')[0]
    const score = calculateDrainageScore(metrics)
    
    const newEntry: DrainageEntry = {
      date: today,
      metrics,
      score,
    }

    // Update or add today's entry
    const updatedEntries = [...entries.filter(e => e.date !== today), newEntry]
      .sort((a, b) => a.date.localeCompare(b.date))

    setEntries(updatedEntries)
    setTodayEntry(metrics)
    checkBinderUnlock(updatedEntries)

    // Save to localStorage
    localStorage.setItem('drainageEntries', JSON.stringify(updatedEntries))

    // Try to save to API
    try {
      await fetch('/api/tools/drainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: updatedEntries }),
      })
    } catch (error) {
      console.log('Saved locally only')
    }

    setSaving(false)
  }

  const getCurrentScore = () => {
    if (entries.length === 0) return 0
    return entries[entries.length - 1].score
  }

  const get7DayAverage = () => {
    if (entries.length === 0) return 0
    const last7 = entries.slice(-7)
    const scores = last7.map(e => e.score)
    return calculateRollingAverage(scores, 7)
  }

  const getDaysTracked = () => entries.length
  const getDaysUntilBinder = () => {
    if (binderUnlocked) return 0
    const currentStreak = getConsecutiveDaysAbove80()
    return Math.max(0, 7 - currentStreak)
  }

  const getConsecutiveDaysAbove80 = () => {
    let streak = 0
    for (let i = entries.length - 1; i >= 0; i--) {
      if (entries[i].score >= 80) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const getReadinessLevel = (score: number): { 
    level: string
    color: string
    icon: React.ReactNode
  } => {
    if (score >= 80) return { 
      level: 'Ready', 
      color: 'text-green-600',
      icon: <CheckCircle className="h-5 w-5" />
    }
    if (score >= 60) return { 
      level: 'Improving', 
      color: 'text-yellow-600',
      icon: <TrendingUp className="h-5 w-5" />
    }
    if (score >= 40) return { 
      level: 'Needs Work', 
      color: 'text-orange-600',
      icon: <AlertCircle className="h-5 w-5" />
    }
    return { 
      level: 'Not Ready', 
      color: 'text-red-600',
      icon: <AlertTriangle className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="container max-w-6xl py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    )
  }

  const currentScore = getCurrentScore()
  const averageScore = get7DayAverage()
  const readinessStatus = getReadinessLevel(currentScore)

  return (
    <div className="container max-w-6xl py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Drainage Readiness Score</h1>
        <p className="text-muted-foreground">
          Track your body&apos;s readiness for detox protocols. You must maintain 80% or higher for 7 consecutive days before starting binders.
        </p>
      </div>

      {/* Critical Safety Warning */}
      {!binderUnlocked && (
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertTitle>Safety Gate Active</AlertTitle>
          <AlertDescription>
            Binder protocols are locked until you achieve 80% drainage readiness for 7 consecutive days. 
            This is for your safety - starting binders too early can cause severe detox reactions.
          </AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {binderUnlocked && (
        <Alert className="border-green-200 bg-green-50">
          <Unlock className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900">Binders Unlocked!</AlertTitle>
          <AlertDescription className="text-green-800">
            Congratulations! You&apos;ve maintained 80% drainage readiness for 7 days. 
            You can now safely begin binder protocols. Remember to start slowly and monitor your symptoms.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Current Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${readinessStatus.color}`}>
              {currentScore}%
            </div>
            <div className={`flex items-center gap-1 mt-1 ${readinessStatus.color}`}>
              {readinessStatus.icon}
              <span className="text-sm">{readinessStatus.level}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">7-Day Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <Progress value={averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Days Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getDaysTracked()}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Consecutive: {getConsecutiveDaysAbove80()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Binder Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {binderUnlocked ? (
                <>
                  <Unlock className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-600">Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 text-gray-400" />
                  <span className="font-semibold text-gray-600">
                    {getDaysUntilBinder()} days left
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Check-In</TabsTrigger>
          <TabsTrigger value="trends">Progress Trends</TabsTrigger>
          <TabsTrigger value="guidance">Improvement Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Drainage Assessment</CardTitle>
              <CardDescription>
                Rate each drainage pathway on a scale of 1-10. Be honest - this is for your safety.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DrainageForm 
                onSubmit={saveDrainageEntry}
                initialData={todayEntry}
                loading={saving}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress Over Time</CardTitle>
              <CardDescription>
                Track your drainage readiness trends and identify patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {entries.length > 0 ? (
                <TrendChart entries={entries} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No data yet. Complete your first daily check-in to see trends.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidance" className="space-y-6">
          <DrainageSuggestions 
            currentScore={currentScore}
            entries={entries}
            binderUnlocked={binderUnlocked}
          />
        </TabsContent>
      </Tabs>

      {/* Educational Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Why Drainage Readiness Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="text-muted-foreground">
            Your body&apos;s drainage pathways (bowels, liver, kidneys, lymph, and skin) must be functioning 
            optimally before you begin pulling toxins out with binders. If these pathways are blocked or 
            sluggish, released toxins can recirculate and make you feel worse.
          </p>
          <div className="grid gap-3 mt-4">
            <div className="flex gap-3">
              <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Bowels</p>
                <p className="text-sm text-muted-foreground">1-3 movements daily, well-formed</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Heart className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium">Liver & Gallbladder</p>
                <p className="text-sm text-muted-foreground">Bile flowing, no nausea or right-side pain</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Activity className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Lymphatic System</p>
                <p className="text-sm text-muted-foreground">No swelling, regular movement/exercise</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Droplets className="h-5 w-5 text-cyan-600 mt-0.5" />
              <div>
                <p className="font-medium">Kidneys</p>
                <p className="text-sm text-muted-foreground">Clear urine, adequate hydration</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Moon className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium">Skin/Sweat</p>
                <p className="text-sm text-muted-foreground">Regular sweating, clear skin</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
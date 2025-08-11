'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  TestTube,
  TrendingUp,
  Info
} from 'lucide-react'
import { differenceInDays, addDays, format } from 'date-fns'

interface RetestData {
  lastVCSTest?: Date
  lastUrineTest?: Date
  nextVCSDate?: Date
  nextUrineDate?: Date
  vcsResults?: 'pass' | 'fail' | 'pending'
  mycotoxinLevels?: 'high' | 'moderate' | 'low' | 'clear'
}

export function RetestCountdown() {
  const [retestData, setRetestData] = useState<RetestData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching retest data
    const fetchRetestData = async () => {
      try {
        // In production, fetch from API
        // const response = await fetch('/api/user/retest-schedule')
        // const data = await response.json()
        
        // Simulated data for development
        const simulatedData: RetestData = {
          lastVCSTest: new Date('2024-10-01'),
          lastUrineTest: new Date('2024-09-15'),
          nextVCSDate: addDays(new Date(), 14), // 14 days from now
          nextUrineDate: addDays(new Date(), 45), // 45 days from now
          vcsResults: 'fail',
          mycotoxinLevels: 'moderate'
        }
        
        setRetestData(simulatedData)
      } catch (error) {
        console.error('Failed to fetch retest data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRetestData()
  }, [])

  const getVCSDaysRemaining = () => {
    if (!retestData.nextVCSDate) return null
    return differenceInDays(retestData.nextVCSDate, new Date())
  }

  const getUrineDaysRemaining = () => {
    if (!retestData.nextUrineDate) return null
    return differenceInDays(retestData.nextUrineDate, new Date())
  }

  const getVCSProgress = () => {
    if (!retestData.lastVCSTest || !retestData.nextVCSDate) return 0
    const totalDays = differenceInDays(retestData.nextVCSDate, retestData.lastVCSTest)
    const daysElapsed = differenceInDays(new Date(), retestData.lastVCSTest)
    return Math.min(100, (daysElapsed / totalDays) * 100)
  }

  const getUrineProgress = () => {
    if (!retestData.lastUrineTest || !retestData.nextUrineDate) return 0
    const totalDays = differenceInDays(retestData.nextUrineDate, retestData.lastUrineTest)
    const daysElapsed = differenceInDays(new Date(), retestData.lastUrineTest)
    return Math.min(100, (daysElapsed / totalDays) * 100)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Retesting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-muted rounded" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const vcsDays = getVCSDaysRemaining()
  const urineDays = getUrineDaysRemaining()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-blue-600" />
          Retesting Schedule
        </CardTitle>
        <CardDescription>
          Track your progress with regular testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* VCS Test Countdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">VCS Test</span>
              {retestData.vcsResults && (
                <Badge variant={retestData.vcsResults === 'pass' ? 'success' : 'warning'}>
                  Last: {retestData.vcsResults}
                </Badge>
              )}
            </div>
            {vcsDays !== null && (
              <span className="text-2xl font-bold text-blue-600">
                {vcsDays} days
              </span>
            )}
          </div>
          
          <Progress value={getVCSProgress()} className="h-2" />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Every 3 months</span>
            {retestData.nextVCSDate && (
              <span>Due: {format(retestData.nextVCSDate, 'MMM d, yyyy')}</span>
            )}
          </div>

          {vcsDays !== null && vcsDays <= 7 && (
            <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-900">
                VCS retest coming up soon! Schedule your test.
              </span>
            </div>
          )}
        </div>

        {/* Urine Mycotoxin Test Countdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Mycotoxin Test</span>
              {retestData.mycotoxinLevels && (
                <Badge 
                  variant={
                    retestData.mycotoxinLevels === 'clear' ? 'success' : 
                    retestData.mycotoxinLevels === 'low' ? 'outline' : 
                    'warning'
                  }
                >
                  {retestData.mycotoxinLevels}
                </Badge>
              )}
            </div>
            {urineDays !== null && (
              <span className="text-2xl font-bold text-emerald-600">
                {urineDays} days
              </span>
            )}
          </div>
          
          <Progress value={getUrineProgress()} className="h-2" />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Every 3-6 months</span>
            {retestData.nextUrineDate && (
              <span>Due: {format(retestData.nextUrineDate, 'MMM d, yyyy')}</span>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-900 space-y-1">
              <p className="font-medium">Why regular testing matters:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>VCS tests track neurological recovery</li>
                <li>Mycotoxin tests confirm toxin elimination</li>
                <li>Both help adjust your protocol as needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule Test
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
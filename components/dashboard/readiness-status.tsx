'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity,
  Droplets,
  Moon,
  Brain,
  Heart,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface ReadinessMetric {
  name: string
  score: number
  trend: 'up' | 'down' | 'stable'
  icon: React.ElementType
  description: string
  tips?: string[]
}

interface ReadinessData {
  overallScore: number
  isReady: boolean
  daysTracked: number
  daysUntilReady: number | null
  metrics: ReadinessMetric[]
  recommendations: string[]
}

export function ReadinessStatus() {
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null)
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch readiness data (mock for now)
    const fetchReadinessData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockData: ReadinessData = {
        overallScore: 68,
        isReady: false,
        daysTracked: 7,
        daysUntilReady: 3,
        metrics: [
          {
            name: 'Hydration',
            score: 85,
            trend: 'up',
            icon: Droplets,
            description: 'Your water intake is excellent',
            tips: [
              'Maintain 64+ oz daily',
              'Add electrolytes for better absorption',
              'Drink between meals, not during'
            ]
          },
          {
            name: 'Sleep Quality',
            score: 72,
            trend: 'stable',
            icon: Moon,
            description: 'Sleep is improving but needs consistency',
            tips: [
              'Aim for 8 hours nightly',
              'No screens 1 hour before bed',
              'Keep bedroom below 68°F'
            ]
          },
          {
            name: 'Bowel Movements',
            score: 60,
            trend: 'down',
            icon: Activity,
            description: 'Need more regularity (1-2x daily ideal)',
            tips: [
              'Increase fiber intake',
              'Try magnesium citrate',
              'Consider coffee enemas'
            ]
          },
          {
            name: 'Energy Levels',
            score: 55,
            trend: 'up',
            icon: Heart,
            description: 'Low but improving gradually',
            tips: [
              'Rest when needed',
              'Light exercise only',
              'Support mitochondria with CoQ10'
            ]
          },
          {
            name: 'Brain Fog',
            score: 65,
            trend: 'up',
            icon: Brain,
            description: 'Moderate fog, showing improvement',
            tips: [
              'Omega-3 supplementation',
              'Limit screen time',
              'Try lion\'s mane mushroom'
            ]
          }
        ],
        recommendations: [
          'Focus on improving bowel regularity before starting binders',
          'Continue current hydration protocol',
          'Consider adding gentle lymphatic support',
          'Track symptoms daily for accurate assessment'
        ]
      }
      
      setReadinessData(mockData)
      setLoading(false)
    }

    fetchReadinessData()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch(trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Checking Readiness...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!readinessData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Drainage Readiness</CardTitle>
          <CardDescription>Unable to load readiness data</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <Card className={readinessData.isReady ? 'border-green-200' : 'border-yellow-200'}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Drainage Readiness Score</CardTitle>
              <CardDescription>
                Based on {readinessData.daysTracked} days of tracking
              </CardDescription>
            </div>
            <Badge 
              variant={readinessData.isReady ? 'default' : 'secondary'}
              className={readinessData.isReady ? 'bg-green-100 text-green-800' : ''}
            >
              {readinessData.isReady ? 'Ready for Binders' : 'Not Ready Yet'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Overall Readiness</span>
                <div className="group relative">
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                    80% or higher for 7 consecutive days indicates readiness for binder protocols
                  </div>
                </div>
              </div>
              <span className={`text-3xl font-bold ${getScoreColor(readinessData.overallScore)}`}>
                {readinessData.overallScore}%
              </span>
            </div>
            <Progress 
              value={readinessData.overallScore} 
              className="h-4"
              style={{
                background: `linear-gradient(to right, ${getProgressBarColor(readinessData.overallScore)} ${readinessData.overallScore}%, #e5e7eb ${readinessData.overallScore}%)`
              }}
            />
            {!readinessData.isReady && readinessData.daysUntilReady && (
              <p className="text-sm text-gray-600 mt-2">
                Estimated {readinessData.daysUntilReady} more days until ready (maintain current progress)
              </p>
            )}
          </div>

          {/* Warning/Success Message */}
          {!readinessData.isReady && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Continue drainage support before starting binders</p>
                <p className="mt-1">Starting binders too early can cause severe detox reactions</p>
              </div>
            </div>
          )}

          {readinessData.isReady && (
            <div className="flex items-start gap-2 p-3 bg-green-50 text-green-800 rounded-lg">
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Your body is ready for gentle binder protocols!</p>
                <p className="mt-1">Start with low doses and increase gradually</p>
              </div>
            </div>
          )}

          {/* Individual Metrics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Detailed Metrics</h3>
            <div className="space-y-2">
              {readinessData.metrics.map((metric) => {
                const Icon = metric.icon
                const isExpanded = expandedMetric === metric.name
                
                return (
                  <div 
                    key={metric.name}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedMetric(isExpanded ? null : metric.name)}
                      className="w-full p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getScoreBgColor(metric.score)}`}>
                            <Icon className={`h-4 w-4 ${getScoreColor(metric.score)}`} />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm text-gray-900">{metric.name}</p>
                            <p className="text-xs text-gray-500">{metric.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-lg font-bold ${getScoreColor(metric.score)}`}>
                            {metric.score}%
                          </span>
                          <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                    </button>
                    
                    {isExpanded && metric.tips && (
                      <div className="px-3 pb-3 border-t bg-gray-50">
                        <p className="text-xs font-medium text-gray-700 mt-3 mb-2">Tips to improve:</p>
                        <ul className="space-y-1">
                          {metric.tips.map((tip, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                              <span className="text-gray-400 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommendations */}
          {readinessData.recommendations.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h3>
              <ul className="space-y-2">
                {readinessData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link href="/tools/drainage-readiness" className="flex-1">
              <Button className="w-full" variant={readinessData.isReady ? 'outline' : 'default'}>
                Track Today's Metrics
              </Button>
            </Link>
            {readinessData.isReady && (
              <Link href="/modules/04-binder-protocols" className="flex-1">
                <Button className="w-full">
                  Start Binder Protocol
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Why Drainage Matters</p>
              <p className="text-blue-800">
                Proper drainage ensures toxins can exit your body safely. Without open drainage pathways, 
                binders can cause toxins to recirculate, making symptoms worse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
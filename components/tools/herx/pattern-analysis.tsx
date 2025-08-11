/**
 * @fileoverview Pattern Analysis component for tracking Herx trends over time
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock,
  BarChart3,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'

interface PatternAnalysisProps {
  herxHistory: any[]
}

export function PatternAnalysis({ herxHistory }: PatternAnalysisProps) {
  if (herxHistory.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">
            No data yet. Track at least 3 Herx episodes to see patterns.
          </p>
        </CardContent>
      </Card>
    )
  }

  const calculateTrends = () => {
    if (herxHistory.length < 2) return null

    const recent = herxHistory.slice(0, Math.min(5, herxHistory.length))
    const older = herxHistory.slice(5, Math.min(10, herxHistory.length))

    if (older.length === 0) return null

    const recentAvg = recent.reduce((sum, entry) => sum + entry.severity, 0) / recent.length
    const olderAvg = older.reduce((sum, entry) => sum + entry.severity, 0) / older.length

    return {
      trend: recentAvg - olderAvg,
      recentAvg: recentAvg.toFixed(1),
      olderAvg: olderAvg.toFixed(1)
    }
  }

  const getFrequencyAnalysis = () => {
    if (herxHistory.length < 2) return null

    const dates = herxHistory.map(entry => new Date(entry.date))
    const daysBetween = []

    for (let i = 0; i < dates.length - 1; i++) {
      const diff = Math.abs(dates[i].getTime() - dates[i + 1].getTime())
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      daysBetween.push(days)
    }

    const avgDays = daysBetween.reduce((sum, days) => sum + days, 0) / daysBetween.length

    return {
      averageDaysBetween: avgDays.toFixed(1),
      frequency: avgDays <= 1 ? 'Daily' : avgDays <= 3 ? 'Every few days' : avgDays <= 7 ? 'Weekly' : 'Infrequent'
    }
  }

  const getSeverityBreakdown = () => {
    const mild = herxHistory.filter(entry => entry.severity <= 3).length
    const moderate = herxHistory.filter(entry => entry.severity >= 4 && entry.severity <= 6).length
    const severe = herxHistory.filter(entry => entry.severity >= 7).length

    return { mild, moderate, severe }
  }

  const trends = calculateTrends()
  const frequency = getFrequencyAnalysis()
  const breakdown = getSeverityBreakdown()

  return (
    <div className="space-y-6">
      {/* Overall Trends */}
      {trends && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Severity Trends
            </CardTitle>
            <CardDescription>
              Comparing your most recent reactions to earlier ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{trends.recentAvg}</div>
                <div className="text-sm text-gray-600">Recent Average</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{trends.olderAvg}</div>
                <div className="text-sm text-gray-600">Earlier Average</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className={`flex items-center justify-center gap-1 text-lg font-bold ${
                  trends.trend > 0 ? 'text-red-600' : trends.trend < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {trends.trend > 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : trends.trend < 0 ? (
                    <TrendingDown className="w-5 h-5" />
                  ) : null}
                  {trends.trend > 0 ? '+' : ''}{trends.trend.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">
                  {trends.trend > 0.5 ? 'Worsening' : trends.trend < -0.5 ? 'Improving' : 'Stable'}
                </div>
              </div>
            </div>

            {trends.trend > 1 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-800">Worsening Trend Detected</div>
                    <div className="text-sm text-red-700">
                      Your recent Herx reactions are more severe. Consider slowing your protocol 
                      or seeking medical guidance.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {trends.trend < -0.5 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-800">Improving Trend</div>
                    <div className="text-sm text-green-700">
                      Your Herx reactions are becoming milder over time. This suggests 
                      your body is adapting well to the treatment.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Frequency Analysis */}
      {frequency && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Frequency Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{frequency.averageDaysBetween}</div>
                <div className="text-sm text-gray-600">Days Between Episodes</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {frequency.frequency}
                </Badge>
                <div className="text-sm text-gray-600 mt-2">Frequency Pattern</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Severity Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            Severity Breakdown
          </CardTitle>
          <CardDescription>
            Distribution of your Herx reactions by severity level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg bg-green-50">
                <div className="text-2xl font-bold text-green-700">{breakdown.mild}</div>
                <div className="text-sm text-green-600">Mild (1-3)</div>
                <div className="text-xs text-gray-500">
                  {herxHistory.length > 0 ? Math.round((breakdown.mild / herxHistory.length) * 100) : 0}%
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-yellow-50">
                <div className="text-2xl font-bold text-yellow-700">{breakdown.moderate}</div>
                <div className="text-sm text-yellow-600">Moderate (4-6)</div>
                <div className="text-xs text-gray-500">
                  {herxHistory.length > 0 ? Math.round((breakdown.moderate / herxHistory.length) * 100) : 0}%
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-red-50">
                <div className="text-2xl font-bold text-red-700">{breakdown.severe}</div>
                <div className="text-sm text-red-600">Severe (7-10)</div>
                <div className="text-xs text-gray-500">
                  {herxHistory.length > 0 ? Math.round((breakdown.severe / herxHistory.length) * 100) : 0}%
                </div>
              </div>
            </div>

            {breakdown.severe > breakdown.mild && herxHistory.length >= 5 && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-800">High Severe Reaction Rate</div>
                    <div className="text-sm text-orange-700">
                      You're experiencing more severe reactions than mild ones. Consider 
                      discussing a slower titration approach with your healthcare provider.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Episodes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            Recent Episodes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {herxHistory.slice(0, 5).map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={entry.severity >= 7 ? 'destructive' : entry.severity >= 4 ? 'secondary' : 'default'}
                  >
                    Level {entry.severity}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()} at {entry.time}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {index === 0 ? 'Latest' : `${index + 1} ago`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {herxHistory.length >= 10 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <span>
                  You have sufficient data ({herxHistory.length} entries) for meaningful pattern analysis.
                </span>
              </div>
            )}

            {breakdown.mild > breakdown.severe && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <span>
                  Most of your reactions are mild, indicating good tolerance of your current protocol.
                </span>
              </div>
            )}

            {frequency && parseFloat(frequency.averageDaysBetween) > 7 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <span>
                  Your reactions are infrequent (every {frequency.averageDaysBetween} days), 
                  suggesting good spacing between episodes.
                </span>
              </div>
            )}

            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-blue-500 mt-0.5" />
              <span>
                Continue tracking to build a more complete picture of your detox patterns.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DrainageEntry {
  date: string
  metrics: any
  score: number
}

interface TrendChartProps {
  entries: DrainageEntry[]
}

export function TrendChart({ entries }: TrendChartProps) {
  // Prepare data for the chart
  const chartData = entries.map(entry => ({
    date: format(new Date(entry.date), 'MMM d'),
    fullDate: entry.date,
    score: entry.score,
    bowels: entry.metrics.bowelMovements * 10,
    hydration: entry.metrics.hydration * 10,
    energy: entry.metrics.energy * 10,
    sleep: entry.metrics.sleep * 10,
    brainFog: entry.metrics.brainFog * 10,
  }))

  // Calculate statistics
  const avgScore = entries.reduce((sum, e) => sum + e.score, 0) / entries.length
  const maxScore = Math.max(...entries.map(e => e.score))
  const minScore = Math.min(...entries.map(e => e.score))
  const lastScore = entries[entries.length - 1]?.score || 0
  const trend = entries.length > 1 
    ? lastScore - entries[entries.length - 2].score 
    : 0

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Average</p>
          <p className="text-2xl font-bold">{avgScore.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Highest</p>
          <p className="text-2xl font-bold text-green-600">{maxScore}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Lowest</p>
          <p className="text-2xl font-bold text-red-600">{minScore}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Trend</p>
          <p className="text-2xl font-bold">
            {trend > 0 ? (
              <span className="text-green-600">+{trend}%</span>
            ) : trend < 0 ? (
              <span className="text-red-600">{trend}%</span>
            ) : (
              <span className="text-gray-600">0%</span>
            )}
          </p>
        </div>
      </div>

      {/* Overall Score Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Drainage Score Trend</CardTitle>
          <CardDescription>
            Your daily drainage readiness score over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={80} 
                stroke="#10b981" 
                strokeDasharray="5 5"
                label={{ value: "Target: 80%", position: "left" }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Metrics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Pathway Trends</CardTitle>
          <CardDescription>
            Track each drainage pathway separately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="bowels" 
                stroke="#3b82f6" 
                name="Bowels"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="hydration" 
                stroke="#06b6d4" 
                name="Hydration"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#f59e0b" 
                name="Energy"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="sleep" 
                stroke="#8b5cf6" 
                name="Sleep"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="brainFog" 
                stroke="#ec4899" 
                name="Mental Clarity"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Pattern Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {avgScore >= 80 && (
              <div className="flex items-center gap-2">
                <Badge variant="success">Great Progress</Badge>
                <p className="text-sm text-muted-foreground">
                  Your average score is above the 80% threshold!
                </p>
              </div>
            )}
            {avgScore < 80 && avgScore >= 60 && (
              <div className="flex items-center gap-2">
                <Badge variant="warning">Getting There</Badge>
                <p className="text-sm text-muted-foreground">
                  You&apos;re making progress. Focus on consistent improvements.
                </p>
              </div>
            )}
            {avgScore < 60 && (
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Needs Attention</Badge>
                <p className="text-sm text-muted-foreground">
                  Your drainage pathways need more support before starting detox.
                </p>
              </div>
            )}
            {trend > 5 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline">Upward Trend</Badge>
                <p className="text-sm text-muted-foreground">
                  Your scores are improving - keep up the good work!
                </p>
              </div>
            )}
            {trend < -5 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline">Declining Trend</Badge>
                <p className="text-sm text-muted-foreground">
                  Your scores are dropping. Review your drainage support protocols.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
/**
 * @fileoverview Protocol Timeline - Visual timeline view of the protocol steps
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight
} from 'lucide-react'
import { ProtocolStep } from '@/app/(app)/tools/protocol-builder/page'

interface ProtocolTimelineProps {
  steps: ProtocolStep[]
}

export function ProtocolTimeline({ steps }: ProtocolTimelineProps) {
  // Group steps by week
  const timeline: { [week: number]: ProtocolStep[] } = {}
  const maxWeek = Math.max(...steps.map(s => s.weekStart + Math.ceil(s.duration / 7)), 1)
  
  steps.forEach(step => {
    const startWeek = step.weekStart
    const endWeek = startWeek + Math.ceil(step.duration / 7) - 1
    
    for (let week = startWeek; week <= endWeek; week++) {
      if (!timeline[week]) {
        timeline[week] = []
      }
      timeline[week].push(step)
    }
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'drainage': return '💧'
      case 'binder': return '🧲'
      case 'antifungal': return '🍄'
      case 'support': return '💊'
      case 'lifestyle': return '🌱'
      default: return '📌'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'drainage': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'binder': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'antifungal': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'support': return 'bg-green-100 text-green-700 border-green-200'
      case 'lifestyle': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Add protocol elements to see your timeline</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card>
        <CardHeader>
          <CardTitle>Protocol Timeline</CardTitle>
          <CardDescription>
            Your {maxWeek}-week journey to recovery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Total Duration: {maxWeek} weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Steps: {steps.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Phases */}
      <div className="space-y-6">
        {/* Phase 1: Drainage (Weeks 1-4) */}
        {timeline[1] && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-blue-900">Phase 1: Drainage & Foundation</CardTitle>
                  <CardDescription className="text-blue-700">
                    Weeks 1-4 • Open drainage pathways before detox
                  </CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Critical</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 border-blue-200 bg-blue-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Never skip drainage preparation - this prevents severe detox reactions
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                {[1, 2, 3, 4].map(week => timeline[week] && (
                  <WeekRow key={week} week={week} steps={timeline[week]} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Phase 2: Binders (Weeks 5-12) */}
        {timeline[5] && (
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-purple-900">Phase 2: Mycotoxin Binding</CardTitle>
                  <CardDescription className="text-purple-700">
                    Weeks 5-12 • Remove mycotoxins with binders
                  </CardDescription>
                </div>
                <Badge className="bg-purple-100 text-purple-700">Primary Treatment</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[5, 6, 7, 8, 9, 10, 11, 12].map(week => timeline[week] && (
                  <WeekRow key={week} week={week} steps={timeline[week]} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Phase 3: Antifungals (Weeks 9+) */}
        {timeline[9] && (
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-orange-900">Phase 3: Antifungal Treatment</CardTitle>
                  <CardDescription className="text-orange-700">
                    Weeks 9+ • Address colonization if needed
                  </CardDescription>
                </div>
                <Badge className="bg-orange-100 text-orange-700">Optional</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 border-orange-200 bg-orange-50">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Only 20-30% of people need antifungals - based on symptoms and testing
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                {Array.from({ length: maxWeek - 8 }, (_, i) => i + 9).map(week => timeline[week] && (
                  <WeekRow key={week} week={week} steps={timeline[week]} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Timeline Grid View */}
      <Card>
        <CardHeader>
          <CardTitle>Week-by-Week Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {Array.from({ length: maxWeek }, (_, i) => i + 1).map(week => (
              <div key={week} className="relative flex items-start mb-6">
                <div className="absolute left-5 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{week}</span>
                </div>
                <div className="ml-16 flex-1">
                  <div className="font-medium text-sm text-gray-700 mb-2">Week {week}</div>
                  {timeline[week] ? (
                    <div className="flex flex-wrap gap-2">
                      {timeline[week].map(step => (
                        <Badge
                          key={step.id}
                          variant="outline"
                          className={getCategoryColor(step.category)}
                        >
                          <span className="mr-1">{getCategoryIcon(step.category)}</span>
                          {step.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No new interventions</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WeekRow({ week, steps }: { week: number; steps: ProtocolStep[] }) {
  const uniqueSteps = Array.from(new Set(steps.map(s => s.id)))
    .map(id => steps.find(s => s.id === id)!)
  
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-sm font-medium text-gray-600">Week {week}</div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      <div className="flex flex-wrap gap-2">
        {uniqueSteps.map(step => (
          <Badge key={step.id} variant="secondary" className="text-xs">
            {step.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
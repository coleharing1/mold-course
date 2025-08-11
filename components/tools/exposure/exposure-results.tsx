'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import type { RoomData } from '@/app/(app)/tools/exposure-checklist/page'
import { generateFixFirstList } from '@/lib/tools/fix-first-generator'
import { estimateCosts } from '@/lib/tools/cost-estimator'

interface ExposureResultsProps {
  rooms: RoomData[]
  score: number
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
}

export function ExposureResults({ rooms, score, riskLevel }: ExposureResultsProps) {
  const fixFirstList = generateFixFirstList(rooms)
  const costs = estimateCosts(rooms)
  
  const getRiskColor = () => {
    switch(riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-300'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-300'
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-300'
      default: return 'text-green-600 bg-green-50 border-green-300'
    }
  }

  const getRiskIcon = () => {
    switch(riskLevel) {
      case 'critical': return <XCircle className="h-8 w-8 text-red-600" />
      case 'high': return <AlertCircle className="h-8 w-8 text-orange-600" />
      case 'moderate': return <AlertTriangle className="h-8 w-8 text-yellow-600" />
      default: return <CheckCircle className="h-8 w-8 text-green-600" />
    }
  }

  const problemRooms = rooms.filter(r => r.severity !== 'none')
  const criticalRooms = rooms.filter(r => r.severity === 'severe')
  const totalIssues = rooms.reduce((sum, room) => 
    sum + Object.values(room.issues).filter(Boolean).length, 0
  )

  return (
    <div className="space-y-6">
      {/* Overall Risk Assessment */}
      <Card className={`p-6 border-2 ${getRiskColor()}`}>
        <div className="flex items-start gap-4">
          {getRiskIcon()}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Overall Risk: {riskLevel.toUpperCase()}
            </h2>
            <div className="flex items-center gap-4 mb-3">
              <div>
                <span className="text-3xl font-bold">{score}</span>
                <span className="text-gray-600">/100</span>
              </div>
              <Badge variant={riskLevel === 'critical' ? 'destructive' : 'default'}>
                {totalIssues} issues found
              </Badge>
              {criticalRooms.length > 0 && (
                <Badge variant="destructive">
                  {criticalRooms.length} critical rooms
                </Badge>
              )}
            </div>
            <p className="text-gray-700">
              {riskLevel === 'critical' && (
                "Immediate action required. Your environment has significant mold contamination that poses serious health risks. Consider temporary relocation while addressing these issues."
              )}
              {riskLevel === 'high' && (
                "Substantial mold issues detected. Professional remediation is strongly recommended. Use protective equipment and limit time in affected areas."
              )}
              {riskLevel === 'moderate' && (
                "Several concerning issues found. Address these promptly to prevent escalation. Consider professional assessment for problem areas."
              )}
              {riskLevel === 'low' && (
                "Minor or no significant issues detected. Continue regular maintenance and monitoring. Address any small issues before they grow."
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Room-by-Room Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Room-by-Room Summary
        </h3>
        <div className="space-y-3">
          {rooms.map((room) => {
            const issueCount = Object.values(room.issues).filter(Boolean).length
            const hasCritical = room.issues.visibleMold || room.issues.waterDamage
            
            return (
              <div key={room.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    room.severity === 'severe' ? 'bg-red-500' :
                    room.severity === 'moderate' ? 'bg-orange-500' :
                    room.severity === 'mild' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <span className="font-medium text-gray-900">{room.name}</span>
                    {hasCritical && (
                      <Badge variant="destructive" className="ml-2 text-xs">Critical</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {issueCount > 0 ? `${issueCount} issues` : 'Clear'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {room.severity}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Priority Action Items */}
      {fixFirstList.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🔧 Priority Fix List
          </h3>
          <div className="space-y-2">
            {fixFirstList.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  item.priority === 'critical' ? 'bg-red-500' :
                  item.priority === 'high' ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600">
                    {item.room} • Priority: {item.priority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Cost Estimates */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💰 Estimated Remediation Costs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">DIY Approach</p>
            <p className="text-2xl font-bold text-gray-900">
              ${costs.diy.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Materials & equipment</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Professional</p>
            <p className="text-2xl font-bold text-gray-900">
              ${costs.professional.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Full remediation service</p>
          </div>
          <div className="p-4 bg-primary-50 rounded-lg border-2 border-primary-300">
            <p className="text-sm text-primary-700 mb-1">Total Range</p>
            <p className="text-2xl font-bold text-primary-900">
              ${costs.total.min.toLocaleString()} - ${costs.total.max.toLocaleString()}
            </p>
            <p className="text-xs text-primary-600 mt-1">Including testing</p>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Recommended Next Steps
        </h3>
        <ol className="space-y-3">
          {riskLevel === 'critical' && (
            <>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span className="text-gray-700">Consider immediate temporary relocation if possible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span className="text-gray-700">Contact professional mold remediation company today</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span className="text-gray-700">Get medical evaluation for mold exposure symptoms</span>
              </li>
            </>
          )}
          {(riskLevel === 'high' || riskLevel === 'moderate') && (
            <>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span className="text-gray-700">Schedule professional mold inspection within the week</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span className="text-gray-700">Start using air purifiers in affected rooms immediately</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span className="text-gray-700">Address moisture sources and improve ventilation</span>
              </li>
            </>
          )}
          {riskLevel === 'low' && (
            <>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span className="text-gray-700">Continue regular maintenance and monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span className="text-gray-700">Fix any minor issues before they escalate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span className="text-gray-700">Maintain humidity below 50% in all rooms</span>
              </li>
            </>
          )}
        </ol>
      </Card>
    </div>
  )
}
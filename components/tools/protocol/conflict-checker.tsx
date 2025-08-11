/**
 * @fileoverview Conflict Checker - Identifies and resolves protocol conflicts
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Shield,
  Lightbulb
} from 'lucide-react'
import { ProtocolStep } from '@/app/(app)/tools/protocol-builder/page'

interface ProtocolConflict {
  step1: string
  step2: string
  severity: 'high' | 'medium' | 'low'
  reason: string
  resolution: string
}

interface ConflictCheckerProps {
  conflicts: ProtocolConflict[]
  steps: ProtocolStep[]
}

export function ConflictChecker({ conflicts, steps }: ConflictCheckerProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-5 w-5 text-red-600" />
      case 'medium': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'low': return <Info className="h-5 w-5 text-blue-600" />
      default: return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (conflicts.length === 0 && steps.length > 0) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <CardTitle className="text-green-900">No Conflicts Detected</CardTitle>
              <CardDescription className="text-green-700">
                Your protocol is well-balanced with no timing or interaction conflicts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Safety Verified</p>
                <p className="text-sm text-green-700">
                  All selected treatments can be safely combined as scheduled
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Prerequisites Met</p>
                <p className="text-sm text-green-700">
                  All required foundation steps are in place before advanced treatments
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (conflicts.length === 0 && steps.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Add protocol elements to check for conflicts</p>
        </CardContent>
      </Card>
    )
  }

  // Group conflicts by severity
  const highConflicts = conflicts.filter(c => c.severity === 'high')
  const mediumConflicts = conflicts.filter(c => c.severity === 'medium')
  const lowConflicts = conflicts.filter(c => c.severity === 'low')

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      {highConflicts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Conflicts Detected</AlertTitle>
          <AlertDescription>
            {highConflicts.length} high-severity conflict{highConflicts.length !== 1 ? 's' : ''} must be resolved before proceeding
          </AlertDescription>
        </Alert>
      )}

      {/* Conflict List */}
      <Card>
        <CardHeader>
          <CardTitle>Conflict Analysis</CardTitle>
          <CardDescription>
            {conflicts.length} potential conflict{conflicts.length !== 1 ? 's' : ''} found in your protocol
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* High Severity Conflicts */}
          {highConflicts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-red-900 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                High Severity ({highConflicts.length})
              </h3>
              {highConflicts.map((conflict, index) => (
                <ConflictCard key={index} conflict={conflict} />
              ))}
            </div>
          )}

          {/* Medium Severity Conflicts */}
          {mediumConflicts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-yellow-900 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Medium Severity ({mediumConflicts.length})
              </h3>
              {mediumConflicts.map((conflict, index) => (
                <ConflictCard key={index} conflict={conflict} />
              ))}
            </div>
          )}

          {/* Low Severity Conflicts */}
          {lowConflicts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-blue-900 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Low Severity ({lowConflicts.length})
              </h3>
              {lowConflicts.map((conflict, index) => (
                <ConflictCard key={index} conflict={conflict} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* General Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Conflict Resolution Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium">Timing Conflicts</p>
              <p className="text-sm text-gray-600">
                Separate conflicting treatments by at least 2 hours, or take on alternate days
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium">Prerequisite Violations</p>
              <p className="text-sm text-gray-600">
                Ensure drainage pathways are open for 2-4 weeks before starting binders
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium">Multiple Binders</p>
              <p className="text-sm text-gray-600">
                Start with one binder and add others gradually to avoid excessive detox
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium">Antifungal Timing</p>
              <p className="text-sm text-gray-600">
                Stabilize on binders for 2-4 weeks before adding antifungals
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConflictCard({ conflict }: { conflict: ProtocolConflict }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Card className={`p-4 ${getSeverityColor(conflict.severity)}`}>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              {conflict.step1} ↔ {conflict.step2}
            </span>
            <Badge variant="secondary" className={`text-xs ${getSeverityBadgeColor(conflict.severity)}`}>
              {conflict.severity}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-700">{conflict.reason}</p>
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-gray-500 mt-0.5" />
          <p className="text-sm text-gray-600">
            <strong>Resolution:</strong> {conflict.resolution}
          </p>
        </div>
      </div>
    </Card>
  )
}
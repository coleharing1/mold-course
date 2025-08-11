/**
 * @fileoverview Symptom Tracker component for logging and tracking Herx patterns
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Thermometer, Heart, Brain, TrendingUp } from 'lucide-react'

interface SymptomTrackerProps {
  herxHistory: any[]
  onUpdateEntry: (id: string, updates: any) => void
  currentAssessment: any
}

export function SymptomTracker({ herxHistory, onUpdateEntry, currentAssessment }: SymptomTrackerProps) {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [notes, setNotes] = useState('')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Symptom History
          </CardTitle>
          <CardDescription>
            Track your Herx reactions over time to identify patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {herxHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No Herx entries yet. Complete an assessment to start tracking.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {herxHistory.slice(0, 10).map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEntry(entry.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={entry.severity >= 7 ? 'destructive' : entry.severity >= 4 ? 'secondary' : 'default'}>
                        Level {entry.severity}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {entry.date} at {entry.time}
                      </span>
                    </div>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-gray-700 mt-2">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {currentAssessment && (
        <Card>
          <CardHeader>
            <CardTitle>Add Notes to Current Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add any additional notes about your current symptoms, triggers, or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
            <Button 
              onClick={() => {
                if (herxHistory.length > 0) {
                  onUpdateEntry(herxHistory[0].id, { notes })
                  setNotes('')
                }
              }}
              className="mt-4"
            >
              Save Notes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

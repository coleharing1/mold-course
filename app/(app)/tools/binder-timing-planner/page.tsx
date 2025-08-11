/**
 * @fileoverview Binder Timing Planner - Master complex medication and supplement timing
 * to avoid interactions and maximize effectiveness of mycotoxin binders
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2,
  Download,
  Calendar,
  Pill,
  Coffee,
  Utensils,
  Bell,
  Zap
} from 'lucide-react'

interface Medication {
  id: string
  name: string
  type: 'binder' | 'prescription' | 'supplement' | 'food'
  dosage: string
  frequency: number // times per day
  timing: string[] // times like "8:00", "12:00", "18:00", "22:00"
  constraints: {
    withFood?: boolean
    emptyStomach?: boolean
    fatSoluble?: boolean
    acidicDrink?: boolean
    separateFromBinders?: boolean
    separateFromMinerals?: boolean
  }
  notes?: string
}

interface Conflict {
  medication1: string
  medication2: string
  severity: 'high' | 'medium' | 'low'
  reason: string
  suggestion: string
}

const binderTypes = [
  {
    name: 'Cholestyramine (CSM)',
    standardDosing: '4g, 4 times daily',
    timing: 'Take 30-60 min before meals and bedtime',
    constraints: { emptyStomach: true, separateFromBinders: true }
  },
  {
    name: 'Welchol (Colesevelam)',
    standardDosing: '3.75g, 2 times daily',
    timing: 'Take with meals, can be combined with CSM',
    constraints: { withFood: true }
  },
  {
    name: 'Activated Charcoal',
    standardDosing: '1-2g, 2-3 times daily',
    timing: 'Take 2+ hours from all other medications',
    constraints: { emptyStomach: true, separateFromBinders: true }
  },
  {
    name: 'Chlorella',
    standardDosing: '3-6g daily',
    timing: 'Take with meals or between meals',
    constraints: {}
  }
]

const commonMedications = [
  {
    name: 'Levothyroxine (Thyroid)',
    type: 'prescription',
    timing: 'First thing in morning, empty stomach',
    constraints: { emptyStomach: true, separateFromBinders: true }
  },
  {
    name: 'Vitamin D3',
    type: 'supplement',
    timing: 'With largest meal',
    constraints: { withFood: true, fatSoluble: true }
  },
  {
    name: 'Omega-3 Fish Oil',
    type: 'supplement',
    timing: 'With meals',
    constraints: { withFood: true, fatSoluble: true }
  },
  {
    name: 'Probiotics',
    type: 'supplement',
    timing: 'Away from hot drinks and antimicrobials',
    constraints: { separateFromBinders: true }
  },
  {
    name: 'Magnesium',
    type: 'supplement',
    timing: 'Evening, away from binders',
    constraints: { separateFromBinders: true }
  }
]

export default function BinderTimingPlannerPage() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: '',
    type: 'supplement',
    dosage: '',
    frequency: 1,
    timing: [],
    constraints: {}
  })
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  useEffect(() => {
    checkForConflicts()
  }, [medications])

  const checkForConflicts = () => {
    const newConflicts: Conflict[] = []

    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const med1 = medications[i]
        const med2 = medications[j]

        // Check timing conflicts
        const hasTimeOverlap = med1.timing.some(time1 => 
          med2.timing.some(time2 => {
            const time1Minutes = timeToMinutes(time1)
            const time2Minutes = timeToMinutes(time2)
            return Math.abs(time1Minutes - time2Minutes) < 120 // Within 2 hours
          })
        )

        if (hasTimeOverlap) {
          // Binder separation conflicts
          if (med1.type === 'binder' && med2.constraints.separateFromBinders) {
            newConflicts.push({
              medication1: med1.name,
              medication2: med2.name,
              severity: 'high',
              reason: 'Binders can interfere with medication absorption',
              suggestion: 'Take medications 2+ hours before or 4+ hours after binders'
            })
          }

          // Fat-soluble vitamin conflicts
          if (med1.type === 'binder' && med2.constraints.fatSoluble) {
            newConflicts.push({
              medication1: med1.name,
              medication2: med2.name,
              severity: 'medium',
              reason: 'Binders may reduce fat-soluble vitamin absorption',
              suggestion: 'Consider taking vitamins 4+ hours after binders'
            })
          }

          // Thyroid medication conflicts
          if (med1.name.toLowerCase().includes('levothyroxine') || med2.name.toLowerCase().includes('levothyroxine')) {
            newConflicts.push({
              medication1: med1.name,
              medication2: med2.name,
              severity: 'high',
              reason: 'Thyroid medication requires empty stomach and separation',
              suggestion: 'Take thyroid medication first thing in morning, wait 4 hours before binders'
            })
          }
        }
      }
    }

    setConflicts(newConflicts)
  }

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) return

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMedication.name!,
      type: newMedication.type!,
      dosage: newMedication.dosage!,
      frequency: newMedication.frequency!,
      timing: newMedication.timing || [],
      constraints: newMedication.constraints || {},
      notes: newMedication.notes
    }

    setMedications(prev => [...prev, medication])
    setNewMedication({
      name: '',
      type: 'supplement',
      dosage: '',
      frequency: 1,
      timing: [],
      constraints: {}
    })
  }

  const removeMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id))
  }

  const updateMedicationTiming = (id: string, timing: string[]) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, timing } : med
    ))
  }

  const generateOptimalSchedule = () => {
    // Auto-generate optimal timing based on constraints
    const updatedMedications = medications.map(med => {
      if (med.timing.length > 0) return med // Keep existing timing

      let optimalTimes: string[] = []

      if (med.type === 'binder') {
        // Binders: 30-60 min before meals
        optimalTimes = ['7:00', '12:00', '17:00', '22:00'].slice(0, med.frequency)
      } else if (med.constraints.emptyStomach) {
        // Empty stomach: early morning
        optimalTimes = ['6:00']
      } else if (med.constraints.withFood) {
        // With food: meal times
        optimalTimes = ['8:00', '13:00', '18:00'].slice(0, med.frequency)
      } else {
        // Default spacing
        const interval = 24 / med.frequency
        optimalTimes = Array.from({ length: med.frequency }, (_, i) => {
          const hour = Math.floor(8 + (i * interval))
          return `${hour.toString().padStart(2, '0')}:00`
        })
      }

      return { ...med, timing: optimalTimes }
    })

    setMedications(updatedMedications)
  }

  const loadTemplate = (templateName: string) => {
    const templates = {
      'csm-basic': [
        {
          id: '1',
          name: 'Cholestyramine (CSM)',
          type: 'binder' as const,
          dosage: '4g',
          frequency: 4,
          timing: ['7:00', '12:00', '17:00', '22:00'],
          constraints: { emptyStomach: true, separateFromBinders: true }
        }
      ],
      'csm-welchol': [
        {
          id: '1',
          name: 'Cholestyramine (CSM)',
          type: 'binder' as const,
          dosage: '4g',
          frequency: 2,
          timing: ['7:00', '17:00'],
          constraints: { emptyStomach: true }
        },
        {
          id: '2',
          name: 'Welchol',
          type: 'binder' as const,
          dosage: '3.75g',
          frequency: 2,
          timing: ['13:00', '22:00'],
          constraints: { withFood: true }
        }
      ]
    }

    if (templates[templateName as keyof typeof templates]) {
      setMedications(templates[templateName as keyof typeof templates])
    }
  }

  const exportSchedule = () => {
    const scheduleData = {
      medications,
      conflicts,
      generatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(scheduleData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'binder-timing-schedule.json'
    a.click()
  }

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Binder Timing Planner</h1>
        <p className="text-gray-600 mb-6">
          Plan your medication and supplement schedule to avoid interactions and maximize binder effectiveness.
        </p>

        {/* Critical Safety Alert */}
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-red-900">Critical Safety Warning</AlertTitle>
          <AlertDescription className="text-red-800">
            This tool provides general guidance only. Always consult your healthcare provider before making changes to medication timing. Some interactions can be dangerous.
          </AlertDescription>
        </Alert>

        {/* Quick Templates */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Start Templates</CardTitle>
            <CardDescription>Load a pre-configured schedule to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => loadTemplate('csm-basic')}>
                CSM Only (4x daily)
              </Button>
              <Button variant="outline" onClick={() => loadTemplate('csm-welchol')}>
                CSM + Welchol Combo
              </Button>
              <Button variant="outline" onClick={generateOptimalSchedule}>
                <Zap className="h-4 w-4 mr-2" />
                Auto-Optimize
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="medications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="medications">Add Medications</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts ({conflicts.length})</TabsTrigger>
          <TabsTrigger value="guidance">Timing Guidance</TabsTrigger>
        </TabsList>

        <TabsContent value="medications" className="space-y-6">
          {/* Add New Medication */}
          <Card>
            <CardHeader>
              <CardTitle>Add Medication or Supplement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newMedication.name || ''}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Cholestyramine"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newMedication.type} onValueChange={(value) => setNewMedication(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binder">Binder</SelectItem>
                      <SelectItem value="prescription">Prescription</SelectItem>
                      <SelectItem value="supplement">Supplement</SelectItem>
                      <SelectItem value="food">Food/Meal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={newMedication.dosage || ''}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                    placeholder="e.g., 4g"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Times per day</Label>
                  <Select value={newMedication.frequency?.toString()} onValueChange={(value) => setNewMedication(prev => ({ ...prev, frequency: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={addMedication} disabled={!newMedication.name || !newMedication.dosage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          {medications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Current Medications ({medications.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{med.name}</h4>
                          <p className="text-sm text-gray-600">{med.dosage}, {med.frequency}x daily</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={med.type === 'binder' ? 'default' : 'secondary'}>
                            {med.type}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => removeMedication(med.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Timing</Label>
                        <div className="flex gap-2 mt-1">
                          {Array.from({ length: med.frequency }, (_, i) => (
                            <Input
                              key={i}
                              type="time"
                              value={med.timing[i] || ''}
                              onChange={(e) => {
                                const newTiming = [...med.timing]
                                newTiming[i] = e.target.value
                                updateMedicationTiming(med.id, newTiming)
                              }}
                              className="w-24"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daily Schedule</CardTitle>
                <Button variant="outline" onClick={exportSchedule}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {medications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Add medications to see your daily schedule
                </div>
              ) : (
                <div className="space-y-2">
                  {timeSlots.map((time) => {
                    const medsAtTime = medications.filter(med => med.timing.includes(time))
                    if (medsAtTime.length === 0) return null

                    return (
                      <div key={time} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="font-mono text-lg font-medium text-primary-600 w-16">
                          {time}
                        </div>
                        <div className="flex-1">
                          {medsAtTime.map((med, index) => (
                            <div key={med.id} className="flex items-center gap-2">
                              <Badge variant={med.type === 'binder' ? 'default' : 'secondary'}>
                                {med.type}
                              </Badge>
                              <span className="font-medium">{med.name}</span>
                              <span className="text-gray-600">({med.dosage})</span>
                              {med.constraints.withFood && (
                                <Badge variant="outline" className="text-xs">
                                  <Utensils className="h-3 w-3 mr-1" />
                                  With food
                                </Badge>
                              )}
                              {med.constraints.emptyStomach && (
                                <Badge variant="outline" className="text-xs">
                                  <Coffee className="h-3 w-3 mr-1" />
                                  Empty stomach
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Potential Conflicts</CardTitle>
              <CardDescription>
                Review these potential medication interactions and timing issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              {conflicts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conflicts detected!</h3>
                  <p className="text-gray-600">Your current medication schedule looks good.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conflicts.map((conflict, index) => (
                    <Alert key={index} className={
                      conflict.severity === 'high' ? 'border-red-200 bg-red-50' :
                      conflict.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                      'border-blue-200 bg-blue-50'
                    }>
                      <AlertTriangle className={`h-4 w-4 ${
                        conflict.severity === 'high' ? 'text-red-600' :
                        conflict.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <AlertTitle className={
                        conflict.severity === 'high' ? 'text-red-900' :
                        conflict.severity === 'medium' ? 'text-yellow-900' :
                        'text-blue-900'
                      }>
                        {conflict.severity.toUpperCase()} Priority: {conflict.medication1} ↔ {conflict.medication2}
                      </AlertTitle>
                      <AlertDescription className={
                        conflict.severity === 'high' ? 'text-red-800' :
                        conflict.severity === 'medium' ? 'text-yellow-800' :
                        'text-blue-800'
                      }>
                        <div className="mb-2">{conflict.reason}</div>
                        <div className="font-medium">💡 {conflict.suggestion}</div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Binder Timing Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {binderTypes.map((binder, index) => (
                    <div key={index} className="border-l-2 border-primary-200 pl-4">
                      <h4 className="font-medium text-primary-900">{binder.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{binder.standardDosing}</p>
                      <p className="text-sm text-primary-700 mt-2">{binder.timing}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonMedications.map((med, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4">
                      <h4 className="font-medium text-gray-900">{med.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{med.timing}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>General Timing Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-900 mb-3">✅ Best Practices</h4>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Take binders 30-60 minutes before meals</li>
                    <li>• Space medications 2+ hours from binders</li>
                    <li>• Take thyroid meds first thing in morning</li>
                    <li>• Fat-soluble vitamins with largest meal</li>
                    <li>• Probiotics away from antimicrobials</li>
                    <li>• Set phone alarms for consistency</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-900 mb-3">❌ Common Mistakes</h4>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Taking binders with meals</li>
                    <li>• Not spacing medications adequately</li>
                    <li>• Mixing all supplements together</li>
                    <li>• Forgetting about mineral interactions</li>
                    <li>• Not considering acid-blocking effects</li>
                    <li>• Irregular timing disrupting effectiveness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

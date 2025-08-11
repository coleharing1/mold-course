/**
 * @fileoverview Sauna Ramp-Up Protocol - Progressive heat therapy protocol
 * to safely build tolerance and maximize mycotoxin elimination through controlled sweating
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Thermometer,
  Clock,
  Heart,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Target,
  Activity
} from 'lucide-react'

interface SaunaSession {
  id: string
  date: string
  week: number
  temperature: number // Fahrenheit
  duration: number // minutes
  completed: boolean
  heartRate?: {
    resting: number
    peak: number
    recovery: number
  }
  sweatRating: number // 1-10 scale
  toleranceRating: number // 1-10 scale
  notes: string
  symptoms?: {
    headache: boolean
    nausea: boolean
    dizziness: boolean
    fatigue: boolean
    weakness: boolean
  }
}

interface WeekProtocol {
  week: number
  temperature: number
  duration: number
  frequency: number // sessions per week
  goals: string[]
  precautions: string[]
  progressMarkers: string[]
}

const protocolWeeks: WeekProtocol[] = [
  {
    week: 1,
    temperature: 110,
    duration: 5,
    frequency: 3,
    goals: ['Build initial heat tolerance', 'Activate sweat response', 'Monitor baseline response'],
    precautions: ['Exit immediately if dizzy', 'Stay well hydrated', 'Start slowly'],
    progressMarkers: ['Comfortable for full 5 minutes', 'Sweating within 2-3 minutes', 'No adverse symptoms']
  },
  {
    week: 2,
    temperature: 120,
    duration: 8,
    frequency: 3,
    goals: ['Increase heat tolerance', 'Extend duration gradually', 'Monitor hydration needs'],
    precautions: ['Monitor heart rate', 'Exit if symptoms worsen', 'Cool down gradually'],
    progressMarkers: ['Comfortable at 120°F', 'Sustained sweating', 'Good post-session recovery']
  },
  {
    week: 3,
    temperature: 130,
    duration: 12,
    frequency: 4,
    goals: ['Build endurance', 'Increase frequency', 'Optimize sweating'],
    precautions: ['Monitor electrolytes', 'Don\'t push through distress', 'Post-session hydration critical'],
    progressMarkers: ['12 minutes without distress', 'Profuse sweating', 'Stable heart rate']
  },
  {
    week: 4,
    temperature: 140,
    duration: 15,
    frequency: 4,
    goals: ['Approach therapeutic levels', 'Maintain consistency', 'Track detox symptoms'],
    precautions: ['Watch for herx reactions', 'Monitor blood pressure', 'Consider electrolyte support'],
    progressMarkers: ['15 minutes comfortably', 'Excellent sweat production', 'Feeling energized after']
  },
  {
    week: 5,
    temperature: 150,
    duration: 18,
    frequency: 4,
    goals: ['Therapeutic heat levels', 'Extended sessions', 'Maximize mycotoxin elimination'],
    precautions: ['Close monitoring required', 'Have cooling protocol ready', 'Consider medical supervision'],
    progressMarkers: ['18+ minutes sustained', 'Copious sweating', 'Improved energy and clarity']
  },
  {
    week: 6,
    temperature: 160,
    duration: 20,
    frequency: 5,
    goals: ['Peak protocol achievement', 'Maintain safely', 'Track improvements'],
    precautions: ['Expert level only', 'Medical clearance recommended', 'Emergency cooling plan'],
    progressMarkers: ['20+ minutes at 160°F', 'Excellent tolerance', 'Measurable health improvements']
  }
]

export default function SaunaRampUpPage() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [sessions, setSessions] = useState<SaunaSession[]>([])
  const [activeSession, setActiveSession] = useState<SaunaSession | null>(null)
  const [sessionTimer, setSessionTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [userProfile, setUserProfile] = useState({
    age: '',
    weight: '',
    fitnessLevel: 'beginner',
    medications: '',
    healthConditions: ''
  })

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerRunning && activeSession) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1)
      }, 1000)
    } else if (!isTimerRunning) {
      clearInterval(interval!)
    }
    return () => clearInterval(interval!)
  }, [isTimerRunning, activeSession])

  const currentProtocol = protocolWeeks.find(p => p.week === currentWeek) || protocolWeeks[0]
  
  const startSession = () => {
    const newSession: SaunaSession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      week: currentWeek,
      temperature: currentProtocol.temperature,
      duration: 0,
      completed: false,
      sweatRating: 5,
      toleranceRating: 5,
      notes: ''
    }
    setActiveSession(newSession)
    setSessionTimer(0)
    setIsTimerRunning(true)
  }

  const endSession = () => {
    if (!activeSession) return

    const completedSession = {
      ...activeSession,
      duration: Math.floor(sessionTimer / 60),
      completed: true
    }
    
    setSessions(prev => [...prev, completedSession])
    setActiveSession(null)
    setIsTimerRunning(false)
    setSessionTimer(0)
  }

  const pauseSession = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getWeekProgress = () => {
    const weekSessions = sessions.filter(s => s.week === currentWeek && s.completed)
    return (weekSessions.length / currentProtocol.frequency) * 100
  }

  const canAdvanceWeek = () => {
    const weekSessions = sessions.filter(s => s.week === currentWeek && s.completed)
    return weekSessions.length >= currentProtocol.frequency && 
           weekSessions.every(s => s.toleranceRating >= 7 && s.duration >= currentProtocol.duration)
  }

  const advanceWeek = () => {
    if (canAdvanceWeek() && currentWeek < protocolWeeks.length) {
      setCurrentWeek(prev => prev + 1)
    }
  }

  const getSessionsThisWeek = () => {
    return sessions.filter(s => s.week === currentWeek && s.completed).length
  }

  const getRiskLevel = () => {
    const age = parseInt(userProfile.age) || 0
    const hasConditions = userProfile.healthConditions.length > 0
    const hasMeds = userProfile.medications.length > 0
    
    if (age > 65 || hasConditions || hasMeds || currentWeek >= 5) return 'high'
    if (age > 50 || currentWeek >= 3) return 'medium'
    return 'low'
  }

  const riskColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Sauna Ramp-Up Protocol</h1>
        <p className="text-gray-600 mb-6">
          Progressive heat therapy protocol to safely build tolerance and maximize mycotoxin elimination through controlled sweating.
        </p>

        {/* Risk Assessment */}
        <Alert className={`mb-6 ${
          getRiskLevel() === 'high' ? 'bg-red-50 border-red-200' :
          getRiskLevel() === 'medium' ? 'bg-yellow-50 border-yellow-200' :
          'bg-green-50 border-green-200'
        }`}>
          <AlertTriangle className={`h-4 w-4 ${
            getRiskLevel() === 'high' ? 'text-red-600' :
            getRiskLevel() === 'medium' ? 'text-yellow-600' :
            'text-green-600'
          }`} />
          <AlertTitle className={
            getRiskLevel() === 'high' ? 'text-red-900' :
            getRiskLevel() === 'medium' ? 'text-yellow-900' :
            'text-green-900'
          }>
            {getRiskLevel().toUpperCase()} Risk Protocol
          </AlertTitle>
          <AlertDescription className={
            getRiskLevel() === 'high' ? 'text-red-800' :
            getRiskLevel() === 'medium' ? 'text-yellow-800' :
            'text-green-800'
          }>
            {getRiskLevel() === 'high' && 'Medical supervision recommended. Do not attempt advanced temperatures without clearance.'}
            {getRiskLevel() === 'medium' && 'Monitor carefully and progress slowly. Consider medical consultation.'}
            {getRiskLevel() === 'low' && 'Low risk for healthy individuals. Start conservatively and listen to your body.'}
          </AlertDescription>
        </Alert>

        {/* Current Week Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">Week {currentWeek}</div>
                <div className="text-sm text-gray-600">Current Protocol</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{currentProtocol.temperature}°F</div>
                <div className="text-sm text-gray-600">Target Temperature</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentProtocol.duration} min</div>
                <div className="text-sm text-gray-600">Target Duration</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{getSessionsThisWeek()}/{currentProtocol.frequency}</div>
                <div className="text-sm text-gray-600">Sessions This Week</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="session" className="space-y-6">
        <TabsList>
          <TabsTrigger value="session">Current Session</TabsTrigger>
          <TabsTrigger value="protocol">Weekly Protocol</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="session" className="space-y-6">
          {!activeSession ? (
            <Card>
              <CardHeader>
                <CardTitle>Start New Session</CardTitle>
                <CardDescription>Week {currentWeek} Protocol: {currentProtocol.temperature}°F for {currentProtocol.duration} minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Pre-Session Checklist</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Hydrated well (16-20oz water in past 2 hours)</li>
                        <li>No alcohol in past 24 hours</li>
                        <li>Well-rested and feeling good</li>
                        <li>Emergency cooling plan ready</li>
                        <li>Timer and monitoring tools available</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  
                  <Button onClick={startSession} className="w-full" size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Start Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Active Session - Week {activeSession.week}</CardTitle>
                <CardDescription>Target: {activeSession.temperature}°F for {currentProtocol.duration} minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Timer Display */}
                  <div className="text-center">
                    <div className="text-6xl font-mono font-bold text-primary-600 mb-2">
                      {formatTime(sessionTimer)}
                    </div>
                    <div className="text-lg text-gray-600">
                      Target: {currentProtocol.duration} minutes
                    </div>
                    <Progress 
                      value={(sessionTimer / (currentProtocol.duration * 60)) * 100} 
                      className="mt-4"
                    />
                  </div>

                  {/* Session Controls */}
                  <div className="flex justify-center gap-4">
                    <Button onClick={pauseSession} variant="outline">
                      {isTimerRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isTimerRunning ? 'Pause' : 'Resume'}
                    </Button>
                    <Button onClick={endSession} variant="destructive">
                      End Session
                    </Button>
                  </div>

                  {/* Real-time Monitoring */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heartRate">Current Heart Rate</Label>
                      <Input
                        id="heartRate"
                        type="number"
                        placeholder="BPM"
                        onChange={(e) => {
                          if (activeSession) {
                            setActiveSession({
                              ...activeSession,
                              heartRate: {
                                ...activeSession.heartRate,
                                peak: parseInt(e.target.value) || 0,
                                resting: activeSession.heartRate?.resting || 0,
                                recovery: activeSession.heartRate?.recovery || 0
                              }
                            })
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sweatRating">Sweat Level (1-10)</Label>
                      <Input
                        id="sweatRating"
                        type="number"
                        min="1"
                        max="10"
                        value={activeSession.sweatRating}
                        onChange={(e) => {
                          if (activeSession) {
                            setActiveSession({
                              ...activeSession,
                              sweatRating: parseInt(e.target.value) || 5
                            })
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Warning Signs */}
                  {sessionTimer > (currentProtocol.duration * 60 * 0.8) && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-900">Approaching Target Time</AlertTitle>
                      <AlertDescription className="text-yellow-800">
                        You're nearing your target duration. Listen to your body and exit if you feel any distress.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="protocol" className="space-y-6">
          <div className="grid gap-6">
            {protocolWeeks.map((week) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: week.week * 0.1 }}
              >
                <Card className={week.week === currentWeek ? 'ring-2 ring-primary-200' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        Week {week.week}
                        {week.week === currentWeek && (
                          <Badge variant="default">Current</Badge>
                        )}
                        {week.week < currentWeek && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600">{week.temperature}°F</div>
                        <div className="text-sm text-gray-600">{week.duration} min × {week.frequency}/week</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-green-900 mb-2">🎯 Goals:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {week.goals.map((goal, i) => (
                            <li key={i}>• {goal}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-900 mb-2">⚠️ Precautions:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {week.precautions.map((precaution, i) => (
                            <li key={i}>• {precaution}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">📈 Progress Markers:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {week.progressMarkers.map((marker, i) => (
                            <li key={i}>• {marker}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Protocol Advancement</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Complete all sessions for your current week with good tolerance (7+/10 rating) before advancing. 
                    Each week builds on the previous one to ensure safe progression.
                  </p>
                  {canAdvanceWeek() && currentWeek < protocolWeeks.length && (
                    <Button onClick={advanceWeek} className="bg-blue-600 hover:bg-blue-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Advance to Week {currentWeek + 1}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Track your progress and tolerance over time</CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Complete your first session to start tracking progress
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium">Week {session.week} Session</span>
                          <span className="text-gray-600 ml-2">{session.date}</span>
                        </div>
                        <Badge variant={session.completed ? 'default' : 'secondary'}>
                          {session.completed ? 'Completed' : 'Incomplete'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Temperature:</span>
                          <span className="font-medium ml-2">{session.temperature}°F</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium ml-2">{session.duration} min</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Sweat:</span>
                          <span className="font-medium ml-2">{session.sweatRating}/10</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tolerance:</span>
                          <span className="font-medium ml-2">{session.toleranceRating}/10</span>
                        </div>
                      </div>
                      {session.notes && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {session.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Week {currentWeek} Progress</span>
                  <span className="font-medium">{Math.round(getWeekProgress())}%</span>
                </div>
                <Progress value={getWeekProgress()} />
                <p className="text-sm text-gray-600">
                  Complete {currentProtocol.frequency - getSessionsThisWeek()} more sessions this week
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-900">🚨 Emergency Signs</CardTitle>
                <CardDescription>Exit sauna immediately if you experience:</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Severe dizziness or lightheadedness
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Nausea or vomiting
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Rapid or irregular heartbeat
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Difficulty breathing
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Severe headache
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Confusion or altered mental state
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-900">✅ Safety Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Stay well hydrated before, during, and after
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Have someone nearby or check in regularly
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Cool down gradually, don't shock system
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Listen to your body, don't push through distress
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Avoid alcohol 24 hours before sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Consider electrolyte replacement
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medical Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <Heart className="h-4 w-4" />
                <AlertTitle>Consult Healthcare Provider If You Have:</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Heart conditions or blood pressure issues</li>
                    <li>Diabetes or blood sugar regulation problems</li>
                    <li>Kidney disease or electrolyte imbalances</li>
                    <li>Pregnancy or trying to conceive</li>
                    <li>Taking medications that affect heat tolerance</li>
                    <li>Recent surgery or acute illness</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">💊 Medications That Increase Risk:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Blood pressure medications</li>
                    <li>• Diuretics (water pills)</li>
                    <li>• Antihistamines</li>
                    <li>• Beta-blockers</li>
                    <li>• Antidepressants</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-purple-900 mb-2">🚫 Contraindications:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Acute illness or fever</li>
                    <li>• Open wounds or skin conditions</li>
                    <li>• Recent alcohol consumption</li>
                    <li>• Severe cardiovascular disease</li>
                    <li>• Uncontrolled hypertension</li>
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

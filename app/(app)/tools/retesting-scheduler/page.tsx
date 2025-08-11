/**
 * @fileoverview Retesting Scheduler Tool - Optimal timing for follow-up tests,
 * progress comparison, result interpretation, and cost tracking for mold detox protocols
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
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { 
  Calendar,
  Clock,
  TestTube,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Bell,
  Download,
  Plus,
  Eye,
  Home,
  Activity,
  Target,
  CalendarPlus,
  FileText,
  BarChart3
} from 'lucide-react'

interface TestSchedule {
  id: string
  testType: 'vcs' | 'mycotoxin-urine' | 'environmental' | 'c4a' | 'tgf-beta1'
  scheduledDate: string
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled'
  cost: number
  priority: 'high' | 'medium' | 'low'
  notes: string
  reminderDays: number
}

interface TestHistory {
  id: string
  testType: 'vcs' | 'mycotoxin-urine' | 'environmental' | 'c4a' | 'tgf-beta1'
  completedDate: string
  results: Record<string, any>
  interpretation: 'improved' | 'stable' | 'declined' | 'normal' | 'abnormal'
  notes: string
  cost: number
}

interface ProtocolPhase {
  phase: string
  startDate: string
  description: string
  duration: number // weeks
}

const testTypes = {
  'vcs': {
    name: 'VCS (Visual Contrast Sensitivity)',
    description: 'Monitors neurological improvement and biotoxin clearance',
    cost: 15,
    frequency: 'Monthly during treatment',
    icon: Eye,
    color: 'bg-blue-100 text-blue-800',
    urgency: 'Ongoing monitoring',
    interpretation: {
      improved: 'Neurological function recovering',
      stable: 'Maintaining current status',
      declined: 'May indicate re-exposure or treatment adjustment needed'
    }
  },
  'mycotoxin-urine': {
    name: 'Mycotoxin Urine Test',
    description: 'Measures actual mycotoxin levels and detox progress',
    cost: 350,
    frequency: 'Every 6-7 months',
    icon: TestTube,
    color: 'bg-green-100 text-green-800',
    urgency: 'Key milestone tracking',
    interpretation: {
      improved: 'Successful toxin elimination',
      stable: 'Continue current protocol',
      declined: 'Review protocol effectiveness'
    }
  },
  'environmental': {
    name: 'Environmental (ERMI/HERTSMI-2)',
    description: 'Verifies home safety and identifies ongoing exposure',
    cost: 300,
    frequency: 'After remediation or symptom return',
    icon: Home,
    color: 'bg-yellow-100 text-yellow-800',
    urgency: 'Exposure verification',
    interpretation: {
      improved: 'Environment is safer',
      stable: 'No significant change',
      declined: 'New or ongoing mold issues'
    }
  },
  'c4a': {
    name: 'C4a Complement',
    description: 'Inflammatory marker for biotoxin illness',
    cost: 85,
    frequency: 'Every 3-4 months',
    icon: Activity,
    color: 'bg-purple-100 text-purple-800',
    urgency: 'Inflammation tracking',
    interpretation: {
      improved: 'Inflammation decreasing',
      stable: 'Stable inflammatory response',
      declined: 'Increased inflammation'
    }
  },
  'tgf-beta1': {
    name: 'TGF-β1 (Transforming Growth Factor)',
    description: 'Autoimmune marker and treatment response indicator',
    cost: 95,
    frequency: 'Every 3-4 months',
    icon: Target,
    color: 'bg-red-100 text-red-800',
    urgency: 'Autoimmune monitoring',
    interpretation: {
      improved: 'Autoimmune activity reducing',
      stable: 'Stable immune response',
      declined: 'Increased autoimmune activity'
    }
  }
}

export default function RetestingSchedulerPage() {
  const [protocolStartDate, setProtocolStartDate] = useState('')
  const [currentPhase, setCurrentPhase] = useState<ProtocolPhase | null>(null)
  const [scheduledTests, setScheduledTests] = useState<TestSchedule[]>([])
  const [testHistory, setTestHistory] = useState<TestHistory[]>([])
  const [activeTab, setActiveTab] = useState('schedule')
  const [newTest, setNewTest] = useState({
    testType: '' as keyof typeof testTypes,
    scheduledDate: '',
    notes: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    reminderDays: 7
  })

  // Calculate recommended test dates based on protocol start
  const calculateRecommendedDates = (startDate: string) => {
    if (!startDate) return []

    const start = new Date(startDate)
    const recommendations = []

    // VCS Test recommendations
    for (let month = 1; month <= 12; month++) {
      const testDate = new Date(start)
      testDate.setMonth(testDate.getMonth() + month)
      
      recommendations.push({
        testType: 'vcs' as const,
        recommendedDate: testDate.toISOString().split('T')[0],
        reason: month === 1 ? 'First progress check (may show temporary worsening)' : 
                month <= 3 ? 'Monitor early treatment response' : 
                month <= 6 ? 'Track progressive improvement' : 
                'Maintenance monitoring',
        priority: month <= 6 ? 'high' as const : 'medium' as const
      })
    }

    // Mycotoxin Urine Test recommendations
    const sixMonthTest = new Date(start)
    sixMonthTest.setMonth(sixMonthTest.getMonth() + 6)
    recommendations.push({
      testType: 'mycotoxin-urine' as const,
      recommendedDate: sixMonthTest.toISOString().split('T')[0],
      reason: 'First retest - adequate time for toxin mobilization and clearance',
      priority: 'high' as const
    })

    const twelveMonthTest = new Date(start)
    twelveMonthTest.setMonth(twelveMonthTest.getMonth() + 12)
    recommendations.push({
      testType: 'mycotoxin-urine' as const,
      recommendedDate: twelveMonthTest.toISOString().split('T')[0],
      reason: 'Confirmation test - verify sustained clearance',
      priority: 'medium' as const
    })

    // C4a and TGF-β1 recommendations
    for (let quarter = 1; quarter <= 4; quarter++) {
      const testDate = new Date(start)
      testDate.setMonth(testDate.getMonth() + (quarter * 3))
      
      recommendations.push({
        testType: 'c4a' as const,
        recommendedDate: testDate.toISOString().split('T')[0],
        reason: `Quarterly inflammation check - ${quarter * 3} months`,
        priority: 'medium' as const
      })

      recommendations.push({
        testType: 'tgf-beta1' as const,
        recommendedDate: testDate.toISOString().split('T')[0],
        reason: `Quarterly autoimmune check - ${quarter * 3} months`,
        priority: 'medium' as const
      })
    }

    return recommendations.sort((a, b) => 
      new Date(a.recommendedDate).getTime() - new Date(b.recommendedDate).getTime()
    )
  }

  const scheduleTest = () => {
    if (!newTest.testType || !newTest.scheduledDate) return

    const testConfig = testTypes[newTest.testType]
    const newSchedule: TestSchedule = {
      id: Date.now().toString(),
      testType: newTest.testType,
      scheduledDate: newTest.scheduledDate,
      status: 'scheduled',
      cost: testConfig.cost,
      priority: newTest.priority,
      notes: newTest.notes,
      reminderDays: newTest.reminderDays
    }

    setScheduledTests([...scheduledTests, newSchedule])
    
    // Reset form
    setNewTest({
      testType: '' as keyof typeof testTypes,
      scheduledDate: '',
      notes: '',
      priority: 'medium',
      reminderDays: 7
    })
  }

  const markTestCompleted = (testId: string, results: any, interpretation: string, notes: string) => {
    const test = scheduledTests.find(t => t.id === testId)
    if (!test) return

    const historyEntry: TestHistory = {
      id: Date.now().toString(),
      testType: test.testType,
      completedDate: new Date().toISOString().split('T')[0],
      results,
      interpretation: interpretation as any,
      notes,
      cost: test.cost
    }

    setTestHistory([...testHistory, historyEntry])
    setScheduledTests(scheduledTests.filter(t => t.id !== testId))
  }

  const getUpcomingTests = () => {
    const today = new Date()
    return scheduledTests.filter(test => {
      const testDate = new Date(test.scheduledDate)
      const daysUntil = Math.ceil((testDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntil >= 0 && daysUntil <= 30
    }).sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
  }

  const getTotalCostScheduled = () => {
    return scheduledTests.reduce((total, test) => total + test.cost, 0)
  }

  const getTotalCostCompleted = () => {
    return testHistory.reduce((total, test) => total + test.cost, 0)
  }

  const recommendations = protocolStartDate ? calculateRecommendedDates(protocolStartDate) : []
  const upcomingTests = getUpcomingTests()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Retesting Scheduler</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Optimize your testing timeline with evidence-based recommendations. Track progress, 
          compare results, and never miss a critical follow-up test.
        </p>
      </motion.div>

      {/* Protocol Setup */}
      {!protocolStartDate && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Get Started: Set Your Protocol Timeline
            </CardTitle>
            <CardDescription>
              Enter when you started your mold detox protocol to get personalized testing recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="start-date">Protocol Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={protocolStartDate}
                  onChange={(e) => setProtocolStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={() => setProtocolStartDate(protocolStartDate)}
                disabled={!protocolStartDate}
              >
                Generate Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {protocolStartDate && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Tests</p>
                  <p className="text-2xl font-bold text-blue-600">{upcomingTests.length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tests Completed</p>
                  <p className="text-2xl font-bold text-green-600">{testHistory.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled Cost</p>
                  <p className="text-2xl font-bold text-orange-600">${getTotalCostScheduled()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Invested</p>
                  <p className="text-2xl font-bold text-purple-600">${getTotalCostCompleted()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule Tests</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* Schedule Tests Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Schedule New Test
                </CardTitle>
                <CardDescription>
                  Add a test to your schedule with automatic cost tracking and reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Test Type</Label>
                  <Select 
                    value={newTest.testType} 
                    onValueChange={(value) => setNewTest({...newTest, testType: value as keyof typeof testTypes})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(testTypes).map(([key, test]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <test.icon className="h-4 w-4" />
                            <span>{test.name} - ${test.cost}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Scheduled Date</Label>
                  <Input
                    type="date"
                    value={newTest.scheduledDate}
                    onChange={(e) => setNewTest({...newTest, scheduledDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Priority</Label>
                  <Select 
                    value={newTest.priority} 
                    onValueChange={(value) => setNewTest({...newTest, priority: value as 'high' | 'medium' | 'low'})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Any special instructions or reasons for this test..."
                    value={newTest.notes}
                    onChange={(e) => setNewTest({...newTest, notes: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={scheduleTest} 
                  className="w-full"
                  disabled={!newTest.testType || !newTest.scheduledDate}
                >
                  Schedule Test
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Upcoming Tests (Next 30 Days)
                </CardTitle>
                <CardDescription>
                  {upcomingTests.length} tests scheduled in the next month
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingTests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No upcoming tests scheduled</p>
                    <p className="text-sm">Schedule your next test above</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingTests.map((test) => {
                      const testConfig = testTypes[test.testType]
                      const Icon = testConfig.icon
                      const daysUntil = Math.ceil(
                        (new Date(test.scheduledDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      )

                      return (
                        <div key={test.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 mt-1 text-gray-600" />
                              <div>
                                <h4 className="font-medium">{testConfig.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(test.scheduledDate).toLocaleDateString()} • ${test.cost}
                                </p>
                                {test.notes && (
                                  <p className="text-sm text-gray-500 mt-1">{test.notes}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={test.priority === 'high' ? 'destructive' : 
                                           test.priority === 'medium' ? 'default' : 'secondary'}>
                                {test.priority}
                              </Badge>
                              <Badge variant="outline">
                                {daysUntil === 0 ? 'Today' : 
                                 daysUntil === 1 ? 'Tomorrow' : 
                                 `${daysUntil} days`}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Tests List */}
          {scheduledTests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>All Scheduled Tests</CardTitle>
                <CardDescription>
                  {scheduledTests.length} tests scheduled • Total cost: ${getTotalCostScheduled()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledTests
                    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
                    .map((test) => {
                      const testConfig = testTypes[test.testType]
                      const Icon = testConfig.icon

                      return (
                        <div key={test.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-6 w-6 text-gray-600" />
                              <div>
                                <h4 className="font-medium">{testConfig.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(test.scheduledDate).toLocaleDateString()} • ${test.cost}
                                </p>
                                {test.notes && (
                                  <p className="text-sm text-gray-500 mt-1">{test.notes}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={testConfig.color}>
                                {testConfig.name.split('(')[0].trim()}
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  // In a real app, this would open a modal to record results
                                  const results = prompt('Enter test results:')
                                  const interpretation = prompt('Interpretation (improved/stable/declined):')
                                  const notes = prompt('Additional notes:')
                                  if (results && interpretation) {
                                    markTestCompleted(test.id, { summary: results }, interpretation, notes || '')
                                  }
                                }}
                              >
                                Mark Complete
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          {protocolStartDate ? (
            <div className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Personalized Testing Timeline</AlertTitle>
                <AlertDescription>
                  Based on your protocol start date of {new Date(protocolStartDate).toLocaleDateString()}, 
                  here are evidence-based testing recommendations following Kajsa's protocol guidelines.
                </AlertDescription>
              </Alert>

              {/* Test Type Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(testTypes).map(([key, test]) => {
                  const Icon = test.icon
                  return (
                    <Card key={key}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Icon className="h-5 w-5" />
                          {test.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {test.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cost:</span>
                            <span className="font-medium">${test.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Frequency:</span>
                            <span className="font-medium">{test.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <span className="font-medium">{test.urgency}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Recommended Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Testing Schedule</CardTitle>
                  <CardDescription>
                    Optimal timing based on your protocol start date and evidence-based guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.slice(0, 12).map((rec, index) => {
                      const testConfig = testTypes[rec.testType]
                      const Icon = testConfig.icon
                      const isPast = new Date(rec.recommendedDate) < new Date()

                      return (
                        <div 
                          key={index} 
                          className={`p-3 border rounded-lg ${isPast ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5 text-gray-600" />
                              <div>
                                <h4 className="font-medium">{testConfig.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(rec.recommendedDate).toLocaleDateString()} • ${testConfig.cost}
                                </p>
                                <p className="text-sm text-gray-500">{rec.reason}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={rec.priority === 'high' ? 'destructive' : 'default'}
                                className={isPast ? 'opacity-50' : ''}
                              >
                                {rec.priority}
                              </Badge>
                              {!isPast && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setNewTest({
                                      testType: rec.testType,
                                      scheduledDate: rec.recommendedDate,
                                      notes: rec.reason,
                                      priority: rec.priority,
                                      reminderDays: 7
                                    })
                                    setActiveTab('schedule')
                                  }}
                                >
                                  Schedule
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Set Protocol Start Date</AlertTitle>
              <AlertDescription>
                Please set your protocol start date above to see personalized testing recommendations.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Test History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Test History & Progress
              </CardTitle>
              <CardDescription>
                Track your results over time and see improvement trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              {testHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No test results yet</h3>
                  <p className="text-gray-600">Complete some tests to start tracking your progress</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testHistory
                    .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
                    .map((test) => {
                      const testConfig = testTypes[test.testType]
                      const Icon = testConfig.icon

                      return (
                        <div key={test.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Icon className="h-6 w-6 mt-1 text-gray-600" />
                              <div className="flex-1">
                                <h4 className="font-medium">{testConfig.name}</h4>
                                <p className="text-sm text-gray-600">
                                  Completed: {new Date(test.completedDate).toLocaleDateString()} • ${test.cost}
                                </p>
                                
                                <div className="mt-2">
                                  <Badge 
                                    variant={
                                      test.interpretation === 'improved' ? 'default' :
                                      test.interpretation === 'stable' ? 'secondary' :
                                      'destructive'
                                    }
                                    className="mr-2"
                                  >
                                    {test.interpretation}
                                  </Badge>
                                  <span className="text-sm text-gray-600">
                                    {testConfig.interpretation[test.interpretation as keyof typeof testConfig.interpretation]}
                                  </span>
                                </div>

                                {test.notes && (
                                  <p className="text-sm text-gray-500 mt-2">{test.notes}</p>
                                )}
                              </div>
                            </div>
                            
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5" />
                Calendar Integration
              </CardTitle>
              <CardDescription>
                Export your testing schedule to your preferred calendar app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Calendar integration and export features are being developed. 
                    You'll soon be able to sync your testing schedule with Google Calendar, 
                    Apple Calendar, and Outlook.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" disabled>
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Google Calendar
                  </Button>
                  <Button variant="outline" disabled>
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Apple Calendar
                  </Button>
                  <Button variant="outline" disabled>
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Outlook
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Manual Export</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    For now, you can manually add these important dates to your calendar:
                  </p>
                  
                  {scheduledTests.length > 0 && (
                    <div className="space-y-2">
                      {scheduledTests.slice(0, 5).map((test) => {
                        const testConfig = testTypes[test.testType]
                        return (
                          <div key={test.id} className="text-sm p-2 bg-gray-50 rounded">
                            <strong>{testConfig.name}</strong> - {new Date(test.scheduledDate).toLocaleDateString()}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

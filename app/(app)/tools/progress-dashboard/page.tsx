/**
 * @fileoverview Progress Dashboard - Comprehensive tracking of symptoms, biomarkers,
 * and overall mold detox progress with visual analytics and trend analysis
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
import { 
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Activity,
  Heart,
  Brain,
  Zap,
  Shield,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  BarChart3,
  LineChart
} from 'lucide-react'

interface SymptomEntry {
  id: string
  date: string
  category: 'neurological' | 'respiratory' | 'digestive' | 'immune' | 'energy' | 'mood'
  symptoms: Record<string, number> // symptom name -> severity (0-10)
  notes: string
}

interface BiomarkerEntry {
  id: string
  date: string
  testType: 'mycotoxin-urine' | 'c4a' | 'tgf-beta1' | 'vcs' | 'mold-plate' | 'ermi'
  results: Record<string, any>
  notes: string
}

interface MilestoneEntry {
  id: string
  date: string
  type: 'phase-completion' | 'symptom-improvement' | 'test-results' | 'protocol-change'
  title: string
  description: string
  significance: 'major' | 'moderate' | 'minor'
}

const symptomCategories = {
  neurological: {
    name: 'Neurological',
    icon: Brain,
    symptoms: ['Brain fog', 'Memory issues', 'Concentration problems', 'Headaches', 'Dizziness'],
    color: 'text-purple-600'
  },
  respiratory: {
    name: 'Respiratory',
    icon: Activity,
    symptoms: ['Shortness of breath', 'Chronic cough', 'Sinus congestion', 'Wheezing', 'Chest tightness'],
    color: 'text-blue-600'
  },
  digestive: {
    name: 'Digestive',
    icon: Heart,
    symptoms: ['Nausea', 'Abdominal pain', 'Bloating', 'Diarrhea', 'Constipation'],
    color: 'text-green-600'
  },
  immune: {
    name: 'Immune',
    icon: Shield,
    symptoms: ['Frequent infections', 'Slow healing', 'Swollen lymph nodes', 'Allergies', 'Chemical sensitivity'],
    color: 'text-red-600'
  },
  energy: {
    name: 'Energy',
    icon: Zap,
    symptoms: ['Chronic fatigue', 'Exercise intolerance', 'Sleep disruption', 'Morning stiffness', 'Weakness'],
    color: 'text-yellow-600'
  },
  mood: {
    name: 'Mood',
    icon: Target,
    symptoms: ['Depression', 'Anxiety', 'Irritability', 'Mood swings', 'Social withdrawal'],
    color: 'text-pink-600'
  }
}

const biomarkerTests = {
  'mycotoxin-urine': {
    name: 'Urine Mycotoxin Panel',
    markers: ['Aflatoxin B1', 'Ochratoxin A', 'Trichothecenes', 'Gliotoxin', 'Mycophenolic Acid'],
    units: 'ng/mL',
    normalRange: '<LOD'
  },
  'c4a': {
    name: 'C4a (Complement 4a)',
    markers: ['C4a'],
    units: 'ng/mL',
    normalRange: '0-2830'
  },
  'tgf-beta1': {
    name: 'TGF-β1',
    markers: ['TGF-β1'],
    units: 'pg/mL',
    normalRange: '<2380'
  },
  'vcs': {
    name: 'Visual Contrast Sensitivity',
    markers: ['VCS Score'],
    units: 'score',
    normalRange: '>80'
  }
}

export default function ProgressDashboardPage() {
  const [symptomEntries, setSymptomEntries] = useState<SymptomEntry[]>([])
  const [biomarkerEntries, setBiomarkerEntries] = useState<BiomarkerEntry[]>([])
  const [milestones, setMilestones] = useState<MilestoneEntry[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('3-months')
  const [newSymptomEntry, setNewSymptomEntry] = useState<Partial<SymptomEntry>>({
    date: new Date().toISOString().split('T')[0],
    category: 'neurological',
    symptoms: {},
    notes: ''
  })

  // Calculate overall progress metrics
  const calculateOverallProgress = () => {
    if (symptomEntries.length < 2) return 0
    
    const recent = symptomEntries.slice(-5) // Last 5 entries
    const baseline = symptomEntries.slice(0, 5) // First 5 entries
    
    const recentAvg = recent.reduce((sum, entry) => {
      const entryAvg = Object.values(entry.symptoms).reduce((s, v) => s + v, 0) / Object.values(entry.symptoms).length
      return sum + entryAvg
    }, 0) / recent.length
    
    const baselineAvg = baseline.reduce((sum, entry) => {
      const entryAvg = Object.values(entry.symptoms).reduce((s, v) => s + v, 0) / Object.values(entry.symptoms).length
      return sum + entryAvg
    }, 0) / baseline.length
    
    const improvement = ((baselineAvg - recentAvg) / baselineAvg) * 100
    return Math.max(0, Math.min(100, improvement))
  }

  const getSymptomTrend = (symptomName: string) => {
    const entries = symptomEntries
      .filter(e => e.symptoms[symptomName] !== undefined)
      .slice(-10) // Last 10 entries
    
    if (entries.length < 2) return 'stable'
    
    const recent = entries.slice(-3).reduce((sum, e) => sum + e.symptoms[symptomName], 0) / 3
    const previous = entries.slice(-6, -3).reduce((sum, e) => sum + e.symptoms[symptomName], 0) / 3
    
    if (recent < previous - 0.5) return 'improving'
    if (recent > previous + 0.5) return 'worsening'
    return 'stable'
  }

  const addSymptomEntry = () => {
    if (!newSymptomEntry.category || Object.keys(newSymptomEntry.symptoms || {}).length === 0) return
    
    const entry: SymptomEntry = {
      id: Date.now().toString(),
      date: newSymptomEntry.date!,
      category: newSymptomEntry.category!,
      symptoms: newSymptomEntry.symptoms!,
      notes: newSymptomEntry.notes || ''
    }
    
    setSymptomEntries(prev => [...prev, entry].sort((a, b) => a.date.localeCompare(b.date)))
    setNewSymptomEntry({
      date: new Date().toISOString().split('T')[0],
      category: 'neurological',
      symptoms: {},
      notes: ''
    })
  }

  const updateSymptomRating = (symptom: string, rating: number) => {
    setNewSymptomEntry(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptom]: rating }
    }))
  }

  const exportProgress = () => {
    const exportData = {
      symptomEntries,
      biomarkerEntries,
      milestones,
      overallProgress: calculateOverallProgress(),
      generatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mold-detox-progress-report.json'
    a.click()
  }

  const overallProgress = calculateOverallProgress()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Progress Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Track your mold detox journey with comprehensive symptom and biomarker monitoring.
        </p>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{Math.round(overallProgress)}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
                <Progress value={overallProgress} className="mt-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{symptomEntries.length}</div>
                <div className="text-sm text-gray-600">Symptom Entries</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{biomarkerEntries.length}</div>
                <div className="text-sm text-gray-600">Test Results</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{milestones.length}</div>
                <div className="text-sm text-gray-600">Milestones</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="symptoms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="symptoms">Symptom Tracking</TabsTrigger>
          <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Symptom Entry</CardTitle>
                <CardDescription>Rate your symptoms on a scale of 0-10 (0 = none, 10 = severe)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSymptomEntry.date}
                      onChange={(e) => setNewSymptomEntry(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newSymptomEntry.category} 
                      onValueChange={(value: any) => setNewSymptomEntry(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(symptomCategories).map(([key, cat]) => (
                          <SelectItem key={key} value={key}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newSymptomEntry.category && (
                  <div>
                    <Label>Symptoms</Label>
                    <div className="space-y-3 mt-2">
                      {symptomCategories[newSymptomEntry.category].symptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center justify-between">
                          <span className="text-sm">{symptom}</span>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => updateSymptomRating(symptom, rating)}
                                className={`w-8 h-8 text-xs rounded ${
                                  (newSymptomEntry.symptoms?.[symptom] ?? -1) === rating
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {rating}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Any additional observations..."
                    value={newSymptomEntry.notes}
                    onChange={(e) => setNewSymptomEntry(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <Button onClick={addSymptomEntry} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Symptom Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {symptomEntries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Add symptom entries to see trends
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(symptomCategories).map(([key, category]) => {
                      const Icon = category.icon
                      const hasEntries = symptomEntries.some(e => e.category === key)
                      
                      if (!hasEntries) return null

                      return (
                        <div key={key} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-5 w-5 ${category.color}`} />
                            <h4 className="font-medium">{category.name}</h4>
                          </div>
                          
                          <div className="space-y-1">
                            {category.symptoms.map((symptom) => {
                              const trend = getSymptomTrend(symptom)
                              const hasData = symptomEntries.some(e => e.symptoms[symptom] !== undefined)
                              
                              if (!hasData) return null

                              return (
                                <div key={symptom} className="flex items-center justify-between text-sm">
                                  <span>{symptom}</span>
                                  <div className="flex items-center gap-2">
                                    {trend === 'improving' && (
                                      <TrendingDown className="h-4 w-4 text-green-600" />
                                    )}
                                    {trend === 'worsening' && (
                                      <TrendingUp className="h-4 w-4 text-red-600" />
                                    )}
                                    {trend === 'stable' && (
                                      <div className="w-4 h-0.5 bg-gray-400" />
                                    )}
                                    <Badge variant="outline" className={
                                      trend === 'improving' ? 'text-green-700 border-green-300' :
                                      trend === 'worsening' ? 'text-red-700 border-red-300' :
                                      'text-gray-700'
                                    }>
                                      {trend}
                                    </Badge>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries */}
          {symptomEntries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {symptomEntries.slice(-5).reverse().map((entry) => {
                    const category = symptomCategories[entry.category]
                    const Icon = category.icon
                    const avgSeverity = Object.values(entry.symptoms).reduce((sum, val) => sum + val, 0) / Object.values(entry.symptoms).length

                    return (
                      <div key={entry.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-5 w-5 ${category.color}`} />
                            <span className="font-medium">{category.name}</span>
                            <Badge variant="outline">{entry.date}</Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              {avgSeverity.toFixed(1)}/10
                            </div>
                            <div className="text-xs text-gray-600">Avg severity</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          {Object.entries(entry.symptoms).map(([symptom, severity]) => (
                            <div key={symptom} className="flex justify-between">
                              <span className="text-gray-600">{symptom}:</span>
                              <span className="font-medium">{severity}/10</span>
                            </div>
                          ))}
                        </div>
                        
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">{entry.notes}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="biomarkers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Biomarker Test Results</CardTitle>
              <CardDescription>Track lab results and testing progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Biomarker tracking coming soon</h3>
                <p className="text-gray-600">Upload test results to track your biomarkers over time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trend Analysis</CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={exportProgress}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {symptomEntries.length < 5 ? (
                <div className="text-center py-8 text-gray-500">
                  <LineChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Need more data for trends</h3>
                  <p className="text-gray-600">Add at least 5 symptom entries to see meaningful trends</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Overall Progress: {Math.round(overallProgress)}%</AlertTitle>
                    <AlertDescription>
                      {overallProgress > 70 ? 'Excellent progress! Your symptoms are significantly improving.' :
                       overallProgress > 40 ? 'Good progress. Keep following your protocol consistently.' :
                       overallProgress > 20 ? 'Some improvement seen. Consider protocol adjustments with your provider.' :
                       'Limited progress so far. This is normal in early stages of detox.'}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(symptomCategories).map(([key, category]) => {
                      const Icon = category.icon
                      const categoryEntries = symptomEntries.filter(e => e.category === key)
                      
                      if (categoryEntries.length === 0) return null

                      return (
                        <Card key={key}>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Icon className={`h-5 w-5 ${category.color}`} />
                              <h4 className="font-medium">{category.name}</h4>
                            </div>
                            
                            <div className="space-y-2">
                              {category.symptoms.map((symptom) => {
                                const trend = getSymptomTrend(symptom)
                                const hasData = symptomEntries.some(e => e.symptoms[symptom] !== undefined)
                                
                                if (!hasData) return null

                                return (
                                  <div key={symptom} className="flex items-center justify-between text-sm">
                                    <span>{symptom}</span>
                                    {trend === 'improving' && (
                                      <div className="flex items-center gap-1 text-green-600">
                                        <TrendingDown className="h-3 w-3" />
                                        <span className="text-xs">Improving</span>
                                      </div>
                                    )}
                                    {trend === 'worsening' && (
                                      <div className="flex items-center gap-1 text-red-600">
                                        <TrendingUp className="h-3 w-3" />
                                        <span className="text-xs">Worsening</span>
                                      </div>
                                    )}
                                    {trend === 'stable' && (
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <div className="w-3 h-0.5 bg-gray-400" />
                                        <span className="text-xs">Stable</span>
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Milestones</CardTitle>
              <CardDescription>Track important events and achievements in your detox journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Milestone tracking coming soon</h3>
                <p className="text-gray-600">Record important events like protocol changes, major improvements, and test results</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <div className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Track symptoms daily for at least 2 weeks to establish baseline</li>
                  <li>• Schedule follow-up testing every 2-3 months</li>
                  <li>• Note any protocol changes or new treatments</li>
                  <li>• Share progress data with your healthcare provider</li>
                  <li>• Celebrate improvements, no matter how small!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

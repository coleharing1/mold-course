/**
 * @fileoverview Herx Toolkit - Comprehensive tool for managing Herxheimer reactions during mold detox
 * Features: Severity assessment, symptom tracking, personalized relief protocols, emergency guidance
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Phone, 
  Heart,
  Brain,
  Thermometer,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react'

import { SeverityAssessment } from '@/components/tools/herx/severity-assessment'
import { SymptomTracker } from '@/components/tools/herx/symptom-tracker'
import { ReliefProtocol } from '@/components/tools/herx/relief-protocol'
import { EmergencyGuide } from '@/components/tools/herx/emergency-guide'
import { PatternAnalysis } from '@/components/tools/herx/pattern-analysis'
import { calculateHerxSeverity } from '@/lib/calculations/herx-severity'
import { getRecommendations } from '@/lib/utils/herx-recommendations'

interface HerxEntry {
  id: string
  date: string
  time: string
  severity: number
  symptoms: {
    physical: string[]
    cognitive: string[]
    emotional: string[]
  }
  triggers: string[]
  interventions: string[]
  notes: string
}

interface HerxAssessment {
  physicalScore: number
  cognitiveScore: number
  emotionalScore: number
  overallSeverity: number
  riskLevel: 'low' | 'moderate' | 'high' | 'emergency'
  recommendations: string[]
}

export default function HerxToolkitPage() {
  const [activeTab, setActiveTab] = useState('assess')
  const [currentAssessment, setCurrentAssessment] = useState<HerxAssessment | null>(null)
  const [herxHistory, setHerxHistory] = useState<HerxEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load saved data on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('herx-history')
    if (savedHistory) {
      setHerxHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save data whenever history changes
  useEffect(() => {
    if (herxHistory.length > 0) {
      localStorage.setItem('herx-history', JSON.stringify(herxHistory))
    }
  }, [herxHistory])

  const handleAssessmentComplete = (assessment: HerxAssessment) => {
    setCurrentAssessment(assessment)
    
    // Create new herx entry
    const newEntry: HerxEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      severity: assessment.overallSeverity,
      symptoms: {
        physical: [], // Will be populated by symptom tracker
        cognitive: [],
        emotional: []
      },
      triggers: [],
      interventions: [],
      notes: ''
    }

    setHerxHistory(prev => [newEntry, ...prev])
    
    // Auto-navigate to appropriate tab based on severity
    if (assessment.riskLevel === 'emergency') {
      setActiveTab('emergency')
    } else if (assessment.overallSeverity >= 4) {
      setActiveTab('relief')
    } else {
      setActiveTab('track')
    }
  }

  const updateHerxEntry = (id: string, updates: Partial<HerxEntry>) => {
    setHerxHistory(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      )
    )
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: number) => {
    if (severity >= 9) return <XCircle className="w-5 h-5 text-red-600" />
    if (severity >= 7) return <AlertTriangle className="w-5 h-5 text-red-500" />
    if (severity >= 4) return <AlertCircle className="w-5 h-5 text-orange-500" />
    return <CheckCircle2 className="w-5 h-5 text-green-600" />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Activity className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Herx Toolkit</h1>
            <p className="text-gray-600">
              Assess, track, and manage Herxheimer reactions safely
            </p>
          </div>
        </div>

        {/* Current Status */}
        {currentAssessment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className={`border-2 ${getRiskLevelColor(currentAssessment.riskLevel)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getSeverityIcon(currentAssessment.overallSeverity)}
                    Current Herx Level: {currentAssessment.overallSeverity}/10
                  </CardTitle>
                  <Badge className={getRiskLevelColor(currentAssessment.riskLevel)}>
                    {currentAssessment.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">
                      Physical: {currentAssessment.physicalScore}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">
                      Cognitive: {currentAssessment.cognitiveScore}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">
                      Emotional: {currentAssessment.emotionalScore}/10
                    </span>
                  </div>
                </div>

                {currentAssessment.riskLevel === 'emergency' && (
                  <Alert className="mt-4 border-red-500 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>EMERGENCY LEVEL DETECTED</AlertTitle>
                    <AlertDescription>
                      Your symptoms indicate a medical emergency. Consider calling 911 or going to the ER immediately.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats */}
        {herxHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Entries</p>
                    <p className="text-xl font-bold">{herxHistory.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Severity</p>
                    <p className="text-xl font-bold">
                      {(herxHistory.reduce((sum, entry) => sum + entry.severity, 0) / herxHistory.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">High Severity</p>
                    <p className="text-xl font-bold">
                      {herxHistory.filter(entry => entry.severity >= 7).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Last Entry</p>
                    <p className="text-xl font-bold">
                      {herxHistory.length > 0 ? new Date(herxHistory[0].date).toLocaleDateString() : 'None'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Main Tool Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="assess" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Assess
          </TabsTrigger>
          <TabsTrigger value="track" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Track
          </TabsTrigger>
          <TabsTrigger value="relief" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Relief
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Patterns
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="assess" className="space-y-6">
              <SeverityAssessment onComplete={handleAssessmentComplete} />
            </TabsContent>

            <TabsContent value="track" className="space-y-6">
              <SymptomTracker 
                herxHistory={herxHistory}
                onUpdateEntry={updateHerxEntry}
                currentAssessment={currentAssessment}
              />
            </TabsContent>

            <TabsContent value="relief" className="space-y-6">
              <ReliefProtocol 
                currentAssessment={currentAssessment}
                onInterventionUsed={(intervention) => {
                  if (herxHistory.length > 0) {
                    const latestEntry = herxHistory[0]
                    updateHerxEntry(latestEntry.id, {
                      interventions: [...latestEntry.interventions, intervention]
                    })
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <EmergencyGuide currentAssessment={currentAssessment} />
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <PatternAnalysis herxHistory={herxHistory} />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Footer Info */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
            <p className="text-sm text-gray-600 mb-3">
              This tool is for educational purposes and symptom tracking only. It does not replace 
              professional medical advice, diagnosis, or treatment.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Always seek immediate medical attention for:</strong> Chest pain, difficulty breathing, 
              seizures, severe confusion, suicidal thoughts, or any symptoms that concern you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

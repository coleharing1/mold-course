/**
 * @fileoverview Severity Assessment component for rating Herx reactions 1-10
 * Features: Interactive sliders, symptom checklists, real-time scoring
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Heart, 
  Brain, 
  Thermometer, 
  Activity,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'

interface AssessmentData {
  physical: {
    fatigue: number
    headache: number
    bodyAches: number
    nausea: number
    fever: number
  }
  cognitive: {
    brainFog: number
    concentration: number
    memory: number
    processing: number
  }
  emotional: {
    mood: number
    anxiety: number
    irritability: number
    motivation: number
  }
  symptoms: {
    physical: string[]
    cognitive: string[]
    emotional: string[]
  }
}

interface SeverityAssessmentProps {
  onComplete: (assessment: any) => void
}

const physicalSymptoms = [
  'Fatigue/exhaustion',
  'Headache',
  'Body aches',
  'Joint pain',
  'Nausea',
  'Vomiting',
  'Fever/chills',
  'Heart palpitations',
  'Digestive upset',
  'Skin issues'
]

const cognitiveSymptoms = [
  'Brain fog',
  'Poor concentration',
  'Memory problems',
  'Slow thinking',
  'Confusion',
  'Word finding difficulty',
  'Reading comprehension issues',
  'Decision making difficulty'
]

const emotionalSymptoms = [
  'Depression',
  'Anxiety',
  'Irritability',
  'Mood swings',
  'Feeling overwhelmed',
  'Lack of motivation',
  'Feeling hopeless',
  'Panic attacks'
]

export function SeverityAssessment({ onComplete }: SeverityAssessmentProps) {
  const [assessment, setAssessment] = useState<AssessmentData>({
    physical: {
      fatigue: 0,
      headache: 0,
      bodyAches: 0,
      nausea: 0,
      fever: 0
    },
    cognitive: {
      brainFog: 0,
      concentration: 0,
      memory: 0,
      processing: 0
    },
    emotional: {
      mood: 0,
      anxiety: 0,
      irritability: 0,
      motivation: 0
    },
    symptoms: {
      physical: [],
      cognitive: [],
      emotional: []
    }
  })

  const [currentStep, setCurrentStep] = useState<'physical' | 'cognitive' | 'emotional' | 'review'>('physical')

  const calculateScores = () => {
    const physicalScore = Math.round(
      (assessment.physical.fatigue + 
       assessment.physical.headache + 
       assessment.physical.bodyAches + 
       assessment.physical.nausea + 
       assessment.physical.fever) / 5
    )

    const cognitiveScore = Math.round(
      (assessment.cognitive.brainFog + 
       assessment.cognitive.concentration + 
       assessment.cognitive.memory + 
       assessment.cognitive.processing) / 4
    )

    const emotionalScore = Math.round(
      (assessment.emotional.mood + 
       assessment.emotional.anxiety + 
       assessment.emotional.irritability + 
       assessment.emotional.motivation) / 4
    )

    // Weighted overall score (physical symptoms weighted more heavily)
    const overallSeverity = Math.round(
      (physicalScore * 0.5 + cognitiveScore * 0.3 + emotionalScore * 0.2)
    )

    const riskLevel = 
      overallSeverity >= 9 ? 'emergency' :
      overallSeverity >= 7 ? 'high' :
      overallSeverity >= 4 ? 'moderate' : 'low'

    return {
      physicalScore,
      cognitiveScore,
      emotionalScore,
      overallSeverity,
      riskLevel,
      recommendations: getRecommendations(overallSeverity, riskLevel)
    }
  }

  const getRecommendations = (severity: number, risk: string) => {
    if (severity >= 9) {
      return [
        'EMERGENCY: Consider calling 911 or going to ER',
        'Stop all treatments immediately',
        'Do not leave person alone',
        'Have emergency contacts ready'
      ]
    } else if (severity >= 7) {
      return [
        'STOP all antimicrobials/antifungals immediately',
        'Continue binders only',
        'Seek medical evaluation',
        'Implement emergency support protocols',
        'Have support person monitor closely'
      ]
    } else if (severity >= 4) {
      return [
        'REDUCE treatment dose by 50%',
        'Increase binder frequency',
        'Add activated charcoal support',
        'Enhance drainage protocols',
        'Plan for 2-3 days recovery'
      ]
    } else {
      return [
        'Continue current protocol with monitoring',
        'Increase hydration with electrolytes',
        'Add gentle drainage support',
        'Extra rest and self-care',
        'Monitor for any escalation'
      ]
    }
  }

  const updatePhysical = (key: keyof typeof assessment.physical, value: number) => {
    setAssessment(prev => ({
      ...prev,
      physical: { ...prev.physical, [key]: value }
    }))
  }

  const updateCognitive = (key: keyof typeof assessment.cognitive, value: number) => {
    setAssessment(prev => ({
      ...prev,
      cognitive: { ...prev.cognitive, [key]: value }
    }))
  }

  const updateEmotional = (key: keyof typeof assessment.emotional, value: number) => {
    setAssessment(prev => ({
      ...prev,
      emotional: { ...prev.emotional, [key]: value }
    }))
  }

  const updateSymptoms = (category: 'physical' | 'cognitive' | 'emotional', symptom: string, checked: boolean) => {
    setAssessment(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [category]: checked 
          ? [...prev.symptoms[category], symptom]
          : prev.symptoms[category].filter(s => s !== symptom)
      }
    }))
  }

  const getSeverityColor = (value: number) => {
    if (value >= 8) return 'text-red-600'
    if (value >= 6) return 'text-orange-500'
    if (value >= 4) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getSeverityLabel = (value: number) => {
    if (value >= 8) return 'Severe'
    if (value >= 6) return 'Moderate-High'
    if (value >= 4) return 'Moderate'
    if (value >= 2) return 'Mild'
    return 'None'
  }

  const scores = calculateScores()

  const renderPhysicalAssessment = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Physical Symptoms Assessment
        </CardTitle>
        <CardDescription>
          Rate each physical symptom from 0 (none) to 10 (severe/debilitating)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fatigue/Energy */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Fatigue/Energy Level</label>
            <Badge className={getSeverityColor(assessment.physical.fatigue)}>
              {assessment.physical.fatigue}/10 - {getSeverityLabel(assessment.physical.fatigue)}
            </Badge>
          </div>
          <Slider
            value={[assessment.physical.fatigue]}
            onValueChange={(value) => updatePhysical('fatigue', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Normal energy</span>
            <span>Completely exhausted</span>
          </div>
        </div>

        {/* Headache */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Headache Intensity</label>
            <Badge className={getSeverityColor(assessment.physical.headache)}>
              {assessment.physical.headache}/10 - {getSeverityLabel(assessment.physical.headache)}
            </Badge>
          </div>
          <Slider
            value={[assessment.physical.headache]}
            onValueChange={(value) => updatePhysical('headache', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>No headache</span>
            <span>Severe migraine</span>
          </div>
        </div>

        {/* Body Aches */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Body Aches/Joint Pain</label>
            <Badge className={getSeverityColor(assessment.physical.bodyAches)}>
              {assessment.physical.bodyAches}/10 - {getSeverityLabel(assessment.physical.bodyAches)}
            </Badge>
          </div>
          <Slider
            value={[assessment.physical.bodyAches]}
            onValueChange={(value) => updatePhysical('bodyAches', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>No pain</span>
            <span>Severe pain everywhere</span>
          </div>
        </div>

        {/* Nausea */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Nausea/Digestive Issues</label>
            <Badge className={getSeverityColor(assessment.physical.nausea)}>
              {assessment.physical.nausea}/10 - {getSeverityLabel(assessment.physical.nausea)}
            </Badge>
          </div>
          <Slider
            value={[assessment.physical.nausea]}
            onValueChange={(value) => updatePhysical('nausea', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>No nausea</span>
            <span>Severe vomiting</span>
          </div>
        </div>

        {/* Fever */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Fever/Chills</label>
            <Badge className={getSeverityColor(assessment.physical.fever)}>
              {assessment.physical.fever}/10 - {getSeverityLabel(assessment.physical.fever)}
            </Badge>
          </div>
          <Slider
            value={[assessment.physical.fever]}
            onValueChange={(value) => updatePhysical('fever', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Normal temperature</span>
            <span>High fever (&gt;103°F)</span>
          </div>
        </div>

        {/* Physical Symptoms Checklist */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Additional Physical Symptoms</label>
          <div className="grid grid-cols-2 gap-2">
            {physicalSymptoms.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-2">
                <Checkbox
                  id={`physical-${symptom}`}
                  checked={assessment.symptoms.physical.includes(symptom)}
                  onCheckedChange={(checked) => updateSymptoms('physical', symptom, checked as boolean)}
                />
                <label htmlFor={`physical-${symptom}`} className="text-sm text-gray-700">
                  {symptom}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderCognitiveAssessment = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          Cognitive Symptoms Assessment
        </CardTitle>
        <CardDescription>
          Rate cognitive and mental function from 0 (normal) to 10 (severely impaired)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brain Fog */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Brain Fog</label>
            <Badge className={getSeverityColor(assessment.cognitive.brainFog)}>
              {assessment.cognitive.brainFog}/10 - {getSeverityLabel(assessment.cognitive.brainFog)}
            </Badge>
          </div>
          <Slider
            value={[assessment.cognitive.brainFog]}
            onValueChange={(value) => updateCognitive('brainFog', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Clear thinking</span>
            <span>Severe mental cloudiness</span>
          </div>
        </div>

        {/* Concentration */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Concentration Ability</label>
            <Badge className={getSeverityColor(assessment.cognitive.concentration)}>
              {assessment.cognitive.concentration}/10 - {getSeverityLabel(assessment.cognitive.concentration)}
            </Badge>
          </div>
          <Slider
            value={[assessment.cognitive.concentration]}
            onValueChange={(value) => updateCognitive('concentration', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Can focus normally</span>
            <span>Cannot focus at all</span>
          </div>
        </div>

        {/* Memory */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Memory Problems</label>
            <Badge className={getSeverityColor(assessment.cognitive.memory)}>
              {assessment.cognitive.memory}/10 - {getSeverityLabel(assessment.cognitive.memory)}
            </Badge>
          </div>
          <Slider
            value={[assessment.cognitive.memory]}
            onValueChange={(value) => updateCognitive('memory', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Memory normal</span>
            <span>Severe memory loss</span>
          </div>
        </div>

        {/* Processing Speed */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Mental Processing Speed</label>
            <Badge className={getSeverityColor(assessment.cognitive.processing)}>
              {assessment.cognitive.processing}/10 - {getSeverityLabel(assessment.cognitive.processing)}
            </Badge>
          </div>
          <Slider
            value={[assessment.cognitive.processing]}
            onValueChange={(value) => updateCognitive('processing', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Thinking quickly</span>
            <span>Extremely slow thinking</span>
          </div>
        </div>

        {/* Cognitive Symptoms Checklist */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Additional Cognitive Symptoms</label>
          <div className="grid grid-cols-2 gap-2">
            {cognitiveSymptoms.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-2">
                <Checkbox
                  id={`cognitive-${symptom}`}
                  checked={assessment.symptoms.cognitive.includes(symptom)}
                  onCheckedChange={(checked) => updateSymptoms('cognitive', symptom, checked as boolean)}
                />
                <label htmlFor={`cognitive-${symptom}`} className="text-sm text-gray-700">
                  {symptom}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderEmotionalAssessment = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-purple-500" />
          Emotional/Mental Health Assessment
        </CardTitle>
        <CardDescription>
          Rate emotional and mental health symptoms from 0 (normal) to 10 (severe)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Mood (Depression/Sadness)</label>
            <Badge className={getSeverityColor(assessment.emotional.mood)}>
              {assessment.emotional.mood}/10 - {getSeverityLabel(assessment.emotional.mood)}
            </Badge>
          </div>
          <Slider
            value={[assessment.emotional.mood]}
            onValueChange={(value) => updateEmotional('mood', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Normal mood</span>
            <span>Severe depression</span>
          </div>
        </div>

        {/* Anxiety */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Anxiety Level</label>
            <Badge className={getSeverityColor(assessment.emotional.anxiety)}>
              {assessment.emotional.anxiety}/10 - {getSeverityLabel(assessment.emotional.anxiety)}
            </Badge>
          </div>
          <Slider
            value={[assessment.emotional.anxiety]}
            onValueChange={(value) => updateEmotional('anxiety', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Calm and relaxed</span>
            <span>Severe panic/anxiety</span>
          </div>
        </div>

        {/* Irritability */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Irritability</label>
            <Badge className={getSeverityColor(assessment.emotional.irritability)}>
              {assessment.emotional.irritability}/10 - {getSeverityLabel(assessment.emotional.irritability)}
            </Badge>
          </div>
          <Slider
            value={[assessment.emotional.irritability]}
            onValueChange={(value) => updateEmotional('irritability', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Patient and calm</span>
            <span>Extremely irritable</span>
          </div>
        </div>

        {/* Motivation */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Motivation/Interest</label>
            <Badge className={getSeverityColor(assessment.emotional.motivation)}>
              {assessment.emotional.motivation}/10 - {getSeverityLabel(assessment.emotional.motivation)}
            </Badge>
          </div>
          <Slider
            value={[assessment.emotional.motivation]}
            onValueChange={(value) => updateEmotional('motivation', value[0])}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Motivated and interested</span>
            <span>No motivation/interest</span>
          </div>
        </div>

        {/* Emotional Symptoms Checklist */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Additional Emotional Symptoms</label>
          <div className="grid grid-cols-2 gap-2">
            {emotionalSymptoms.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-2">
                <Checkbox
                  id={`emotional-${symptom}`}
                  checked={assessment.symptoms.emotional.includes(symptom)}
                  onCheckedChange={(checked) => updateSymptoms('emotional', symptom, checked as boolean)}
                />
                <label htmlFor={`emotional-${symptom}`} className="text-sm text-gray-700">
                  {symptom}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Suicidal Thoughts Warning */}
        {assessment.emotional.mood >= 7 || assessment.symptoms.emotional.includes('Feeling hopeless')} 
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>If you are having thoughts of self-harm or suicide, please seek immediate help:</strong>
            <br />• Call 988 (Suicide & Crisis Lifeline)
            <br />• Call 911 or go to your nearest emergency room
            <br />• Call your healthcare provider immediately
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )

  const renderReview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Assessment Complete
          </CardTitle>
          <CardDescription>
            Review your Herx severity assessment and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{scores.physicalScore}/10</div>
              <div className="text-sm text-gray-600">Physical</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{scores.cognitiveScore}/10</div>
              <div className="text-sm text-gray-600">Cognitive</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Thermometer className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{scores.emotionalScore}/10</div>
              <div className="text-sm text-gray-600">Emotional</div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">{scores.overallSeverity}/10</div>
            <Badge className={`text-lg px-4 py-2 ${
              scores.riskLevel === 'emergency' ? 'bg-red-100 text-red-800' :
              scores.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
              scores.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {scores.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Immediate Recommendations:</h4>
            <ul className="space-y-2">
              {scores.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={() => onComplete(scores)} 
            className="w-full mt-6"
            size="lg"
          >
            Complete Assessment & Get Relief Protocols
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          {['physical', 'cognitive', 'emotional', 'review'].map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                currentStep === step 
                  ? 'bg-blue-100 text-blue-700' 
                  : index < ['physical', 'cognitive', 'emotional', 'review'].indexOf(currentStep)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {step === 'physical' && <Heart className="w-4 h-4" />}
              {step === 'cognitive' && <Brain className="w-4 h-4" />}
              {step === 'emotional' && <Thermometer className="w-4 h-4" />}
              {step === 'review' && <CheckCircle2 className="w-4 h-4" />}
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 'physical' && renderPhysicalAssessment()}
        {currentStep === 'cognitive' && renderCognitiveAssessment()}
        {currentStep === 'emotional' && renderEmotionalAssessment()}
        {currentStep === 'review' && renderReview()}
      </motion.div>

      {/* Navigation */}
      {currentStep !== 'review' && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              const steps = ['physical', 'cognitive', 'emotional']
              const currentIndex = steps.indexOf(currentStep as any)
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1] as any)
              }
            }}
            disabled={currentStep === 'physical'}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              const steps = ['physical', 'cognitive', 'emotional', 'review']
              const currentIndex = steps.indexOf(currentStep as any)
              if (currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1] as any)
              }
            }}
          >
            {currentStep === 'emotional' ? 'Review Assessment' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  )
}

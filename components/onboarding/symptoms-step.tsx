import { useState } from 'react'
import { OnboardingData } from '@/app/(app)/onboarding/page'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { AlertCircle, Brain, Zap, Wind, HeartHandshake, Thermometer, Eye, AlertTriangle } from 'lucide-react'

interface SymptomsStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

const SYMPTOM_CATEGORIES = [
  {
    category: 'Neurological',
    icon: Brain,
    symptoms: [
      { id: 'brain-fog', label: 'Brain fog' },
      { id: 'memory-issues', label: 'Memory problems' },
      { id: 'headaches', label: 'Headaches' },
      { id: 'dizziness', label: 'Dizziness' },
      { id: 'anxiety', label: 'Anxiety' },
      { id: 'depression', label: 'Depression' },
    ],
  },
  {
    category: 'Energy & Fatigue',
    icon: Zap,
    symptoms: [
      { id: 'chronic-fatigue', label: 'Chronic fatigue' },
      { id: 'weakness', label: 'Muscle weakness' },
      { id: 'post-exertional-malaise', label: 'Post-exertional malaise' },
      { id: 'insomnia', label: 'Sleep issues' },
    ],
  },
  {
    category: 'Respiratory',
    icon: Wind,
    symptoms: [
      { id: 'shortness-breath', label: 'Shortness of breath' },
      { id: 'cough', label: 'Chronic cough' },
      { id: 'sinus-congestion', label: 'Sinus congestion' },
      { id: 'asthma', label: 'Asthma symptoms' },
    ],
  },
  {
    category: 'Digestive',
    icon: HeartHandshake,
    symptoms: [
      { id: 'nausea', label: 'Nausea' },
      { id: 'bloating', label: 'Bloating' },
      { id: 'diarrhea', label: 'Diarrhea' },
      { id: 'constipation', label: 'Constipation' },
      { id: 'food-sensitivities', label: 'Food sensitivities' },
    ],
  },
  {
    category: 'Other',
    icon: Thermometer,
    symptoms: [
      { id: 'joint-pain', label: 'Joint pain' },
      { id: 'skin-rashes', label: 'Skin rashes' },
      { id: 'light-sensitivity', label: 'Light sensitivity' },
      { id: 'temperature-regulation', label: 'Temperature regulation issues' },
      { id: 'frequent-urination', label: 'Frequent urination' },
    ],
  },
]

const TRIGGERS = [
  { id: 'musty-spaces', label: 'Musty or damp spaces' },
  { id: 'rain-humidity', label: 'Rain or high humidity' },
  { id: 'certain-buildings', label: 'Certain buildings' },
  { id: 'seasonal-changes', label: 'Seasonal changes' },
  { id: 'stress', label: 'Stress' },
  { id: 'certain-foods', label: 'Certain foods' },
  { id: 'chemical-smells', label: 'Chemical smells' },
  { id: 'exercise', label: 'Exercise' },
]

export function SymptomsStep({ data, updateData, onNext }: SymptomsStepProps) {
  const [symptoms, setSymptoms] = useState(data.symptoms || {
    severity: '5',
    primary: [],
    duration: '',
    triggers: [],
  })

  const handleSeverityChange = (value: number[]) => {
    const updated = { ...symptoms, severity: value[0].toString() }
    setSymptoms(updated)
    updateData({ symptoms: updated })
  }

  const handleSymptomToggle = (symptomId: string) => {
    const currentSymptoms = symptoms.primary || []
    const updated = currentSymptoms.includes(symptomId)
      ? currentSymptoms.filter(s => s !== symptomId)
      : [...currentSymptoms, symptomId]
    
    const newSymptoms = { ...symptoms, primary: updated }
    setSymptoms(newSymptoms)
    updateData({ symptoms: newSymptoms })
  }

  const handleTriggerToggle = (triggerId: string) => {
    const currentTriggers = symptoms.triggers || []
    const updated = currentTriggers.includes(triggerId)
      ? currentTriggers.filter(t => t !== triggerId)
      : [...currentTriggers, triggerId]
    
    const newSymptoms = { ...symptoms, triggers: updated }
    setSymptoms(newSymptoms)
    updateData({ symptoms: newSymptoms })
  }

  const handleDurationChange = (value: string) => {
    const updated = { ...symptoms, duration: value }
    setSymptoms(updated)
    updateData({ symptoms: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Understanding Your Symptoms
        </h2>
        <p className="text-sm text-gray-600">
          This helps us recommend the right pace and protocols for your recovery
        </p>
      </div>

      {/* Severity Slider */}
      <div className="space-y-3">
        <Label>Overall Symptom Severity</Label>
        <div className="px-4">
          <Slider
            value={[parseInt(symptoms.severity || '5')]}
            onValueChange={handleSeverityChange}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Mild (1)</span>
            <span>Moderate (5)</span>
            <span>Severe (10)</span>
          </div>
        </div>
        <div className="text-center">
          <span className="text-2xl font-semibold text-primary-600">
            {symptoms.severity || '5'}
          </span>
          <span className="text-sm text-gray-600 ml-1">/ 10</span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <Label>How long have you been experiencing symptoms?</Label>
        <RadioGroup
          value={symptoms.duration || ''}
          onValueChange={handleDurationChange}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="less-3-months" id="less-3-months" />
            <Label htmlFor="less-3-months" className="font-normal">
              Less than 3 months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3-6-months" id="3-6-months" />
            <Label htmlFor="3-6-months" className="font-normal">
              3-6 months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6-12-months" id="6-12-months" />
            <Label htmlFor="6-12-months" className="font-normal">
              6-12 months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-2-years" id="1-2-years" />
            <Label htmlFor="1-2-years" className="font-normal">
              1-2 years
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over-2-years" id="over-2-years" />
            <Label htmlFor="over-2-years" className="font-normal">
              Over 2 years
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Symptom Categories */}
      <div>
        <Label className="mb-3 block">Select all symptoms you&apos;re experiencing</Label>
        <div className="space-y-4">
          {SYMPTOM_CATEGORIES.map((category) => (
            <div key={category.category} className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <category.icon className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="font-medium text-gray-900">{category.category}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom.id}
                      checked={(symptoms.primary || []).includes(symptom.id)}
                      onCheckedChange={() => handleSymptomToggle(symptom.id)}
                    />
                    <Label
                      htmlFor={symptom.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {symptom.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Triggers */}
      <div>
        <Label className="mb-3 block">What seems to trigger or worsen your symptoms?</Label>
        <div className="grid grid-cols-2 gap-3">
          {TRIGGERS.map((trigger) => (
            <div key={trigger.id} className="flex items-center space-x-2">
              <Checkbox
                id={trigger.id}
                checked={(symptoms.triggers || []).includes(trigger.id)}
                onCheckedChange={() => handleTriggerToggle(trigger.id)}
              />
              <Label
                htmlFor={trigger.id}
                className="text-sm font-normal cursor-pointer"
              >
                {trigger.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Warning for severe symptoms */}
      {parseInt(symptoms.severity || '5') >= 8 && (
        <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-900">
                Severe Symptoms Detected
              </h3>
              <p className="mt-1 text-sm text-amber-700">
                Based on your severity rating, we strongly recommend working with a healthcare provider 
                alongside this program. We&apos;ll adjust our recommendations for a gentler approach.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
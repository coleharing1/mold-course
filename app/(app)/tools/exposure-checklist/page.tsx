'use client'

import { useState, useEffect } from 'react'
import { RoomChecklist } from '@/components/tools/exposure/room-checklist'
import { PhotoUpload } from '@/components/tools/exposure/photo-upload'
import { ExposureResults } from '@/components/tools/exposure/exposure-results'
import { calculateExposureScore } from '@/lib/calculations/exposure-score'
import { generateFixFirstList } from '@/lib/tools/fix-first-generator'
import { estimateCosts } from '@/lib/tools/cost-estimator'
import { AlertCircle, Save, Download, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface RoomData {
  name: string
  issues: {
    visibleMold: boolean
    waterDamage: boolean
    mustySmell: boolean
    peeling: boolean
    discoloration: boolean
    humidity: boolean
    leaks: boolean
    condensation: boolean
  }
  severity: 'none' | 'mild' | 'moderate' | 'severe'
  notes: string
  photos: string[]
}

const initialRooms: RoomData[] = [
  { name: 'Bathroom 1', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'Bathroom 2', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'Kitchen', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'Basement', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'Attic', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'Master Bedroom', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'Living Room', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
  { name: 'HVAC System', issues: { visibleMold: false, waterDamage: false, mustySmell: false, peeling: false, discoloration: false, humidity: false, leaks: false, condensation: false }, severity: 'none', notes: '', photos: [] },
]

export default function ExposureChecklistPage() {
  const [rooms, setRooms] = useState<RoomData[]>(initialRooms)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [riskLevel, setRiskLevel] = useState<'low' | 'moderate' | 'high' | 'critical'>('low')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load saved state from localStorage
    const saved = localStorage.getItem('exposure-checklist')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setRooms(data.rooms)
        setCurrentStep(data.currentStep || 0)
      } catch (e) {
        console.error('Error loading saved data:', e)
      }
    }
  }, [])

  useEffect(() => {
    // Calculate score whenever rooms change
    const result = calculateExposureScore(rooms)
    setScore(result.score)
    setRiskLevel(result.riskLevel)
  }, [rooms])

  const updateRoom = (index: number, data: Partial<RoomData>) => {
    const newRooms = [...rooms]
    newRooms[index] = { ...newRooms[index], ...data }
    setRooms(newRooms)
  }

  const saveProgress = async () => {
    setIsSaving(true)
    
    // Save to localStorage
    localStorage.setItem('exposure-checklist', JSON.stringify({
      rooms,
      currentStep,
      savedAt: new Date().toISOString()
    }))

    // Save to database (if user is logged in)
    try {
      const response = await fetch('/api/tools/exposure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rooms, score, riskLevel })
      })
      
      if (!response.ok) {
        console.error('Failed to save to database')
      }
    } catch (error) {
      console.error('Error saving to database:', error)
    }

    setIsSaving(false)
  }

  const exportResults = () => {
    const fixFirstList = generateFixFirstList(rooms)
    const costEstimate = estimateCosts(rooms)
    
    // Create a text report
    const report = `
MOLD EXPOSURE ASSESSMENT REPORT
Generated: ${new Date().toLocaleDateString()}

OVERALL RISK SCORE: ${score}/100
RISK LEVEL: ${riskLevel.toUpperCase()}

ROOM-BY-ROOM FINDINGS:
${rooms.map(room => `
${room.name.toUpperCase()}
- Severity: ${room.severity}
- Issues Found: ${Object.entries(room.issues).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'None'}
- Notes: ${room.notes || 'None'}
`).join('\n')}

PRIORITY FIXES:
${fixFirstList.map((item, i) => `${i + 1}. ${item.action} (${item.room}) - Priority: ${item.priority}`).join('\n')}

ESTIMATED COSTS:
- DIY Remediation: $${costEstimate.diy}
- Professional Remediation: $${costEstimate.professional}
- Air Quality Testing: $${costEstimate.testing}
- Total Estimated Range: $${costEstimate.total.min} - $${costEstimate.total.max}

RECOMMENDATIONS:
${riskLevel === 'critical' ? '⚠️ IMMEDIATE ACTION REQUIRED: Leave the environment and seek professional remediation.' : ''}
${riskLevel === 'high' ? '⚠️ HIGH RISK: Professional remediation strongly recommended. Use protective equipment.' : ''}
${riskLevel === 'moderate' ? '⚠️ MODERATE RISK: Address issues promptly. Consider professional assessment.' : ''}
${riskLevel === 'low' ? '✓ LOW RISK: Monitor and maintain. Address any minor issues found.' : ''}
    `

    // Download as text file
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mold-assessment-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏠 Exposure & Dampness Checklist
        </h1>
        <p className="text-gray-600">
          Complete room-by-room assessment to identify all mold sources in your environment
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Room {currentStep + 1} of {rooms.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(((currentStep + 1) / rooms.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / rooms.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Risk Level Alert */}
      {score > 0 && (
        <Card className={`mb-6 p-4 border-2 ${
          riskLevel === 'critical' ? 'bg-red-50 border-red-500' :
          riskLevel === 'high' ? 'bg-orange-50 border-orange-500' :
          riskLevel === 'moderate' ? 'bg-yellow-50 border-yellow-500' :
          'bg-green-50 border-green-500'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`h-6 w-6 flex-shrink-0 ${
              riskLevel === 'critical' ? 'text-red-600' :
              riskLevel === 'high' ? 'text-orange-600' :
              riskLevel === 'moderate' ? 'text-yellow-600' :
              'text-green-600'
            }`} />
            <div>
              <h3 className="font-semibold text-gray-900">
                Current Risk Level: {riskLevel.toUpperCase()} ({score}/100)
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                {riskLevel === 'critical' && 'Immediate action required. Consider leaving this environment.'}
                {riskLevel === 'high' && 'Significant mold exposure detected. Professional remediation recommended.'}
                {riskLevel === 'moderate' && 'Some concerning issues found. Address promptly to prevent escalation.'}
                {riskLevel === 'low' && 'Minor or no issues detected. Continue monitoring and maintenance.'}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content */}
      {currentStep < rooms.length ? (
        <>
          <RoomChecklist
            room={rooms[currentStep]}
            onUpdate={(data) => updateRoom(currentStep, data)}
          />

          <PhotoUpload
            roomName={rooms[currentStep].name}
            photos={rooms[currentStep].photos}
            onPhotosChange={(photos) => updateRoom(currentStep, { photos })}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous Room
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={saveProgress}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Progress'}
              </Button>
            </div>

            {currentStep === rooms.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-green-600 hover:bg-green-700"
              >
                View Results
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next Room
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <ExposureResults
            rooms={rooms}
            score={score}
            riskLevel={riskLevel}
          />

          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(rooms.length - 1)}
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Checklist
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={saveProgress}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Results'}
              </Button>

              <Button
                onClick={exportResults}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
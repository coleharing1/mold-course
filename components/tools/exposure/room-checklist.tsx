'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle } from 'lucide-react'
import type { RoomData } from '@/app/(app)/tools/exposure-checklist/page'

interface RoomChecklistProps {
  room: RoomData
  onUpdate: (data: Partial<RoomData>) => void
}

export function RoomChecklist({ room, onUpdate }: RoomChecklistProps) {
  const issueLabels = {
    visibleMold: 'Visible mold growth',
    waterDamage: 'Water stains or damage',
    mustySmell: 'Musty or earthy odor',
    peeling: 'Peeling paint or wallpaper',
    discoloration: 'Wall/ceiling discoloration',
    humidity: 'High humidity (>50%)',
    leaks: 'Active leaks or drips',
    condensation: 'Window/pipe condensation'
  }

  const handleIssueChange = (issue: keyof typeof room.issues, checked: boolean) => {
    const newIssues = { ...room.issues, [issue]: checked }
    onUpdate({ issues: newIssues })
    
    // Auto-update severity based on issues
    const issueCount = Object.values(newIssues).filter(Boolean).length
    let severity: RoomData['severity'] = 'none'
    
    if (newIssues.visibleMold || newIssues.waterDamage) {
      severity = 'severe'
    } else if (issueCount >= 4) {
      severity = 'moderate'
    } else if (issueCount >= 2) {
      severity = 'mild'
    } else if (issueCount === 1) {
      severity = 'mild'
    }
    
    if (severity !== room.severity) {
      onUpdate({ severity })
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🏠 {room.name}
        </h2>
        <p className="text-gray-600">
          Check all issues present in this room. Be thorough - even small signs matter.
        </p>
      </div>

      {/* Issue Checklist */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-gray-900">Issues Present</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(issueLabels).map(([key, label]) => {
            const issueKey = key as keyof typeof room.issues
            const isChecked = room.issues[issueKey]
            const isCritical = key === 'visibleMold' || key === 'waterDamage'
            
            return (
              <label
                key={key}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  isChecked 
                    ? isCritical 
                      ? 'bg-red-50 border-red-300' 
                      : 'bg-yellow-50 border-yellow-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => handleIssueChange(issueKey, checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    isChecked 
                      ? isCritical 
                        ? 'text-red-900' 
                        : 'text-yellow-900'
                      : 'text-gray-900'
                  }`}>
                    {label}
                  </span>
                  {isCritical && isChecked && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">Critical Issue</span>
                    </div>
                  )}
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* Severity Assessment */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-gray-900">Overall Severity</h3>
        <RadioGroup 
          value={room.severity} 
          onValueChange={(value) => onUpdate({ severity: value as RoomData['severity'] })}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="none" />
              <span className="text-sm">None</span>
            </label>
            <label className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-yellow-50">
              <RadioGroupItem value="mild" />
              <span className="text-sm text-yellow-700">Mild</span>
            </label>
            <label className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-orange-50">
              <RadioGroupItem value="moderate" />
              <span className="text-sm text-orange-700">Moderate</span>
            </label>
            <label className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-red-50">
              <RadioGroupItem value="severe" />
              <span className="text-sm text-red-700">Severe</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Describe any specific concerns, exact locations of issues, or other relevant details..."
          value={room.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          rows={4}
        />
      </div>

      {/* Room-Specific Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">
          💡 What to Check in {room.name}
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          {room.name.toLowerCase().includes('bathroom') && (
            <>
              <li>• Check behind toilet and under sink</li>
              <li>• Inspect shower grout and caulking</li>
              <li>• Look for fan ventilation issues</li>
            </>
          )}
          {room.name.toLowerCase().includes('kitchen') && (
            <>
              <li>• Check under sink for leaks</li>
              <li>• Inspect behind refrigerator</li>
              <li>• Look at dishwasher seals</li>
            </>
          )}
          {room.name.toLowerCase().includes('basement') && (
            <>
              <li>• Check foundation walls for moisture</li>
              <li>• Look for efflorescence (white powder)</li>
              <li>• Inspect sump pump area</li>
            </>
          )}
          {room.name.toLowerCase().includes('attic') && (
            <>
              <li>• Check for roof leaks (dark stains)</li>
              <li>• Inspect insulation for moisture</li>
              <li>• Look for proper ventilation</li>
            </>
          )}
          {room.name.toLowerCase().includes('hvac') && (
            <>
              <li>• Check AC coils and drip pans</li>
              <li>• Inspect ductwork for moisture</li>
              <li>• Look at air filters (should be clean)</li>
            </>
          )}
          {room.name.toLowerCase().includes('bedroom') && (
            <>
              <li>• Check windows for condensation</li>
              <li>• Inspect closets (poor ventilation)</li>
              <li>• Look behind furniture on exterior walls</li>
            </>
          )}
        </ul>
      </div>
    </Card>
  )
}
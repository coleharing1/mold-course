import { useState } from 'react'
import { OnboardingData } from '@/app/(app)/onboarding/page'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { DollarSign, Dumbbell, Utensils, Gauge, Info } from 'lucide-react'

interface ConstraintsStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

const EQUIPMENT_OPTIONS = [
  { id: 'sauna-access', label: 'Sauna (gym, home, or spa)', icon: '🧖' },
  { id: 'air-purifier', label: 'Air purifier', icon: '💨' },
  { id: 'dehumidifier', label: 'Dehumidifier', icon: '💧' },
  { id: 'exercise-equipment', label: 'Exercise equipment/gym', icon: '🏋️' },
  { id: 'bathtub', label: 'Bathtub (for detox baths)', icon: '🛁' },
  { id: 'juicer-blender', label: 'Juicer or high-speed blender', icon: '🥤' },
  { id: 'rebounder', label: 'Rebounder/mini trampoline', icon: '🤸' },
  { id: 'red-light', label: 'Red light therapy device', icon: '🔴' },
]

const DIETARY_RESTRICTIONS = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' },
  { id: 'keto', label: 'Keto/Low-carb' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'low-histamine', label: 'Low histamine' },
  { id: 'fodmap', label: 'Low FODMAP' },
  { id: 'no-restrictions', label: 'No restrictions' },
]

export function ConstraintsStep({ data, updateData, onNext }: ConstraintsStepProps) {
  const [constraints, setConstraints] = useState(data.constraints || {
    budget: '',
    equipment: [],
    diet: [],
    pace: '',
  })

  const handleBudgetChange = (value: string) => {
    const updated = { ...constraints, budget: value }
    setConstraints(updated)
    updateData({ constraints: updated })
  }

  const handleEquipmentToggle = (equipmentId: string) => {
    const currentEquipment = constraints.equipment || []
    const updated = currentEquipment.includes(equipmentId)
      ? currentEquipment.filter(e => e !== equipmentId)
      : [...currentEquipment, equipmentId]
    
    const newConstraints = { ...constraints, equipment: updated }
    setConstraints(newConstraints)
    updateData({ constraints: newConstraints })
  }

  const handleDietToggle = (dietId: string) => {
    // If "no restrictions" is selected, clear all others
    if (dietId === 'no-restrictions') {
      const newConstraints = { ...constraints, diet: ['no-restrictions'] }
      setConstraints(newConstraints)
      updateData({ constraints: newConstraints })
      return
    }

    // If selecting something else, remove "no restrictions"
    const currentDiet = (constraints.diet || []).filter(d => d !== 'no-restrictions')
    const updated = currentDiet.includes(dietId)
      ? currentDiet.filter(d => d !== dietId)
      : [...currentDiet, dietId]
    
    const newConstraints = { ...constraints, diet: updated }
    setConstraints(newConstraints)
    updateData({ constraints: newConstraints })
  }

  const handlePaceChange = (value: string) => {
    const updated = { ...constraints, pace: value }
    setConstraints(updated)
    updateData({ constraints: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Your Resources & Preferences
        </h2>
        <p className="text-sm text-gray-600">
          This helps us recommend protocols that fit your situation
        </p>
      </div>

      {/* Budget */}
      <div>
        <Label className="mb-3 block">
          <DollarSign className="inline h-4 w-4 mr-1" />
          Monthly budget for supplements & treatments
        </Label>
        <RadioGroup
          value={constraints.budget || ''}
          onValueChange={handleBudgetChange}
        >
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="minimal" id="minimal" className="mt-1" />
              <div>
                <Label htmlFor="minimal" className="font-normal cursor-pointer">
                  Minimal ($0-50/month)
                </Label>
                <p className="text-xs text-gray-500">DIY approaches, minimal supplements</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
              <div>
                <Label htmlFor="moderate" className="font-normal cursor-pointer">
                  Moderate ($50-150/month)
                </Label>
                <p className="text-xs text-gray-500">Basic supplements, some testing</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="flexible" id="flexible" className="mt-1" />
              <div>
                <Label htmlFor="flexible" className="font-normal cursor-pointer">
                  Flexible ($150-300/month)
                </Label>
                <p className="text-xs text-gray-500">Full protocol, regular testing</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="unlimited" id="unlimited" className="mt-1" />
              <div>
                <Label htmlFor="unlimited" className="font-normal cursor-pointer">
                  Unlimited ($300+/month)
                </Label>
                <p className="text-xs text-gray-500">All options available</p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Available Equipment */}
      <div>
        <Label className="mb-3 block">
          <Dumbbell className="inline h-4 w-4 mr-1" />
          What do you have access to?
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {EQUIPMENT_OPTIONS.map((equipment) => (
            <div key={equipment.id} className="flex items-center space-x-2">
              <Checkbox
                id={equipment.id}
                checked={(constraints.equipment || []).includes(equipment.id)}
                onCheckedChange={() => handleEquipmentToggle(equipment.id)}
              />
              <Label
                htmlFor={equipment.id}
                className="text-sm font-normal cursor-pointer flex items-center"
              >
                <span className="mr-1">{equipment.icon}</span>
                {equipment.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div>
        <Label className="mb-3 block">
          <Utensils className="inline h-4 w-4 mr-1" />
          Dietary preferences or restrictions
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {DIETARY_RESTRICTIONS.map((diet) => (
            <div key={diet.id} className="flex items-center space-x-2">
              <Checkbox
                id={diet.id}
                checked={(constraints.diet || []).includes(diet.id)}
                onCheckedChange={() => handleDietToggle(diet.id)}
              />
              <Label
                htmlFor={diet.id}
                className="text-sm font-normal cursor-pointer"
              >
                {diet.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Pace */}
      <div>
        <Label className="mb-3 block">
          <Gauge className="inline h-4 w-4 mr-1" />
          Preferred recovery pace
        </Label>
        <RadioGroup
          value={constraints.pace || ''}
          onValueChange={handlePaceChange}
        >
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="gentle" id="gentle" className="mt-1" />
              <div>
                <Label htmlFor="gentle" className="font-normal cursor-pointer">
                  Gentle & Cautious
                </Label>
                <p className="text-xs text-gray-500">
                  Slow introduction of protocols, minimal risk of reactions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="moderate" id="moderate-pace" className="mt-1" />
              <div>
                <Label htmlFor="moderate-pace" className="font-normal cursor-pointer">
                  Moderate & Steady
                </Label>
                <p className="text-xs text-gray-500">
                  Balanced approach, some tolerance for detox reactions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="aggressive" id="aggressive" className="mt-1" />
              <div>
                <Label htmlFor="aggressive" className="font-normal cursor-pointer">
                  Aggressive & Fast
                </Label>
                <p className="text-xs text-gray-500">
                  Willing to push through reactions for faster results
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Info Box */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-900">
              Don&apos;t worry about getting this perfect
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              You can update these preferences anytime in your account settings. We&apos;ll also 
              provide alternatives for different budget levels throughout the program.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { OnboardingData } from '@/app/(app)/onboarding/page'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Home, Building, Car, AlertCircle, Droplets, Wind } from 'lucide-react'

interface ExposureStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

const EXPOSURE_LOCATIONS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'Workplace', icon: Building },
  { id: 'car', label: 'Vehicle', icon: Car },
  { id: 'school', label: 'School', icon: Building },
  { id: 'other', label: 'Other location', icon: AlertCircle },
]

const VISIBLE_SIGNS = [
  { id: 'visible-mold', label: 'Visible mold growth' },
  { id: 'water-stains', label: 'Water stains on walls/ceiling' },
  { id: 'musty-smell', label: 'Musty or earthy smell' },
  { id: 'peeling-paint', label: 'Peeling paint or wallpaper' },
  { id: 'warped-wood', label: 'Warped wood or flooring' },
  { id: 'condensation', label: 'Excessive condensation' },
  { id: 'previous-flooding', label: 'History of flooding' },
  { id: 'roof-leaks', label: 'Roof or plumbing leaks' },
]

const TESTS_CONDUCTED = [
  { id: 'ermi', label: 'ERMI (Environmental Relative Moldiness Index)' },
  { id: 'air-sampling', label: 'Air quality/spore testing' },
  { id: 'tape-lift', label: 'Tape lift sampling' },
  { id: 'mycotoxin-urine', label: 'Urine mycotoxin test' },
  { id: 'vcs', label: 'Visual Contrast Sensitivity test' },
  { id: 'blood-markers', label: 'Blood markers (C4a, TGF-β1, etc.)' },
  { id: 'home-test-kit', label: 'DIY home test kit' },
  { id: 'professional-inspection', label: 'Professional mold inspection' },
]

export function ExposureStep({ data, updateData, onNext }: ExposureStepProps) {
  const [exposure, setExposure] = useState(data.exposure || {
    location: [],
    duration: '',
    visible: [],
    tests: [],
    notes: '',
  })

  const handleLocationToggle = (locationId: string) => {
    const currentLocations = Array.isArray(exposure.location) ? exposure.location : []
    const updated = currentLocations.includes(locationId)
      ? currentLocations.filter(l => l !== locationId)
      : [...currentLocations, locationId]
    
    const newExposure = { ...exposure, location: updated }
    setExposure(newExposure)
    updateData({ exposure: newExposure })
  }

  const handleDurationChange = (value: string) => {
    const updated = { ...exposure, duration: value }
    setExposure(updated)
    updateData({ exposure: updated })
  }

  const handleVisibleToggle = (signId: string) => {
    const currentSigns = Array.isArray(exposure.visible) ? exposure.visible : []
    const updated = currentSigns.includes(signId)
      ? currentSigns.filter(s => s !== signId)
      : [...currentSigns, signId]
    
    const newExposure = { ...exposure, visible: updated }
    setExposure(newExposure)
    updateData({ exposure: newExposure })
  }

  const handleTestToggle = (testId: string) => {
    const currentTests = exposure.tests || []
    const updated = currentTests.includes(testId)
      ? currentTests.filter(t => t !== testId)
      : [...currentTests, testId]
    
    const newExposure = { ...exposure, tests: updated }
    setExposure(newExposure)
    updateData({ exposure: newExposure })
  }

  const handleNotesChange = (value: string) => {
    const updated = { ...exposure, notes: value }
    setExposure(updated)
    updateData({ exposure: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Exposure History
        </h2>
        <p className="text-sm text-gray-600">
          Understanding your exposure helps us tailor your recovery approach
        </p>
      </div>

      {/* Exposure Locations */}
      <div>
        <Label className="mb-3 block">Where do you suspect mold exposure?</Label>
        <div className="space-y-3">
          {EXPOSURE_LOCATIONS.map((location) => (
            <div
              key={location.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                (Array.isArray(exposure.location) ? exposure.location : []).includes(location.id)
                  ? 'bg-primary-50 border-primary-300'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleLocationToggle(location.id)}
            >
              <Checkbox
                id={location.id}
                checked={(Array.isArray(exposure.location) ? exposure.location : []).includes(location.id)}
                onCheckedChange={() => handleLocationToggle(location.id)}
                className="mr-3"
              />
              <location.icon className="h-5 w-5 text-gray-600 mr-3" />
              <Label
                htmlFor={location.id}
                className="font-normal cursor-pointer flex-1"
              >
                {location.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Duration of Exposure */}
      <div>
        <Label>How long were you exposed to this environment?</Label>
        <RadioGroup
          value={exposure.duration || ''}
          onValueChange={handleDurationChange}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="current" id="current" />
            <Label htmlFor="current" className="font-normal">
              Still in the environment
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="less-6-months" id="less-6-months" />
            <Label htmlFor="less-6-months" className="font-normal">
              Less than 6 months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6-12-months" id="6-12-months" />
            <Label htmlFor="6-12-months" className="font-normal">
              6-12 months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-3-years" id="1-3-years" />
            <Label htmlFor="1-3-years" className="font-normal">
              1-3 years
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over-3-years" id="over-3-years" />
            <Label htmlFor="over-3-years" className="font-normal">
              Over 3 years
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Visible Signs */}
      <div>
        <Label className="mb-3 block">
          <Droplets className="inline h-4 w-4 mr-1" />
          What signs of moisture/mold have you noticed?
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {VISIBLE_SIGNS.map((sign) => (
            <div key={sign.id} className="flex items-center space-x-2">
              <Checkbox
                id={sign.id}
                checked={(Array.isArray(exposure.visible) ? exposure.visible : []).includes(sign.id)}
                onCheckedChange={() => handleVisibleToggle(sign.id)}
              />
              <Label
                htmlFor={sign.id}
                className="text-sm font-normal cursor-pointer"
              >
                {sign.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Tests Conducted */}
      <div>
        <Label className="mb-3 block">
          <Wind className="inline h-4 w-4 mr-1" />
          Have you done any testing? (Check all that apply)
        </Label>
        <div className="space-y-2">
          {TESTS_CONDUCTED.map((test) => (
            <div key={test.id} className="flex items-center space-x-2">
              <Checkbox
                id={test.id}
                checked={(exposure.tests || []).includes(test.id)}
                onCheckedChange={() => handleTestToggle(test.id)}
              />
              <Label
                htmlFor={test.id}
                className="text-sm font-normal cursor-pointer"
              >
                {test.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <Label htmlFor="notes">
          Additional details (optional)
        </Label>
        <Textarea
          id="notes"
          placeholder="Any other relevant information about your exposure history..."
          value={exposure.notes || ''}
          onChange={(e) => handleNotesChange(e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>

      {/* Warning if still in environment */}
      {exposure.duration === 'current' && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-900">
                Still in Moldy Environment
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Recovery is much more difficult while still exposed. Our program will prioritize 
                helping you identify and address the source, but please consider finding alternative 
                housing if possible.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
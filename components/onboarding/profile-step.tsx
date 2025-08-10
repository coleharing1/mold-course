import { useState } from 'react'
import { OnboardingData } from '@/app/(app)/onboarding/page'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProfileStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

const LIVING_SITUATIONS = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
  { value: 'mobile', label: 'Mobile Home' },
  { value: 'other', label: 'Other' },
]

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Phoenix', label: 'Arizona Time' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
]

export function ProfileStep({ data, updateData, onNext }: ProfileStepProps) {
  const [profile, setProfile] = useState(data.profile || {})

  const handleChange = (field: string, value: string) => {
    const updated = { ...profile, [field]: value }
    setProfile(updated)
    updateData({ profile: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Let&apos;s get to know you
        </h2>
        <p className="text-sm text-gray-600">
          This helps us personalize your recovery recommendations
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">First Name (optional)</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={profile.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="age">Age Range</Label>
          <Select
            value={profile.age || ''}
            onValueChange={(value) => handleChange('age', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="56-65">56-65</SelectItem>
              <SelectItem value="65+">65+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Living Situation</Label>
          <RadioGroup
            value={profile.livingSituation || ''}
            onValueChange={(value) => handleChange('livingSituation', value)}
            className="mt-2"
          >
            {LIVING_SITUATIONS.map((situation) => (
              <div key={situation.value} className="flex items-center space-x-2">
                <RadioGroupItem value={situation.value} id={situation.value} />
                <Label htmlFor={situation.value} className="font-normal">
                  {situation.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="timezone">Your Timezone</Label>
          <Select
            value={profile.timezone || ''}
            onValueChange={(value) => handleChange('timezone', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Used for scheduling reminders and live sessions
          </p>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  Droplets, 
  Heart, 
  Activity, 
  Brain, 
  Moon,
  CheckCircle,
  Info
} from 'lucide-react'
import { DrainageMetrics } from '@/lib/calculations/drainage-score'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface DrainageFormProps {
  onSubmit: (metrics: DrainageMetrics) => void
  initialData?: DrainageMetrics | null
  loading?: boolean
}

const defaultMetrics: DrainageMetrics = {
  bowelMovements: 5,
  hydration: 5,
  urineColor: 5,
  energy: 5,
  sleep: 5,
  skinClarity: 5,
  lymphMovement: 5,
  liverSupport: 5,
  brainFog: 5,
  sweating: 5,
}

const metricDescriptions = {
  bowelMovements: 'Rate the quality and frequency of bowel movements (1-3 daily is optimal)',
  hydration: 'How well hydrated do you feel? Are you drinking enough water?',
  urineColor: 'Light yellow is ideal (1=dark, 10=clear)',
  energy: 'Your overall energy levels throughout the day',
  sleep: 'Quality of sleep and how rested you feel',
  skinClarity: 'Any rashes, breakouts, or skin issues?',
  lymphMovement: 'Have you done movement, dry brushing, or lymph massage?',
  liverSupport: 'Any nausea, right-side pain, or digestive issues?',
  brainFog: 'Mental clarity and cognitive function (10=very clear)',
  sweating: 'Are you sweating regularly through exercise or sauna?',
}

export function DrainageForm({ onSubmit, initialData, loading }: DrainageFormProps) {
  const [metrics, setMetrics] = useState<DrainageMetrics>(
    initialData || defaultMetrics
  )
  const [notes, setNotes] = useState('')

  const handleSliderChange = (key: keyof DrainageMetrics, value: number[]) => {
    setMetrics(prev => ({ ...prev, [key]: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(metrics)
  }

  const getSliderColor = (value: number) => {
    if (value >= 8) return 'bg-green-500'
    if (value >= 6) return 'bg-yellow-500'
    if (value >= 4) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TooltipProvider>
        <div className="grid gap-6">
          {/* Bowel Movements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-600" />
                Bowel Movements
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.bowelMovements}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.bowelMovements}/10</span>
            </div>
            <Slider
              value={[metrics.bowelMovements]}
              onValueChange={(value) => handleSliderChange('bowelMovements', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Hydration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-cyan-600" />
                Hydration Level
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.hydration}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.hydration}/10</span>
            </div>
            <Slider
              value={[metrics.hydration]}
              onValueChange={(value) => handleSliderChange('hydration', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Urine Color */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-yellow-600" />
                Urine Color
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.urineColor}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.urineColor}/10</span>
            </div>
            <Slider
              value={[metrics.urineColor]}
              onValueChange={(value) => handleSliderChange('urineColor', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Energy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-600" />
                Energy Levels
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.energy}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.energy}/10</span>
            </div>
            <Slider
              value={[metrics.energy]}
              onValueChange={(value) => handleSliderChange('energy', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Sleep Quality */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-purple-600" />
                Sleep Quality
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.sleep}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.sleep}/10</span>
            </div>
            <Slider
              value={[metrics.sleep]}
              onValueChange={(value) => handleSliderChange('sleep', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Brain Fog */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-pink-600" />
                Mental Clarity
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.brainFog}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.brainFog}/10</span>
            </div>
            <Slider
              value={[metrics.brainFog]}
              onValueChange={(value) => handleSliderChange('brainFog', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Skin Clarity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-600" />
                Skin Clarity
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.skinClarity}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.skinClarity}/10</span>
            </div>
            <Slider
              value={[metrics.skinClarity]}
              onValueChange={(value) => handleSliderChange('skinClarity', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Lymph Movement */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-600" />
                Lymph Movement
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.lymphMovement}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.lymphMovement}/10</span>
            </div>
            <Slider
              value={[metrics.lymphMovement]}
              onValueChange={(value) => handleSliderChange('lymphMovement', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Liver Support */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-amber-600" />
                Liver/Gallbladder
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.liverSupport}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.liverSupport}/10</span>
            </div>
            <Slider
              value={[metrics.liverSupport]}
              onValueChange={(value) => handleSliderChange('liverSupport', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Sweating */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-teal-600" />
                Sweating/Detox
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      {metricDescriptions.sweating}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-sm font-medium">{metrics.sweating}/10</span>
            </div>
            <Slider
              value={[metrics.sweating]}
              onValueChange={(value) => handleSliderChange('sweating', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </TooltipProvider>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any symptoms, improvements, or concerns to note..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        <CheckCircle className="h-4 w-4 mr-2" />
        {loading ? 'Saving...' : 'Save Today\'s Assessment'}
      </Button>
    </form>
  )
}
/**
 * @fileoverview Protocol Builder - Create personalized mold detox protocols with
 * drag-and-drop interface, conflict detection, and automated scheduling
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Plus,
  Download,
  Calendar,
  Clock,
  Shield,
  Zap,
  FlaskConical,
  Pill,
  Heart,
  Brain,
  Activity,
  Info,
  ChevronRight,
  Save,
  Share2,
  FileText,
  Lock,
  Unlock
} from 'lucide-react'
import { ProtocolElement } from '@/components/tools/protocol/protocol-element'
import { ProtocolTimeline } from '@/components/tools/protocol/protocol-timeline'
import { ConflictChecker } from '@/components/tools/protocol/conflict-checker'
import { ProtocolTemplates } from '@/components/tools/protocol/protocol-templates'
import { ProtocolExport } from '@/components/tools/protocol/protocol-export'

export interface ProtocolStep {
  id: string
  category: 'drainage' | 'binder' | 'antifungal' | 'support' | 'lifestyle'
  type: string
  name: string
  description: string
  duration: number // in days
  weekStart: number // which week to start
  intensity: 'low' | 'medium' | 'high'
  prerequisites: string[] // IDs of steps that must come before
  conflicts: string[] // IDs of steps that conflict
  dosage?: string
  frequency?: string
  timing?: string
  notes?: string
  evidence: 'solid' | 'emerging' | 'anecdotal'
  cost: number // monthly cost estimate
  priority: 'required' | 'recommended' | 'optional'
  safetyLevel: 'safe' | 'caution' | 'medical-supervision'
}

interface ProtocolConflict {
  step1: string
  step2: string
  severity: 'high' | 'medium' | 'low'
  reason: string
  resolution: string
}

// Available protocol elements library
const protocolLibrary: ProtocolStep[] = [
  // Drainage Phase Elements
  {
    id: 'hydration',
    category: 'drainage',
    type: 'foundation',
    name: 'Hydration Protocol',
    description: 'Increase water intake to 64-96oz daily with electrolytes',
    duration: 28,
    weekStart: 1,
    intensity: 'low',
    prerequisites: [],
    conflicts: [],
    timing: 'Throughout the day',
    evidence: 'solid',
    cost: 20,
    priority: 'required',
    safetyLevel: 'safe'
  },
  {
    id: 'bowel-support',
    category: 'drainage',
    type: 'foundation',
    name: 'Bowel Movement Support',
    description: 'Magnesium citrate, vitamin C, or gentle herbs for 1-3 BMs daily',
    duration: 28,
    weekStart: 1,
    intensity: 'medium',
    prerequisites: [],
    conflicts: [],
    dosage: '400-800mg magnesium',
    frequency: 'Daily',
    timing: 'Evening',
    evidence: 'solid',
    cost: 30,
    priority: 'required',
    safetyLevel: 'safe'
  },
  {
    id: 'liver-support',
    category: 'drainage',
    type: 'organ-support',
    name: 'Liver & Gallbladder Support',
    description: 'Milk thistle, NAC, and castor oil packs',
    duration: 28,
    weekStart: 1,
    intensity: 'medium',
    prerequisites: ['hydration'],
    conflicts: [],
    dosage: 'Milk thistle 250mg, NAC 600mg',
    frequency: 'Twice daily',
    evidence: 'solid',
    cost: 45,
    priority: 'required',
    safetyLevel: 'safe'
  },
  {
    id: 'lymphatic',
    category: 'drainage',
    type: 'movement',
    name: 'Lymphatic Activation',
    description: 'Dry brushing, rebounding, or walking 20-30 minutes',
    duration: 28,
    weekStart: 1,
    intensity: 'low',
    prerequisites: [],
    conflicts: [],
    frequency: 'Daily',
    timing: 'Morning',
    evidence: 'emerging',
    cost: 0,
    priority: 'recommended',
    safetyLevel: 'safe'
  },
  {
    id: 'sauna',
    category: 'drainage',
    type: 'detox',
    name: 'Infrared Sauna',
    description: 'Start at 10 minutes, work up to 30-40 minutes',
    duration: 56,
    weekStart: 2,
    intensity: 'high',
    prerequisites: ['hydration', 'bowel-support'],
    conflicts: [],
    frequency: '3-5x weekly',
    timing: 'Any time',
    evidence: 'solid',
    cost: 50,
    priority: 'recommended',
    safetyLevel: 'caution'
  },
  // Binder Phase Elements
  {
    id: 'csm',
    category: 'binder',
    type: 'prescription',
    name: 'Cholestyramine (CSM)',
    description: 'Prescription bile acid sequestrant, gold standard for mycotoxins',
    duration: 84,
    weekStart: 5,
    intensity: 'high',
    prerequisites: ['hydration', 'bowel-support', 'liver-support'],
    conflicts: ['welchol', 'charcoal'],
    dosage: '4g',
    frequency: '4x daily',
    timing: '30-60 min before meals',
    evidence: 'solid',
    cost: 150,
    priority: 'required',
    safetyLevel: 'medical-supervision'
  },
  {
    id: 'welchol',
    category: 'binder',
    type: 'prescription',
    name: 'Welchol (Colesevelam)',
    description: 'Alternative prescription binder, gentler than CSM',
    duration: 84,
    weekStart: 5,
    intensity: 'medium',
    prerequisites: ['hydration', 'bowel-support', 'liver-support'],
    conflicts: ['csm'],
    dosage: '625mg x 6 pills',
    frequency: '2x daily',
    timing: 'With meals',
    evidence: 'solid',
    cost: 200,
    priority: 'required',
    safetyLevel: 'medical-supervision'
  },
  {
    id: 'charcoal',
    category: 'binder',
    type: 'natural',
    name: 'Activated Charcoal',
    description: 'Natural binder for various toxins',
    duration: 56,
    weekStart: 5,
    intensity: 'medium',
    prerequisites: ['hydration', 'bowel-support'],
    conflicts: ['csm'],
    dosage: '1-2g',
    frequency: '2-3x daily',
    timing: '2+ hours from all medications',
    evidence: 'emerging',
    cost: 30,
    priority: 'optional',
    safetyLevel: 'caution'
  },
  {
    id: 'chlorella',
    category: 'binder',
    type: 'natural',
    name: 'Chlorella',
    description: 'Algae-based binder for metals and some mycotoxins',
    duration: 84,
    weekStart: 5,
    intensity: 'low',
    prerequisites: ['hydration', 'bowel-support'],
    conflicts: [],
    dosage: '3-6g',
    frequency: 'Daily',
    timing: 'With or between meals',
    evidence: 'emerging',
    cost: 40,
    priority: 'optional',
    safetyLevel: 'safe'
  },
  // Antifungal Phase Elements
  {
    id: 'itraconazole',
    category: 'antifungal',
    type: 'prescription',
    name: 'Itraconazole (Sporanox)',
    description: 'Prescription antifungal for colonization',
    duration: 56,
    weekStart: 9,
    intensity: 'high',
    prerequisites: ['csm', 'liver-support'],
    conflicts: ['fluconazole'],
    dosage: '100mg',
    frequency: '2x daily',
    timing: 'With fatty meal and acidic drink',
    evidence: 'solid',
    cost: 400,
    priority: 'recommended',
    safetyLevel: 'medical-supervision'
  },
  {
    id: 'nystatin',
    category: 'antifungal',
    type: 'prescription',
    name: 'Nystatin',
    description: 'Non-absorbed antifungal for gut colonization',
    duration: 42,
    weekStart: 9,
    intensity: 'medium',
    prerequisites: ['bowel-support'],
    conflicts: [],
    dosage: '500,000 IU',
    frequency: '2-3x daily',
    timing: 'With meals',
    evidence: 'solid',
    cost: 80,
    priority: 'optional',
    safetyLevel: 'safe'
  },
  {
    id: 'natural-antifungals',
    category: 'antifungal',
    type: 'natural',
    name: 'Natural Antifungal Blend',
    description: 'Rotating oregano oil, neem, caprylic acid',
    duration: 56,
    weekStart: 9,
    intensity: 'medium',
    prerequisites: ['bowel-support', 'liver-support'],
    conflicts: [],
    dosage: 'Per product instructions',
    frequency: '2-3x daily',
    timing: 'With meals',
    evidence: 'emerging',
    cost: 60,
    priority: 'optional',
    safetyLevel: 'caution'
  },
  // Support Elements
  {
    id: 'probiotics',
    category: 'support',
    type: 'gut-health',
    name: 'High-Potency Probiotics',
    description: 'Multi-strain probiotics 50-100 billion CFU',
    duration: 84,
    weekStart: 5,
    intensity: 'low',
    prerequisites: [],
    conflicts: [],
    dosage: '50-100 billion CFU',
    frequency: 'Daily',
    timing: '2+ hours from binders',
    evidence: 'solid',
    cost: 50,
    priority: 'recommended',
    safetyLevel: 'safe'
  },
  {
    id: 'glutathione',
    category: 'support',
    type: 'antioxidant',
    name: 'Glutathione Support',
    description: 'Liposomal glutathione or NAC for antioxidant support',
    duration: 84,
    weekStart: 3,
    intensity: 'medium',
    prerequisites: ['liver-support'],
    conflicts: [],
    dosage: '500mg glutathione or 1200mg NAC',
    frequency: 'Daily',
    timing: 'Empty stomach',
    evidence: 'solid',
    cost: 60,
    priority: 'recommended',
    safetyLevel: 'safe'
  },
  {
    id: 'mitochondrial',
    category: 'support',
    type: 'energy',
    name: 'Mitochondrial Support',
    description: 'CoQ10, PQQ, and B vitamins for energy production',
    duration: 84,
    weekStart: 3,
    intensity: 'low',
    prerequisites: [],
    conflicts: [],
    dosage: 'CoQ10 200mg, PQQ 20mg',
    frequency: 'Daily',
    timing: 'With meals',
    evidence: 'emerging',
    cost: 70,
    priority: 'optional',
    safetyLevel: 'safe'
  },
  // Lifestyle Elements
  {
    id: 'low-mold-diet',
    category: 'lifestyle',
    type: 'diet',
    name: 'Low-Mold Diet',
    description: 'Eliminate high-mold foods, reduce sugar and processed foods',
    duration: 112,
    weekStart: 1,
    intensity: 'medium',
    prerequisites: [],
    conflicts: [],
    evidence: 'emerging',
    cost: 0,
    priority: 'required',
    safetyLevel: 'safe'
  },
  {
    id: 'sleep-optimization',
    category: 'lifestyle',
    type: 'recovery',
    name: 'Sleep Optimization',
    description: '8-9 hours nightly, consistent schedule, dark room',
    duration: 112,
    weekStart: 1,
    intensity: 'low',
    prerequisites: [],
    conflicts: [],
    evidence: 'solid',
    cost: 0,
    priority: 'required',
    safetyLevel: 'safe'
  },
  {
    id: 'stress-management',
    category: 'lifestyle',
    type: 'mental-health',
    name: 'Stress Management',
    description: 'Meditation, therapy, or nervous system regulation',
    duration: 112,
    weekStart: 1,
    intensity: 'low',
    prerequisites: [],
    conflicts: [],
    frequency: 'Daily',
    evidence: 'solid',
    cost: 50,
    priority: 'recommended',
    safetyLevel: 'safe'
  }
]

// Protocol templates
const protocolTemplates = {
  conservative: {
    name: 'Conservative Approach',
    description: 'Gentle, slow progression for sensitive individuals',
    steps: ['hydration', 'bowel-support', 'liver-support', 'lymphatic', 'low-mold-diet', 'sleep-optimization', 'chlorella', 'probiotics']
  },
  standard: {
    name: 'Standard Protocol',
    description: 'Evidence-based approach following Shoemaker protocol',
    steps: ['hydration', 'bowel-support', 'liver-support', 'lymphatic', 'sauna', 'low-mold-diet', 'csm', 'probiotics', 'glutathione']
  },
  aggressive: {
    name: 'Aggressive Protocol',
    description: 'Faster approach for those who can tolerate it',
    steps: ['hydration', 'bowel-support', 'liver-support', 'lymphatic', 'sauna', 'low-mold-diet', 'csm', 'itraconazole', 'probiotics', 'glutathione', 'mitochondrial']
  },
  natural: {
    name: 'Natural Protocol',
    description: 'Non-prescription approach using natural binders',
    steps: ['hydration', 'bowel-support', 'liver-support', 'lymphatic', 'sauna', 'low-mold-diet', 'charcoal', 'chlorella', 'natural-antifungals', 'probiotics', 'glutathione']
  }
}

export default function ProtocolBuilderPage() {
  const [selectedSteps, setSelectedSteps] = useState<ProtocolStep[]>([])
  const [conflicts, setConflicts] = useState<ProtocolConflict[]>([])
  const [activeTab, setActiveTab] = useState('builder')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [protocolName, setProtocolName] = useState('My Custom Protocol')
  const [isSaving, setIsSaving] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Check for conflicts whenever steps change
  useEffect(() => {
    checkConflicts()
  }, [selectedSteps])

  const checkConflicts = () => {
    const foundConflicts: ProtocolConflict[] = []
    
    selectedSteps.forEach((step1, index1) => {
      selectedSteps.forEach((step2, index2) => {
        if (index1 < index2) {
          // Check direct conflicts
          if (step1.conflicts.includes(step2.id)) {
            foundConflicts.push({
              step1: step1.name,
              step2: step2.name,
              severity: 'high',
              reason: 'These treatments should not be taken together',
              resolution: 'Choose one or alternate between them'
            })
          }
          
          // Check timing conflicts for binders
          if (step1.category === 'binder' && step2.category === 'binder' && 
              step1.id !== step2.id && !step1.id.includes('chlorella') && !step2.id.includes('chlorella')) {
            foundConflicts.push({
              step1: step1.name,
              step2: step2.name,
              severity: 'medium',
              reason: 'Multiple strong binders may cause excessive detox',
              resolution: 'Consider starting with one and adding the other later'
            })
          }
          
          // Check prerequisite violations
          if (step2.prerequisites.includes(step1.id) && step1.weekStart >= step2.weekStart) {
            foundConflicts.push({
              step1: step2.name,
              step2: step1.name,
              severity: 'high',
              reason: `${step2.name} requires ${step1.name} to be established first`,
              resolution: `Start ${step1.name} at least 2 weeks before ${step2.name}`
            })
          }
        }
      })
    })
    
    setConflicts(foundConflicts)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setSelectedSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const addStep = (step: ProtocolStep) => {
    if (!selectedSteps.find(s => s.id === step.id)) {
      setSelectedSteps([...selectedSteps, step])
    }
  }

  const removeStep = (stepId: string) => {
    setSelectedSteps(selectedSteps.filter(s => s.id !== stepId))
  }

  const loadTemplate = (templateKey: string) => {
    const template = protocolTemplates[templateKey as keyof typeof protocolTemplates]
    if (template) {
      const steps = template.steps
        .map(stepId => protocolLibrary.find(s => s.id === stepId))
        .filter(Boolean) as ProtocolStep[]
      setSelectedSteps(steps)
      setSelectedTemplate(templateKey)
      setProtocolName(template.name)
    }
  }

  const calculateTotalCost = () => {
    return selectedSteps.reduce((total, step) => total + step.cost, 0)
  }

  const calculateDuration = () => {
    const maxWeek = Math.max(...selectedSteps.map(s => s.weekStart + (s.duration / 7)))
    return Math.ceil(maxWeek)
  }

  const getProgressPercentage = () => {
    if (selectedSteps.length === 0) return 0
    const requiredSteps = ['hydration', 'bowel-support', 'liver-support', 'low-mold-diet']
    const hasRequired = requiredSteps.filter(req => 
      selectedSteps.some(step => step.id === req)
    ).length
    return Math.round((hasRequired / requiredSteps.length) * 100)
  }

  const saveProtocol = async () => {
    setIsSaving(true)
    // TODO: Implement actual save to database
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success message
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Protocol Builder
            </h1>
            <p className="text-lg text-gray-600">
              Create your personalized mold detox protocol with intelligent conflict detection
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowExport(true)}
              disabled={selectedSteps.length === 0}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={saveProtocol}
              disabled={selectedSteps.length === 0}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Protocol'}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Protocol Completeness</span>
            <span className="text-sm font-bold text-emerald-600">{getProgressPercentage()}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
          {getProgressPercentage() < 100 && (
            <p className="text-xs text-gray-500 mt-2">
              Add drainage support and dietary changes to complete your foundation
            </p>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">
            <Sparkles className="h-4 w-4 mr-2" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <Calendar className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="conflicts">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Conflicts ({conflicts.length})
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Elements */}
            <Card>
              <CardHeader>
                <CardTitle>Available Protocol Elements</CardTitle>
                <CardDescription>
                  Click to add elements to your protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['drainage', 'binder', 'antifungal', 'support', 'lifestyle'].map(category => (
                  <div key={category}>
                    <h3 className="font-medium text-sm text-gray-700 mb-2 capitalize">
                      {category} Phase
                    </h3>
                    <div className="space-y-2">
                      {protocolLibrary
                        .filter(step => step.category === category)
                        .map(step => (
                          <ProtocolElement
                            key={step.id}
                            step={step}
                            onAdd={() => addStep(step)}
                            isSelected={selectedSteps.some(s => s.id === step.id)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Selected Protocol */}
            <Card>
              <CardHeader>
                <CardTitle>Your Protocol</CardTitle>
                <CardDescription>
                  Drag to reorder • {selectedSteps.length} elements • ${calculateTotalCost()}/month • {calculateDuration()} weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSteps.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Start by adding protocol elements or selecting a template</p>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={selectedSteps.map(s => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {selectedSteps.map((step, index) => (
                          <ProtocolElement
                            key={step.id}
                            step={step}
                            index={index}
                            onRemove={() => removeStep(step.id)}
                            isDraggable
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <ProtocolTimeline steps={selectedSteps} />
        </TabsContent>

        <TabsContent value="conflicts">
          <ConflictChecker conflicts={conflicts} steps={selectedSteps} />
        </TabsContent>

        <TabsContent value="templates">
          <ProtocolTemplates
            templates={protocolTemplates}
            onSelectTemplate={loadTemplate}
            selectedTemplate={selectedTemplate}
          />
        </TabsContent>
      </Tabs>

      {/* Export Modal */}
      {showExport && (
        <ProtocolExport
          protocol={{
            name: protocolName,
            steps: selectedSteps,
            duration: calculateDuration(),
            cost: calculateTotalCost()
          }}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}
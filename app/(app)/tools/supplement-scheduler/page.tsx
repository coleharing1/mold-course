/**
 * @fileoverview Supplement Scheduler - Comprehensive tool for tracking and optimizing 
 * supplement timing, interactions, and mold detox support protocols
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Pill,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2,
  Download,
  Calendar,
  Target,
  Activity,
  Zap,
  Heart,
  Brain
} from 'lucide-react'

interface Supplement {
  id: string
  name: string
  dosage: string
  frequency: number
  timing: string[]
  purpose: 'detox' | 'immune' | 'energy' | 'brain' | 'gut' | 'liver' | 'general'
  priority: 'essential' | 'beneficial' | 'optional'
  interactions: string[]
  sideEffects: string[]
  notes: string
  costPerMonth: number
  evidenceLevel: 'strong' | 'moderate' | 'limited'
}

interface SupplementProtocol {
  phase: 'prep' | 'active' | 'maintenance'
  duration: string
  supplements: Supplement[]
  totalCost: number
}

const moldDetoxSupplements: Supplement[] = [
  {
    id: 'glutathione',
    name: 'Liposomal Glutathione',
    dosage: '500mg',
    frequency: 2,
    timing: ['8:00', '16:00'],
    purpose: 'detox',
    priority: 'essential',
    interactions: ['Take away from binders'],
    sideEffects: ['Nausea if taken without food'],
    notes: 'Master antioxidant for cellular detox. Take with food.',
    costPerMonth: 85,
    evidenceLevel: 'strong'
  },
  {
    id: 'nac',
    name: 'N-Acetyl Cysteine (NAC)',
    dosage: '600mg',
    frequency: 2,
    timing: ['9:00', '21:00'],
    purpose: 'detox',
    priority: 'essential',
    interactions: ['Enhances glutathione production'],
    sideEffects: ['Stomach upset on empty stomach'],
    notes: 'Precursor to glutathione. Supports lung and liver detox.',
    costPerMonth: 25,
    evidenceLevel: 'strong'
  },
  {
    id: 'milk-thistle',
    name: 'Milk Thistle (Silymarin)',
    dosage: '200mg',
    frequency: 3,
    timing: ['8:00', '14:00', '20:00'],
    purpose: 'liver',
    priority: 'essential',
    interactions: ['May affect drug metabolism'],
    sideEffects: ['Mild digestive upset'],
    notes: 'Protects and regenerates liver cells. Take with meals.',
    costPerMonth: 30,
    evidenceLevel: 'strong'
  },
  {
    id: 'alpha-lipoic-acid',
    name: 'Alpha Lipoic Acid',
    dosage: '300mg',
    frequency: 2,
    timing: ['10:00', '18:00'],
    purpose: 'detox',
    priority: 'beneficial',
    interactions: ['May enhance insulin sensitivity'],
    sideEffects: ['Hypoglycemia in diabetics'],
    notes: 'Universal antioxidant. Take between meals.',
    costPerMonth: 35,
    evidenceLevel: 'moderate'
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (Buffered)',
    dosage: '1000mg',
    frequency: 3,
    timing: ['7:00', '13:00', '19:00'],
    purpose: 'immune',
    priority: 'essential',
    interactions: ['Enhances iron absorption'],
    sideEffects: ['Diarrhea at high doses'],
    notes: 'Support immune function and collagen synthesis.',
    costPerMonth: 20,
    evidenceLevel: 'strong'
  },
  {
    id: 'quercetin',
    name: 'Quercetin with Bromelain',
    dosage: '500mg',
    frequency: 2,
    timing: ['9:00', '17:00'],
    purpose: 'immune',
    priority: 'beneficial',
    interactions: ['Natural antihistamine'],
    sideEffects: ['Headache in sensitive individuals'],
    notes: 'Natural mast cell stabilizer and anti-inflammatory.',
    costPerMonth: 40,
    evidenceLevel: 'moderate'
  },
  {
    id: 'coq10',
    name: 'CoQ10 (Ubiquinol)',
    dosage: '100mg',
    frequency: 1,
    timing: ['8:00'],
    purpose: 'energy',
    priority: 'beneficial',
    interactions: ['Take with fat for absorption'],
    sideEffects: ['Insomnia if taken late'],
    notes: 'Cellular energy production. Take with breakfast.',
    costPerMonth: 55,
    evidenceLevel: 'strong'
  },
  {
    id: 'probiotics',
    name: 'Multi-Strain Probiotics',
    dosage: '50 billion CFU',
    frequency: 1,
    timing: ['22:00'],
    purpose: 'gut',
    priority: 'essential',
    interactions: ['Take away from antimicrobials'],
    sideEffects: ['Initial bloating or gas'],
    notes: 'Restore healthy gut bacteria. Take before bed.',
    costPerMonth: 45,
    evidenceLevel: 'strong'
  },
  {
    id: 'omega-3',
    name: 'Omega-3 Fish Oil',
    dosage: '2000mg EPA/DHA',
    frequency: 2,
    timing: ['8:00', '18:00'],
    purpose: 'brain',
    priority: 'essential',
    interactions: ['May increase bleeding risk'],
    sideEffects: ['Fishy aftertaste'],
    notes: 'Anti-inflammatory. Take with meals to avoid burping.',
    costPerMonth: 40,
    evidenceLevel: 'strong'
  },
  {
    id: 'magnesium',
    name: 'Magnesium Glycinate',
    dosage: '400mg',
    frequency: 1,
    timing: ['21:00'],
    purpose: 'general',
    priority: 'essential',
    interactions: ['Separate from binders by 2+ hours'],
    sideEffects: ['Diarrhea with high doses'],
    notes: 'Essential mineral. Promotes relaxation and sleep.',
    costPerMonth: 25,
    evidenceLevel: 'strong'
  }
]

const protocolPhases = {
  prep: {
    name: 'Preparation Phase',
    duration: '2-4 weeks',
    description: 'Build nutrient stores and prepare detox pathways',
    supplements: ['vitamin-c', 'magnesium', 'probiotics', 'omega-3']
  },
  active: {
    name: 'Active Detox Phase',
    duration: '3-6 months',
    description: 'Full support during binder and antifungal protocols',
    supplements: ['glutathione', 'nac', 'milk-thistle', 'alpha-lipoic-acid', 'vitamin-c', 'quercetin', 'probiotics', 'omega-3', 'magnesium']
  },
  maintenance: {
    name: 'Maintenance Phase',
    duration: 'Ongoing',
    description: 'Long-term support for continued health',
    supplements: ['glutathione', 'vitamin-c', 'probiotics', 'omega-3', 'magnesium', 'coq10']
  }
}

export default function SupplementSchedulerPage() {
  const [selectedPhase, setSelectedPhase] = useState<'prep' | 'active' | 'maintenance'>('prep')
  const [customSupplements, setCustomSupplements] = useState<Supplement[]>([])
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([])
  const [currentProtocol, setCurrentProtocol] = useState<SupplementProtocol | null>(null)
  const [interactions, setInteractions] = useState<string[]>([])
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    if (selectedPhase) {
      const phaseSupplements = protocolPhases[selectedPhase].supplements
      setSelectedSupplements(phaseSupplements)
      generateProtocol(phaseSupplements)
    }
  }, [selectedPhase])

  useEffect(() => {
    generateProtocol(selectedSupplements)
  }, [selectedSupplements, customSupplements])

  const generateProtocol = (supplementIds: string[]) => {
    const allSupplements = [...moldDetoxSupplements, ...customSupplements]
    const protocolSupplements = allSupplements.filter(s => supplementIds.includes(s.id))
    
    const cost = protocolSupplements.reduce((sum, s) => sum + s.costPerMonth, 0)
    setTotalCost(cost)

    const protocol: SupplementProtocol = {
      phase: selectedPhase,
      duration: protocolPhases[selectedPhase].duration,
      supplements: protocolSupplements,
      totalCost: cost
    }

    setCurrentProtocol(protocol)
    checkInteractions(protocolSupplements)
  }

  const checkInteractions = (supplements: Supplement[]) => {
    const foundInteractions: string[] = []
    
    // Check for timing conflicts
    const timingMap = new Map<string, string[]>()
    supplements.forEach(supp => {
      supp.timing.forEach(time => {
        if (!timingMap.has(time)) timingMap.set(time, [])
        timingMap.get(time)!.push(supp.name)
      })
    })

    timingMap.forEach((supps, time) => {
      if (supps.length > 3) {
        foundInteractions.push(`Too many supplements at ${time}: ${supps.join(', ')}`)
      }
    })

    // Check for specific interactions
    const hasBinderSeparation = supplements.some(s => s.interactions.some(i => i.includes('binder')))
    if (hasBinderSeparation) {
      foundInteractions.push('Some supplements need separation from binders (2+ hours)')
    }

    setInteractions(foundInteractions)
  }

  const toggleSupplement = (supplementId: string) => {
    if (selectedSupplements.includes(supplementId)) {
      setSelectedSupplements(prev => prev.filter(id => id !== supplementId))
    } else {
      setSelectedSupplements(prev => [...prev, supplementId])
    }
  }

  const addCustomSupplement = (supplement: Supplement) => {
    setCustomSupplements(prev => [...prev, supplement])
    setSelectedSupplements(prev => [...prev, supplement.id])
  }

  const exportProtocol = () => {
    if (!currentProtocol) return

    const exportData = {
      protocol: currentProtocol,
      interactions,
      generatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `supplement-protocol-${selectedPhase}.json`
    a.click()
  }

  const getTimeSlots = () => {
    if (!currentProtocol) return []

    const timeMap = new Map<string, Supplement[]>()
    currentProtocol.supplements.forEach(supp => {
      supp.timing.forEach(time => {
        if (!timeMap.has(time)) timeMap.set(time, [])
        timeMap.get(time)!.push(supp)
      })
    })

    return Array.from(timeMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
  }

  const priorityColors = {
    essential: 'bg-red-100 text-red-800',
    beneficial: 'bg-yellow-100 text-yellow-800',
    optional: 'bg-green-100 text-green-800'
  }

  const purposeIcons = {
    detox: Zap,
    immune: Shield,
    energy: Activity,
    brain: Brain,
    gut: Heart,
    liver: Target,
    general: Pill
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Supplement Scheduler</h1>
        <p className="text-gray-600 mb-6">
          Optimize your supplement timing and track your mold detox support protocol with evidence-based recommendations.
        </p>

        {/* Phase Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(protocolPhases).map(([key, phase]) => (
            <Card 
              key={key} 
              className={`cursor-pointer transition-all ${
                selectedPhase === key ? 'ring-2 ring-primary-200 bg-primary-50' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPhase(key as any)}
            >
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{phase.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{phase.duration}</p>
                  <p className="text-xs text-gray-500">{phase.description}</p>
                  {selectedPhase === key && (
                    <Badge className="mt-2">Selected</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Protocol Overview */}
        {currentProtocol && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{currentProtocol.supplements.length}</div>
                  <div className="text-sm text-gray-600">Supplements</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">${totalCost}</div>
                  <div className="text-sm text-gray-600">Monthly Cost</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{getTimeSlots().length}</div>
                  <div className="text-sm text-gray-600">Daily Doses</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{interactions.length}</div>
                  <div className="text-sm text-gray-600">Interactions</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Tabs defaultValue="protocol" className="space-y-6">
        <TabsList>
          <TabsTrigger value="protocol">Protocol Builder</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="library">Supplement Library</TabsTrigger>
        </TabsList>

        <TabsContent value="protocol" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{protocolPhases[selectedPhase].name} Protocol</CardTitle>
                <Button variant="outline" onClick={exportProtocol} disabled={!currentProtocol}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Protocol
                </Button>
              </div>
              <CardDescription>
                {protocolPhases[selectedPhase].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moldDetoxSupplements.map((supplement) => {
                  const isSelected = selectedSupplements.includes(supplement.id)
                  const isRecommended = protocolPhases[selectedPhase].supplements.includes(supplement.id)
                  const Icon = purposeIcons[supplement.purpose]

                  return (
                    <motion.div
                      key={supplement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border rounded-lg p-4 transition-all ${
                        isSelected ? 'border-primary-300 bg-primary-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSupplement(supplement.id)}
                            />
                            <Icon className="h-5 w-5 text-gray-600" />
                            <h4 className="font-medium">{supplement.name}</h4>
                            <Badge className={priorityColors[supplement.priority]}>
                              {supplement.priority}
                            </Badge>
                            {isRecommended && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                Recommended
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {supplement.evidenceLevel} evidence
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">
                                <strong>Dosage:</strong> {supplement.dosage}, {supplement.frequency}x daily
                              </p>
                              <p className="text-gray-600">
                                <strong>Purpose:</strong> {supplement.purpose}
                              </p>
                              <p className="text-gray-600">
                                <strong>Cost:</strong> ${supplement.costPerMonth}/month
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">
                                <strong>Timing:</strong> {supplement.timing.join(', ')}
                              </p>
                              <p className="text-gray-600 mt-1">
                                {supplement.notes}
                              </p>
                            </div>
                          </div>

                          {supplement.interactions.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-orange-600">
                                <strong>Interactions:</strong> {supplement.interactions.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Supplement Schedule</CardTitle>
              <CardDescription>
                Optimized timing to avoid interactions and maximize absorption
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!currentProtocol || currentProtocol.supplements.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Select supplements in the Protocol Builder to see your daily schedule
                </div>
              ) : (
                <div className="space-y-4">
                  {getTimeSlots().map(([time, supplements]) => (
                    <div key={time} className="border rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="font-mono text-lg font-medium text-primary-600 w-16">
                          {time}
                        </div>
                        <Badge variant="outline">
                          {supplements.length} supplement{supplements.length > 1 ? 's' : ''}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {supplements.map((supplement, index) => {
                          const Icon = purposeIcons[supplement.purpose]
                          return (
                            <div key={index} className="flex items-center gap-3 text-sm">
                              <Icon className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">{supplement.name}</span>
                              <span className="text-gray-600">({supplement.dosage})</span>
                              <Badge className={priorityColors[supplement.priority]} variant="outline">
                                {supplement.priority}
                              </Badge>
                              {supplement.notes && (
                                <span className="text-xs text-gray-500 ml-auto">
                                  {supplement.notes}
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Timing Tips</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Take fat-soluble vitamins (A, D, E, K) with meals containing fat</li>
                    <li>• Water-soluble vitamins (B, C) can be taken on empty stomach</li>
                    <li>• Minerals like magnesium are best taken in evening</li>
                    <li>• Separate supplements from binders by 2+ hours</li>
                    <li>• Set phone alarms to maintain consistent timing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interaction Analysis</CardTitle>
              <CardDescription>
                Potential conflicts and recommendations for your current protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              {interactions.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No major interactions detected!</h3>
                  <p className="text-gray-600">Your current supplement protocol looks well-optimized.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {interactions.map((interaction, index) => (
                    <Alert key={index} className="border-yellow-200 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-900">Potential Interaction</AlertTitle>
                      <AlertDescription className="text-yellow-800">
                        {interaction}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">General Interaction Guidelines</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-900 mb-2">⚠️ Avoid Together:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Iron + Calcium (compete for absorption)</li>
                      <li>• Zinc + Copper (imbalance concerns)</li>
                      <li>• High-dose antioxidants during chemo</li>
                      <li>• Supplements + blood thinners (consult doctor)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-900 mb-2">✅ Synergistic Combinations:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Vitamin C + Iron (enhances absorption)</li>
                      <li>• Vitamin D + Magnesium (co-factors)</li>
                      <li>• Quercetin + Vitamin C (antioxidant boost)</li>
                      <li>• NAC + Glutathione (detox support)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplement Library</CardTitle>
                <CardDescription>
                  Evidence-based information about supplements for mold detox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moldDetoxSupplements.map((supplement) => {
                    const Icon = purposeIcons[supplement.purpose]
                    return (
                      <Card key={supplement.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Icon className="h-6 w-6 text-primary-600 mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold">{supplement.name}</h4>
                                <Badge className={priorityColors[supplement.priority]}>
                                  {supplement.priority}
                                </Badge>
                                <Badge variant="outline">
                                  {supplement.evidenceLevel} evidence
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600 mb-3">{supplement.notes}</p>
                              
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-1">Dosage & Timing</h5>
                                  <p className="text-gray-600">{supplement.dosage}, {supplement.frequency}x daily</p>
                                  <p className="text-gray-600">Times: {supplement.timing.join(', ')}</p>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-1">Interactions</h5>
                                  <ul className="text-gray-600 space-y-1">
                                    {supplement.interactions.map((interaction, i) => (
                                      <li key={i}>• {interaction}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-1">Side Effects</h5>
                                  <ul className="text-gray-600 space-y-1">
                                    {supplement.sideEffects.map((effect, i) => (
                                      <li key={i}>• {effect}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-green-600">
                                ${supplement.costPerMonth}
                              </div>
                              <div className="text-sm text-gray-600">per month</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

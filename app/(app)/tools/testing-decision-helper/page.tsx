/**
 * @fileoverview Testing Decision Helper - Guide users through complex testing options
 * to choose the right environmental and medical tests for their situation
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  TestTube,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Home,
  Heart,
  Building,
  FileText,
  Download,
  Calendar,
  Star,
  Info
} from 'lucide-react'

interface TestRecommendation {
  id: string
  name: string
  type: 'environmental' | 'medical'
  priority: 'essential' | 'recommended' | 'optional'
  cost: {
    min: number
    max: number
  }
  timeframe: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  labs: string[]
  insuranceCoverage: boolean
  cptCodes?: string[]
}

const environmentalTests: TestRecommendation[] = [
  {
    id: 'ermi',
    name: 'ERMI (Environmental Relative Moldiness Index)',
    type: 'environmental',
    priority: 'essential',
    cost: { min: 320, max: 380 },
    timeframe: '10-14 days',
    description: 'Gold standard dust analysis testing 36 mold species to determine overall mold burden',
    pros: [
      'Most comprehensive environmental test',
      'Standardized EPA methodology',
      'Compares your home to national database',
      'Detects spores even after cleanup'
    ],
    cons: [
      'Most expensive single test',
      'Requires specific dust collection method',
      'Results can be confusing without interpretation'
    ],
    bestFor: [
      'Suspected chronic exposure',
      'Before major remediation',
      'Post-remediation verification',
      'Insurance claims'
    ],
    labs: ['Mycometrics', 'Environmental Analytics', 'RealTime Laboratories'],
    insuranceCoverage: false
  },
  {
    id: 'hertsmi2',
    name: 'HERTSMI-2 (Health Effects Roster)',
    type: 'environmental',
    priority: 'recommended',
    cost: { min: 158, max: 200 },
    timeframe: '7-10 days',
    description: 'Streamlined version of ERMI testing the 5 most dangerous mold species',
    pros: [
      'More affordable than ERMI',
      'Focuses on most toxic species',
      'Easier to interpret results',
      'Good screening tool'
    ],
    cons: [
      'Less comprehensive than ERMI',
      'May miss some problem molds',
      'Still requires dust collection'
    ],
    bestFor: [
      'Budget-conscious testing',
      'Initial screening',
      'Follow-up after treatment',
      'Rental properties'
    ],
    labs: ['Mycometrics', 'Environmental Analytics'],
    insuranceCoverage: false
  },
  {
    id: 'air-sampling',
    name: 'Spore Trap Air Sampling',
    type: 'environmental',
    priority: 'optional',
    cost: { min: 75, max: 150 },
    timeframe: '3-5 days',
    description: 'Captures airborne mold spores during specific time period',
    pros: [
      'Shows what you\'re breathing right now',
      'Good for specific room testing',
      'Relatively inexpensive',
      'Can test multiple locations'
    ],
    cons: [
      'Only shows spores present during sampling',
      'Weather and activity dependent',
      'May miss dormant contamination',
      'High variability in results'
    ],
    bestFor: [
      'Active visible mold growth',
      'HVAC system testing',
      'Post-cleanup verification',
      'Specific room concerns'
    ],
    labs: ['Local environmental consultants', 'Mold inspection companies'],
    insuranceCoverage: false
  }
]

const medicalTests: TestRecommendation[] = [
  {
    id: 'mycotoxin-urine',
    name: 'Urine Mycotoxin Panel',
    type: 'medical',
    priority: 'essential',
    cost: { min: 299, max: 399 },
    timeframe: '7-14 days',
    description: 'Measures 15+ mycotoxins in urine to confirm body burden and track detox progress',
    pros: [
      'Shows mycotoxins in your body',
      'Tracks detox progress over time',
      'Identifies specific toxins',
      'Can guide treatment protocols'
    ],
    cons: [
      'Expensive for repeated testing',
      'May show false negatives if not detoxing',
      'Requires creatinine correction',
      'Insurance rarely covers'
    ],
    bestFor: [
      'Confirming mold illness',
      'Treatment monitoring',
      'Determining binder protocols',
      'Pre/post comparison'
    ],
    labs: ['Great Plains Laboratory', 'RealTime Laboratories', 'Mosaic Diagnostics'],
    insuranceCoverage: false,
    cptCodes: ['82542', '82570']
  },
  {
    id: 'c4a',
    name: 'C4a (Complement 4a)',
    type: 'medical',
    priority: 'recommended',
    cost: { min: 85, max: 120 },
    timeframe: '2-3 days',
    description: 'Biomarker of innate immune system activation from biotoxin exposure',
    pros: [
      'Relatively inexpensive',
      'Quick turnaround',
      'Good screening tool',
      'Often covered by insurance'
    ],
    cons: [
      'Not specific to mold',
      'Can be elevated from other causes',
      'Normal levels don\'t rule out mold',
      'May fluctuate with treatment'
    ],
    bestFor: [
      'Initial screening',
      'Monitoring inflammation',
      'Insurance-covered testing',
      'Tracking immune response'
    ],
    labs: ['LabCorp', 'Quest Diagnostics', 'National Jewish Health'],
    insuranceCoverage: true,
    cptCodes: ['86162']
  },
  {
    id: 'tgf-beta1',
    name: 'TGF-β1 (Transforming Growth Factor)',
    type: 'medical',
    priority: 'recommended',
    cost: { min: 150, max: 200 },
    timeframe: '3-5 days',
    description: 'Measures immune dysregulation and chronic inflammation from mold exposure',
    pros: [
      'Specific to biotoxin illness',
      'Shows immune system dysfunction',
      'Helps confirm CIRS diagnosis',
      'Tracks treatment response'
    ],
    cons: [
      'More expensive than C4a',
      'Not always covered by insurance',
      'Requires proper collection',
      'Can be affected by other factors'
    ],
    bestFor: [
      'CIRS diagnosis confirmation',
      'Chronic illness evaluation',
      'Treatment monitoring',
      'Complex cases'
    ],
    labs: ['LabCorp', 'Quest Diagnostics', 'Cyrex Labs'],
    insuranceCoverage: false,
    cptCodes: ['83520']
  },
  {
    id: 'vcs',
    name: 'VCS (Visual Contrast Sensitivity)',
    type: 'medical',
    priority: 'recommended',
    cost: { min: 0, max: 15 },
    timeframe: 'Immediate',
    description: 'Online screening test for biotoxin-induced neurological dysfunction',
    pros: [
      'Free or very low cost',
      'Immediate results',
      'Good screening tool',
      'Can do at home'
    ],
    cons: [
      'Not definitive diagnosis',
      'Can be affected by eye conditions',
      'May have false positives/negatives',
      'Requires good monitor calibration'
    ],
    bestFor: [
      'Initial screening',
      'Monitoring treatment progress',
      'Budget-conscious evaluation',
      'Quick assessment'
    ],
    labs: ['VCStest.com', 'SurvivingMold.com'],
    insuranceCoverage: false
  }
]

const priorityColors = {
  essential: 'bg-red-100 text-red-800',
  recommended: 'bg-yellow-100 text-yellow-800',
  optional: 'bg-green-100 text-green-800'
}

export default function TestingDecisionHelperPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({})
  const [recommendations, setRecommendations] = useState<TestRecommendation[]>([])
  const [totalCost, setTotalCost] = useState({ min: 0, max: 0 })

  const questions = [
    {
      id: 'exposure_confirmed',
      title: 'Do you know you have mold exposure?',
      description: 'Have you seen visible mold, had water damage, or gotten sick in a specific building?',
      options: [
        { value: 'confirmed', label: 'Yes, confirmed exposure' },
        { value: 'suspected', label: 'Suspected but not confirmed' },
        { value: 'unknown', label: 'Not sure, investigating' }
      ]
    },
    {
      id: 'symptoms_present',
      title: 'Are you experiencing mold illness symptoms?',
      description: 'Fatigue, brain fog, respiratory issues, headaches, joint pain, etc.',
      options: [
        { value: 'severe', label: 'Severe symptoms affecting daily life' },
        { value: 'moderate', label: 'Moderate symptoms, manageable' },
        { value: 'mild', label: 'Mild or occasional symptoms' },
        { value: 'none', label: 'No symptoms, just investigating' }
      ]
    },
    {
      id: 'budget_range',
      title: 'What\'s your testing budget?',
      description: 'Consider both initial testing and potential follow-up tests',
      options: [
        { value: 'unlimited', label: 'No budget constraints ($800+)' },
        { value: 'moderate', label: 'Moderate budget ($300-800)' },
        { value: 'limited', label: 'Limited budget ($100-300)' },
        { value: 'minimal', label: 'Minimal budget (<$100)' }
      ]
    },
    {
      id: 'urgency_level',
      title: 'How urgent is your situation?',
      description: 'This affects which tests to prioritize first',
      options: [
        { value: 'emergency', label: 'Emergency - need answers ASAP' },
        { value: 'urgent', label: 'Urgent - within 2 weeks' },
        { value: 'planned', label: 'Planned - within 1-2 months' },
        { value: 'research', label: 'Research mode - no timeline' }
      ]
    },
    {
      id: 'insurance_status',
      title: 'Do you have health insurance?',
      description: 'Some medical tests may be covered, reducing out-of-pocket costs',
      options: [
        { value: 'good_coverage', label: 'Good insurance with lab coverage' },
        { value: 'basic_coverage', label: 'Basic insurance, limited lab coverage' },
        { value: 'no_insurance', label: 'No insurance, paying out-of-pocket' },
        { value: 'hsa_fsa', label: 'HSA/FSA available for medical expenses' }
      ]
    }
  ]

  useEffect(() => {
    if (currentStep === questions.length) {
      generateRecommendations()
    }
  }, [currentStep, userAnswers])

  const generateRecommendations = () => {
    let recommended: TestRecommendation[] = []
    
    const { exposure_confirmed, symptoms_present, budget_range, urgency_level, insurance_status } = userAnswers

    // Environmental testing logic
    if (exposure_confirmed === 'unknown' || urgency_level === 'emergency') {
      recommended.push(...environmentalTests.filter(t => t.id === 'air-sampling'))
    }
    
    if (budget_range === 'unlimited' || (budget_range === 'moderate' && exposure_confirmed === 'confirmed')) {
      recommended.push(...environmentalTests.filter(t => t.id === 'ermi'))
    } else if (budget_range === 'moderate' || budget_range === 'limited') {
      recommended.push(...environmentalTests.filter(t => t.id === 'hertsmi2'))
    }

    // Medical testing logic
    if (symptoms_present === 'severe' || symptoms_present === 'moderate') {
      if (budget_range === 'unlimited' || budget_range === 'moderate') {
        recommended.push(...medicalTests.filter(t => t.id === 'mycotoxin-urine'))
      }
      
      if (insurance_status === 'good_coverage' || insurance_status === 'basic_coverage') {
        recommended.push(...medicalTests.filter(t => t.id === 'c4a'))
        recommended.push(...medicalTests.filter(t => t.id === 'tgf-beta1'))
      }
      
      // Always recommend VCS as it's free/cheap
      recommended.push(...medicalTests.filter(t => t.id === 'vcs'))
    }

    // Remove duplicates and sort by priority
    const uniqueRecommended = recommended.filter((test, index, self) => 
      index === self.findIndex(t => t.id === test.id)
    )

    const sortedRecommendations = uniqueRecommended.sort((a, b) => {
      const priorityOrder = { essential: 0, recommended: 1, optional: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

    setRecommendations(sortedRecommendations)

    // Calculate total cost
    const costs = sortedRecommendations.reduce(
      (acc, test) => ({
        min: acc.min + test.cost.min,
        max: acc.max + test.cost.max
      }),
      { min: 0, max: 0 }
    )
    setTotalCost(costs)
  }

  const handleAnswer = (questionId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }))
    setCurrentStep(prev => prev + 1)
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setUserAnswers({})
    setRecommendations([])
    setTotalCost({ min: 0, max: 0 })
  }

  if (currentStep < questions.length) {
    const question = questions[currentStep]
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Testing Decision Helper</h1>
          <p className="text-gray-600 mb-6">
            Answer a few questions to get personalized testing recommendations based on your situation and budget.
          </p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep) / questions.length) * 100)}% complete</span>
            </div>
            <Progress value={(currentStep / questions.length) * 100} className="h-2" />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{question.title}</CardTitle>
              <CardDescription>{question.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{option.label}</div>
                  </motion.button>
                ))}
              </div>
              
              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    Back
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Personalized Testing Plan</h1>
        <p className="text-gray-600 mb-6">
          Based on your answers, here are the recommended tests prioritized for your situation.
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{recommendations.length}</div>
              <div className="text-sm text-gray-600">Recommended Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${totalCost.min} - ${totalCost.max}</div>
              <div className="text-sm text-gray-600">Estimated Total Cost</div>
            </div>
          </div>
          <Button variant="outline" onClick={resetQuiz}>
            Start Over
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="all-tests">All Tests</TabsTrigger>
          <TabsTrigger value="timeline">Testing Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          {recommendations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No specific recommendations</h3>
                <p className="text-gray-600 mb-4">
                  Based on your answers, you may want to consult with a healthcare provider for personalized testing advice.
                </p>
                <Button onClick={resetQuiz}>Try Again</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {recommendations.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={priorityColors[test.priority]}>
                              {test.priority}
                            </Badge>
                            <Badge variant="outline">
                              {test.type}
                            </Badge>
                            {test.insuranceCoverage && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                <Heart className="h-3 w-3 mr-1" />
                                Insurance Covered
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                          <CardDescription>{test.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">
                            ${test.cost.min} - ${test.cost.max}
                          </div>
                          <div className="text-sm text-gray-600">{test.timeframe}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-green-900 mb-2">✅ Pros:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {test.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-900 mb-2">❌ Cons:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {test.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900 mb-2">🎯 Best For:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {test.bestFor.map((use, i) => (
                              <li key={i}>• {use}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Recommended Labs:</h4>
                            <p className="text-sm text-gray-600">
                              {test.labs.join(', ')}
                            </p>
                          </div>
                          {test.cptCodes && (
                            <div className="text-right">
                              <h4 className="font-medium text-gray-900 mb-1">CPT Codes:</h4>
                              <p className="text-sm text-gray-600">
                                {test.cptCodes.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all-tests" className="space-y-6">
          <div className="grid gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Environmental Tests</h3>
              <div className="space-y-4">
                {environmentalTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <div className="text-lg font-semibold text-green-600">
                          ${test.cost.min} - ${test.cost.max}
                        </div>
                      </div>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Medical Tests</h3>
              <div className="space-y-4">
                {medicalTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <div className="text-lg font-semibold text-green-600">
                          ${test.cost.min} - ${test.cost.max}
                        </div>
                      </div>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Testing Timeline</CardTitle>
              <CardDescription>
                Optimal order and timing for your recommended tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    This timeline is a general guide. Consult with a healthcare provider familiar with mold illness for personalized advice.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="border-l-2 border-primary-200 pl-4">
                    <h4 className="font-semibold text-primary-600">Week 1-2: Initial Assessment</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• VCS test (immediate)</li>
                      <li>• Air sampling if active exposure suspected</li>
                      <li>• Basic blood work (C4a) if insurance covered</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-primary-200 pl-4">
                    <h4 className="font-semibold text-primary-600">Week 3-4: Comprehensive Testing</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• ERMI or HERTSMI-2 dust analysis</li>
                      <li>• Urine mycotoxin panel</li>
                      <li>• Additional biomarkers (TGF-β1)</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-primary-200 pl-4">
                    <h4 className="font-semibold text-primary-600">Week 5-6: Results & Planning</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Review all test results</li>
                      <li>• Develop treatment plan</li>
                      <li>• Plan follow-up testing schedule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Save or print your testing plan for reference</li>
                  <li>• Contact recommended labs for sample collection kits</li>
                  <li>• Consider consulting with a mold-literate healthcare provider</li>
                  <li>• Plan your testing budget and timeline</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Download className="h-4 w-4 mr-2" />
                    Export Plan
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

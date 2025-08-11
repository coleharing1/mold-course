'use client'

import { ArrowRight, Home, Shield, Droplets, Pill, Heart, Search, Car, Building, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface VisualDiagramProps {
  type: 'quick-start' | 'exposure-inspection' | 'drainage-pathways' | 'testing-flowchart' | 'binder-timing' | 'herx-scale' | 'drainage-timeline' | 'binder-schedule'
}

export default function VisualDiagram({ type }: VisualDiagramProps) {
  switch (type) {
    case 'quick-start':
      return <ModuleQuickStart />
    case 'exposure-inspection':
      return <ExposureInspectionDiagram />
    case 'drainage-pathways':
      return <DrainagePathwaysDiagram />
    case 'testing-flowchart':
      return <TestingFlowchart />
    case 'binder-timing':
      return <BinderTimingDiagram />
    case 'herx-scale':
      return <HerxScaleDiagram />
    case 'drainage-timeline':
      return <DrainageTimelineDiagram />
    case 'binder-schedule':
      return <BinderScheduleDiagram />
    default:
      return <div>Diagram type "{type}" not found</div>
  }
}

export function DrainagePathwaysDiagram() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 my-6">
      <h3 className="text-xl font-bold text-center mb-6">Your Body's 5 Drainage Pathways</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg">
            💩
          </div>
          <h4 className="font-semibold">Bowels</h4>
          <p className="text-sm text-gray-600">Primary exit route</p>
          <p className="text-xs mt-1 text-red-600 font-medium">Most Critical</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg">
            🫘
          </div>
          <h4 className="font-semibold">Liver/Bile</h4>
          <p className="text-sm text-gray-600">Toxin processing</p>
          <p className="text-xs mt-1 text-amber-600 font-medium">Phase 1 & 2 Detox</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg">
            💧
          </div>
          <h4 className="font-semibold">Lymphatic</h4>
          <p className="text-sm text-gray-600">Waste transport</p>
          <p className="text-xs mt-1 text-blue-600 font-medium">Needs Movement</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg">
            🫧
          </div>
          <h4 className="font-semibold">Kidneys</h4>
          <p className="text-sm text-gray-600">Filtration system</p>
          <p className="text-xs mt-1 text-cyan-600 font-medium">Needs Hydration</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center text-3xl mb-2 shadow-lg">
            💦
          </div>
          <h4 className="font-semibold">Sweat/Skin</h4>
          <p className="text-sm text-gray-600">Direct elimination</p>
          <p className="text-xs mt-1 text-orange-600 font-medium">Sauna Effective</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-700 font-medium bg-yellow-100 inline-block px-4 py-2 rounded-lg">
          ⚠️ All 5 pathways must be open before starting binders
        </p>
      </div>
    </div>
  )
}

export function TestingFlowchart() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 my-6">
      <h3 className="text-xl font-bold text-center mb-6">Testing Decision Tree</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="bg-purple-100 rounded-lg p-4 inline-block">
            <p className="font-semibold text-purple-900">Start Here</p>
            <p className="text-sm text-purple-700">Do you have visible mold or water damage?</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mb-2 rotate-90" />
            <div className="bg-green-100 rounded-lg p-4">
              <p className="font-semibold text-green-900">YES</p>
              <p className="text-sm text-green-700">Environmental Testing First</p>
              <p className="text-xs mt-2">ERMI or HERTSMI-2</p>
            </div>
          </div>
          
          <div className="text-center">
            <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mb-2 rotate-90" />
            <div className="bg-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">NO</p>
              <p className="text-sm text-blue-700">Medical Testing First</p>
              <p className="text-xs mt-2">VCS ($15) then Urine Mycotoxin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExposureInspectionDiagram() {
  const locations = [
    {
      icon: Home,
      title: 'HOME',
      areas: ['Bathrooms', 'Kitchen', 'Basement', 'Attic', 'HVAC'],
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      icon: Building,
      title: 'OFFICE',
      areas: ['Ceiling tiles', 'Ventilation', 'Basement office', 'Break room'],
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-700'
    },
    {
      icon: Car,
      title: 'CAR',
      areas: ['AC vents', 'Carpets', 'Trunk', 'Under seats'],
      color: 'bg-orange-500',
      lightColor: 'bg-orange-100',
      textColor: 'text-orange-700'
    }
  ]

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
        🔍 Room-by-Room Inspection Guide
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {locations.map((location) => {
          const Icon = location.icon
          return (
            <div key={location.title} className={`${location.lightColor} rounded-lg p-4`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${location.color} rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900">{location.title}</h4>
              </div>
              <ul className="space-y-1">
                {location.areas.map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <Search className={`h-3 w-3 ${location.textColor}`} />
                    <span className="text-sm text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900 mb-1">
              Key Signs to Look For:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-red-800">
              <span>• Musty smell</span>
              <span>• Water stains</span>
              <span>• Peeling paint</span>
              <span>• Discoloration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DrainageTimelineDiagram() {
  const weeks = [
    {
      week: 'Week 1-2',
      title: 'Foundation',
      tasks: [
        'Hydration protocol',
        'Bowel movements 1-3x daily',
        'Liver support supplements',
        'Warm lemon water morning'
      ],
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100'
    },
    {
      week: 'Week 2-3',
      title: 'Amplification',
      tasks: [
        'Add dry brushing/rebounding',
        'Increase movement intensity',
        'Begin sauna 2-3x/week',
        'Introduce castor oil packs'
      ],
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100'
    },
    {
      week: 'Week 3-4',
      title: 'Optimization',
      tasks: [
        'All pathways functioning',
        'Sauna 4-5x/week',
        'Consistent daily BMs',
        'Check readiness score daily'
      ],
      color: 'bg-green-500',
      lightColor: 'bg-green-100'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-8 my-6">
      <h3 className="text-xl font-bold text-center mb-6">4-Week Drainage Opening Protocol</h3>
      <div className="space-y-4">
        {weeks.map((week) => (
          <div key={week.week} className={`${week.lightColor} rounded-lg p-4`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`${week.color} text-white px-3 py-1 rounded-lg font-semibold`}>
                {week.week}
              </div>
              <h4 className="font-bold text-gray-900">{week.title}</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {week.tasks.map((task) => (
                <li key={task} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-amber-100 border border-amber-300 rounded-lg p-4">
        <p className="text-sm font-semibold text-amber-900 text-center">
          ⏰ Goal: Achieve 80% drainage readiness for 7 consecutive days before starting binders
        </p>
      </div>
    </div>
  )
}

export function BinderTimingDiagram() {
  const times = [
    { time: '6:00 AM', activity: 'Wake up', type: 'neutral' },
    { time: '6:30 AM', activity: 'CSM/Welchol (empty stomach)', type: 'binder' },
    { time: '7:30 AM', activity: 'Breakfast + supplements', type: 'food' },
    { time: '11:30 AM', activity: 'CSM/Welchol', type: 'binder' },
    { time: '12:30 PM', activity: 'Lunch', type: 'food' },
    { time: '5:30 PM', activity: 'CSM/Welchol', type: 'binder' },
    { time: '6:30 PM', activity: 'Dinner + fat-soluble vitamins', type: 'food' },
    { time: '9:00 PM', activity: 'CSM/Welchol (optional 4th dose)', type: 'binder' },
  ]

  const getColor = (type: string) => {
    switch(type) {
      case 'binder': return 'bg-purple-500 text-white'
      case 'food': return 'bg-green-500 text-white'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 my-6">
      <h3 className="text-xl font-bold text-center mb-6">Daily Binder Timing Schedule</h3>
      <div className="space-y-2">
        {times.map((item) => (
          <div key={item.time} className="flex items-center gap-4">
            <div className="w-24 text-sm font-semibold text-gray-700">
              {item.time}
            </div>
            <div className={`flex-1 p-3 rounded-lg ${getColor(item.type)}`}>
              {item.activity}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-100 border border-red-300 rounded-lg p-3">
          <p className="text-sm font-semibold text-red-900 mb-1">Critical Rules:</p>
          <ul className="text-xs text-red-800 space-y-1">
            <li>• 30-60 min before meals</li>
            <li>• 2+ hours from medications</li>
            <li>• 2+ hours from supplements</li>
          </ul>
        </div>
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
          <p className="text-sm font-semibold text-blue-900 mb-1">Titration:</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Week 1: ¼ scoop</li>
            <li>• Week 2: ½ scoop</li>
            <li>• Week 3+: Full scoop</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function HerxScaleDiagram() {
  const levels = [
    {
      level: 1,
      severity: 'Mild',
      symptoms: ['Slight fatigue', 'Minor headache', 'Mild brain fog'],
      action: 'Continue protocol',
      color: 'bg-green-500'
    },
    {
      level: 2,
      severity: 'Moderate',
      symptoms: ['Increased fatigue', 'Body aches', 'Mood changes'],
      action: 'Slow down, increase binders',
      color: 'bg-yellow-500'
    },
    {
      level: 3,
      severity: 'Severe',
      symptoms: ['Extreme fatigue', 'Severe pain', 'Can\'t function'],
      action: 'STOP protocol, contact practitioner',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg p-8 my-6">
      <h3 className="text-xl font-bold text-center mb-6">Herxheimer Reaction Scale</h3>
      <div className="space-y-4">
        {levels.map((level) => (
          <div key={level.level} className="border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${level.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold`}>
                {level.level}
              </div>
              <h4 className="font-bold text-lg">{level.severity} Herx</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-1">Symptoms:</p>
                <ul className="text-sm text-gray-600">
                  {level.symptoms.map((symptom) => (
                    <li key={symptom}>• {symptom}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-1">Action:</p>
                <p className={`text-sm font-medium ${
                  level.level === 1 ? 'text-green-700' :
                  level.level === 2 ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {level.action}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Alert className="mt-6 border-red-500">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          If experiencing Level 3 symptoms, stop all protocols immediately and consult your healthcare provider.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function BinderScheduleDiagram() {
  const schedule = [
    {
      week: 'Week 1',
      dose: '¼ scoop',
      frequency: '2x daily',
      notes: 'Start slow, monitor tolerance'
    },
    {
      week: 'Week 2',
      dose: '½ scoop',
      frequency: '2-3x daily',
      notes: 'Increase if well tolerated'
    },
    {
      week: 'Week 3-4',
      dose: 'Full scoop',
      frequency: '3-4x daily',
      notes: 'Optimal dosing reached'
    },
    {
      week: 'Week 5+',
      dose: 'Full scoop',
      frequency: '4x daily',
      notes: 'Maintain for 8-12 weeks minimum'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 my-6">
      <h3 className="text-xl font-bold text-center mb-6">Binder Titration Schedule</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Week</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Dose</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Frequency</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((week) => (
              <tr key={week.week} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">{week.week}</td>
                <td className="border border-gray-300 px-4 py-2">{week.dose}</td>
                <td className="border border-gray-300 px-4 py-2">{week.frequency}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{week.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 bg-amber-100 border border-amber-300 rounded-lg p-3">
        <p className="text-sm text-amber-900">
          <strong>Remember:</strong> If you can't tolerate CSM, try Welchol (6 pills = 1 scoop CSM) or combine CSM + Welchol for better tolerance.
        </p>
      </div>
    </div>
  )
}

export function ModuleQuickStart() {
  const steps = [
    {
      number: '1',
      title: 'Stop Exposure',
      icon: Home,
      color: 'bg-red-500',
      lightColor: 'bg-red-100',
      textColor: 'text-red-700',
      description: 'Find & eliminate mold sources'
    },
    {
      number: '2',
      title: 'Reduce Contact',
      icon: Shield,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-100',
      textColor: 'text-orange-700',
      description: 'Air purifiers & moisture control'
    },
    {
      number: '3',
      title: 'Open Drainage',
      icon: Droplets,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      description: '2-4 weeks prep REQUIRED'
    },
    {
      number: '4',
      title: 'Start Binders',
      icon: Pill,
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
      textColor: 'text-green-700',
      description: 'Slowly remove mycotoxins'
    },
    {
      number: '5',
      title: 'Maintain',
      icon: Heart,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      description: 'Long-term prevention'
    }
  ]

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
        Your 5-Step Recovery Journey
      </h3>
      
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.number} className="flex items-center">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg`}>
                  {step.number}
                </div>
                <div className={`p-3 ${step.lightColor} rounded-lg mb-2`}>
                  <Icon className={`h-6 w-6 ${step.textColor} mx-auto`} />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-600 max-w-[120px]">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-gray-400 mx-2" />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.number} className="flex items-center gap-4">
              <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}>
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-5 w-5 ${step.textColor}`} />
                  <h4 className="font-semibold text-gray-900">
                    {step.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-gray-300" />
              )}
            </div>
          )
        })}
      </div>

      {/* Critical Warning */}
      <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800 text-center font-medium">
          ⚠️ Never skip Step 3 (Drainage) - This is the #1 mistake that causes severe reactions
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-600">
        <div className="text-center">
          <span className="font-semibold text-gray-900">Week 1-4:</span>
          <span className="ml-1">Steps 1-3</span>
        </div>
        <div className="text-center">
          <span className="font-semibold text-gray-900">Week 5-12:</span>
          <span className="ml-1">Step 4</span>
        </div>
        <div className="text-center">
          <span className="font-semibold text-gray-900">Ongoing:</span>
          <span className="ml-1">Step 5</span>
        </div>
      </div>
    </div>
  )
}
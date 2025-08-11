'use client'

import { ArrowRight, Home, Shield, Droplets, Pill, Heart, Search, Car, Building, AlertCircle } from 'lucide-react'

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
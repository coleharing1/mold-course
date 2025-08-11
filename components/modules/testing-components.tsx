'use client'

import { ArrowRight, Home, Droplets, FileText, DollarSign, Clock, CheckCircle } from 'lucide-react'

export function TestingFlowchart() {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
        📊 Your Testing Decision Tree
      </h3>
      
      <div className="space-y-4">
        {/* Start */}
        <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
          <p className="font-semibold text-blue-900 mb-2">Do you have visible mold or water damage?</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded border border-green-300">
              <p className="text-sm font-medium text-green-800">YES → Skip to medical testing</p>
              <p className="text-xs text-green-600 mt-1">You already know you have exposure</p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-300">
              <p className="text-sm font-medium text-orange-800">NO → Do ERMI test first</p>
              <p className="text-xs text-orange-600 mt-1">Find hidden mold sources</p>
            </div>
          </div>
        </div>

        <ArrowRight className="h-6 w-6 text-gray-400 mx-auto" />

        {/* Medical Testing */}
        <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
          <p className="font-semibold text-purple-900 mb-2">Choose Your Medical Test:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">Urine Mycotoxin ($300-400)</p>
                <p className="text-xs text-purple-600">Best for measuring body burden</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">VCS Test ($15)</p>
                <p className="text-xs text-purple-600">Quick neurological screening</p>
              </div>
            </div>
          </div>
        </div>

        <ArrowRight className="h-6 w-6 text-gray-400 mx-auto" />

        {/* Results */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-300">
          <p className="font-semibold text-green-900 mb-2">With Results You Can:</p>
          <ul className="space-y-1 text-sm text-green-800">
            <li>✓ Confirm mold exposure</li>
            <li>✓ Choose right binders for your toxins</li>
            <li>✓ Track treatment progress</li>
            <li>✓ Get prescriptions from doctors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function ComparisonTable() {
  const data = [
    {
      aspect: 'Purpose',
      environmental: 'Find mold in your space',
      medical: 'Measure toxins in your body'
    },
    {
      aspect: 'Cost',
      environmental: '$30-350',
      medical: '$200-600'
    },
    {
      aspect: 'Timeline',
      environmental: '3-7 days',
      medical: '1-2 weeks'
    },
    {
      aspect: 'Doctor Required',
      environmental: 'No',
      medical: 'No (in most states)'
    },
    {
      aspect: 'Best For',
      environmental: 'Finding the source',
      medical: 'Tracking recovery'
    },
    {
      aspect: 'Frequency',
      environmental: 'Once per location',
      medical: 'Every 3-6 months'
    }
  ]

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th className="px-4 py-3 text-left font-semibold">Aspect</th>
            <th className="px-4 py-3 text-left font-semibold">🏠 Environmental</th>
            <th className="px-4 py-3 text-left font-semibold">🩺 Medical</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.aspect} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-3 font-medium text-gray-900 border-b">{row.aspect}</td>
              <td className="px-4 py-3 text-gray-700 border-b">{row.environmental}</td>
              <td className="px-4 py-3 text-gray-700 border-b">{row.medical}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CostBreakdown() {
  const tests = [
    {
      category: 'Environmental',
      items: [
        { name: 'ERMI Test', cost: '$290', essential: true },
        { name: 'HERTSMI-2', cost: '$155', essential: false },
        { name: 'DIY Petri Dishes', cost: '$30', essential: false }
      ]
    },
    {
      category: 'Medical - Essential',
      items: [
        { name: 'Urine Mycotoxin', cost: '$300-400', essential: true },
        { name: 'VCS Test', cost: '$15', essential: true }
      ]
    },
    {
      category: 'Medical - Optional',
      items: [
        { name: 'Blood Panel', cost: '$300-500', essential: false },
        { name: 'Nasal Swab', cost: '$200', essential: false },
        { name: 'Organic Acids', cost: '$350', essential: false }
      ]
    }
  ]

  const essentialTotal = 705 // ERMI + Mycotoxin + VCS

  return (
    <div className="my-6 space-y-4">
      {tests.map((category) => (
        <div key={category.category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h4 className="font-semibold text-gray-900">{category.category}</h4>
          </div>
          <div className="p-4 space-y-2">
            {category.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.essential ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                  {item.essential && (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Essential</span>
                  )}
                </div>
                <span className="font-medium text-gray-900">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-green-900">Minimum Essential Testing</p>
            <p className="text-sm text-green-700">ERMI + Urine Mycotoxin + VCS</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-900">${essentialTotal}</p>
            <p className="text-xs text-green-700">One-time investment</p>
          </div>
        </div>
      </div>
    </div>
  )
}
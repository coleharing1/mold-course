import { ArrowRight } from 'lucide-react'

const stages = [
  {
    number: '01',
    title: 'Identify & Assess',
    description: 'Learn to recognize mold exposure sources and understand your symptoms',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    number: '02',
    title: 'Prepare Your Body',
    description: 'Open drainage pathways safely before starting any detox protocols',
    color: 'bg-green-100 text-green-700',
  },
  {
    number: '03',
    title: 'Detox Systematically',
    description: 'Use binders and antifungals in the right order with proper timing',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    number: '04',
    title: 'Prevent & Maintain',
    description: 'Build lasting habits to stay mold-free and monitor your progress',
    color: 'bg-orange-100 text-orange-700',
  },
]

export function Transformation() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Transformation Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Follow our proven 4-stage approach to safely recover from mold illness
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage.number} className="relative">
              {/* Connection line */}
              {index < stages.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-1/2 bg-gray-300 lg:block">
                  <ArrowRight className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 text-gray-400" />
                </div>
              )}
              
              <div className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stage.color} font-bold mb-4`}>
                  {stage.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stage.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Average time to complete: 3-6 months • Self-paced • Lifetime access
          </p>
        </div>
      </div>
    </section>
  )
}
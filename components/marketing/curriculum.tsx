import { Lock, CheckCircle, Clock, BookOpen } from 'lucide-react'

const modules = [
  {
    number: '00',
    title: 'Quick Start Guide',
    description: '5 essential first steps to begin your recovery safely',
    duration: '30 min',
    status: 'available',
    icon: BookOpen,
  },
  {
    number: '01',
    title: 'Identify Exposure',
    description: 'Learn to spot mold in your home, work, and car',
    duration: '45 min',
    status: 'available',
    icon: CheckCircle,
  },
  {
    number: '02',
    title: 'Testing & Diagnosis',
    description: 'Environmental vs medical testing explained',
    duration: '60 min',
    status: 'available',
    icon: CheckCircle,
  },
  {
    number: '03',
    title: 'Open Drainage Pathways',
    description: 'Prepare your body&apos;s detox systems safely',
    duration: '90 min',
    status: 'gated',
    icon: Clock,
  },
  {
    number: '04',
    title: 'Detox I: Binders',
    description: 'Safe binder protocols with proper timing',
    duration: '75 min',
    status: 'locked',
    icon: Lock,
  },
  {
    number: '05',
    title: 'Detox II: Antifungals',
    description: 'When and how to use antifungals safely',
    duration: '60 min',
    status: 'locked',
    icon: Lock,
  },
  {
    number: '06',
    title: 'Managing Herx Reactions',
    description: 'Handle detox reactions and know when to slow down',
    duration: '45 min',
    status: 'locked',
    icon: Lock,
  },
  {
    number: '07',
    title: 'Supportive Modalities',
    description: 'Sauna, exercise, nasal care, and sleep optimization',
    duration: '90 min',
    status: 'locked',
    icon: Lock,
  },
  {
    number: '08',
    title: 'Diet & Pantry',
    description: 'Low-mold nutrition and meal planning',
    duration: '60 min',
    status: 'available',
    icon: CheckCircle,
  },
  {
    number: '09',
    title: 'Retesting & Prevention',
    description: 'Long-term recovery and relapse prevention',
    duration: '45 min',
    status: 'locked',
    icon: Lock,
  },
]

export function Curriculum() {
  return (
    <section id="curriculum" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Curriculum
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            10 modules with gated progression to ensure your safety throughout recovery
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {modules.map((module) => (
            <div
              key={module.number}
              className={`group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                module.status === 'locked' ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {module.number}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {module.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </span>
                    {module.status === 'gated' && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Requires drainage readiness
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <module.icon
                    className={`h-5 w-5 ${
                      module.status === 'available'
                        ? 'text-green-500'
                        : module.status === 'gated'
                        ? 'text-amber-500'
                        : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-primary-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Safety-First Approach
          </h3>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Our unique gating system ensures you complete prerequisites before advancing to potentially 
            challenging protocols. You must achieve drainage readiness before starting binders, and 
            demonstrate binder tolerance before beginning antifungals.
          </p>
        </div>
      </div>
    </section>
  )
}
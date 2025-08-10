import { CheckCircle, AlertTriangle, Info } from 'lucide-react'

const evidenceLevels = [
  {
    icon: CheckCircle,
    title: 'Solid Evidence',
    description: 'Well-established protocols backed by multiple studies and extensive clinical practice',
    examples: ['Drainage pathway support', 'Binder timing protocols', 'Environmental remediation'],
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    textColor: 'text-green-700',
  },
  {
    icon: Info,
    title: 'Emerging Evidence',
    description: 'Promising approaches with growing research support and positive clinical observations',
    examples: ['Specific binder combinations', 'Sauna protocols', 'Dietary interventions'],
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-700',
  },
  {
    icon: AlertTriangle,
    title: 'Controversial',
    description: 'Debated methods presented transparently with full disclosure of limitations',
    examples: ['Aggressive antifungal protocols', 'Certain testing methods', 'Some supplement regimens'],
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    textColor: 'text-amber-700',
  },
]

export function Evidence() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Evidence-Based Content You Can Trust
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Every recommendation is clearly labeled with its evidence level, 
            so you can make informed decisions about your recovery
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {evidenceLevels.map((level) => (
            <div
              key={level.title}
              className={`relative rounded-2xl border-2 ${level.borderColor} ${level.bgColor} p-8 hover:shadow-lg transition-shadow`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${level.bgColor} ${level.iconColor} mb-4`}>
                <level.icon className="h-6 w-6" />
              </div>
              
              <h3 className={`text-xl font-bold ${level.titleColor} mb-3`}>
                {level.title}
              </h3>
              
              <p className={`text-sm ${level.textColor} mb-4`}>
                {level.description}
              </p>
              
              <div className="space-y-2">
                <p className={`text-xs font-semibold ${level.titleColor} uppercase tracking-wide`}>
                  Examples:
                </p>
                <ul className="space-y-1">
                  {level.examples.map((example) => (
                    <li key={example} className={`text-sm ${level.textColor} flex items-start`}>
                      <span className="mr-2">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            <strong className="font-semibold text-gray-900">Our Commitment:</strong> We regularly review 
            and update our content based on the latest research. All information includes citations 
            and last-verified dates for complete transparency.
          </p>
        </div>
      </div>
    </section>
  )
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ClipboardCheck, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Utensils, 
  TestTube,
  Thermometer,
  RefreshCw,
  Shield,
  CheckCircle
} from 'lucide-react'

const tools = [
  {
    icon: ClipboardCheck,
    title: 'Exposure Checklist',
    description: 'Room-by-room assessment with fix-first priorities and cost estimates',
    features: ['Photo uploads', 'Inspector brief PDF', 'Priority scoring'],
    category: 'Assessment',
  },
  {
    icon: TrendingUp,
    title: 'Drainage Readiness Score',
    description: 'Track your readiness with our proprietary 7-day rolling algorithm',
    features: ['Daily tracking', 'Trend graphs', 'AI suggestions'],
    category: 'Monitoring',
  },
  {
    icon: Calendar,
    title: 'Binder Timing Planner',
    description: 'Optimize timing between meals, supplements, and medications',
    features: ['Calendar export', 'Conflict alerts', 'Push notifications'],
    category: 'Planning',
  },
  {
    icon: AlertCircle,
    title: 'Herx Toolkit',
    description: 'Manage detox reactions with our intensity slider and protocols',
    features: ['Emergency protocol', 'Symptom logger', 'Safety flags'],
    category: 'Safety',
  },
  {
    icon: Thermometer,
    title: 'Sauna Ramp-Up',
    description: 'Progressive heat and time protocols with safety monitoring',
    features: ['Heart rate zones', 'Hydration reminders', 'Contraindications'],
    category: 'Modalities',
  },
  {
    icon: Utensils,
    title: 'Diet Builder',
    description: '7-day low-mold meal plans with shopping lists',
    features: ['Recipe swaps', 'Restaurant guide', 'Mold warnings'],
    category: 'Nutrition',
  },
  {
    icon: TestTube,
    title: 'Testing Helper',
    description: 'Navigate environmental vs medical testing options',
    features: ['Cost comparison', 'Insurance checker', 'Lab finder'],
    category: 'Testing',
  },
  {
    icon: RefreshCw,
    title: 'Retesting Scheduler',
    description: 'Track VCS and urine mycotoxin retesting intervals',
    features: ['Cost tracker', 'Progress photos', 'Comparison view'],
    category: 'Monitoring',
  },
  {
    icon: Shield,
    title: 'Re-exposure Triage',
    description: 'Quick assessment and action plan for new exposures',
    features: ['Severity assessment', 'Immediate steps', 'Emergency contacts'],
    category: 'Emergency',
  },
]

export function ToolsPreview() {
  return (
    <section id="tools" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Interactive Tools That Actually Help
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            9 powerful tools designed specifically for mold recovery, saving you hours of research and guesswork
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription className="text-sm">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">
            All tools save your progress automatically and sync across devices
          </p>
          <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800">
            <Shield className="mr-2 h-4 w-4" />
            Your data is encrypted and never shared
          </div>
        </div>
      </div>
    </section>
  )
}
/**
 * @fileoverview Protocol Templates - Pre-built protocol templates for different approaches
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText,
  Shield,
  Zap,
  Heart,
  Leaf,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

interface ProtocolTemplate {
  name: string
  description: string
  steps: string[]
}

interface ProtocolTemplatesProps {
  templates: { [key: string]: ProtocolTemplate }
  onSelectTemplate: (templateKey: string) => void
  selectedTemplate: string | null
}

export function ProtocolTemplates({
  templates,
  onSelectTemplate,
  selectedTemplate
}: ProtocolTemplatesProps) {
  const templateInfo = {
    conservative: {
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600',
      duration: '12-16 weeks',
      cost: '$200-300/month',
      intensity: 'Low',
      suitableFor: 'Sensitive individuals, multiple chemical sensitivities, elderly'
    },
    standard: {
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600',
      duration: '12-14 weeks',
      cost: '$300-400/month',
      intensity: 'Medium',
      suitableFor: 'Most people, evidence-based approach, Shoemaker protocol'
    },
    aggressive: {
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-red-50 border-red-200 text-red-700',
      iconColor: 'text-red-600',
      duration: '10-12 weeks',
      cost: '$500-700/month',
      intensity: 'High',
      suitableFor: 'Robust individuals, urgent timeline, high tolerance'
    },
    natural: {
      icon: <Leaf className="h-6 w-6" />,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      iconColor: 'text-emerald-600',
      duration: '14-18 weeks',
      cost: '$250-350/month',
      intensity: 'Medium',
      suitableFor: 'Prefer natural approach, no prescription access, holistic'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Protocol Templates</CardTitle>
          <CardDescription>
            Start with a proven template and customize to your needs
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(templates).map(([key, template]) => {
          const info = templateInfo[key as keyof typeof templateInfo]
          const isSelected = selectedTemplate === key
          
          return (
            <Card
              key={key}
              className={`transition-all ${
                isSelected 
                  ? 'ring-2 ring-emerald-500 shadow-lg' 
                  : 'hover:shadow-md'
              } ${info?.color || ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white ${info?.iconColor || ''}`}>
                      {info?.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                  {isSelected && (
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{info?.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{info?.cost}</span>
                  </div>
                </div>

                {/* Intensity Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Intensity:</span>
                  <Badge variant="secondary" className={getIntensityColor(info?.intensity || '')}>
                    {info?.intensity}
                  </Badge>
                </div>

                {/* Suitable For */}
                <div className="text-sm">
                  <p className="font-medium mb-1">Best For:</p>
                  <p className="text-gray-600">{info?.suitableFor}</p>
                </div>

                {/* Included Steps */}
                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.steps.slice(0, 5).map((step, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {step}
                      </Badge>
                    ))}
                    {template.steps.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.steps.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={isSelected ? "secondary" : "default"}
                  onClick={() => onSelectTemplate(key)}
                >
                  {isSelected ? 'Template Loaded' : 'Use This Template'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Template Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Approach</th>
                  <th className="text-center py-2">Drainage</th>
                  <th className="text-center py-2">Binders</th>
                  <th className="text-center py-2">Antifungals</th>
                  <th className="text-center py-2">Support</th>
                  <th className="text-center py-2">Prescriptions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Conservative</td>
                  <td className="text-center py-2">✅ Extended</td>
                  <td className="text-center py-2">✅ Gentle</td>
                  <td className="text-center py-2">❌ None</td>
                  <td className="text-center py-2">✅ Basic</td>
                  <td className="text-center py-2">❌ No</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Standard</td>
                  <td className="text-center py-2">✅ Full</td>
                  <td className="text-center py-2">✅ CSM</td>
                  <td className="text-center py-2">⚪ Optional</td>
                  <td className="text-center py-2">✅ Complete</td>
                  <td className="text-center py-2">✅ Yes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Aggressive</td>
                  <td className="text-center py-2">✅ Fast</td>
                  <td className="text-center py-2">✅ CSM</td>
                  <td className="text-center py-2">✅ Included</td>
                  <td className="text-center py-2">✅ Advanced</td>
                  <td className="text-center py-2">✅ Yes</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Natural</td>
                  <td className="text-center py-2">✅ Full</td>
                  <td className="text-center py-2">✅ Natural</td>
                  <td className="text-center py-2">✅ Herbal</td>
                  <td className="text-center py-2">✅ Complete</td>
                  <td className="text-center py-2">❌ No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customization Note */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Templates are Starting Points</p>
              <p className="text-sm text-blue-700 mt-1">
                After loading a template, you can add, remove, or reorder elements to match your specific needs, 
                health status, and budget. The conflict checker will help ensure your customizations are safe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getIntensityColor(intensity: string) {
  switch (intensity.toLowerCase()) {
    case 'low': return 'bg-green-100 text-green-700'
    case 'medium': return 'bg-yellow-100 text-yellow-700'
    case 'high': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
import { OnboardingData } from '@/app/(app)/onboarding/page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, User, Heart, Home, DollarSign } from 'lucide-react'

interface ReviewStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

export function ReviewStep({ data }: ReviewStepProps) {
  // Generate personalized recommendations based on data
  const getRecommendations = () => {
    const recommendations = []
    
    // Check severity
    const severity = parseInt(data.symptoms?.severity || '5')
    if (severity >= 8) {
      recommendations.push({
        type: 'warning',
        message: 'Based on your severe symptoms, we recommend a gentle approach and working with a healthcare provider.',
      })
    }
    
    // Check if still in moldy environment
    if (data.exposure?.duration === 'current') {
      recommendations.push({
        type: 'urgent',
        message: 'Priority: Address your current mold exposure. Module 01 will help you identify and remediate sources.',
      })
    }
    
    // Check budget
    if (data.constraints?.budget === 'minimal') {
      recommendations.push({
        type: 'info',
        message: 'We&apos;ll focus on low-cost, DIY approaches that fit your budget.',
      })
    }
    
    // Check pace
    if (data.constraints?.pace === 'gentle') {
      recommendations.push({
        type: 'success',
        message: 'Your protocols will be introduced slowly with careful monitoring for reactions.',
      })
    }
    
    return recommendations
  }
  
  const recommendations = getRecommendations()
  
  // Format data for display
  const formatList = (items: string[] | undefined) => {
    if (!items || items.length === 0) return 'None selected'
    return items.join(', ')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Review Your Profile
        </h2>
        <p className="text-sm text-gray-600">
          Here&apos;s your personalized recovery plan based on your inputs
        </p>
      </div>

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-2">
                {rec.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />}
                {rec.type === 'urgent' && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                {rec.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                {rec.type === 'info' && <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                <p className="text-sm text-gray-700">{rec.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{data.profile?.name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Age Range:</span>
            <span className="font-medium">{data.profile?.age || 'Not provided'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Living Situation:</span>
            <span className="font-medium capitalize">{data.profile?.livingSituation || 'Not provided'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Timezone:</span>
            <span className="font-medium">{data.profile?.timezone || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Severity:</span>
            <Badge variant={parseInt(data.symptoms?.severity || '5') >= 7 ? 'destructive' : 'default'}>
              {data.symptoms?.severity || '5'}/10
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{data.symptoms?.duration?.replace(/-/g, ' ') || 'Not specified'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Primary Symptoms:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {(data.symptoms?.primary || []).map((symptom) => (
                <Badge key={symptom} variant="outline" className="text-xs">
                  {symptom.replace(/-/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exposure Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Exposure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Locations:</span>
            <span className="font-medium">
              {Array.isArray(data.exposure?.location) 
                ? data.exposure.location.join(', ') 
                : 'Not specified'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <Badge 
              variant={data.exposure?.duration === 'current' ? 'destructive' : 'default'}
            >
              {data.exposure?.duration?.replace(/-/g, ' ') || 'Not specified'}
            </Badge>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Tests Conducted:</span>
            <span className="ml-2 font-medium">
              {data.exposure?.tests?.length ? `${data.exposure.tests.length} tests` : 'None'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Constraints Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Resources & Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Budget:</span>
            <span className="font-medium capitalize">{data.constraints?.budget || 'Not specified'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Recovery Pace:</span>
            <span className="font-medium capitalize">{data.constraints?.pace || 'Not specified'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Available Equipment:</span>
            <span className="ml-2 font-medium">
              {data.constraints?.equipment?.length 
                ? `${data.constraints.equipment.length} items` 
                : 'None'}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Dietary Restrictions:</span>
            <span className="ml-2 font-medium">
              {data.constraints?.diet?.length 
                ? formatList(data.constraints.diet).replace(/-/g, ' ')
                : 'None'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-primary-50 border-primary-200">
        <CardHeader>
          <CardTitle className="text-lg">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5" />
            <p className="text-sm">You&apos;ll be taken to your personalized dashboard</p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5" />
            <p className="text-sm">Start with Module 00: Quick Start Guide (5 essential first steps)</p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5" />
            <p className="text-sm">Access your customized protocol recommendations</p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5" />
            <p className="text-sm">Begin tracking your progress with our interactive tools</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
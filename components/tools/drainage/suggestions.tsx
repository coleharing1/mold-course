'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Droplets,
  Heart,
  Activity,
  Brain,
  Moon,
  Shield
} from 'lucide-react'

interface DrainageEntry {
  date: string
  metrics: any
  score: number
}

interface DrainageSuggestionsProps {
  currentScore: number
  entries: DrainageEntry[]
  binderUnlocked: boolean
}

export function DrainageSuggestions({ 
  currentScore, 
  entries, 
  binderUnlocked 
}: DrainageSuggestionsProps) {
  // Analyze weak areas
  const getWeakAreas = () => {
    if (entries.length === 0) return []
    
    const latestMetrics = entries[entries.length - 1].metrics
    const weakAreas = []
    
    if (latestMetrics.bowelMovements < 7) {
      weakAreas.push({
        area: 'Bowel Movements',
        score: latestMetrics.bowelMovements,
        icon: <Droplets className="h-4 w-4" />,
        suggestions: [
          'Increase fiber intake with chia seeds or ground flax',
          'Take magnesium citrate before bed',
          'Drink warm lemon water in the morning',
          'Consider digestive bitters before meals'
        ]
      })
    }
    
    if (latestMetrics.hydration < 7) {
      weakAreas.push({
        area: 'Hydration',
        score: latestMetrics.hydration,
        icon: <Droplets className="h-4 w-4" />,
        suggestions: [
          'Drink half your body weight in ounces of water daily',
          'Add electrolytes or a pinch of sea salt to water',
          'Set hourly hydration reminders',
          'Keep a water bottle visible at all times'
        ]
      })
    }
    
    if (latestMetrics.lymphMovement < 7) {
      weakAreas.push({
        area: 'Lymphatic Movement',
        score: latestMetrics.lymphMovement,
        icon: <Activity className="h-4 w-4" />,
        suggestions: [
          'Try dry brushing before showering',
          'Do 5-10 minutes of rebounding daily',
          'Get a lymphatic drainage massage',
          'Practice deep breathing exercises'
        ]
      })
    }
    
    if (latestMetrics.sleep < 7) {
      weakAreas.push({
        area: 'Sleep Quality',
        score: latestMetrics.sleep,
        icon: <Moon className="h-4 w-4" />,
        suggestions: [
          'Maintain consistent sleep/wake times',
          'Avoid screens 1 hour before bed',
          'Keep bedroom cool and dark',
          'Try magnesium glycinate before sleep'
        ]
      })
    }
    
    if (latestMetrics.liverSupport < 7) {
      weakAreas.push({
        area: 'Liver/Gallbladder',
        score: latestMetrics.liverSupport,
        icon: <Heart className="h-4 w-4" />,
        suggestions: [
          'Try castor oil packs 3x per week',
          'Eat bitter foods like arugula and dandelion',
          'Take milk thistle or NAC supplement',
          'Avoid alcohol and processed foods'
        ]
      })
    }
    
    return weakAreas.sort((a, b) => a.score - b.score).slice(0, 3)
  }

  const weakAreas = getWeakAreas()

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {currentScore < 40 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical: Drainage Support Needed</AlertTitle>
          <AlertDescription>
            Your drainage pathways are severely compromised. Do NOT start any detox protocols. 
            Focus entirely on opening drainage pathways for at least 2-4 weeks.
          </AlertDescription>
        </Alert>
      )}
      
      {currentScore >= 40 && currentScore < 60 && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Moderate Support Needed</AlertTitle>
          <AlertDescription>
            Your drainage pathways need more support. Continue focusing on the basics 
            before considering any detox protocols.
          </AlertDescription>
        </Alert>
      )}
      
      {currentScore >= 60 && currentScore < 80 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <TrendingUp className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-900">Almost There!</AlertTitle>
          <AlertDescription className="text-yellow-800">
            You&apos;re close to the 80% threshold. Keep up your current protocols and 
            add support for your weakest areas.
          </AlertDescription>
        </Alert>
      )}
      
      {currentScore >= 80 && !binderUnlocked && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900">Great Score!</AlertTitle>
          <AlertDescription className="text-green-800">
            Maintain this score for {7 - entries.filter(e => e.score >= 80).length} more days 
            to unlock binder protocols safely.
          </AlertDescription>
        </Alert>
      )}

      {/* Top Priority Improvements */}
      {weakAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Your Top Priority Areas
            </CardTitle>
            <CardDescription>
              Focus on these areas for the biggest improvement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakAreas.map((area, index) => (
              <div key={area.area} className="space-y-3 pb-4 border-b last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {area.icon}
                    <span className="font-medium">{area.area}</span>
                  </div>
                  <Badge variant={area.score < 5 ? "destructive" : "warning"}>
                    Score: {area.score}/10
                  </Badge>
                </div>
                <ul className="space-y-1 ml-6">
                  {area.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* General Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Drainage Support Protocol</CardTitle>
          <CardDescription>
            Follow this daily routine to improve all drainage pathways
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Morning (Upon Waking)</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Drink 16-24 oz warm lemon water</li>
                <li>• Dry brush for 3-5 minutes</li>
                <li>• 5 minutes of deep breathing or meditation</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Throughout the Day</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Drink water every hour (aim for half body weight in oz)</li>
                <li>• Move for 5 minutes every hour</li>
                <li>• Take digestive bitters before meals</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Evening</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Castor oil pack over liver (20-30 min)</li>
                <li>• Epsom salt bath or infrared sauna</li>
                <li>• Magnesium before bed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplement Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Supportive Supplements</CardTitle>
          <CardDescription>
            Consider these supplements to support drainage (consult your practitioner)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Magnesium Citrate</p>
                <p className="text-xs text-muted-foreground">For bowel movements</p>
              </div>
              <Badge variant="outline">400-600mg</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Milk Thistle</p>
                <p className="text-xs text-muted-foreground">Liver support</p>
              </div>
              <Badge variant="outline">250-500mg</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Vitamin C</p>
                <p className="text-xs text-muted-foreground">Immune & drainage support</p>
              </div>
              <Badge variant="outline">1000-3000mg</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Digestive Enzymes</p>
                <p className="text-xs text-muted-foreground">With meals</p>
              </div>
              <Badge variant="outline">As directed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Reminder */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <Shield className="h-5 w-5" />
            Important Safety Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-orange-800">
            Never rush the drainage preparation phase. Taking time to properly open your 
            drainage pathways is the difference between a successful, comfortable detox and 
            a miserable experience with severe herx reactions. When in doubt, spend more time 
            on drainage support.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
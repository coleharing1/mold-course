/**
 * @fileoverview Relief Protocol component providing personalized interventions
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  Droplets, 
  Shield, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Pill,
  Bath,
  Coffee
} from 'lucide-react'

interface ReliefProtocolProps {
  currentAssessment: any
  onInterventionUsed: (intervention: string) => void
}

export function ReliefProtocol({ currentAssessment, onInterventionUsed }: ReliefProtocolProps) {
  const [usedInterventions, setUsedInterventions] = useState<string[]>([])

  if (!currentAssessment) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Complete an assessment first to get personalized relief protocols.</p>
        </CardContent>
      </Card>
    )
  }

  const markAsUsed = (intervention: string) => {
    setUsedInterventions(prev => [...prev, intervention])
    onInterventionUsed(intervention)
  }

  const renderEmergencyProtocol = () => (
    <Alert className="border-red-500 bg-red-50 mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>EMERGENCY LEVEL DETECTED</AlertTitle>
      <AlertDescription>
        <strong>Immediate Actions Required:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Consider calling 911 or going to ER immediately</li>
          <li>Stop all treatments except binders</li>
          <li>Do not leave person alone</li>
          <li>Have emergency contacts ready</li>
        </ul>
      </AlertDescription>
    </Alert>
  )

  const renderHighSeverityProtocol = () => (
    <div className="space-y-6">
      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>HIGH SEVERITY - STOP TREATMENT</AlertTitle>
        <AlertDescription>
          Stop all antimicrobials/antifungals immediately. Continue binders only. 
          Consider medical evaluation.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" />
            Emergency Support Protocol
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Activated Charcoal - Emergency Dose')}
              disabled={usedInterventions.includes('Activated Charcoal - Emergency Dose')}
            >
              <Pill className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Activated Charcoal</div>
                <div className="text-xs text-gray-600">4 capsules every 4 hours</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Aggressive Hydration')}
              disabled={usedInterventions.includes('Aggressive Hydration')}
            >
              <Droplets className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Aggressive Hydration</div>
                <div className="text-xs text-gray-600">+50% water with electrolytes</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Medical Evaluation')}
              disabled={usedInterventions.includes('Medical Evaluation')}
            >
              <Heart className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Seek Medical Care</div>
                <div className="text-xs text-gray-600">Contact healthcare provider</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Complete Rest')}
              disabled={usedInterventions.includes('Complete Rest')}
            >
              <Clock className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Complete Rest</div>
                <div className="text-xs text-gray-600">No activities, full bed rest</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderModerateProtocol = () => (
    <Tabs defaultValue="immediate" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="immediate">Immediate (1 hour)</TabsTrigger>
        <TabsTrigger value="drainage">Drainage Support</TabsTrigger>
        <TabsTrigger value="system">System Support</TabsTrigger>
      </TabsList>

      <TabsContent value="immediate" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Relief Interventions</CardTitle>
            <CardDescription>Start with these immediate relief strategies</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Activated Charcoal')}
              disabled={usedInterventions.includes('Activated Charcoal')}
            >
              <Pill className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Activated Charcoal</div>
                <div className="text-xs text-gray-600">2-4 capsules with water</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Alka-Seltzer Gold')}
              disabled={usedInterventions.includes('Alka-Seltzer Gold')}
            >
              <Droplets className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Alka-Seltzer Gold</div>
                <div className="text-xs text-gray-600">2 tablets in water</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Electrolyte Push')}
              disabled={usedInterventions.includes('Electrolyte Push')}
            >
              <Droplets className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Electrolyte Push</div>
                <div className="text-xs text-gray-600">24oz water + salt + lemon</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Breathing Protocol')}
              disabled={usedInterventions.includes('Breathing Protocol')}
            >
              <Heart className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">4-7-8 Breathing</div>
                <div className="text-xs text-gray-600">10 rounds for calm</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="drainage" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Enhanced Drainage Support</CardTitle>
            <CardDescription>Open elimination pathways to clear toxins faster</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Epsom Salt Bath')}
              disabled={usedInterventions.includes('Epsom Salt Bath')}
            >
              <Bath className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Epsom Salt Bath</div>
                <div className="text-xs text-gray-600">2 cups, 20 minutes</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Coffee Enema')}
              disabled={usedInterventions.includes('Coffee Enema')}
            >
              <Coffee className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Coffee Enema</div>
                <div className="text-xs text-gray-600">If experienced</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Lymphatic Drainage')}
              disabled={usedInterventions.includes('Lymphatic Drainage')}
            >
              <Heart className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Lymphatic Drainage</div>
                <div className="text-xs text-gray-600">Dry brushing + movement</div>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => markAsUsed('Castor Oil Pack')}
              disabled={usedInterventions.includes('Castor Oil Pack')}
            >
              <Shield className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">Castor Oil Pack</div>
                <div className="text-xs text-gray-600">Over liver, 30-45 min</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="system" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>System Support Supplements</CardTitle>
            <CardDescription>Support your body's natural detox systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">NAC (N-Acetyl Cysteine)</div>
                  <div className="text-sm text-gray-600">Increase to 1200-1800mg daily</div>
                </div>
                <Button 
                  size="sm"
                  onClick={() => markAsUsed('NAC Increase')}
                  disabled={usedInterventions.includes('NAC Increase')}
                >
                  {usedInterventions.includes('NAC Increase') ? <CheckCircle2 className="w-4 h-4" /> : 'Use'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Vitamin C</div>
                  <div className="text-sm text-gray-600">To bowel tolerance + 1000mg</div>
                </div>
                <Button 
                  size="sm"
                  onClick={() => markAsUsed('Vitamin C Increase')}
                  disabled={usedInterventions.includes('Vitamin C Increase')}
                >
                  {usedInterventions.includes('Vitamin C Increase') ? <CheckCircle2 className="w-4 h-4" /> : 'Use'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Magnesium Glycinate</div>
                  <div className="text-sm text-gray-600">600-800mg before bed</div>
                </div>
                <Button 
                  size="sm"
                  onClick={() => markAsUsed('Magnesium Increase')}
                  disabled={usedInterventions.includes('Magnesium Increase')}
                >
                  {usedInterventions.includes('Magnesium Increase') ? <CheckCircle2 className="w-4 h-4" /> : 'Use'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  const renderMildProtocol = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Mild Herx Management
        </CardTitle>
        <CardDescription>
          Your symptoms are manageable. Continue protocol with basic support.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          variant="outline"
          className="flex items-center gap-2 h-auto p-4"
          onClick={() => markAsUsed('Extra Hydration')}
          disabled={usedInterventions.includes('Extra Hydration')}
        >
          <Droplets className="w-4 h-4" />
          <div className="text-left">
            <div className="font-medium">Extra Hydration</div>
            <div className="text-xs text-gray-600">+16-24oz with electrolytes</div>
          </div>
        </Button>

        <Button 
          variant="outline"
          className="flex items-center gap-2 h-auto p-4"
          onClick={() => markAsUsed('Extra Rest')}
          disabled={usedInterventions.includes('Extra Rest')}
        >
          <Clock className="w-4 h-4" />
          <div className="text-left">
            <div className="font-medium">Extra Rest</div>
            <div className="text-xs text-gray-600">30-60 min additional sleep</div>
          </div>
        </Button>

        <Button 
          variant="outline"
          className="flex items-center gap-2 h-auto p-4"
          onClick={() => markAsUsed('Gentle Movement')}
          disabled={usedInterventions.includes('Gentle Movement')}
        >
          <Heart className="w-4 h-4" />
          <div className="text-left">
            <div className="font-medium">Gentle Movement</div>
            <div className="text-xs text-gray-600">Walking, stretching</div>
          </div>
        </Button>

        <Button 
          variant="outline"
          className="flex items-center gap-2 h-auto p-4"
          onClick={() => markAsUsed('Monitor Closely')}
          disabled={usedInterventions.includes('Monitor Closely')}
        >
          <Shield className="w-4 h-4" />
          <div className="text-left">
            <div className="font-medium">Monitor Closely</div>
            <div className="text-xs text-gray-600">Watch for progression</div>
          </div>
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {currentAssessment.overallSeverity >= 9 && renderEmergencyProtocol()}
      {currentAssessment.overallSeverity >= 7 && currentAssessment.overallSeverity < 9 && renderHighSeverityProtocol()}
      {currentAssessment.overallSeverity >= 4 && currentAssessment.overallSeverity < 7 && renderModerateProtocol()}
      {currentAssessment.overallSeverity < 4 && renderMildProtocol()}

      {/* Interventions Used */}
      {usedInterventions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Interventions Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {usedInterventions.map((intervention, index) => (
                <Badge key={index} variant="secondary">
                  {intervention}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
